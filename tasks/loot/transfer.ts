/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import {getNetworkExplorer, NETWORKS, Signers} from "@dogdefidev/utils";
import {task, types} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import getConfig from "../../src/config";
import {GetContracts} from "../../src/config/GetContracts";
import {Loot} from "../../typechain";

/**
    Example: 
    yarn loot-transfer:eth_rinkeby --sender-index 0 --separator , --loot-ids 1,2,3,4,5 --to 123...123 --send-tx false
 */
task("loot-transfer", "Transfer a Loot token ID.")
    .addParam("senderIndex", "Defines the sender account index (0-based) for the tx.", 0, types.int)
    .addParam("lootIds", "Loot token ids list.")
    .addParam("separator", "IDs list separator. Default: ,", ",", types.string)
    .addParam("to", "Account that will receive the tokens.")
    .addParam("sendTx", "Defines whether it sends or not the tx.", false, types.boolean)
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {senderIndex, to, lootIds: lootIdsString, separator, sendTx} = taskArgs;
        const networkConfig = getConfig(env.network.name);
        const explorer = getNetworkExplorer(env.network.name as NETWORKS, new Map());
        const signers = new Signers(await env.ethers.getSigners());
        const sender = signers.getSigner(senderIndex);
        const lootIds = lootIdsString.toString().split(separator);

        console.log(`Using network:     ${env.network.name}`);
        console.log(`Sender account:    ${sender.address}`);
        console.log(`To account:    ${sender.address}`);

        if (!env.network.name.toLowerCase().includes("eth_rinkeby")) {
            throw new Error(`Network is not L1 testnet ('${env.network.name}')`);
        }

        const getContracts = new GetContracts(env.ethers, networkConfig);
        const loot = ((await getContracts.getLoot()) as unknown) as Loot;

        console.log(`Loot:              ${loot.address}`);
        console.log(`IDs to Transfer:   ${lootIds}`);

        if (sendTx) {
            for (const lootId of lootIds) {
                const result = await loot.connect(sender).transferFrom(sender.address, to, lootId);
                const receipt = await result.wait();

                explorer.printTx(
                    `Loot.transferFrom(${sender.address},${to},${lootId}): `,
                    receipt.transactionHash
                );
            }
        } else {
            console.log(`Loot.transferFrom: not sending tx.`);
        }
    });

module.exports = {};
