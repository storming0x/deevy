/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-await-in-loop */
import leche from "leche";
import {ethers} from "hardhat";
import chai, { assert } from "chai";
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
import {deployDeevy, deployDeevySet } from "../src/utils/deployer";
import events from "../src/utils/events";

chai.use(solidity);
const {withData} = leche;

type SetInfo = {
    end: number
}

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
                    sets: [{
                        end: 8889
                    }],
                    data: [{
                        id: 2300,
                        expectedSet: 0 
                    }]
                }, // User Actions
                {}, // Expected
                toExpect(), // Expected result
            ],
        },
        (
            deployerIndex: AccountIndex,
            setup: {
                sets: [SetInfo],
                data: [{
                    id: number,
                    expectedSetIndex: number,
                }],
            },
            expected: {},
            expectedResult: ExpectedInfo
        ) => {
            // eslint-disable-next-line consistent-return
            it(toTitle("getSetInfo", expectedResult), async () => {
                // Setup
                const { sets, data } = setup;
                const deployer = signers.getSignerBy(deployerIndex);
                const { deevy } = await deployDeevy({ethers, deployer}, {});
                
                const contractSets: string[]  = [];

                // setup sets
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < sets.length; i++) {
                    const { end } = sets[i];
                    const deevySet = await deployDeevySet({ethers, deployer});
                    await deevy.connect(deployer).addSet(deevySet.address, end);
                    return deevySet.address;
                }

                assert.equal(sets.length, contractSets.length, "expected length of sets to be equal");
                
                console.log('contractSets', contractSets);
                // Invocation
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < data.length; i++) {
                    const { id, expectedSetIndex } = data[i];
                    const result = await deevy.connect(deployer).getSetInfo(id);
                    console.log('result', result);
                    console.log('contractSets', contractSets);
                    // Assertions
                    assert.equal(
                        result.set.toLowerCase(), 
                        contractSets[expectedSetIndex].toLowerCase(),
                        `Expected result ${result.set} to be equal ${contractSets[expectedSetIndex]}`
                    );
                }
            });
        }
    );
});
