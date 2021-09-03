// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.6.12;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface ILoot is IERC721 {
    function getWeapon(uint256 tokenId) external view returns (string memory);

    function getChest(uint256 tokenId) external view returns (string memory);

    function getHead(uint256 tokenId) external view returns (string memory);

    function getWaist(uint256 tokenId) external view returns (string memory);

    function getFoot(uint256 tokenId) external view returns (string memory);

    function getHand(uint256 tokenId) external view returns (string memory);

    function getNeck(uint256 tokenId) external view returns (string memory);

    function getRing(uint256 tokenId) external view returns (string memory);

    function tokenUri(uint256 tokenId) external view returns (string memory);
}
