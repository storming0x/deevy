import {EMPTY_CONTRACT_INFO} from "@dogdefidev/utils";
import {ContractAddresses} from "../..";

const config: ContractAddresses = {
    maxGasLimit: 2500000,

    // Contracts
    arbitrumInbox: EMPTY_CONTRACT_INFO,
    // It SHOULD BE EMPTY.
    portalLoot: EMPTY_CONTRACT_INFO,
    // deevyMinter: EMPTY_CONTRACT_INFO,
    loot: EMPTY_CONTRACT_INFO,

    deevySet: {
        name: "DeevySet",
        address: "0x8735EAd068f7fe6C0574830F68214FF8f8220d2A",
        url:
            "https://rinkeby-explorer.arbitrum.io/#//address/0x8735EAd068f7fe6C0574830F68214FF8f8220d2A",
        verifyCli:
            "npx hardhat verify --network arb_testnet 0x8735EAd068f7fe6C0574830F68214FF8f8220d2A ",
    },
    mirrorLoot: {
        name: "MirrorLoot",
        address: "0x98a63f0ece83dA08808cAB4073e8bda068Fc8dab",
        url:
            "https://rinkeby-explorer.arbitrum.io/#//address/0x98a63f0ece83dA08808cAB4073e8bda068Fc8dab",
        verifyCli:
            "npx hardhat verify --network arb_testnet 0x98a63f0ece83dA08808cAB4073e8bda068Fc8dab ",
    },
    deevy: {
        name: "Deevy",
        address: "0xf3B90efc4FefF775c5B134347e2d2260Ab713461",
        url:
            "https://rinkeby-explorer.arbitrum.io/#//address/0xf3B90efc4FefF775c5B134347e2d2260Ab713461",
        verifyCli:
            "npx hardhat verify --network arb_testnet 0xf3B90efc4FefF775c5B134347e2d2260Ab713461 0x0000000000000000000000000000000000000000 0x98a63f0ece83dA08808cAB4073e8bda068Fc8dab",
    },
    deevyMinter: {
        name: "DeevyMinter",
        address: "0xA44b7Ec2b425501117dADFF2a6D65aa4D994B532",
        url:
            "https://rinkeby-explorer.arbitrum.io/#//address/0xA44b7Ec2b425501117dADFF2a6D65aa4D994B532",
        verifyCli:
            "npx hardhat verify --network arb_testnet 0xA44b7Ec2b425501117dADFF2a6D65aa4D994B532 0xf3B90efc4FefF775c5B134347e2d2260Ab713461 0xa8A1b00b51C4D72D994793053770261F0eA5ec7C",
    },
    deevyBridgeMinter: EMPTY_CONTRACT_INFO,
};

export default config;
