import {EMPTY_CONTRACT_INFO} from "@dogdefidev/utils";
import {ContractAddresses} from "../..";

const config: ContractAddresses = {
    maxGasLimit: 2500000,

    // Contracts
    arbitrumInbox: EMPTY_CONTRACT_INFO,
    arbitrumArbRetryableTx: EMPTY_CONTRACT_INFO,
    // It SHOULD BE EMPTY.
    portalLoot: EMPTY_CONTRACT_INFO,
    // deevyMinter: EMPTY_CONTRACT_INFO,
    loot: EMPTY_CONTRACT_INFO,
    deevySet: {
        name: "DeevySet",
        address: "0xFdDd003C459b792d0caCBF18dE42b025Ce62de02",
        url:
            "https://rinkeby-explorer.arbitrum.io/#//address/0xFdDd003C459b792d0caCBF18dE42b025Ce62de02",
        verifyCli:
            "npx hardhat verify --network arb_testnet 0xFdDd003C459b792d0caCBF18dE42b025Ce62de02 Eldritch Legends black #8EB12A",
    },
    mirrorLoot: {
        name: "MirrorLoot",
        address: "0x92d86a84970854921E063895bB6b718839CEC832",
        url:
            "https://rinkeby-explorer.arbitrum.io/#//address/0x92d86a84970854921E063895bB6b718839CEC832",
        verifyCli:
            "npx hardhat verify --network arb_testnet 0x92d86a84970854921E063895bB6b718839CEC832 ",
    },
    deevy: {
        name: "Deevy",
        address: "0x4353Fae23B9735a97500E5507FBb7Fd53b12114F",
        url:
            "https://rinkeby-explorer.arbitrum.io/#//address/0x4353Fae23B9735a97500E5507FBb7Fd53b12114F",
        verifyCli:
            "npx hardhat verify --network arb_testnet 0x4353Fae23B9735a97500E5507FBb7Fd53b12114F 0x0000000000000000000000000000000000000000 0x0000000000000000000000000000000000000000 0x92d86a84970854921E063895bB6b718839CEC832",
    },
    deevyBridgeMinter: {
        name: "DeevyBridgeMinter",
        address: "0x088cd3712F893eee1444CE7A6DBDD26B891C3980",
        url:
            "https://rinkeby-explorer.arbitrum.io/#//address/0x088cd3712F893eee1444CE7A6DBDD26B891C3980",
        verifyCli:
            "npx hardhat verify --network arb_testnet 0x088cd3712F893eee1444CE7A6DBDD26B891C3980 0x4353Fae23B9735a97500E5507FBb7Fd53b12114F 0x0000000000000000000000000000000000000000",
    },
    deevyMinter: {
        name: "DeevyMinter",
        address: "0xA531878b6274E817aA86A10fd05b7fF669192b72",
        url:
            "https://rinkeby-explorer.arbitrum.io/#//address/0xA531878b6274E817aA86A10fd05b7fF669192b72",
        verifyCli:
            "npx hardhat verify --network arb_testnet 0xA531878b6274E817aA86A10fd05b7fF669192b72 0x4353Fae23B9735a97500E5507FBb7Fd53b12114F",
    },
};

export default config;
