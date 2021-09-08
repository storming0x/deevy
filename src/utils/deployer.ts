/* eslint-disable import/prefer-default-export */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import {EMPTY_ADDRESS} from "@dogdefidev/utils";
import {Contract} from "ethers";
import {
    DEEVY_MINTER_NAME,
    DEEVY_NAME,
    DEEVY_SET_NAME,
    LOOT_NAME,
    LOOT_PORTAL_NAME,
    MIRROR_LOOT_NAME,
    MOCK_NAME,
} from "./consts/consts";
import {
    Deevy,
    DeevyMinter,
    DeevySet,
    IDeevyMinter,
    IInbox,
    Loot,
    LootPortal,
    MirrorLoot,
} from "../../typechain";

export const deployLoot = async (utils: {
    ethers: any;
    deployer: SignerWithAddress;
}): Promise<Loot> => {
    const lootDeployer = await utils.ethers.getContractFactory(LOOT_NAME);
    const loot = (await lootDeployer.connect(utils.deployer).deploy()) as Loot;
    return loot;
};

const deployMock = async (utils: {ethers: any; deployer: SignerWithAddress}): Promise<Contract> => {
    const mockDeployer = await utils.ethers.getContractFactory(MOCK_NAME);
    const mock = (await mockDeployer.connect(utils.deployer).deploy()) as Contract;
    return mock;
};

export const deployMockInbox = async (utils: {
    ethers: any;
    deployer: SignerWithAddress;
}): Promise<IInbox> => {
    return (await deployMock(utils)) as IInbox;
};

export const deployDeevySet = async (utils: {
    ethers: any;
    deployer: SignerWithAddress;
}): Promise<DeevySet> => {
    const deevySetDeployer = await utils.ethers.getContractFactory(DEEVY_SET_NAME);
    const deevySet = (await deevySetDeployer.connect(utils.deployer).deploy()) as DeevySet;
    return deevySet;
};

export const deployMirrorLoot = async (utils: {
    ethers: any;
    deployer: SignerWithAddress;
}): Promise<MirrorLoot> => {
    const mirrorLootDeployer = await utils.ethers.getContractFactory(MIRROR_LOOT_NAME);
    const mirrorLoot = (await mirrorLootDeployer.connect(utils.deployer).deploy()) as MirrorLoot;
    return mirrorLoot;
};

export type DeevyDeploy = {
    deevy: Deevy;
    warpLoot: MirrorLoot;
};

export const deployDeevy = async (
    utils: {ethers: any; deployer: SignerWithAddress},
    params: {warpLoot?: MirrorLoot}
): Promise<DeevyDeploy> => {
    if (params.warpLoot === undefined) {
        const mirrorLoot = await deployMirrorLoot(utils);
        params.warpLoot = mirrorLoot;
    }
    const deevyDeployer = await utils.ethers.getContractFactory(DEEVY_NAME);
    const deevy = (await deevyDeployer
        .connect(utils.deployer)
        .deploy(EMPTY_ADDRESS, params.warpLoot.address)) as Deevy;

    return {
        deevy,
        warpLoot: params.warpLoot,
    };
};

export type DeevyMinterDeploy = {
    deevyMinter: DeevyMinter;
    deevy: Deevy;
    warpLoot: MirrorLoot;
};

export const deployDeevyMinter = async (
    utils: {ethers: any; deployer: SignerWithAddress},
    params: {deevy?: Deevy; warpLoot?: MirrorLoot; targetL1Address: string}
): Promise<DeevyMinterDeploy> => {
    if (params.deevy === undefined) {
        const contracts = await deployDeevy(utils, params);
        params.deevy = contracts.deevy;
        params.warpLoot = contracts.warpLoot;
    }
    const deevyMinterDeployer = await utils.ethers.getContractFactory(DEEVY_MINTER_NAME);
    const deevyMinter = (await deevyMinterDeployer
        .connect(utils.deployer)
        .deploy(params.deevy.address, (params.warpLoot as MirrorLoot).address)) as DeevyMinter;

    const setMinterResult = await params.deevy.setMinter(deevyMinter.address);
    await setMinterResult.wait();
    return {
        deevy: params.deevy,
        deevyMinter,
        warpLoot: params.warpLoot as MirrorLoot,
    };
};

export type LootPortalDeploy = {
    lootPortal: LootPortal;
    l2Target: IDeevyMinter;
    loot: Loot;
    inbox: IInbox;
};

export const deployLootPortal = async (utils: {
    ethers: any;
    deployer: SignerWithAddress;
}): Promise<LootPortalDeploy> => {
    const l2Target = (await deployMock(utils)) as IDeevyMinter;
    const inbox = await deployMockInbox(utils);
    const loot = await deployLoot(utils);
    const lootPortalDeployer = await utils.ethers.getContractFactory(LOOT_PORTAL_NAME);
    const lootPortal = (await lootPortalDeployer
        .connect(utils.deployer)
        .deploy(loot.address, l2Target.address, inbox.address)) as LootPortal;

    return {
        lootPortal,
        inbox,
        loot,
        l2Target,
    };
};
