/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-await-in-loop */
import leche from "leche";
import {ethers} from "hardhat";
import chai, {expect} from "chai";
import {solidity} from "ethereum-waffle";
import {
    AccountIndex,
    ExpectedInfo,
    Signers,
    toAccountIndex,
    toExpect,
    toTitle,
} from "@dogdefidev/utils";
import {deployDeevyMinter} from "../src/utils/deployer";

chai.use(solidity);
const {withData} = leche;

describe("DeevyBridgeMinterWarpBagTest", () => {
    let signers: Signers;

    beforeEach(async () => {
        signers = new Signers(await ethers.getSigners());
    });

    withData(
        {
            _1_token_id_one_set: [
                toAccountIndex(0), // Deployer Index
                toAccountIndex(1), // L1 to L2 Alias Index
                {
                    previousWarpBag: undefined,
                    warpBag: {
                        tokenId: 7000,
                        toIndex: toAccountIndex(1),
                        senderIndex: toAccountIndex(1),
                    },
                }, // User Actions
                {
                    claimedTokenId: true,
                    claimSenderDeevyBalance: 1,
                    claimToDeevyBalance: 1,
                }, // Expected
                toExpect(), // Expected result
            ],
            _2_token_id_invalid: [
                toAccountIndex(0),
                toAccountIndex(1), // L1 to L2 Alias Index
                {
                    previousWarpBag: undefined,
                    warpBag: {
                        tokenId: 8000,
                        toIndex: toAccountIndex(1),
                        senderIndex: toAccountIndex(1),
                    },
                }, // User Actions
                {
                    claimedTokenId: false,
                    claimSenderDeevyBalance: 0,
                    claimToDeevyBalance: 0,
                }, // Expected
                toExpect("!TOKEN_ID"), // Expected result
            ],
            _3_already_claimed_to_sender: [
                toAccountIndex(0),
                toAccountIndex(1), // L1 to L2 Alias Index
                {
                    previousWarpBag: {
                        tokenId: 7000,
                        toIndex: toAccountIndex(1),
                        senderIndex: toAccountIndex(1),
                    },
                    warpBag: {
                        tokenId: 7000,
                        toIndex: toAccountIndex(1),
                        senderIndex: toAccountIndex(1),
                    },
                }, // User Actions
                {
                    claimedTokenId: true,
                    claimSenderDeevyBalance: 1,
                    claimToDeevyBalance: 1,
                }, // Expected
                toExpect("ALREADY_CLAIMED"), // Expected result
            ],
            _4_msg_sender_not_allowed: [
                toAccountIndex(0),
                toAccountIndex(2), // L1 to L2 Alias Index
                {
                    previousWarpBag: undefined,
                    warpBag: {
                        tokenId: 7000,
                        toIndex: toAccountIndex(1),
                        senderIndex: toAccountIndex(1),
                    },
                }, // User Actions
                {
                    claimedTokenId: false,
                    claimSenderDeevyBalance: 0,
                    claimToDeevyBalance: 0,
                }, // Expected
                toExpect("INVALID_L1_TARGET"), // Expected result
            ],
        },
        (
            deployerIndex: AccountIndex,
            l1ToL2AliasIndex: AccountIndex,
            userActions: {
                addSets: Array<{
                    name: string;
                    foreColor: string;
                    backColor: string;
                    end: number;
                }>;
                previousWarpBag:
                    | {
                          toIndex: AccountIndex;
                          senderIndex: AccountIndex;
                          tokenId: number;
                      }
                    | undefined;
                warpBag: {
                    toIndex: AccountIndex;
                    senderIndex: AccountIndex;
                    tokenId: number;
                };
            },
            expected: {
                claimedTokenId: boolean;
                claimSenderDeevyBalance: number;
                claimToDeevyBalance: number;
            },
            expectedResult: ExpectedInfo
        ) => {
            it(toTitle("warpBag", expectedResult), async () => {
                // Setup
                const warpBagSender = signers.getSignerBy(userActions.warpBag.senderIndex);
                const warpBagTo = signers.getSignerBy(userActions.warpBag.toIndex);
                const l1ToL2Alias = signers.getSignerBy(l1ToL2AliasIndex);

                const deployer = signers.getSignerBy(deployerIndex);

                const contracts = await deployDeevyMinter(
                    {ethers, deployer},
                    {deployBridgeMinterMock: true, l1ToL2AliasAddress: l1ToL2Alias.address}
                );

                if (userActions.previousWarpBag) {
                    const previousWarpBagSender = signers.getSignerBy(
                        userActions.previousWarpBag.senderIndex
                    );
                    const previousWarpBagTo = signers.getSignerBy(
                        userActions.previousWarpBag.toIndex
                    );
                    await contracts.deevyBridgeMinter
                        .connect(previousWarpBagSender)
                        .warpBag(previousWarpBagTo.address, userActions.previousWarpBag.tokenId);
                }

                try {
                    // Invocation
                    const result = await contracts.deevyBridgeMinter
                        .connect(warpBagSender)
                        .warpBag(warpBagTo.address, userActions.warpBag.tokenId);

                    // Assertions
                    const receipt = await result.wait();
                    expectedResult.assertSuccess(receipt);
                } catch (error) {
                    expectedResult.assertError(error, true);
                }

                const claimedLootId = await contracts.deevyBridgeMinter.claimed(
                    userActions.warpBag.tokenId.toFixed(0)
                );
                expect(claimedLootId, "Claimed loot id should be equal.").to.be.eq(
                    expected.claimedTokenId
                );

                const deevyClaimSenderBalance = await contracts.deevy.balanceOf(
                    warpBagSender.address
                );
                expect(
                    deevyClaimSenderBalance.toString(),
                    "Claim sender Deevy balance should be equal."
                ).to.be.eq(expected.claimSenderDeevyBalance.toFixed(0));

                const deevyClaimToBalance = await contracts.deevy.balanceOf(warpBagTo.address);
                expect(
                    deevyClaimToBalance.toString(),
                    "Claim to Deevy balance should be equal."
                ).to.be.eq(expected.claimToDeevyBalance.toFixed(0));
            });
        }
    );
});
