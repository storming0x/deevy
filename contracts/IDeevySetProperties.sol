// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

interface IDeevySetProperties {
    function tokenURI(uint256 tokenId) external view returns (string memory);

    function setName() external view returns (string memory);
}
