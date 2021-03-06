/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IDeevyBridgeMinterInterface extends ethers.utils.Interface {
  functions: {
    "rescue()": FunctionFragment;
    "warpBag(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "rescue", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "warpBag",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "rescue", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "warpBag", data: BytesLike): Result;

  events: {};
}

export class IDeevyBridgeMinter extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IDeevyBridgeMinterInterface;

  functions: {
    rescue(overrides?: Overrides): Promise<ContractTransaction>;

    "rescue()"(overrides?: Overrides): Promise<ContractTransaction>;

    warpBag(
      account: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "warpBag(address,uint256)"(
      account: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  rescue(overrides?: Overrides): Promise<ContractTransaction>;

  "rescue()"(overrides?: Overrides): Promise<ContractTransaction>;

  warpBag(
    account: string,
    tokenId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "warpBag(address,uint256)"(
    account: string,
    tokenId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    rescue(overrides?: CallOverrides): Promise<void>;

    "rescue()"(overrides?: CallOverrides): Promise<void>;

    warpBag(
      account: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "warpBag(address,uint256)"(
      account: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    rescue(overrides?: Overrides): Promise<BigNumber>;

    "rescue()"(overrides?: Overrides): Promise<BigNumber>;

    warpBag(
      account: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "warpBag(address,uint256)"(
      account: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    rescue(overrides?: Overrides): Promise<PopulatedTransaction>;

    "rescue()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    warpBag(
      account: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "warpBag(address,uint256)"(
      account: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
