// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity 0.6.12;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {
    ReentrancyGuard
} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./tokens/ERC721.sol";
import {IDeevy} from "./IDeevy.sol";
import {IDeevySet} from "./IDeevySet.sol";
import {ILoot} from "./ILoot.sol";

/**
 * @dev Standard math utilities missing in the Solidity language.
 */
library Math {
    /**
     * @dev Returns the average of two numbers. The result is rounded towards
     * zero.
     */
    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b) / 2 can overflow.
        return (a & b) + (a ^ b) / 2;
    }
}

contract Deevy is ERC721, ReentrancyGuard, Ownable, IDeevy {
    struct DeevySet {
        address set;
        uint256 start;
        uint256 end;
        bool exists;
    }

    address public bridgeMinter;
    address public minter;
    // reference readonly copy of Loot contract in L2
    address public loot;
    uint256 public LOOT_SUPPLY = 7779;

    // stores set information
    mapping(uint256 => DeevySet) public sets;
    // unique sets
    mapping(address => bool) public setAddresses;
    // unique set names
    mapping(bytes32 => bool) public setNames;
    // array for holding sets max mint
    uint256[] setsMax;

    // EVENTS

    event NewSet(
        address indexed _set,
        string _name,
        uint256 _start,
        uint256 _end
    );

    constructor(address _minterAddress, address _bridgeMinter, address _warpedLoot)
        public
        ERC721("Deevy", "DEEVY")
        Ownable()
    {
        minter = _minterAddress;
        bridgeMinter = _bridgeMinter;
        loot = _warpedLoot;
    }

    function setMinter(address _newMinterAddress) external onlyOwner {
        minter = _newMinterAddress;
    }

    function setBridgeMinter(address _bridgeMinter) external onlyOwner {
        bridgeMinter = _bridgeMinter;
    }

    function addSet(address _set, uint256 _end) external onlyOwner {
        require(!setAddresses[_set], "!SET_ALREADY_USED");
        setAddresses[_set] = true;
        DeevySet memory newSet;

        string memory setName = IDeevySet(_set).name();
        bytes32 setHash = keccak256(abi.encodePacked(setName));
        // first set
        if (setsMax.length == 0) {
            require(_end >= LOOT_SUPPLY, "!SUPPLY_FIRST_SET");
            newSet = DeevySet({set: _set, start: 0, end: _end, exists: true});
            sets[0] = newSet;
            setsMax.push(_end);
            setNames[setHash] = true;

            emit NewSet(_set, setName, 0, _end);
            return;
        }

        require(!setNames[setHash], "!SET_NAME_EXISTS");

        // adding a new set
        DeevySet memory lastSet = sets[setsMax.length - 1];
        require(_end > lastSet.end + 1, "!NEW_SET_START");
        newSet = DeevySet({
            set: _set,
            start: lastSet.end + 1,
            end: _end,
            exists: true
        });
        setsMax.push(_end);
        sets[setsMax.length - 1] = newSet;
        setNames[setHash] = true;

        emit NewSet(_set, setName, newSet.start, newSet.end);
    }

    // exclusive claim function for loot holders
    function warpLoot(address account, uint256 tokenId)
        external
        override
        nonReentrant
    {
        require(bridgeMinter == msg.sender, "!BRIDGE_MINTER");
        require(tokenId > 0 && tokenId < 8000, "!TOKEN_ID");
        _safeMint(account, tokenId);
    }

    // one time claim
    function ownerClaim(uint256 tokenId)
        public
        override
        nonReentrant
        onlyOwner
    {
        require(tokenId >= 8000 && tokenId < 8889, "!TOKEN_ID");
        _safeMint(owner(), tokenId);
    }

    function claim(address account, uint256 tokenId)
        external
        override
        nonReentrant
    {
        require(minter == msg.sender, "!MINTER");
        require(tokenId >= 8889, "!TOKEN_ID");
        require(tokenId <= setsMax[setsMax.length - 1]);
        _safeMint(account, tokenId);
    }

    // view functions
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        address setProperties = getSet(tokenId);
        return IDeevySet(setProperties).tokenURI(tokenId);
    }

    // based on OZ https://github.com/OpenZeppelin/openzeppelin-contracts/blob/b0cf6fbb7a70f31527f36579ad644e1cf12fdf4e/contracts/utils/Arrays.sol
    function findSetIndex(uint256[] memory array, uint256 element)
        internal
        view
        returns (uint256)
    {
        // return max since array is empty or above max, so this number would not exist
        if (array.length == 0 || element > array[array.length - 1]) {
            return type(uint256).max;
        }

        uint256 low = 0;
        uint256 high = array.length;

        while (low < high) {
            uint256 mid = Math.average(low, high);

            // Note that mid will always be strictly less than high (i.e. it will be a valid array index)
            // because Math.average rounds down (it does integer division with truncation).
            if (array[mid] > element) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }

        // At this point `low` is the exclusive upper bound. We will return the inclusive upper bound.
        if (low > 0 && array[low - 1] == element) {
            return low - 1;
        } else {
            return low;
        }
    }

    function getSetInfo(uint256 tokenId) public view returns (DeevySet memory) {
        uint256 i = findSetIndex(setsMax, tokenId);
        DeevySet memory info = sets[i];
        return info;
    }

    function getSet(uint256 tokenId) public view returns (address) {
        DeevySet memory info = getSetInfo(tokenId);
        return info.set;
    }

    function name(uint256 tokenId) public view returns (string memory) {
        address setProperties = getSet(tokenId);
        return IDeevySet(setProperties).name();
    }

    function symbol(uint256 tokenId) public view returns (string memory) {
        address setProperties = getSet(tokenId);
        return IDeevySet(setProperties).symbol();
    }

    // Loot compatibility functions
    function getWeapon(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getWeapon(tokenId);
    }

    function getChest(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getChest(tokenId);
    }

    function getHead(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getHead(tokenId);
    }

    function getWaist(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getWaist(tokenId);
    }

    function getFoot(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getFoot(tokenId);
    }

    function getHand(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getHand(tokenId);
    }

    function getNeck(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getNeck(tokenId);
    }

    function getRing(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getRing(tokenId);
    }

    function lootTokenURI(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).tokenUri(tokenId);
    }
}
