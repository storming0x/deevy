/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import {getNetworkExplorer, NETWORKS, Signers} from "@dogdefidev/utils";
import {task, types} from "hardhat/config";
import {Bridge} from "arb-ts";
import {ethers} from "ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import getConfig from "../../src/config";
import {GetContracts} from "../../src/config/GetContracts";
import {LootPortal} from "../../typechain";

/**
    Example: 
    yarn warp-loot:eth_rinkeby --sender-index 0 --max-submission-cost 3 --max-gas 150000000 --gas-price-bid 20000000000 --msg-value 0.1 --loot-id 1 --send-tx false
 */
task("warp-loot", "Warp a loot.")
    .addParam("senderIndex", "Defines the sender account index (0-based) for the tx.", 0, types.int)
    .addParam("lootId", "Loot token id.")
    .addParam("msgValue", "ETH value to be used to process the TX in L2.", 0.1, types.float)
    .addParam("maxSubmissionCost", "The maxSubmissionCost.")
    .addParam("maxGas", "The max gas.", 150000000, types.int)
    .addParam("gasPriceBid", "The gasPriceBid (Default: 20 gwei).", 20000000000, types.int)
    .addParam("sendTx", "Defines whether it sends or not the tx.", false, types.boolean)
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {
            senderIndex,
            lootId,
            msgValue,
            maxSubmissionCost,
            maxGas,
            gasPriceBid,
            sendTx,
        } = taskArgs;
        const networkConfig = getConfig(env.network.name);
        const explorer = getNetworkExplorer(env.network.name as NETWORKS, new Map());
        const signers = new Signers(await env.ethers.getSigners());
        const sender = signers.getSigner(senderIndex);

        console.log(`Using network:     ${env.network.name}`);
        console.log(`Sender account:    ${sender.address}`);

        const getContracts = new GetContracts(env.ethers, networkConfig);
        const lootPortal = ((await getContracts.getLootPortal()) as unknown) as LootPortal;

        const l2Target = await lootPortal.l2Target();
        console.log(`Loot Portal:       ${lootPortal.address}`);
        console.log(`L2 Target:         ${l2Target}`);
        console.log(`Loot ID:           ${lootId}`);
        console.log(`Max. Sub. Cost:    ${maxSubmissionCost.toString()}`);
        console.log(`Max Gas:           ${maxGas.toString()}`);
        console.log(`Gas Price Bid:     ${gasPriceBid.toString()}`);
        console.log(`Msg Value:         ${msgValue.toString()}`);

        if (sendTx) {
            const result = await lootPortal
                .connect(sender)
                .warpLoot(
                    lootId,
                    maxSubmissionCost.toString(),
                    maxGas.toString(),
                    gasPriceBid.toString(),
                    {
                        value: msgValue,
                    }
                );
            const receipt = await result.wait();

            explorer.printTx("LootPortal.warpLoot: ", receipt.transactionHash);

            const ticketId = await lootPortal.connect(sender).lootsToTickets(lootId);

            console.log(`Ticket created (for loot id ${lootId}): ${ticketId}`);

            const walletPrivateKey = process.env.ACCOUNT_0_PK as string;
            const providerApiKey = process.env.PROVIDER_API_KEY as string;
            const L1RPC = `https://rinkeby.infura.io/v3/${providerApiKey}`;
            const L2RPC = "https://rinkeby.arbitrum.io/rpc";

            const signer = new ethers.Wallet(walletPrivateKey);

            const l1Provider = new env.ethers.providers.JsonRpcProvider(L1RPC);
            const l1Signer = signer.connect(l1Provider);
            const l2Provider = new env.ethers.providers.JsonRpcProvider(L2RPC);
            const l2Signer = signer.connect(l2Provider);

            const bridge = await Bridge.init(l1Signer, l2Signer);

            /**
             * The L1 side is confirmed; now we listen and wait for the for the Sequencer to include the L2 side; we can do this by computing the expected txn hash of the L2 transaction.
             * To compute this txn hash, we need our message's "sequence number", a unique identifier. We'll fetch from the event logs with a helper method
             */
            const inboxSeqNums = await bridge.getInboxSeqNumFromContractTransaction(receipt);
            if (inboxSeqNums === undefined) {
                throw new Error("Inbox sequence number is undefined.");
            }
            /**
             * In principle, a single txn can trigger many messages (each with its own sequencer number); in this case, we know our txn triggered only one. Let's get it, and use it to calculate our expected transaction hash.
             */
            const ourMessagesSequenceNum = inboxSeqNums[0];
            console.log(`Sequence Message Number: ${ourMessagesSequenceNum.toString()}`);

            const retryableTxnHash = await bridge.calculateL2RetryableTransactionHash(
                ourMessagesSequenceNum
            );
            console.log(`Retryable Tx Hash: ${retryableTxnHash.toString()}`);

            console.log(`To review TX hash statuses, execute (in a new CLI):`);
            console.log(`\tyarn tx-l2-hashes --ticket-id ${ourMessagesSequenceNum.toNumber()}`);
            /**
             * Now we wait for the Sequencer to include it in its off chain inbox.
             */
            console.log(
                `Waiting for L2 tx 🕐... (should take < 10 minutes, current time: ${new Date().toTimeString()}`
            );

            const retryRec = await l2Provider.waitForTransaction(retryableTxnHash);

            console.log(`L2 retryable txn executed 🥳 ${retryRec.transactionHash}`);
        } else {
            console.log(`LootPortal.warpLoot: not sending tx.`);
        }
    });

module.exports = {};
