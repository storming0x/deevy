/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */

import {Contract} from "ethers";
import {ContractAddresses} from ".";
import {
    DEEVY_NAME,
    DEEVY_MINTER_NAME,
    DEEVY_BRIDGE_MINTER_NAME,
    IBRIDGE_NAME,
    INBOX_NAME,
    LOOT_NAME,
    LOOT_PORTAL_NAME,
    ARB_RETRYABLE_TX_NAME,
} from "../utils/consts/consts";

export class GetContracts {
    constructor(private ethers: any, private addresses: ContractAddresses) {}

    protected async getContractAt(name: string, address: string): Promise<Contract> {
        const contract = await this.ethers.getContractAt(name, address);
        return contract;
    }

    async getLootPortal(): Promise<Contract> {
        return (await this.getContractAt(
            LOOT_PORTAL_NAME,
            this.addresses.portalLoot.address
        )) as Contract;
    }

    async getLoot(): Promise<Contract> {
        return (await this.getContractAt(LOOT_NAME, this.addresses.loot.address)) as Contract;
    }

    async getInbox(): Promise<Contract> {
        return (await this.getContractAt(
            INBOX_NAME,
            this.addresses.arbitrumInbox.address
        )) as Contract;
    }

    async getBridge(): Promise<Contract> {
        const inbox = await this.getInbox();
        const bridge = await inbox.bridge();
        return (await this.getContractAt(IBRIDGE_NAME, bridge)) as Contract;
    }

    async getDeevyMinter(): Promise<Contract> {
        return (await this.getContractAt(
            DEEVY_MINTER_NAME,
            this.addresses.deevyMinter.address
        )) as Contract;
    }

    async getDeevyBridgeMinter(): Promise<Contract> {
        return (await this.getContractAt(
            DEEVY_BRIDGE_MINTER_NAME,
            this.addresses.deevyBridgeMinter.address
        )) as Contract;
    }

    async getDeevy(): Promise<Contract> {
        return (await this.getContractAt(DEEVY_NAME, this.addresses.deevy.address)) as Contract;
    }

    async getArbRetryableTx(): Promise<Contract> {
        return (await this.getContractAt(
            ARB_RETRYABLE_TX_NAME,
            this.addresses.arbitrumArbRetryableTx.address
        )) as Contract;
    }
}
