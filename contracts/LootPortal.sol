// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import {SafeMath} from "@openzeppelin/contracts/math/SafeMath.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IInbox} from "./arbitrum/IInbox.sol";
import {IDeevyBridgeMinter} from "./IDeevyBridgeMinter.sol";

contract LootPortal is Ownable, Pausable {
    using SafeMath for uint256;

    address public l2Target;
    IERC721 public loot;
    IInbox public inbox;

    // Loot ID to Ticket ID
    mapping(uint256 => uint256) public lootsToTickets;

    constructor(
        address lootAddress,
        address l2TargetAddress,
        address inboxAddress
    ) public {
        l2Target = l2TargetAddress;
        loot = IERC721(lootAddress);
        inbox = IInbox(inboxAddress);
    }

    function setL2Target(address newL2Target) external onlyOwner {
        l2Target = newL2Target;
    }

    function setInbox(address newInbox) external onlyOwner {
        inbox = IInbox(newInbox);
    }

    /*
        @notice This claims your deevy bag in L2.
    */
    function warpLoot(
        uint256 lootId,
        uint256 maxSubmissionCost,
        uint256 maxGas,
        uint256 gasPriceBid
    ) external whenNotPaused() payable returns (uint256) {
        require(l2Target != address(0x0), "L2_TARGET_REQUIRED");
        require(msg.value > 0, "MSG_VALUE_IS_REQUIRED");
        require(msg.value == gasPriceBid.mul(maxGas).add(maxSubmissionCost), "MSG_VALUE_INVALID");
        require(
            loot.ownerOf(lootId) == msg.sender,
            "SENDER_ISNT_LOOT_ID_OWNER"
        );

        bytes memory data =
            abi.encodeWithSelector(
                IDeevyBridgeMinter.warpBag.selector,
                msg.sender,
                lootId
            );

        uint256 ticketID =
            inbox.createRetryableTicket{value: msg.value}(
                l2Target,
                0,
                maxSubmissionCost,
                msg.sender,
                msg.sender,
                maxGas,
                gasPriceBid,
                data
            );

        lootsToTickets[lootId] = ticketID;
        emit RetryableTicketCreated(
            ticketID,
            maxSubmissionCost,
            maxGas,
            gasPriceBid
        );
        return ticketID;
    }

    function pause() external onlyOwner() {
        super._pause();
    }

    function unpause() external onlyOwner() {
        super._unpause();
    }

    /* Events */

    event RetryableTicketCreated(
        uint256 indexed ticketId,
        uint256 maxSubmissionCost,
        uint256 maxGas,
        uint256 gasPriceBid
    );
}
