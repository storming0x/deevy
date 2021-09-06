/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */

import {Contract} from "ethers";
import {ContractAddresses} from ".";
import {DEEVY2_NAME, DEEVY_MINTER_NAME, LOOT_NAME, LOOT_PORTAL_NAME} from "../utils/consts/consts";

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

    async getDeevyMinter(): Promise<Contract> {
        return (await this.getContractAt(
            DEEVY_MINTER_NAME,
            this.addresses.deevyMinter.address
        )) as Contract;
    }

    async getDeevy(): Promise<Contract> {
        return (await this.getContractAt(DEEVY2_NAME, this.addresses.deevy.address)) as Contract;
    }
}
