// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IDeevyMinter is IERC721 {
    function warpBag(address account, uint256 tokenId) external;

    function claim(address account, uint256 tokenId) external;
}
