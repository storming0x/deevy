// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IDeevy is IERC721 {
    function warpLoot(address account, uint256 tokenId) external;

    function claim(address account, uint256 tokenId) external;

    function ownerClaim(uint256 tokenId) external;
}
