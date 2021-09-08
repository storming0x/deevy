/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import {getNetworkExplorer, NETWORKS, Signers} from "@dogdefidev/utils";
import {task, types} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import getConfig from "../src/config";
import {GetContracts} from "../src/config/GetContracts";
import {DeevyMinter} from "../typechain";

/**
    Example: 
    yarn set-l1-target:arb_testnet --l1-target 0x123...123 --send-tx false
 */
task("set-l1-target", "Set the L1 target address.")
    .addParam("senderIndex", "Defines the sender account index (0-based) for the tx.", 0, types.int)
    .addParam("l1Target", "L1 target contract address.")
    .addParam("sendTx", "Defines whether it sends or not the tx.", false, types.boolean)
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {senderIndex, l1Target, sendTx} = taskArgs;
        const networkConfig = getConfig(env.network.name);

        const explorer = getNetworkExplorer(env.network.name as NETWORKS, new Map());
        const signers = new Signers(await env.ethers.getSigners());
        const sender = signers.getSigner(senderIndex);
        const getContracts = new GetContracts(env.ethers, networkConfig);

        if (!env.network.name.toLowerCase().includes("arb")) {
            throw new Error(`Network is not L2 ('${env.network.name}')`);
        }

        const deevyMinter = (await getContracts.getDeevyMinter()) as DeevyMinter;

        const currentL1Target = await deevyMinter.l1Target();

        console.log(`Using network:     ${env.network.name}`);
        console.log(`Sender account:    ${sender.address}`);
        console.log(`Deevy Minter (L2): ${deevyMinter.address}`);
        console.log(`Current L1 Target: ${currentL1Target}`);
        console.log(`New L1 Target:     ${l1Target}`);

        if (sendTx) {
            const setL1TargetResult = await deevyMinter.setL1Target(l1Target);
            const receipt = await setL1TargetResult.wait();
            explorer.printTx("SetL1Target tx hash:", receipt.transactionHash);
        } else {
            console.log(`DeevyMinter.setL1Target: not sending tx.`);
        }
    });

module.exports = {};
