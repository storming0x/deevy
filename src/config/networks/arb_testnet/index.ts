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
        address: "0x8Eb3bB82e36DF88674bcf04cC2877b663558F7e7",
        url:
            "https://rinkeby-explorer.arbitrum.io/#//address/0x8Eb3bB82e36DF88674bcf04cC2877b663558F7e7",
        verifyCli:
            "npx hardhat verify --network arb_testnet 0x8Eb3bB82e36DF88674bcf04cC2877b663558F7e7 Eldritch Legends black #8EB12A",
    },
    mirrorLoot: {
        name: "MirrorLoot",
        address: "0x9Fb7FAb90cE31BE8ebB818dCc9bEf703E81653DC",
        url:
            "https://rinkeby-explorer.arbitrum.io/#//address/0x9Fb7FAb90cE31BE8ebB818dCc9bEf703E81653DC",
        verifyCli:
            "npx hardhat verify --network arb_testnet 0x9Fb7FAb90cE31BE8ebB818dCc9bEf703E81653DC ",
    },
    deevy: {
        name: "Deevy",
        address: "0xFB9dd74F6182D4800716c60f4dC39355E6cD35Fe",
        url:
            "https://rinkeby-explorer.arbitrum.io/#//address/0xFB9dd74F6182D4800716c60f4dC39355E6cD35Fe",
        verifyCli:
            "npx hardhat verify --network arb_testnet 0xFB9dd74F6182D4800716c60f4dC39355E6cD35Fe 0x0000000000000000000000000000000000000000 0x0000000000000000000000000000000000000000 0x9Fb7FAb90cE31BE8ebB818dCc9bEf703E81653DC",
    },
    deevyBridgeMinter: {
        name: "DeevyBridgeMinter",
        address: "0x037FDC3Eea92a476b4b2552aCB9BBEE1Db99015d",
        url:
            "https://rinkeby-explorer.arbitrum.io/#//address/0x037FDC3Eea92a476b4b2552aCB9BBEE1Db99015d",
        verifyCli:
            "npx hardhat verify --network arb_testnet 0x037FDC3Eea92a476b4b2552aCB9BBEE1Db99015d 0xFB9dd74F6182D4800716c60f4dC39355E6cD35Fe 0x0000000000000000000000000000000000000000",
    },
    deevyMinter: {
        name: "DeevyMinter",
        address: "0x5017126c54C592730E00B83275cF21359dC13d21",
        url:
            "https://rinkeby-explorer.arbitrum.io/#//address/0x5017126c54C592730E00B83275cF21359dC13d21",
        verifyCli:
            "npx hardhat verify --network arb_testnet 0x5017126c54C592730E00B83275cF21359dC13d21 0xFB9dd74F6182D4800716c60f4dC39355E6cD35Fe",
    },
};

export default config;
