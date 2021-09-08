// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ArbSys} from "./arbitrum/ArbSys.sol";
import {AddressAliasHelper} from "./arbitrum/AddressAliasHelper.sol";
import {IDeevy} from "./IDeevy.sol";

contract DeevyBridgeMinter is Ownable {
    ArbSys public constant ARBSYS = ArbSys(100);

    address public l1Target;

    IDeevy public deevy;

    mapping(address => bool) public claimed;

    event L2ToL1TxCreated(uint256 indexed withdrawalId);

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
    function warpBag(address account, uint256 lootId) external {
        // To check that message came from L1, we check that the sender is the L1 contract's L2 alias.
        require(
            msg.sender == AddressAliasHelper.applyL1ToL2Alias(l1Target),
            "INVALID_L1_TARGET"
        );
        deevy.warpLoot(account, lootId);
    }
}
