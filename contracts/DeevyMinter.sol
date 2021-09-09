// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import {IDeevy} from "./IDeevy.sol";
import {IDeevyMinter} from "./IDeevyMinter.sol";

/**
    @notice This minter is used for people to claim Deevy NFT tokens ONLY in L2.
 */
contract DeevyMinter is IDeevyMinter {
    IDeevy public deevy;

    mapping(address => bool) public claimed;

    constructor(address deevyAddress) public {
        deevy = IDeevy(deevyAddress);
    }
    /*
        @notice Mint deevy
        @notice Cannot mint original Loot ids
    */
    function claim(address account, uint256 deevyId) external override {
        require(deevyId > 8999, "!TOKEN_ID");
        require(!claimed[account], "ALREADY_CLAIMED");
        claimed[account] = true;

        deevy.claim(msg.sender, deevyId);
    }
}
