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
import {GetContracts} from "../src/config/GetContracts";
import {DEEVY_BRIDGE_MINTER_NAME} from "../src/utils/consts/consts";
import {Deevy, DeevyMinter} from "../typechain";

/**
    Example: 
    yarn deploy-l2-bridge-minter:arb_testnet --sender-index 0 --l1-target 0x0000000000000000000000000000000000000000 --send-tx false
    yarn deploy-l2-bridge-minter:arb_mainnet --sender-index 0 --l1-target 0x0000000000000000000000000000000000000000 --send-tx false
 */
task("deploy-l2-bridge-minter", "Deploys the Deevy bridge minter in the L2 testnet network.")
    .addParam("senderIndex", "Defines the sender account index (0-based) for the tx.", 0, types.int)
    .addParam("l1Target", "L1 target address.", EMPTY_ADDRESS, types.string)
    .addParam("sendTx", "Defines whether it sends or not the tx.", false, types.boolean)
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {senderIndex, l1Target, sendTx} = taskArgs;

        const explorer = getNetworkExplorer(env.network.name as NETWORKS, new Map());
        const signers = new Signers(await env.ethers.getSigners());
        const sender = signers.getSigner(senderIndex);
        const networkConfig = getConfig(env.network.name);
        const getContracts = new GetContracts(env.ethers, networkConfig);
        if (
            !env.network.name.toLowerCase().includes("arb_testnet") &&
            !env.network.name.toLowerCase().includes("arb_mainnet")
        ) {
            throw new Error(`Network is not L2 ('${env.network.name}')`);
        }
        const deevy = (await getContracts.getDeevy()) as Deevy;
        const deevyMinter = (await getContracts.getDeevyMinter()) as DeevyMinter;
        const currentDeevyBridgeMinter = await deevy.bridgeMinter();

        console.log(`Using network:         ${env.network.name}`);
        console.log(`Sender account:        ${sender.address}`);
        console.log(`Deevy:                 ${deevy.address}`);
        console.log(`Deevy Minter:          ${deevyMinter.address}`);
        console.log(`Current Bridge Minter: ${currentDeevyBridgeMinter}`);
        console.log(`L1 Target:             ${l1Target}`);

        const contracts = new Array<ContractInfo>();
        const params = {
            contracts,
            ethers: env.ethers,
            network: env.network.name,
            explorer,
        };

        if (sendTx) {
            const deevyBridgeMinter = await deployContract(
                params,
                DEEVY_BRIDGE_MINTER_NAME,
                sender,
                [deevy.address, l1Target]
            );
            console.log(`Setting Deevy.setBridgeMinter(${deevyBridgeMinter.address})...`);
            const setBridgeMinterResult = await deevy.setBridgeMinter(deevyBridgeMinter.address);
            await setBridgeMinterResult.wait();

            console.log(JSON.stringify(contracts, null, 4));
        } else {
            console.log(`L2 Deevy Bridge Minter Deployment: not sending tx.`);
        }
    });

module.exports = {};
