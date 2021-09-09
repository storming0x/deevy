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
import {deployDeevyMinter, deployDeevySet} from "../src/utils/deployer";

chai.use(solidity);
const {withData} = leche;

describe("DeevyMinterClaimTest", () => {
    let signers: Signers;

    beforeEach(async () => {
        signers = new Signers(await ethers.getSigners());
    });

    withData(
        {
            _1_token_id_one_set: [
                toAccountIndex(0),
                {
                    addSets: [
                        {
                            foreColor: "black",
                            backColor: "#8EB12A",
                            name: "Ultimate Fight",
                            end: 10000,
                        },
                    ],
                    previousClaim: undefined,
                    claim: {
                        tokenId: 9000,
                        toIndex: toAccountIndex(1),
                        senderIndex: toAccountIndex(1),
                    },
                }, // User Actions
                {
                    claimedSender: true,
                    claimSenderDeevyBalance: 1,
                    claimToDeevyBalance: 1,
                }, // Expected
                toExpect(), // Expected result
            ],
            _2_token_id_invalid: [
                toAccountIndex(0),
                {
                    addSets: [
                        {
                            foreColor: "black",
                            backColor: "#8EB12A",
                            name: "Ultimate Fight",
                            end: 10000,
                        },
                    ],
                    previousClaim: undefined,
                    claim: {
                        tokenId: 8999,
                        toIndex: toAccountIndex(1),
                        senderIndex: toAccountIndex(1),
                    },
                }, // User Actions
                {
                    claimedSender: false,
                    claimSenderDeevyBalance: 0,
                    claimToDeevyBalance: 0,
                }, // Expected
                toExpect("!TOKEN_ID"), // Expected result
            ],
            _3_already_claimed_to_sender: [
                toAccountIndex(0),
                {
                    addSets: [
                        {
                            foreColor: "black",
                            backColor: "#8EB12A",
                            name: "Ultimate Fight",
                            end: 10000,
                        },
                    ],
                    previousClaim: {
                        tokenId: 9000,
                        toIndex: toAccountIndex(1),
                        senderIndex: toAccountIndex(1),
                    },
                    claim: {
                        tokenId: 9000,
                        toIndex: toAccountIndex(1),
                        senderIndex: toAccountIndex(1),
                    },
                }, // User Actions
                {
                    claimedSender: true,
                    claimSenderDeevyBalance: 1,
                    claimToDeevyBalance: 1,
                }, // Expected
                toExpect("ALREADY_CLAIMED"), // Expected result
            ],
            _4_already_claimed_to_another_account: [
                toAccountIndex(0),
                {
                    addSets: [
                        {
                            foreColor: "black",
                            backColor: "#8EB12A",
                            name: "Ultimate Fight",
                            end: 10000,
                        },
                    ],
                    previousClaim: {
                        tokenId: 9000,
                        toIndex: toAccountIndex(3),
                        senderIndex: toAccountIndex(1),
                    },
                    claim: {
                        tokenId: 9000,
                        toIndex: toAccountIndex(2),
                        senderIndex: toAccountIndex(1),
                    },
                }, // User Actions
                {
                    claimedSender: true,
                    claimSenderDeevyBalance: 0,
                    claimToDeevyBalance: 0,
                }, // Expected
                toExpect("ALREADY_CLAIMED"), // Expected result
            ],
            _5_without_sets: [
                toAccountIndex(0),
                {
                    addSets: [],
                    previousClaim: undefined,
                    claim: {
                        tokenId: 9000,
                        toIndex: toAccountIndex(1),
                        senderIndex: toAccountIndex(1),
                    },
                }, // User Actions
                {
                    claimedSender: false,
                    claimSenderDeevyBalance: 0,
                    claimToDeevyBalance: 0,
                }, // Expected
                toExpect("SETS_REQUIRED"), // Expected result
            ],
            _6_token_id_gt_max_set: [
                toAccountIndex(0),
                {
                    addSets: [
                        {
                            foreColor: "black",
                            backColor: "#8EB12A",
                            name: "Ultimate Fight",
                            end: 9000,
                        },
                    ],
                    previousClaim: undefined,
                    claim: {
                        tokenId: 9001,
                        toIndex: toAccountIndex(1),
                        senderIndex: toAccountIndex(1),
                    },
                }, // User Actions
                {
                    claimedSender: false,
                    claimSenderDeevyBalance: 0,
                    claimToDeevyBalance: 0,
                }, // Expected
                toExpect("TOKEN_ID_OUT_OF_RANGE"), // Expected result
            ],
        },
        (
            deployerIndex: AccountIndex,
            userActions: {
                addSets: Array<{
                    name: string;
                    foreColor: string;
                    backColor: string;
                    end: number;
                }>;
                previousClaim:
                    | {
                          toIndex: AccountIndex;
                          senderIndex: AccountIndex;
                          tokenId: number;
                      }
                    | undefined;
                claim: {
                    toIndex: AccountIndex;
                    senderIndex: AccountIndex;
                    tokenId: number;
                };
            },
            expected: {
                claimedSender: boolean;
                claimSenderDeevyBalance: number;
                claimToDeevyBalance: number;
            },
            expectedResult: ExpectedInfo
        ) => {
            it(toTitle("claim", expectedResult), async () => {
                // Setup
                const deployer = signers.getSignerBy(deployerIndex);
                const contracts = await deployDeevyMinter({ethers, deployer}, {});

                for (const addSet of userActions.addSets) {
                    const deevySet = await deployDeevySet({
                        ethers,
                        deployer,
                        name: addSet.name,
                        foreColor: addSet.foreColor,
                        backColor: addSet.backColor,
                    });
                    await contracts.deevy.connect(deployer).addSet(deevySet.address, addSet.end);
                }
                if (userActions.previousClaim) {
                    const previousClaimSender = signers.getSignerBy(
                        userActions.previousClaim.senderIndex
                    );
                    const previousClaimTo = signers.getSignerBy(userActions.previousClaim.toIndex);
                    await contracts.deevyMinter
                        .connect(previousClaimSender)
                        .claim(previousClaimTo.address, userActions.previousClaim.tokenId);
                }

                const claimSender = signers.getSignerBy(userActions.claim.senderIndex);
                const claimTo = signers.getSignerBy(userActions.claim.toIndex);

                try {
                    // Invocation
                    const result = await contracts.deevyMinter
                        .connect(claimSender)
                        .claim(claimTo.address, userActions.claim.tokenId);

                    // Assertions
                    const receipt = await result.wait();
                    expectedResult.assertSuccess(receipt);
                } catch (error) {
                    expectedResult.assertError(error, true);
                }

                const claimedSender = await contracts.deevyMinter.claimed(claimSender.address);
                expect(claimedSender, "Claimed sender should be equal.").to.be.eq(
                    expected.claimedSender
                );

                const deevyClaimSenderBalance = await contracts.deevy.balanceOf(
                    claimSender.address
                );
                expect(
                    deevyClaimSenderBalance.toString(),
                    "Claim sender Deevy balance should be equal."
                ).to.be.eq(expected.claimSenderDeevyBalance.toFixed(0));

                const deevyClaimToBalance = await contracts.deevy.balanceOf(claimTo.address);
                expect(
                    deevyClaimToBalance.toString(),
                    "Claim to Deevy balance should be equal."
                ).to.be.eq(expected.claimToDeevyBalance.toFixed(0));
            });
        }
    );
});
