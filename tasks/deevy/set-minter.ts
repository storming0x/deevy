/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import {getNetworkExplorer, NETWORKS, Signers} from "@dogdefidev/utils";
import {task, types} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import getConfig from "../../src/config";
import {GetContracts} from "../../src/config/GetContracts";
import {Deevy2} from "../../typechain";

/**
    Example: 
    yarn set-minter:arb_testnet --sender-index 0 --minter 0x123...123 --send-tx false
    yarn set-minter:arb_mainnet --sender-index 0 --minter 0x123...123 --send-tx false
 */
task("set-minter", "Set the minter address.")
    .addParam("senderIndex", "Defines the sender account index (0-based) for the tx.", 0, types.int)
    .addParam("minter", "The new minter address.")
    .addParam("sendTx", "Defines whether it sends or not the tx.", false, types.boolean)
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {senderIndex, minter, sendTx} = taskArgs;
        const networkConfig = getConfig(env.network.name);
        const getContracts = new GetContracts(env.ethers, networkConfig);
        const explorer = getNetworkExplorer(env.network.name as NETWORKS, new Map());

        const deevy = (await getContracts.getDeevy()) as Deevy2;
        const signers = new Signers(await env.ethers.getSigners());
        const sender = signers.getSigner(senderIndex);

        if (!env.network.name.toLowerCase().includes("arb_testnet")) {
            throw new Error(`Network is not L2 ('${env.network.name}')`);
        }

        console.log(`Using network:     ${env.network.name}`);
        console.log(`Sender account:    ${sender.address}`);
        console.log(`Deevy address:     ${deevy.address}`);

        if (sendTx) {
            const setMinterResult = await deevy.setMinter(minter);
            const receipt = await setMinterResult.wait();

            explorer.printTx("Deevy.setMinter: ", receipt.transactionHash);
        } else {
            console.log(`Deployment L1: not sending tx.`);
        }
    });

module.exports = {};
