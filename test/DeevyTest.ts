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
    Amount,
    ExpectedInfo,
    Signers,
    toAccountIndex,
    toExpect,
    toTitle,
} from "@dogdefidev/utils";
import {deployDeevy} from "../src/utils/deployer";
import events from "../src/utils/events";

chai.use(solidity);
const {withData} = leche;

describe("DeevySol setInfo", () => {
    let signers: Signers;

    beforeEach(async () => {
        signers = new Signers(await ethers.getSigners());
    });

    withData(
        {
            _1_token_id_first_set: [
                toAccountIndex(0),
                {
                    lootClaim: {
                        senderIndex: toAccountIndex(1),
                        lootId: 10,
                    },
                    previousWarpLootInfo: undefined,
                    warpLootInfo: {
                        senderIndex: toAccountIndex(1),
                        lootId: 10,
                        maxSubmissionCost: Amount.from(100),
                        maxGas: Amount.from(100000),
                        gasPriceBid: Amount.from(100),
                    },
                }, // User Actions
                {}, // Expected
                toExpect(), // Expected result
            ],
            _2_sender_doesnt_own_loot: [
                toAccountIndex(0),
                {
                    lootClaim: {
                        senderIndex: toAccountIndex(0),
                        lootId: 12,
                    },
                    previousWarpLootInfo: undefined,
                    warpLootInfo: {
                        senderIndex: toAccountIndex(1),
                        lootId: 12,
                        maxSubmissionCost: Amount.from(100),
                        maxGas: Amount.from(100000),
                        gasPriceBid: Amount.from(100),
                    },
                }, // User Actions
                {}, // Expected
                toExpect("SENDER_ISNT_LOOT_ID_OWNER"), // Expected result
            ],
            _3_loot_already_claimed: [
                toAccountIndex(0),
                {
                    lootClaim: {
                        senderIndex: toAccountIndex(2),
                        lootId: 12,
                    },
                    previousWarpLootInfo: {
                        senderIndex: toAccountIndex(2),
                        lootId: 12,
                        maxSubmissionCost: Amount.from(100),
                        maxGas: Amount.from(100000),
                        gasPriceBid: Amount.from(100),
                    },
                    warpLootInfo: {
                        senderIndex: toAccountIndex(2),
                        lootId: 12,
                        maxSubmissionCost: Amount.from(100),
                        maxGas: Amount.from(100000),
                        gasPriceBid: Amount.from(100),
                    },
                }, // User Actions
                {}, // Expected
                toExpect("ALREADY_CLAIMED"), // Expected result
            ],
        },
        (
            deployerIndex: AccountIndex,
            userActions: {
                lootClaim: {
                    senderIndex: AccountIndex;
                    lootId: number;
                };
                previousWarpLootInfo:
                    | {
                          senderIndex: AccountIndex;
                          lootId: number;
                          maxSubmissionCost: Amount;
                          maxGas: Amount;
                          gasPriceBid: Amount;
                      }
                    | undefined;
                warpLootInfo: {
                    senderIndex: AccountIndex;
                    lootId: number;
                    maxSubmissionCost: Amount;
                    maxGas: Amount;
                    gasPriceBid: Amount;
                };
            },
            expected: {},
            expectedResult: ExpectedInfo
        ) => {
            it(toTitle("getSetInfo", expectedResult), async () => {
                // Setup
                const deployer = signers.getSignerBy(deployerIndex);
                const lootClaimSender = signers.getSignerBy(userActions.lootClaim.senderIndex);
                const warpLootSender = signers.getSignerBy(userActions.warpLootInfo.senderIndex);
                const contracts = await deployDeevy(
                    { ethers, deployer},
                    {},
                );

                // setup sets
                try {
                    // Invocation
                    const result = await contracts.deevy
                        .connect(deployer)
                        .getSetInfo(1);

                    // // Assertions
                    // expectedResult.assertSuccess(result);

                } catch (error) {
                    // expectedResult.assertError(error, true);
                }
            });
        }
    );
});
