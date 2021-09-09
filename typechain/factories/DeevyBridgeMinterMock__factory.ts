/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { DeevyBridgeMinterMock } from "../DeevyBridgeMinterMock";

export class DeevyBridgeMinterMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    l1ToL2AliasAddress: string,
    deevyAddress: string,
    l1TargetAddress: string,
    overrides?: Overrides
  ): Promise<DeevyBridgeMinterMock> {
    return super.deploy(
      l1ToL2AliasAddress,
      deevyAddress,
      l1TargetAddress,
      overrides || {}
    ) as Promise<DeevyBridgeMinterMock>;
  }
  getDeployTransaction(
    l1ToL2AliasAddress: string,
    deevyAddress: string,
    l1TargetAddress: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      l1ToL2AliasAddress,
      deevyAddress,
      l1TargetAddress,
      overrides || {}
    );
  }
  attach(address: string): DeevyBridgeMinterMock {
    return super.attach(address) as DeevyBridgeMinterMock;
  }
  connect(signer: Signer): DeevyBridgeMinterMock__factory {
    return super.connect(signer) as DeevyBridgeMinterMock__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DeevyBridgeMinterMock {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as DeevyBridgeMinterMock;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "l1ToL2AliasAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "deevyAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "l1TargetAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "ARBSYS",
    outputs: [
      {
        internalType: "contract ArbSys",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "claimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deevy",
    outputs: [
      {
        internalType: "contract IDeevy",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "l1Target",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "l1ToL2Alias",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newL1Target",
        type: "address",
      },
    ],
    name: "setL1Target",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "lootId",
        type: "uint256",
      },
    ],
    name: "warpBag",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516106f83803806106f88339818101604052606081101561003357600080fd5b5080516020820151604090920151909190818160006100506100e3565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350600280546001600160a01b039384166001600160a01b03199182161790915560018054928416928216929092179091556004805495909216941693909317909255506100e79050565b3390565b610602806100f66000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c80638da5cb5b116100665780638da5cb5b1461010d578063bf0a12cf14610115578063db5780b41461011d578063dbe7e3bd14610143578063f2fde38b146101745761009e565b8063228f6976146100a357806350d97bc6146100d15780635325e4a6146100f5578063715018a6146100fd5780637f7e81b414610105575b600080fd5b6100cf600480360360408110156100b957600080fd5b506001600160a01b03813516906020013561019a565b005b6100d96102d5565b604080516001600160a01b039092168252519081900360200190f35b6100d96102e4565b6100cf6102f3565b6100d96103b1565b6100d96103c0565b6100d96103cf565b6100cf6004803603602081101561013357600080fd5b50356001600160a01b03166103d4565b6101606004803603602081101561015957600080fd5b503561046a565b604080519115158252519081900360200190f35b6100cf6004803603602081101561018a57600080fd5b50356001600160a01b031661047f565b6101a2610593565b6001600160a01b0316336001600160a01b0316146101fb576040805162461bcd60e51b81526020600482015260116024820152701253959053125117d30c57d5105491d155607a1b604482015290519081900360640190fd5b60008181526003602052604090205460ff1615610251576040805162461bcd60e51b815260206004820152600f60248201526e1053149150511657d0d31052535151608a1b604482015290519081900360640190fd5b600081815260036020526040808220805460ff1916600117905560025481516302ae662560e01b81526001600160a01b03868116600483015260248201869052925192909116926302ae66259260448084019382900301818387803b1580156102b957600080fd5b505af11580156102cd573d6000803e3d6000fd5b505050505050565b6002546001600160a01b031681565b6001546001600160a01b031681565b6102fb6105a2565b6001600160a01b031661030c6103c0565b6001600160a01b031614610367576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6004546001600160a01b031681565b6000546001600160a01b031690565b606481565b6103dc6105a2565b6001600160a01b03166103ed6103c0565b6001600160a01b031614610448576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b60036020526000908152604090205460ff1681565b6104876105a2565b6001600160a01b03166104986103c0565b6001600160a01b0316146104f3576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b0381166105385760405162461bcd60e51b81526004018080602001828103825260268152602001806105a76026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6004546001600160a01b031690565b339056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373a2646970667358221220d31921d22df7eec938615dd60dcc6ed805628ca347abf5a624e0a9da37d4fafa64736f6c634300060c0033";