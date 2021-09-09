// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ArbSys} from "./arbitrum/ArbSys.sol";
import {AddressAliasHelper} from "./arbitrum/AddressAliasHelper.sol";
import {IDeevy} from "./IDeevy.sol";

contract DeevyMinter {
    IDeevy public deevy;

    mapping(address => bool) public claimed;

    constructor(address deevyAddress) public {
        deevy = IDeevy(deevyAddress);
    }
    /*
        @notice Mint deevy
        @notice Cannot mint original Loot ids
    */
    function claim(address account, uint256 deevyId) external {
        require(deevyId > 8889, "!TOKEN_ID");
        require(!claimed[account], "ALREADY_CLAIMED");
        claimed[account] = true;

        deevy.claim(msg.sender, deevyId);
    }
}
