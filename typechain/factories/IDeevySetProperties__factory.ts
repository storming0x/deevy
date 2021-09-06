/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IDeevySetProperties } from "../IDeevySetProperties";

export class IDeevySetProperties__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IDeevySetProperties {
    return new Contract(address, _abi, signerOrProvider) as IDeevySetProperties;
  }
}

const _abi = [
  {
    inputs: [],
    name: "setName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];