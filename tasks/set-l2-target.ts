/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import { getNetworkExplorer, NETWORKS, Signers } from "@dogdefidev/utils";
import {task, types} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import getConfig from "../src/config";
import { GetContracts } from "../src/config/GetContracts";
import { LootPortal } from "../typechain";

/**
    Example: 
    yarn set-l2-target:eth_rinkeby --l2-target 0x123...123 --send-tx false
    yarn set-l2-target:eth_mainnet --l2-target 0x123...123 --send-tx false
 */
task("set-l2-target", "Set the L2 target address.")
    .addParam("senderIndex", "Defines the sender account index (0-based) for the tx.", 0, types.int)
    .addParam("l2Target", "L2 target contract address.")
    .addParam("sendTx", "Defines whether it sends or not the tx.", false, types.boolean)
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {senderIndex, l2Target, sendTx} = taskArgs;
        const networkConfig = getConfig(env.network.name);

        const explorer = getNetworkExplorer(env.network.name as NETWORKS, new Map());
        const signers = new Signers(await env.ethers.getSigners());
        const sender = signers.getSigner(senderIndex);
        const getContracts = new GetContracts(env.ethers, networkConfig);

        if (!env.network.name.toLowerCase().includes('eth')) {
            throw new Error(`Network is not L1 ('${env.network.name}')`);
        }

        const portalLoot = await getContracts.getLootPortal() as LootPortal;

        const currentL2Target = await portalLoot.l2Target();

        console.log(`Using network:     ${env.network.name}`);
        console.log(`Sender account:    ${sender.address}`);
        console.log(`Portal Loot (L1):  ${portalLoot.address}`);
        console.log(`Current L2 Target: ${currentL2Target}`);
        console.log(`New L2 Target:     ${l2Target}`);

        if (sendTx) {
            const setL2TargetResult = await portalLoot.setL2Target(l2Target);
            const receipt = await setL2TargetResult.wait();
            explorer.printTx('PortalLoot.setL2Target tx hash:', receipt.transactionHash);
        } else {
            console.log(`PortalLoot.setL2Target: not sending tx.`);
        }
    });

module.exports = {};
