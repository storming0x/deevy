/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import getConfig from "../../src/config";
import {GetContracts} from "../../src/config/GetContracts";
import {toJSON} from "../../src/utils/commons";
import {Deevy} from "../../typechain";

/**
    Example: 
    yarn deevy-print-token-info:arb_testnet --token-id 1
    yarn deevy-print-token-info:arb_mainnet --token-id 1
 */
task("deevy-print-token-info", "Print info about a Deevy token id.")
    .addParam("tokenId", "The token id.")
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {tokenId} = taskArgs;
        const networkConfig = getConfig(env.network.name);
        const getContracts = new GetContracts(env.ethers, networkConfig);

        const deevy = (await getContracts.getDeevy()) as Deevy;

        if (!env.network.name.toLowerCase().includes("arb_testnet")) {
            throw new Error(`Network is not L2 ('${env.network.name}')`);
        }

        console.log(`Using network:     ${env.network.name}`);
        console.log(`Deevy address:     ${deevy.address}`);
        console.log(`Token ID:          ${tokenId}`);

        const tokenURI = await deevy.tokenURI(tokenId);

        const json = toJSON(tokenURI);
        console.log(JSON.stringify(json, null, 4));
    });

module.exports = {};
