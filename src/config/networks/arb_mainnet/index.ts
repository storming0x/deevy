import {EMPTY_CONTRACT_INFO} from "@dogdefidev/utils";
import {ContractAddresses} from "../..";

const config: ContractAddresses = {
    maxGasLimit: 2500000,

    // Contracts
    arbitrumInbox: EMPTY_CONTRACT_INFO,
    arbitrumArbRetryableTx: {
        name: "ArbRetryableTx",
        address: "0x000000000000000000000000000000000000006E",
        url: "https://explorer.arbitrum.io/address/0x000000000000000000000000000000000000006E",
        verifyCli: "",
    },
    // It SHOULD BE EMPTY.
    portalLoot: EMPTY_CONTRACT_INFO,
    // deevyMinter: EMPTY_CONTRACT_INFO,
    loot: EMPTY_CONTRACT_INFO,

    deevySet: {
        name: "DeevySet",
        address: "0xa753bfa9C632a01aF2ECcE6ef3dC88570bAc45Ef",
        url: "https://explorer.arbitrum.io/address/0xa753bfa9C632a01aF2ECcE6ef3dC88570bAc45Ef",
        verifyCli:
            "npx hardhat verify --network arb_mainnet 0xa753bfa9C632a01aF2ECcE6ef3dC88570bAc45Ef Eldritch Legends black #8EB12A",
    },
    mirrorLoot: {
        name: "MirrorLoot",
        address: "0xEc2075a71c208F9A9219BD73d4B40053F0C84Dd3",
        url: "https://explorer.arbitrum.io/address/0xEc2075a71c208F9A9219BD73d4B40053F0C84Dd3",
        verifyCli:
            "npx hardhat verify --network arb_mainnet 0xEc2075a71c208F9A9219BD73d4B40053F0C84Dd3 ",
    },
    deevy: {
        name: "Deevy",
        address: "0x8F4cBC81589Ba28B67C371EaB3d696Ad67B25c24",
        url: "https://explorer.arbitrum.io/address/0x8F4cBC81589Ba28B67C371EaB3d696Ad67B25c24",
        verifyCli:
            "npx hardhat verify --network arb_mainnet 0x8F4cBC81589Ba28B67C371EaB3d696Ad67B25c24 0x0000000000000000000000000000000000000000 0x0000000000000000000000000000000000000000 0xEc2075a71c208F9A9219BD73d4B40053F0C84Dd3",
    },
    deevyBridgeMinter: {
        name: "DeevyBridgeMinter",
        address: "0x351fcB506bF8640E6BaCccc53E61d461De14b679",
        url: "https://explorer.arbitrum.io/address/0x351fcB506bF8640E6BaCccc53E61d461De14b679",
        verifyCli:
            "npx hardhat verify --network arb_mainnet 0x351fcB506bF8640E6BaCccc53E61d461De14b679 0x8F4cBC81589Ba28B67C371EaB3d696Ad67B25c24 0xa5e24bb4B7Fd816583A5C6aD30807Cc202A416B4",
    },
    deevyMinter: {
        name: "DeevyMinter",
        address: "0xD4864F65663C6bbCaD4A8fc003e5135caE7d2378",
        url: "https://explorer.arbitrum.io/address/0xD4864F65663C6bbCaD4A8fc003e5135caE7d2378",
        verifyCli:
            "npx hardhat verify --network arb_mainnet 0xD4864F65663C6bbCaD4A8fc003e5135caE7d2378 0x8F4cBC81589Ba28B67C371EaB3d696Ad67B25c24",
    },
};

export default config;
