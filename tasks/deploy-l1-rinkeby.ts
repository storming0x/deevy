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
import {LOOT_NAME, LOOT_PORTAL_NAME} from "../src/utils/consts/consts";

/**
    Example: 
    yarn deploy-l1-rinkeby:eth_rinkeby --sender-index 0 --send-tx false
 */
task("deploy-l1-rinkeby", "Deploys the platform in the Rinkeby network.")
    .addParam("senderIndex", "Defines the sender account index (0-based) for the tx.", 0, types.int)
    .addParam("sendTx", "Defines whether it sends or not the tx.", false, types.boolean)
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {senderIndex, sendTx} = taskArgs;
        const networkConfig = getConfig(env.network.name);
        const explorer = getNetworkExplorer(env.network.name as NETWORKS, new Map());
        const signers = new Signers(await env.ethers.getSigners());
        const sender = signers.getSigner(senderIndex);

        console.log(`Using network:     ${env.network.name}`);
        console.log(`Sender account:  ${sender.address}`);

        const contracts = new Array<ContractInfo>();
        const params = {
            contracts,
            ethers: env.ethers,
            network: env.network.name,
            explorer,
        };

        if (sendTx) {
            const loot = await deployContract(params, LOOT_NAME, sender, []);

            await deployContract(params, LOOT_PORTAL_NAME, sender, [
                loot.address,
                EMPTY_ADDRESS, // address l2TargetAddress,
                networkConfig.arbitrumInbox.address, // Arbitrum Inbox address
            ]);

            console.log(JSON.stringify(contracts, null, 4));
        } else {
            console.log(`Deployment L1: not sending tx.`);
        }
    });

module.exports = {};
