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
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface LootPortalInterface extends ethers.utils.Interface {
  functions: {
    "c_0x31b82192(bytes32)": FunctionFragment;
    "claimed(uint256)": FunctionFragment;
    "inbox()": FunctionFragment;
    "l2Target()": FunctionFragment;
    "loot()": FunctionFragment;
    "lootsToTickets(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setL2Target(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "warpLoot(uint256,uint256,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "c_0x31b82192",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "claimed",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "inbox", values?: undefined): string;
  encodeFunctionData(functionFragment: "l2Target", values?: undefined): string;
  encodeFunctionData(functionFragment: "loot", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "lootsToTickets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "setL2Target", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "warpLoot",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "c_0x31b82192",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claimed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "inbox", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "l2Target", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "loot", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lootsToTickets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setL2Target",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "warpLoot", data: BytesLike): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "RetryableTicketCreated(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RetryableTicketCreated"): EventFragment;
}

export class LootPortal extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: LootPortalInterface;

  functions: {
    c_0x31b82192(
      c__0x31b82192: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: void;
    }>;

    "c_0x31b82192(bytes32)"(
      c__0x31b82192: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: void;
    }>;

    claimed(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "claimed(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    inbox(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "inbox()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    l2Target(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "l2Target()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    loot(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "loot()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    lootsToTickets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "lootsToTickets(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    owner(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "owner()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    setL2Target(
      newL2Target: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setL2Target(address)"(
      newL2Target: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    warpLoot(
      lootId: BigNumberish,
      maxSubmissionCost: BigNumberish,
      maxGas: BigNumberish,
      gasPriceBid: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "warpLoot(uint256,uint256,uint256,uint256)"(
      lootId: BigNumberish,
      maxSubmissionCost: BigNumberish,
      maxGas: BigNumberish,
      gasPriceBid: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;
  };

  c_0x31b82192(
    c__0x31b82192: BytesLike,
    overrides?: CallOverrides
  ): Promise<void>;

  "c_0x31b82192(bytes32)"(
    c__0x31b82192: BytesLike,
    overrides?: CallOverrides
  ): Promise<void>;

  claimed(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  "claimed(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  inbox(overrides?: CallOverrides): Promise<string>;

  "inbox()"(overrides?: CallOverrides): Promise<string>;

  l2Target(overrides?: CallOverrides): Promise<string>;

  "l2Target()"(overrides?: CallOverrides): Promise<string>;

  loot(overrides?: CallOverrides): Promise<string>;

  "loot()"(overrides?: CallOverrides): Promise<string>;

  lootsToTickets(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "lootsToTickets(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  setL2Target(
    newL2Target: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setL2Target(address)"(
    newL2Target: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  warpLoot(
    lootId: BigNumberish,
    maxSubmissionCost: BigNumberish,
    maxGas: BigNumberish,
    gasPriceBid: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "warpLoot(uint256,uint256,uint256,uint256)"(
    lootId: BigNumberish,
    maxSubmissionCost: BigNumberish,
    maxGas: BigNumberish,
    gasPriceBid: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  callStatic: {
    c_0x31b82192(
      c__0x31b82192: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "c_0x31b82192(bytes32)"(
      c__0x31b82192: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    claimed(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    "claimed(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    inbox(overrides?: CallOverrides): Promise<string>;

    "inbox()"(overrides?: CallOverrides): Promise<string>;

    l2Target(overrides?: CallOverrides): Promise<string>;

    "l2Target()"(overrides?: CallOverrides): Promise<string>;

    loot(overrides?: CallOverrides): Promise<string>;

    "loot()"(overrides?: CallOverrides): Promise<string>;

    lootsToTickets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "lootsToTickets(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    setL2Target(newL2Target: string, overrides?: CallOverrides): Promise<void>;

    "setL2Target(address)"(
      newL2Target: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    warpLoot(
      lootId: BigNumberish,
      maxSubmissionCost: BigNumberish,
      maxGas: BigNumberish,
      gasPriceBid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "warpLoot(uint256,uint256,uint256,uint256)"(
      lootId: BigNumberish,
      maxSubmissionCost: BigNumberish,
      maxGas: BigNumberish,
      gasPriceBid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;

    RetryableTicketCreated(ticketId: BigNumberish | null): EventFilter;
  };

  estimateGas: {
    c_0x31b82192(
      c__0x31b82192: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "c_0x31b82192(bytes32)"(
      c__0x31b82192: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimed(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    "claimed(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    inbox(overrides?: CallOverrides): Promise<BigNumber>;

    "inbox()"(overrides?: CallOverrides): Promise<BigNumber>;

    l2Target(overrides?: CallOverrides): Promise<BigNumber>;

    "l2Target()"(overrides?: CallOverrides): Promise<BigNumber>;

    loot(overrides?: CallOverrides): Promise<BigNumber>;

    "loot()"(overrides?: CallOverrides): Promise<BigNumber>;

    lootsToTickets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "lootsToTickets(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    setL2Target(newL2Target: string, overrides?: Overrides): Promise<BigNumber>;

    "setL2Target(address)"(
      newL2Target: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    warpLoot(
      lootId: BigNumberish,
      maxSubmissionCost: BigNumberish,
      maxGas: BigNumberish,
      gasPriceBid: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "warpLoot(uint256,uint256,uint256,uint256)"(
      lootId: BigNumberish,
      maxSubmissionCost: BigNumberish,
      maxGas: BigNumberish,
      gasPriceBid: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    c_0x31b82192(
      c__0x31b82192: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "c_0x31b82192(bytes32)"(
      c__0x31b82192: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claimed(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "claimed(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    inbox(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "inbox()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    l2Target(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "l2Target()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    loot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "loot()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lootsToTickets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "lootsToTickets(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    setL2Target(
      newL2Target: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setL2Target(address)"(
      newL2Target: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    warpLoot(
      lootId: BigNumberish,
      maxSubmissionCost: BigNumberish,
      maxGas: BigNumberish,
      gasPriceBid: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "warpLoot(uint256,uint256,uint256,uint256)"(
      lootId: BigNumberish,
      maxSubmissionCost: BigNumberish,
      maxGas: BigNumberish,
      gasPriceBid: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;
  };
}
