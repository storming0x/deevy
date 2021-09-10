/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import getConfig from "../../src/config";
import {GetContracts} from "../../src/config/GetContracts";
import {wait} from "../../src/utils/arbitrum/arb-shared-dependencies";
import {Deevy} from "../../typechain";

/**
    Example: 
    yarn deevy-print-info:arb_testnet --delay 4000
    yarn deevy-print-info:arb_mainnet --delay 4000
 */
task("deevy-print-info", "Print info about a Deevy tokens.")
    .addParam("delay", "The delay between each query.")
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {delay} = taskArgs;
        const networkConfig = getConfig(env.network.name);
        const getContracts = new GetContracts(env.ethers, networkConfig);

        const deevy = (await getContracts.getDeevy()) as Deevy;

        if (!env.network.name.toLowerCase().includes("arb_mainnet")) {
            throw new Error(`Network is not L2 ('${env.network.name}')`);
        }

        while (true) {
            const totalSupply = await deevy.totalSupply();
            console.log(totalSupply.toNumber());
            await wait(delay);
        }
    });

module.exports = {};
