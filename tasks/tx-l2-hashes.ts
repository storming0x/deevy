/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import {task} from "hardhat/config";
import {Bridge} from "arb-ts";
import {ethers} from "ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";

/**
    Example: 
    yarn tx-l2-hashes --ticket-id 1234
 */
task("tx-l2-hashes", "Print L2 TX info.")
    .addParam("ticketId", "Ticket id.")
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {ticketId} = taskArgs;
        console.log(`Ticket ID:         ${ticketId}`);

        const walletPrivateKey = process.env.ACCOUNT_0_PK as string;
        const providerApiKey = process.env.PROVIDER_API_KEY as string;
        const L1RPC = `https://rinkeby.infura.io/v3/${providerApiKey}`;
        const L2RPC = "https://rinkeby.arbitrum.io/rpc";

        const signer = new ethers.Wallet(walletPrivateKey);

        const l1Provider = new env.ethers.providers.JsonRpcProvider(L1RPC);
        const l1Signer = signer.connect(l1Provider);
        const l2Provider = new env.ethers.providers.JsonRpcProvider(L2RPC);
        const l2Signer = signer.connect(l2Provider);
        const ticketIdBigNumber = ethers.BigNumber.from(ticketId.toString());

        const bridge = await Bridge.init(l1Signer, l2Signer);

        const autoRedeemHash = await bridge.calculateRetryableAutoRedeemTxnHash(ticketIdBigNumber);
        const autoRedeemRec = await l2Provider.getTransactionReceipt(autoRedeemHash);
        console.log(`AutoRedeem https://rinkeby-explorer.arbitrum.io/tx/${autoRedeemHash}`);
        console.log(autoRedeemRec);

        const redeemTxnHash = await bridge.calculateL2RetryableTransactionHash(ticketIdBigNumber);
        const redeemTxnRec = await l2Provider.getTransactionReceipt(redeemTxnHash);
        console.log(`RedeemTxn https://rinkeby-explorer.arbitrum.io/tx/${redeemTxnHash}`);
        console.log(redeemTxnRec);

        const retryableTicketHash = await bridge.calculateL2TransactionHash(ticketIdBigNumber);
        const retryableTicketRec = await l2Provider.getTransactionReceipt(retryableTicketHash);
        console.log(
            `RetryableTicket https://rinkeby-explorer.arbitrum.io/tx/${retryableTicketHash}`
        );
        console.log(retryableTicketRec);
    });

module.exports = {};
