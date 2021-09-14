/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import {Bridge, BridgeHelper} from "arb-ts";
import {ArbRetryableTx} from "arb-ts/dist/lib/abi/ArbRetryableTx";
import {ethers} from "ethers";
import {task, types} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import getConfig from "../../src/config";
import {GetContracts} from "../../src/config/GetContracts";
/**
    Example: 
    yarn tx-l2-redeem:arb_mainnet --ticket-id 12345 --send-tx false
 */
task("tx-l2-redeem", "Redeem a given ticket id (retryable tx) .")
    .addParam("ticketId", "The ticket id.")
    .addParam("l1TxHash", "The l1 TX hash.")
    .addParam("sendTx", "Defines whether it sends or not the tx.", false, types.boolean)
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const {l1TxHash, ticketId, sendTx} = taskArgs;

        const networkConfig = getConfig(env.network.name);
        const getContracts = new GetContracts(env.ethers, networkConfig);
        const arbRetryableTx = (await getContracts.getArbRetryableTx()) as ArbRetryableTx;

        const walletPrivateKey = process.env.ACCOUNT_0_PK as string;
        const providerApiKey = process.env.PROVIDER_API_KEY as string;
        const L1RPC = `https://mainnet.infura.io/v3/${providerApiKey}`;
        const L2RPC = "https://arb1.arbitrum.io/rpc";

        const signer = new ethers.Wallet(walletPrivateKey);

        const l1Provider = new env.ethers.providers.JsonRpcProvider(L1RPC);
        const l1Signer = signer.connect(l1Provider);
        const l2Provider = new env.ethers.providers.JsonRpcProvider(L2RPC);
        const l2Signer = signer.connect(l2Provider);
        const ticketIdBigNumber = ethers.BigNumber.from(ticketId.toString());

        const bridge = await Bridge.init(l1Signer, l2Signer);
        const l2GasPrice = await bridge.l2Provider.getGasPrice();

        console.log(`Ticket ID:         ${ticketId}`);
        console.log(`L1 Tx Hash:        ${l1TxHash}`);
        console.log(`L2 Gas Price:      ${l2GasPrice.toString()}`);
        const retryableTicketHash = await BridgeHelper.calculateL2RetryableTransactionHash(
            ticketIdBigNumber,
            l2Provider
        );
        console.log(`Retry Hash:            ${retryableTicketHash}`);

        const getBeneficiaryResult = await arbRetryableTx.getBeneficiary(retryableTicketHash);
        console.log(`Ticket Beneficiary:    ${getBeneficiaryResult}`);

        const getTimeoutResult = await arbRetryableTx.getTimeout(retryableTicketHash);
        const timeoutDate = new Date(getTimeoutResult.toNumber() * 1000);
        console.log(`Ticket Timeout Timestamp:  ${getTimeoutResult.toNumber()}`);
        console.log(`Ticket Timeout (UTC):      ${timeoutDate.toUTCString()}`);
        console.log(`Ticket Timeout (local):    ${timeoutDate.toLocaleString()}`);

        if (sendTx) {
            const redeemRetryableTicketResult = await bridge.redeemRetryableTicket(l1TxHash);
            console.log(redeemRetryableTicketResult.hash);
            await redeemRetryableTicketResult.wait();
            console.log(JSON.stringify(redeemRetryableTicketResult, null, 4));
        }
    });

module.exports = {};
