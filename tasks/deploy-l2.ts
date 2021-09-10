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
    DEEVY_NAME,
    DEEVY_MINTER_NAME,
    DEEVY_SET_NAME,
    MIRROR_LOOT_NAME,
    DEEVY_BRIDGE_MINTER_NAME,
} from "../src/utils/consts/consts";
import {Deevy} from "../typechain";

/**
    Example: 
    yarn deploy-l2:arb_testnet --sender-index 0 --set-name "Eldritch Legends" --set-fore-color black --set-back-color "#8EB12A" --set-end 10000 --l1-target 0x0000000000000000000000000000000000000000 --send-tx false
    yarn deploy-l2:arb_mainnet --sender-index 0 --set-name "Eldritch Legends" --set-fore-color black --set-back-color "#8EB12A" --set-end 10000 --l1-target 0x0000000000000000000000000000000000000000 --send-tx false
 */
task("deploy-l2", "Deploys the platform in the L2 testnet network.")
    .addParam("senderIndex", "Defines the sender account index (0-based) for the tx.", 0, types.int)
    .addParam("setName", "Initial Set Name.")
    .addParam("setForeColor", "Fore color for set.", "white", types.string)
    .addParam("setBackColor", "Back color for set.", "black", types.string)
    .addParam("setEnd", "End token id for set.", 10000, types.int)
    .addParam("l1Target", "L1 target address.", EMPTY_ADDRESS, types.string)
    .addParam("sendTx", "Defines whether it sends or not the tx.", false, types.boolean)
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {
            senderIndex,
            setName,
            setForeColor,
            setBackColor,
            setEnd,
            l1Target,
            sendTx,
        } = taskArgs;

        const explorer = getNetworkExplorer(env.network.name as NETWORKS, new Map());
        const signers = new Signers(await env.ethers.getSigners());
        const sender = signers.getSigner(senderIndex);

        if (
            !env.network.name.toLowerCase().includes("arb_testnet") &&
            !env.network.name.toLowerCase().includes("arb_mainnet")
        ) {
            throw new Error(`Network is not L2 ('${env.network.name}')`);
        }

        console.log(`Using network:     ${env.network.name}`);
        console.log(`Sender account:    ${sender.address}`);
        console.log(`Initial Set Name:  ${setName}`);
        console.log(`L1 Target:         ${l1Target}`);
        console.log(`Fore Color:        ${setForeColor}`);
        console.log(`Back Color:        ${setBackColor}`);
        console.log(`Set End:           ${setEnd}`);

        const contracts = new Array<ContractInfo>();
        const params = {
            contracts,
            ethers: env.ethers,
            network: env.network.name,
            explorer,
        };

        if (sendTx) {
            const deevySet = await deployContract(params, DEEVY_SET_NAME, sender, [
                setName,
                setForeColor,
                setBackColor,
            ]);

            const mirrorLoot = await deployContract(params, MIRROR_LOOT_NAME, sender, []);

            const deevy = ((await deployContract(params, DEEVY_NAME, sender, [
                EMPTY_ADDRESS, // Deevy Minter
                EMPTY_ADDRESS, // Bridge Minter
                mirrorLoot.address,
            ])) as unknown) as Deevy;

            console.log(`Adding set ${setName} / ${setBackColor} / ${setForeColor} / ${setEnd}`);
            const addSetResult = await deevy.addSet(deevySet.address, setEnd);
            await addSetResult.wait();

            const deevyBridgeMinter = await deployContract(
                params,
                DEEVY_BRIDGE_MINTER_NAME,
                sender,
                [deevy.address, l1Target]
            );

            const deevyMinter = await deployContract(params, DEEVY_MINTER_NAME, sender, [
                deevy.address,
            ]);

            const setMinterResult = await deevy.setMinter(deevyMinter.address);
            await setMinterResult.wait();
            const setBridgeMinterResult = await deevy.setBridgeMinter(deevyBridgeMinter.address);
            await setBridgeMinterResult.wait();

            console.log(JSON.stringify(contracts, null, 4));
        } else {
            console.log(`L2 Deployment: not sending tx.`);
        }
    });

module.exports = {};
