/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import {getNetworkExplorer, NETWORKS, Signers} from "@dogdefidev/utils";
import {task, types} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import getConfig from "../../src/config";
import {GetContracts} from "../../src/config/GetContracts";
import {Deevy} from "../../typechain";

/**
    Example: 
    yarn owner-claim:arb_testnet --sender-index 0 --deevy-id 1 --send-tx false
    yarn owner-claim:arb_mainnet --sender-index 0 --deevy-id 1 --send-tx false
 */
task("owner-claim", "Set the minter address.")
    .addParam("senderIndex", "Defines the sender account index (0-based) for the tx.", 0, types.int)
    .addParam("deevyId", "The Deevy ID to mint.")
    .addParam("sendTx", "Defines whether it sends or not the tx.", false, types.boolean)
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {senderIndex, deevyId, sendTx} = taskArgs;
        const networkConfig = getConfig(env.network.name);
        const getContracts = new GetContracts(env.ethers, networkConfig);
        const explorer = getNetworkExplorer(env.network.name as NETWORKS, new Map());

        const deevy = (await getContracts.getDeevy()) as Deevy;
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
        console.log(`Deevy address:     ${deevy.address}`);
        console.log(`Deevy ID to mint:  ${deevyId}`);

        if (sendTx) {
            const ownerClaimResult = await deevy.ownerClaim(deevyId);
            const receipt = await ownerClaimResult.wait();

            explorer.printTx(`Deevy.ownerClaim(${deevyId}): `, receipt.transactionHash);
        } else {
            console.log(`Deevy.ownerClaim(${deevyId}): not sending tx.`);
        }
    });

module.exports = {};
