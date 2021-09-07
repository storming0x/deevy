// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

interface IDeevySet {
    function tokenURI(uint256 tokenId) external view returns (string memory);

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);
}
