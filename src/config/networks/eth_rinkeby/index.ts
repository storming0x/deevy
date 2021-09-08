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
    deevy: EMPTY_CONTRACT_INFO,
    deevySet: EMPTY_CONTRACT_INFO,
    mirrorLoot: EMPTY_CONTRACT_INFO,
    loot: {
        "name": "Loot",
        "address": "0x795F0716e50dD1BCF49dF40296767A1edD74b4a3",
        "url": "https://rinkeby.etherscan.io/address/0x795F0716e50dD1BCF49dF40296767A1edD74b4a3",
        "verifyCli": "npx hardhat verify --network eth_rinkeby 0x795F0716e50dD1BCF49dF40296767A1edD74b4a3 "
    },
    portalLoot: {
        "name": "LootPortal",
        "address": "0xDE332365D25f1f29dD480949fA5c980B589A6508",
        "url": "https://rinkeby.etherscan.io/address/0xDE332365D25f1f29dD480949fA5c980B589A6508",
        "verifyCli": "npx hardhat verify --network eth_rinkeby 0xDE332365D25f1f29dD480949fA5c980B589A6508 0x795F0716e50dD1BCF49dF40296767A1edD74b4a3 0xA44b7Ec2b425501117dADFF2a6D65aa4D994B532 0x578BAde599406A8fE3d24Fd7f7211c0911F5B29e"
    }
};

export default config;
