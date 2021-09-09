// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

interface IDeevyMinter {
    function claim(address account, uint256 tokenId) external;
}
