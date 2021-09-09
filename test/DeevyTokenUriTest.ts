/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-await-in-loop */
import leche from "leche";
import isSvg from "is-svg";
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
import {deployDeevy, deployDeevySet} from "../src/utils/deployer";
import {toSvg} from "../src/utils/commons";

chai.use(solidity);
const {withData} = leche;

describe("DeevyTokenUriTest", () => {
    let signers: Signers;

    beforeEach(async () => {
        signers = new Signers(await ethers.getSigners());
    });

    withData(
        {
            _1_token_id_one_set: [
                toAccountIndex(0),
                {
                    addSet: {
                        foreColor: "black",
                        backColor: "#8EB12A",
                        name: "Ultimate Fight",
                        end: 10000,
                    },
                    ownerClaim: {
                        tokenId: 8001,
                    },
                }, // User Actions
                {
                    isSvg: true,
                }, // Expected
                toExpect(), // Expected result
            ],
            _2_token_id_without_set: [
                toAccountIndex(0),
                {
                    addSet: undefined,
                    ownerClaim: {
                        tokenId: 8001,
                    },
                }, // User Actions
                {
                    isSvg: false,
                }, // Expected
                toExpect(), // Expected result
            ],
        },
        (
            deployerIndex: AccountIndex,
            userActions: {
                addSet:
                    | {
                          name: string;
                          foreColor: string;
                          backColor: string;
                          end: number;
                      }
                    | undefined;
                ownerClaim: {
                    tokenId: number;
                };
            },
            expected: {
                isSvg: boolean;
            },
            expectedResult: ExpectedInfo
        ) => {
            it(toTitle("getSetInfo", expectedResult), async () => {
                // Setup
                const deployer = signers.getSignerBy(deployerIndex);
                const contracts = await deployDeevy({ethers, deployer}, {});

                if (userActions.addSet) {
                    const deevySet = await deployDeevySet({
                        ethers,
                        deployer,
                        name: userActions.addSet.name,
                        foreColor: userActions.addSet.foreColor,
                        backColor: userActions.addSet.backColor,
                    });

                    await contracts.deevy
                        .connect(deployer)
                        .addSet(deevySet.address, userActions.addSet.end);
                }

                await contracts.deevy.connect(deployer).ownerClaim(userActions.ownerClaim.tokenId);

                // Invocation
                const tokenURI = await contracts.deevy.tokenURI(userActions.ownerClaim.tokenId);

                // Assertions
                const svg = toSvg(tokenURI);
                expect(isSvg(svg), "Is SVG should be equal.").to.be.eq(expected.isSvg);
            });
        }
    );
});
