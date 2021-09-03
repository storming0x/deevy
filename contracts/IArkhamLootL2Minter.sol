// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.6.12;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IArkhamLootL2Minter is IERC721 {
    function warpBag(address account, uint256 tokenId) external;

    function claim(address account, uint256 tokenId) external;
}
