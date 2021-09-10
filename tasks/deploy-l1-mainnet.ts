/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import {
    ContractInfo,
    deployContract,
    EMPTY_ADDRESS,
    getNetworkExplorer,
    NETWORKS,
    Signers,
} from "@dogdefidev/utils";
import {task, types} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import getConfig from "../src/config";
import {LOOT_PORTAL_NAME} from "../src/utils/consts/consts";

/**
    Example: 
    yarn deploy-l1-mainnet:eth_mainnet --sender-index 0 --l2-target 0x0000000000000000000000000000000000000000 --send-tx false
 */
task("deploy-l1-mainnet", "Deploys the platform in the ETH mainnet network.")
    .addParam("senderIndex", "Defines the sender account index (0-based) for the tx.", 0, types.int)
    .addParam("l2Target", "Defines the L2 target address.", EMPTY_ADDRESS, types.string)
    .addParam("sendTx", "Defines whether it sends or not the tx.", false, types.boolean)
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {senderIndex, l2Target, sendTx} = taskArgs;
        const networkConfig = getConfig(env.network.name);
        const explorer = getNetworkExplorer(env.network.name as NETWORKS, new Map());
        const signers = new Signers(await env.ethers.getSigners());
        const sender = signers.getSigner(senderIndex);
        const lootAddress = networkConfig.loot.address;

        console.log(`Using network:     ${env.network.name}`);
        console.log(`Sender account:    ${sender.address}`);
        console.log(`L2 Target:         ${l2Target}`);
        console.log(`Inbox (Arbitrum):  ${networkConfig.arbitrumInbox.address}`);
        console.log(`Loot:              ${lootAddress}`);

        const balance = await sender.getBalance();
        const gasPrice = await sender.getGasPrice();

        console.log(`Balance:   ${balance.toString()}`);
        console.log(`Gas Price: ${gasPrice.toString()}`);

        const contracts = new Array<ContractInfo>();
        const params = {
            contracts,
            ethers: env.ethers,
            network: env.network.name,
            explorer,
        };

        if (sendTx) {
            await deployContract(params, LOOT_PORTAL_NAME, sender, [
                lootAddress,
                l2Target, // address l2TargetAddress,
                networkConfig.arbitrumInbox.address, // Arbitrum Inbox address
            ]);

            console.log(JSON.stringify(contracts, null, 4));
        } else {
            console.log(`Deployment L1: not sending tx.`);
        }
    });

module.exports = {};
