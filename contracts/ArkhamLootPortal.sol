// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IInbox} from "./arbitrum/IInbox.sol";
import {IArkhamLootL2Minter} from "./IArkhamLootL2Minter.sol";

contract ArkhamLootPortal is Ownable {
    address public l2Target;
    IERC721 public loot;
    IInbox public inbox;

    mapping(uint256 => bool) public claimed;

    constructor(
        address lootAddress,
        address inboxAddress,
        address l2TargetAddress
    ) public {
        l2Target = l2TargetAddress;
        loot = IERC721(lootAddress);
        inbox = IInbox(inboxAddress);
    }

    function setL2Target(address newL2Target) external onlyOwner {
        l2Target = newL2Target;
    }

    /*
        @notice This claims your bag in L2.
    */
    function warpLoot(
        uint256 lootId,
        uint256 maxSubmissionCost,
        uint256 maxGas,
        uint256 gasPriceBid
    ) external returns (uint256) {
        require(
            loot.ownerOf(lootId) == msg.sender,
            "SENDER_ISNT_LOOT_ID_OWNER"
        );
        require(!claimed[lootId], "ARKHAM_LOOT_ALREADY_CLAIMED");

        bytes memory data =
            abi.encodeWithSelector(
                IArkhamLootL2Minter.warpBag.selector,
                msg.sender,
                lootId
            );

        claimed[lootId] = true;

        uint256 ticketID =
            inbox.createRetryableTicket(
                l2Target,
                0,
                maxSubmissionCost,
                msg.sender,
                msg.sender,
                maxGas,
                gasPriceBid,
                data
            );

        emit RetryableTicketCreated(ticketID);
        return ticketID;
    }

    /* Events */

    event RetryableTicketCreated(uint256 indexed ticketId);
}
