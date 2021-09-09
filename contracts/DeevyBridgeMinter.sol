// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ArbSys} from "./arbitrum/ArbSys.sol";
import {AddressAliasHelper} from "./arbitrum/AddressAliasHelper.sol";
import {IDeevy} from "./IDeevy.sol";
import {IDeevyBridgeMinter} from "./IDeevyBridgeMinter.sol";

/**
    @notice It uses ONLY for minting Deevy tokens for Loot holders in L2.
 */
contract DeevyBridgeMinter is Ownable, IDeevyBridgeMinter {
    ArbSys public constant ARBSYS = ArbSys(100);

    address public l1Target;

    IDeevy public deevy;

    mapping(uint256 => bool) public claimed;

    constructor(address deevyAddress, address l1TargetAddress) public {
        deevy = IDeevy(deevyAddress);
        l1Target = l1TargetAddress;
    }

    function setL1Target(address newL1Target) external onlyOwner {
        l1Target = newL1Target;
    }

    /*
        @notice It receives a TX from L1.
        @notice Only l1Target can claim a deevy in Arbitrum
    */
    function warpBag(address account, uint256 lootId) external override {
        // To check that message came from L1, we check that the sender is the L1 contract's L2 alias.
        require(
            msg.sender == _getL1ToL2Alias(),
            "INVALID_L1_TARGET"
        );
        require(!claimed[lootId], "ALREADY_CLAIMED");

        claimed[lootId] = true;

        deevy.warpLoot(account, lootId);
    }

    function _getL1ToL2Alias() internal virtual view returns (address) {
        return AddressAliasHelper.applyL1ToL2Alias(l1Target);
    }
}
