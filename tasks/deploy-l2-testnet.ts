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
import {
    DEEVY2_NAME,
    DEEVY_MINTER_NAME,
    DEEVY_SET_PROPERTIES_NAME,
    MIRROR_LOOT_NAME,
} from "../src/utils/consts/consts";
import {Deevy2} from "../typechain";

/**
    Example: 
    yarn deploy-l2-testnet:arb_testnet --sender-index 0 --l1-target 0x123...123 --send-tx false
 */
task("deploy-l2-testnet", "Deploys the platform in the L2 testnet network.")
    .addParam("senderIndex", "Defines the sender account index (0-based) for the tx.", 0, types.int)
    .addParam("l1Target", "L1 target address.", EMPTY_ADDRESS, types.string)
    .addParam("sendTx", "Defines whether it sends or not the tx.", false, types.boolean)
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {senderIndex, l1Target, sendTx} = taskArgs;

        const explorer = getNetworkExplorer(env.network.name as NETWORKS, new Map());
        const signers = new Signers(await env.ethers.getSigners());
        const sender = signers.getSigner(senderIndex);

        if (!env.network.name.toLowerCase().includes("arb_testnet")) {
            throw new Error(`Network is not L2 ('${env.network.name}')`);
        }

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
            await deployContract(params, DEEVY_SET_PROPERTIES_NAME, sender, []);

            const mirrorLoot = await deployContract(params, MIRROR_LOOT_NAME, sender, []);

            const deevy2 = ((await deployContract(params, DEEVY2_NAME, sender, [
                EMPTY_ADDRESS,
                mirrorLoot.address,
            ])) as unknown) as Deevy2;

            const deevyMinter = await deployContract(params, DEEVY_MINTER_NAME, sender, [
                deevy2.address,
                l1Target,
            ]);
            console.log(`Deevy2 ${deevy2.address}`);
            await deevy2.setMinter(deevyMinter.address);

            console.log(JSON.stringify(contracts, null, 4));
        } else {
            console.log(`Deployment L1: not sending tx.`);
        }
    });

module.exports = {};
