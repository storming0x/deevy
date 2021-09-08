/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import { task, types } from "hardhat/config";
import { Bridge } from 'arb-ts';
import { ethers } from 'ethers';
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { hexDataLength } from "ethers/lib/utils";
import { arbLog } from '../src/utils/arbitrum/arb-shared-dependencies';

/**
    Example: 
    yarn set-l2-target:eth_rinkeby --l2-target 0x123...123 --send-tx false
    yarn set-l2-target:eth_mainnet --l2-target 0x123...123 --send-tx false
 */
task("tx-l2-info", "Print info about the L2 tx.")
    .addParam("lootId", "Loot id.", 0, types.int)
    .setAction(async (taskArgs, env: HardhatRuntimeEnvironment) => {
        const { lootId } = taskArgs;

        if (
            process.env.ACCOUNT_0_PK === undefined ||
            process.env.PROVIDER_API_KEY === undefined
        ) {
            throw new Error('Account PK or Provider Api Key not found.');
        }
        const walletPrivateKey = process.env.ACCOUNT_0_PK as string;
        const providerApiKey = process.env.PROVIDER_API_KEY as string;

        const L1RPC = `https://rinkeby.infura.io/v3/${providerApiKey}`;
        const L2RPC = 'https://rinkeby.arbitrum.io/rpc';

        const signer = new ethers.Wallet(walletPrivateKey)

        const l1Provider = new env.ethers.providers.JsonRpcProvider(L1RPC);
        const l1Signer = signer.connect(l1Provider);
        const l2Provider = new env.ethers.providers.JsonRpcProvider(L2RPC);
        const l2Signer = signer.connect(l2Provider);

        const bridge = await Bridge.init(l1Signer, l2Signer);

        await arbLog('Cross-chain LootPortal');

        /**
         * Base submission cost is a special cost for creating a retryable ticket; querying the cost requires us to know how many bytes of calldata out retryable ticket will require, so let's figure that out.
         * We'll get the bytes for our greeting data, then add 4 for the 4-byte function signature.
         */
        const encodedData = ethers.utils.defaultAbiCoder.encode(
            ['address', 'uint256'],
            [l1Signer.address, lootId]
        );
        const encodedDataLength = hexDataLength(encodedData) + 4 // 4 bytes func identifier

        /**
         * Now we can query the submission price using a helper method; the first value returned tells us the best cost of our transaction; that's what we'll be using.
         * The second value (nextUpdateTimestamp) tells us when the base cost will next update (base cost changes over time with chain congestion; the value updates every 24 hours). We won't actually use it here, but generally it's useful info to have.
         */
        const [
            submissionPriceWei,
            nextUpdateTimestamp
        ] = await bridge.l2Bridge.getTxnSubmissionPrice(encodedDataLength);
        console.log(`Retryable base submission price: ${submissionPriceWei.toString()}`);

        const timeNow = Math.floor(new Date().getTime() / 1000)
        console.log(`Time till price update: ${nextUpdateTimestamp.toNumber() - timeNow} secs.`);

        /**
         * ...Okay, but on the off chance we end up underpaying, our retryable ticket simply fails.
         * This is highly unlikely, but just to be safe, let's increase the amount we'll be paying (the difference between the actual cost and the amount we pay gets refunded to our address on L2 anyway)
         * (Note that in future releases, the a max cost increase per 24 hour window of 150% will be enforced, so this will be less of a concern.)
         */
        const submissionPriceWeiMul5 = submissionPriceWei.mul(5)
        /**
         * Now we'll figure out the gas we need to send for L2 execution; this requires the L2 gas price and gas limit for our L2 transaction
         * 
         * For the L2 gas price, we simply query it from the L2 provider, as we would when using L1
         */

        const gasPriceBid = await bridge.l2Provider.getGasPrice();
        console.log(`L2 gas price: ${gasPriceBid.toString()}`);
        /**
         * For the gas limit, we'll simply use a hard-coded value (for more precise / dynamic estimates, see the estimateRetryableTicket method in the NodeInterface L2 "precompile")
         */
        const maxGas = 150000000;
        /**
         * With these three values, we can calculate the total callvalue we'll need our L1 transaction to send to L2
         */
        const callValue = submissionPriceWei.add(gasPriceBid.mul(maxGas))

        console.log(`Sending to L2 with ${callValue.toString()} callValue for L2 fees:`);
        console.log(`yarn warp-loot:eth_rinkeby --sender-index 0 --max-submission-cost ${submissionPriceWeiMul5} --max-gas ${maxGas} --gas-price-bid ${gasPriceBid} --msg-value ${callValue} --loot-id ${lootId} --send-tx false`);
    });

module.exports = {};
