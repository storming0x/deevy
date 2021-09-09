/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-await-in-loop */
import leche from "leche";
import {ethers} from "hardhat";
import chai, {assert} from "chai";
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
import {deployDeevy, deployDeevySet} from "../src/utils/deployer";
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
            _1_token_id_one_set: [
                toAccountIndex(0),
                {
                    sets: [8889],
                    data: [
                        {
                            id: 2300,
                            expectedSetIndex: 0,
                        },
                        {
                            id: 0,
                            expectedSetIndex: 0,
                        },
                        {
                            id: 8888,
                            expectedSetIndex: 0,
                        },
                        {
                            id: 8889,
                            expectedSetIndex: 0,
                        },
                        {
                            id: 9100,
                            expectedSetIndex: -1,
                        },
                    ],
                }, // User Actions
                {}, // Expected
                toExpect(), // Expected result
            ],
            _2_token_id_several_set: [
                toAccountIndex(0),
                {
                    sets: [8889, 10000, 12001],
                    data: [
                        {
                            id: 8888,
                            expectedSetIndex: 0,
                        },
                        {
                            id: 8889,
                            expectedSetIndex: 0,
                        },
                        {
                            id: 9100,
                            expectedSetIndex: 1,
                        },
                        {
                            id: 13000,
                            expectedSetIndex: -1,
                        },
                        {
                            id: 12001,
                            expectedSetIndex: 2,
                        },
                        {
                            id: 10000,
                            expectedSetIndex: 1,
                        },
                        {
                            id: 9999,
                            expectedSetIndex: 1,
                        },
                        {
                            id: 12000,
                            expectedSetIndex: 2,
                        },
                    ],
                }, // User Actions
                {}, // Expected
                toExpect(), // Expected result
            ],
        },
        (
            deployerIndex: AccountIndex,
            setup: {
                sets: number[];
                data: [
                    {
                        id: number;
                        expectedSetIndex: number;
                    }
                ];
            },
            expected: {},
            expectedResult: ExpectedInfo
        ) => {
            // eslint-disable-next-line consistent-return
            it(toTitle("getSetInfo", expectedResult), async () => {
                // Setup
                const {sets, data} = setup;
                const deployer = signers.getSignerBy(deployerIndex);
                const {deevy} = await deployDeevy({ethers, deployer}, {});

                const contractSets: string[] = [];

                // setup sets
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < sets.length; i++) {
                    const deevySet = await deployDeevySet({
                        ethers,
                        deployer,
                        name: sets[i].toString(),
                    });
                    contractSets.push(deevySet.address);
                    await deevy.connect(deployer).addSet(deevySet.address, sets[i]);
                }

                assert.equal(
                    sets.length,
                    contractSets.length,
                    "expected length of sets to be equal"
                );
                console.log("contractSets", contractSets);
                // Invocation
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < data.length; i++) {
                    const {id, expectedSetIndex} = data[i];
                    const result = await deevy.connect(deployer).getSetInfo(id);

                    if (expectedSetIndex < 0) {
                        // Assertions
                        assert.isFalse(
                            result.exists,
                            `Expected result ${result.set} to not exist}`
                        );
                    } else {
                        // Assertions
                        assert.equal(
                            result.set.toLowerCase(),
                            contractSets[expectedSetIndex].toLowerCase(),
                            `Expected tokenId ${id} result ${result.set} to be equal ${contractSets[expectedSetIndex]}`
                        );
                    }
                }
            });
        }
    );
});
