import {EMPTY_CONTRACT_INFO} from "@dogdefidev/utils";
import {ContractAddresses} from "../..";

const config: ContractAddresses = {
    maxGasLimit: 2500000,

    // Contracts
    arbitrumInbox: {
        name: "Inbox",
        address: "0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f",
        url: "https://etherscan.io/address/0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f",
        verifyCli: "",
    },
    arbitrumArbRetryableTx: EMPTY_CONTRACT_INFO,

    // It SHOULD NOT exist in L1.
    deevyMinter: EMPTY_CONTRACT_INFO,
    deevyBridgeMinter: EMPTY_CONTRACT_INFO,
    deevy: EMPTY_CONTRACT_INFO,
    deevySet: EMPTY_CONTRACT_INFO,
    mirrorLoot: EMPTY_CONTRACT_INFO,
    loot: {
        name: "Loot",
        address: "0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7",
        url: "https://etherscan.io/address/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7",
        verifyCli: "",
    },
    portalLoot: {
        name: "LootPortal",
        address: "0xEc2075a71c208F9A9219BD73d4B40053F0C84Dd3",
        url: "https://www.etherscan.io/address/0xEc2075a71c208F9A9219BD73d4B40053F0C84Dd3",
        verifyCli:
            "npx hardhat verify --network eth_mainnet 0xEc2075a71c208F9A9219BD73d4B40053F0C84Dd3 0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7 0x8cFC63F0F8CD6887d221aa848a89695389f57d14 0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f",
    },
};

export default config;
