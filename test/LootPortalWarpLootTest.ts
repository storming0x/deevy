/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-await-in-loop */
import leche from "leche";
import {ethers} from "hardhat";
import chai from "chai";
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
import {deployLootPortal} from "../src/utils/deployer";
import events from "../src/utils/events";

chai.use(solidity);
const {withData} = leche;

describe("LootPortalWarpLootTest", () => {
    let signers: Signers;

    beforeEach(async () => {
        signers = new Signers(await ethers.getSigners());
    });

    withData(
        {
            _1_basic: [
                toAccountIndex(0),
                {
                    lootClaim: {
                        senderIndex: toAccountIndex(1),
                        lootId: 10,
                    },
                    previousWarpLootInfo: undefined,
                    pause: undefined,
                    warpLootInfo: {
                        senderIndex: toAccountIndex(1),
                        lootId: 10,
                        msgValue: undefined,
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
                    pause: undefined,
                    warpLootInfo: {
                        senderIndex: toAccountIndex(1),
                        lootId: 12,
                        msgValue: undefined,
                        maxSubmissionCost: Amount.from(1),
                        maxGas: Amount.from(100000),
                        gasPriceBid: Amount.from(1.2),
                    },
                }, // User Actions
                {}, // Expected
                toExpect("SENDER_ISNT_LOOT_ID_OWNER"), // Expected result
            ],
            _3_no_msg_value: [
                toAccountIndex(0),
                {
                    lootClaim: {
                        senderIndex: toAccountIndex(1),
                        lootId: 10,
                    },
                    previousWarpLootInfo: undefined,
                    pause: undefined,
                    warpLootInfo: {
                        senderIndex: toAccountIndex(1),
                        lootId: 10,
                        msgValue: Amount.from(0),
                        maxSubmissionCost: Amount.from(0.1),
                        maxGas: Amount.from(100000),
                        gasPriceBid: Amount.from(1.2),
                    },
                }, // User Actions
                {}, // Expected
                toExpect("MSG_VALUE_IS_REQUIRED"), // Expected result
            ],
            _4_msg_value_invalid: [
                toAccountIndex(0),
                {
                    lootClaim: {
                        senderIndex: toAccountIndex(1),
                        lootId: 10,
                    },
                    previousWarpLootInfo: undefined,
                    pause: undefined,
                    warpLootInfo: {
                        senderIndex: toAccountIndex(1),
                        lootId: 10,
                        msgValue: Amount.from(1.1),
                        maxSubmissionCost: Amount.from(0.1),
                        maxGas: Amount.from(100000),
                        gasPriceBid: Amount.from(1.2),
                    },
                }, // User Actions
                {}, // Expected
                toExpect("MSG_VALUE_INVALID"), // Expected result
            ],
            _5_paused: [
                toAccountIndex(0),
                {
                    lootClaim: {
                        senderIndex: toAccountIndex(1),
                        lootId: 10,
                    },
                    previousWarpLootInfo: undefined,
                    pause: {},
                    warpLootInfo: {
                        senderIndex: toAccountIndex(1),
                        lootId: 10,
                        msgValue: undefined,
                        maxSubmissionCost: Amount.from(100),
                        maxGas: Amount.from(100000),
                        gasPriceBid: Amount.from(100),
                    },
                }, // User Actions
                {}, // Expected
                toExpect('Pausable: paused'), // Expected result
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
                          msgValue: Amount | undefined;
                          maxSubmissionCost: Amount;
                          maxGas: Amount;
                          gasPriceBid: Amount;
                      }
                    | undefined;
                pause: {
                } | undefined,
                warpLootInfo: {
                    senderIndex: AccountIndex;
                    lootId: number;
                    msgValue: Amount;
                    maxSubmissionCost: Amount;
                    maxGas: Amount;
                    gasPriceBid: Amount;
                };
            },
            expected: {},
            expectedResult: ExpectedInfo
        ) => {
            it(toTitle("warpLoot", expectedResult), async () => {
                // Setup
                const deployer = signers.getSignerBy(deployerIndex);
                const lootClaimSender = signers.getSignerBy(userActions.lootClaim.senderIndex);
                const warpLootSender = signers.getSignerBy(userActions.warpLootInfo.senderIndex);
                const contracts = await deployLootPortal({
                    ethers,
                    deployer,
                });

                if (userActions.lootClaim.lootId >= 0) {
                    await contracts.loot
                        .connect(lootClaimSender)
                        .claim(userActions.lootClaim.lootId);
                }

                if (userActions.previousWarpLootInfo) {
                    const {
                        gasPriceBid,
                        maxGas,
                        maxSubmissionCost,
                        msgValue
                    } = userActions.previousWarpLootInfo;
                    const msgValueToSend = msgValue ?
                            Amount.fromString(msgValue.toFixed()) :
                            Amount.from(maxSubmissionCost.getNumber() + (gasPriceBid.getNumber() * maxGas.getNumber()));

                    await contracts.lootPortal
                        .connect(warpLootSender)
                        .warpLoot(
                            userActions.previousWarpLootInfo.lootId,
                            userActions.previousWarpLootInfo.maxSubmissionCost
                                .toDecimals(18)
                                .toFixed(),
                            userActions.previousWarpLootInfo.maxGas.toDecimals(18).toFixed(),
                            userActions.previousWarpLootInfo.gasPriceBid.toDecimals(18).toFixed(),
                            {
                                value: msgValueToSend.toFixed(),
                            }
                        );
                }
                if (userActions.pause) {
                    await contracts.lootPortal.connect(deployer).pause();
                }
                const {
                    gasPriceBid,
                    maxGas,
                    maxSubmissionCost,
                    msgValue
                } = userActions.warpLootInfo;
                const msgValueToSend = msgValue ?
                        Amount.fromString(msgValue.toFixed()) :
                        Amount.from(maxSubmissionCost.getNumber() + (gasPriceBid.getNumber() * maxGas.getNumber()));

                try {
                    // Invocation
                    const result = await contracts.lootPortal
                        .connect(warpLootSender)
                        .warpLoot(
                            userActions.warpLootInfo.lootId,
                            userActions.warpLootInfo.maxSubmissionCost.toFixed(),
                            userActions.warpLootInfo.maxGas.toFixed(),
                            userActions.warpLootInfo.gasPriceBid.toFixed(),
                            {
                                value: msgValueToSend.toFixed(), // Amount.fromString(msgValueToSend).toDecimals(18).toFixed(0),
                            }
                        );

                    // Assertions
                    const receipt = await result.wait();
                    expectedResult.assertSuccess(result);

                    // TODO As Inbox is a mock, it always returns a 0. We should set it before warping the loot (using the mock contract).
                    const ticketId = await contracts.lootPortal.lootsToTickets(
                        userActions.warpLootInfo.lootId
                    );

                    events.lootPortal.retryableTicketCreated(receipt).emitted(ticketId.toNumber());
                } catch (error) {
                    expectedResult.assertError(error, true);
                }
            });
        }
    );
});
