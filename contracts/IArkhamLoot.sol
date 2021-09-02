// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.6.12;

import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IArkhamLoot is IERC721 {

    function claim(address account, uint256 tokenId) external;
    
    function ownerClaim(uint256 tokenId) external;
}
