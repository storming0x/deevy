import {EMPTY_CONTRACT_INFO} from "@dogdefidev/utils";
import {ContractAddresses} from "../..";

const config: ContractAddresses = {
    maxGasLimit: 2500000,

    // Contracts
    arbitrumInbox: {
        name: "Inbox",
        address: "0x578BAde599406A8fE3d24Fd7f7211c0911F5B29e",
        url: "https://rinkeby.etherscan.io/address/0x578BAde599406A8fE3d24Fd7f7211c0911F5B29e",
        verifyCli: "",
    },

    // It SHOULD NOT exist in L1.
    deevyMinter: EMPTY_CONTRACT_INFO,
    deevyBridgeMinter: EMPTY_CONTRACT_INFO,
    deevy: EMPTY_CONTRACT_INFO,
    deevySet: EMPTY_CONTRACT_INFO,
    mirrorLoot: EMPTY_CONTRACT_INFO,
    loot: {
        name: "Loot",
        address: "0x46d07BcD25f83269685BD0D35fEbCF7224F62B30",
        url: "https://rinkeby.etherscan.io/address/0x46d07BcD25f83269685BD0D35fEbCF7224F62B30",
        verifyCli:
            "npx hardhat verify --network eth_rinkeby 0x46d07BcD25f83269685BD0D35fEbCF7224F62B30 ",
    },
    portalLoot: {
        name: "LootPortal",
        address: "0x5f6a3B111889F781938AAcc110f5AcB18578Fd6e",
        url: "https://rinkeby.etherscan.io/address/0x5f6a3B111889F781938AAcc110f5AcB18578Fd6e",
        verifyCli:
            "npx hardhat verify --network eth_rinkeby 0x5f6a3B111889F781938AAcc110f5AcB18578Fd6e 0x46d07BcD25f83269685BD0D35fEbCF7224F62B30 0x037FDC3Eea92a476b4b2552aCB9BBEE1Db99015d 0x578BAde599406A8fE3d24Fd7f7211c0911F5B29e",
    },
};

export default config;
