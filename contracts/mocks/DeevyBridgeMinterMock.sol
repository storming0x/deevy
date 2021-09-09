// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import {DeevyBridgeMinter} from "../DeevyBridgeMinter.sol";

contract DeevyBridgeMinterMock is DeevyBridgeMinter {

    address public l1ToL2Alias;

    constructor(address l1ToL2AliasAddress, address deevyAddress, address l1TargetAddress) public DeevyBridgeMinter(deevyAddress, l1TargetAddress) {
        l1ToL2Alias = l1ToL2AliasAddress;
    }

    function _getL1ToL2Alias() internal override view returns (address) {
        return l1ToL2Alias;
    }
}
