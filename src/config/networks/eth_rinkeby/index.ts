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
    arbitrumArbRetryableTx: EMPTY_CONTRACT_INFO,

    // It SHOULD NOT exist in L1.
    deevyMinter: EMPTY_CONTRACT_INFO,
    deevyBridgeMinter: EMPTY_CONTRACT_INFO,
    deevy: EMPTY_CONTRACT_INFO,
    deevySet: EMPTY_CONTRACT_INFO,
    mirrorLoot: EMPTY_CONTRACT_INFO,
    loot: {
        name: "Loot",
        address: "0xd5324E6cA25b0E7CfAcC4290e65647DF31d81a82",
        url: "https://rinkeby.etherscan.io/address/0xd5324E6cA25b0E7CfAcC4290e65647DF31d81a82",
        verifyCli:
            "npx hardhat verify --network eth_rinkeby 0xd5324E6cA25b0E7CfAcC4290e65647DF31d81a82 ",
    },
    portalLoot: {
        name: "LootPortal",
        address: "0x3cAefeE592c5470B74B2408AB830eCCEf61c5811",
        url: "https://rinkeby.etherscan.io/address/0x3cAefeE592c5470B74B2408AB830eCCEf61c5811",
        verifyCli:
            "npx hardhat verify --network eth_rinkeby 0x3cAefeE592c5470B74B2408AB830eCCEf61c5811 0xd5324E6cA25b0E7CfAcC4290e65647DF31d81a82 0x088cd3712F893eee1444CE7A6DBDD26B891C3980 0x578BAde599406A8fE3d24Fd7f7211c0911F5B29e",
    },
};

export default config;
