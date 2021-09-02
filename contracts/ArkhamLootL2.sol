// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import { ArbSys } from "./arbitrum/ArbSys.sol";
import { AddressAliasHelper } from "./arbitrum/AddressAliasHelper.sol";
import { ArkhamLoot } from "./ArkhamLoot.sol";

contract ArkhamLootL2 is ArkhamLoot {

    ArbSys constant public ARBSYS = ArbSys(100);

    address public l1Target;

    event L2ToL1TxCreated(uint256 indexed withdrawalId);

    constructor(
        address l1TargetAddress,
        address inboxAddress
    ) public {
        l1Target = l1TargetAddress;
    }

    function setL1Target(address newL1Target) external onlyOwner {
        l1Target = newL1Target;
    }

    /*
        @notice It receives a TX from L1.
        @notice Only l1Target can claim a ArkhamLoot in Arbitrum
    */
    function claim(uint256 lootId) external {
        // To check that message came from L1, we check that the sender is the L1 contract's L2 alias.
        require(msg.sender == AddressAliasHelper.applyL1ToL2Alias(l1Target), "INVALID_L1_TARGET");
        address l1Sender = msg.sender; // TODO How do we get the L1 sender?
        _claim(l1Sender, lootId);
    }
}
