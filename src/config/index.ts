/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import {ContractInfo} from "@dogdefidev/utils";
import _ from "lodash";

export type ContractAddresses = {
    // Platform Configuration
    maxGasLimit: number;
    // Contracts
    // It should exist ONLY in L1 testnet.
    loot: ContractInfo;
    arbitrumInbox: ContractInfo;
    // It should exist ONLY in L1
    portalLoot: ContractInfo;
    // It should exist ONLY in L2
    deevyMinter: ContractInfo;
    // It should exist ONLY in L2
    deevy: ContractInfo;
    // It should exist ONLY in L2
    deevySetProperties: ContractInfo;
    // It should exist ONLY in L2
    mirrorLoot: ContractInfo;
};

export default (network: string): ContractAddresses => {
    try {
        const networkConfig = require(`./networks/${network.toLowerCase()}`);
        if (_.isNaN(networkConfig) || _.isUndefined(networkConfig) || _.isNull(networkConfig)) {
            throw new Error(`Configuration for network ${network} not found.`);
        }
        return networkConfig.default;
    } catch (error) {
        console.error(`Error loading configuration for ${network}`, error);
        throw error;
    }
};
