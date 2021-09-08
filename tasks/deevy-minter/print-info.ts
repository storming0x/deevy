/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import {Signers} from "@dogdefidev/utils";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import getConfig from "../../src/config";
import {GetContracts} from "../../src/config/GetContracts";
import {DeevyMinter} from "../../typechain";

/**
    Example: 
    yarn print-info:arb_testnet
 */
task("print-info", "Print Deevy minter info.").setAction(
    async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const networkConfig = getConfig(env.network.name);
        const signers = new Signers(await env.ethers.getSigners());
        const sender = signers.getSigner(0);
        const gasPrice = await sender.getGasPrice();

        console.log(`Using network:     ${env.network.name}`);

        const getContracts = new GetContracts(env.ethers, networkConfig);
        const deevyMinter = ((await getContracts.getDeevyMinter()) as unknown) as DeevyMinter;

        const l1Target = await deevyMinter.l1Target();
        const arbSys = await deevyMinter.ARBSYS();
        const deevy = await deevyMinter.deevy();

        console.log(`Deevy Minter:      ${deevyMinter.address}`);
        console.log(`L1 Target:         ${l1Target}`);
        console.log(`Arbitrum Sys:      ${arbSys}`);
        console.log(`Deevy (L2):        ${deevy}`);
        console.log(`Gas Price (L2):    ${gasPrice.toString()}`);
    }
);

module.exports = {};
