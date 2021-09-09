/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IDeevyBridgeMinter } from "../IDeevyBridgeMinter";

export class IDeevyBridgeMinter__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IDeevyBridgeMinter {
    return new Contract(address, _abi, signerOrProvider) as IDeevyBridgeMinter;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "warpBag",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];