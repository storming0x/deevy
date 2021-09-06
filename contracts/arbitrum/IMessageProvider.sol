// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.6.12;

interface IMessageProvider {
    event InboxMessageDelivered(uint256 indexed messageNum, bytes data);

    event InboxMessageDeliveredFromOrigin(uint256 indexed messageNum);
}
