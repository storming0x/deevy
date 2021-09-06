/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import { Amount, getNetworkExplorer, NETWORKS, Signers } from "@dogdefidev/utils";
import {task, types} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import getConfig from "../../src/config";
import {GetContracts} from "../../src/config/GetContracts";
import { LootPortal } from "../../typechain";

/**
    Example: 
    yarn warp-loot:eth_rinkeby --sender-index 0 --loot-id 6 --max-submission-cost 3 --max-gas 150000000 --gas-price-bid 20000000000 --send-tx false
 */
task("warp-loot", "Warp a loot.")
    .addParam("senderIndex", "Defines the sender account index (0-based) for the tx.", 0, types.int)
    .addParam("lootId", "Loot token id.")
    .addParam("maxSubmissionCost", "The maxSubmissionCost.")
    .addParam("maxGas", "The max gas.", 150000000, types.int)
    .addParam("gasPriceBid", "The gasPriceBid (Default: 20 gwei).", 20000000000, types.int)
    .addParam("sendTx", "Defines whether it sends or not the tx.", false, types.boolean)
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {
            senderIndex,
            lootId,
            maxSubmissionCost: maxSubmissionCostString,
            maxGas: maxGasString,
            gasPriceBid: gasPriceBidString,
            sendTx
        } = taskArgs;
        const networkConfig = getConfig(env.network.name);
        const explorer = getNetworkExplorer(env.network.name as NETWORKS, new Map());
        const signers = new Signers(await env.ethers.getSigners());
        const sender = signers.getSigner(senderIndex);

        console.log(`Using network:     ${env.network.name}`);
        console.log(`Sender account:  ${sender.address}`);

        const getContracts = new GetContracts(env.ethers, networkConfig);
        const lootPortal = (await getContracts.getLootPortal()) as unknown as LootPortal;

        const l2Target = await lootPortal.l2Target();
        const maxSubmissionCost = Amount.fromString(maxSubmissionCostString);
        const maxGas = Amount.fromString(maxGasString);
        const gasPriceBid = Amount.fromString(gasPriceBidString);

        console.log(`Loot Portal:       ${lootPortal.address}`);
        console.log(`L2 Target:         ${l2Target}`);
        console.log(`Loot ID:           ${lootId}`);
        console.log(`Max. Sub. Cost:    ${maxSubmissionCost.toDecimals(18).toFixed()}`);
        console.log(`Max Gas:           ${maxGas.toFixed()}`);
        console.log(`Gas Price Bid:     ${gasPriceBid.toFixed()}`);

        if (sendTx) {
            const result = await lootPortal
                .connect(sender)
                .warpLoot(
                    lootId,
                    maxSubmissionCost.toDecimals(18).toFixed(),
                    maxGas.toFixed(),
                    gasPriceBid.toFixed()
                );
            const receipt = await result.wait();

            explorer.printTx('LootPortal.warpLoot: ', receipt.transactionHash);

            const ticketId = await lootPortal
                .connect(sender)
                .lootsToTickets(lootId);
            
            console.log(`Ticket created (for loot id ${lootId}): ${ticketId}`);
        } else {
            console.log(`LootPortal.warpLoot: not sending tx.`);
        }
    });

module.exports = {};
