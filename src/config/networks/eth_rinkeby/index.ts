import { EMPTY_CONTRACT_INFO } from "@dogdefidev/utils";
import {ContractAddresses} from "../..";

const config: ContractAddresses = {
    maxGasLimit: 2500000,

    // Contracts
    arbitrumInbox: {
        "name": "Inbox",
        "address": "0x578BAde599406A8fE3d24Fd7f7211c0911F5B29e",
        "url": "https://rinkeby.etherscan.io/address/0x578BAde599406A8fE3d24Fd7f7211c0911F5B29e",
        "verifyCli": ""
    },

    // It SHOULD NOT exist in L1.
    deevyMinter: EMPTY_CONTRACT_INFO,
    deevy: EMPTY_CONTRACT_INFO,
    deevySetProperties: EMPTY_CONTRACT_INFO,
    mirrorLoot: EMPTY_CONTRACT_INFO,
    loot: {
        "name": "Loot",
        "address": "0xB9283DEd34AB6d6a5410FBd58F215FD69efCB864",
        "url": "https://rinkeby.etherscan.io/address/0xB9283DEd34AB6d6a5410FBd58F215FD69efCB864",
        "verifyCli": "npx hardhat verify --network eth_rinkeby 0xB9283DEd34AB6d6a5410FBd58F215FD69efCB864 "
    },
    portalLoot: {
        "name": "LootPortal",
        "address": "0xa8A1b00b51C4D72D994793053770261F0eA5ec7C",
        "url": "https://rinkeby.etherscan.io/address/0xa8A1b00b51C4D72D994793053770261F0eA5ec7C",
        "verifyCli": "npx hardhat verify --network eth_rinkeby 0xa8A1b00b51C4D72D994793053770261F0eA5ec7C 0xB9283DEd34AB6d6a5410FBd58F215FD69efCB864 0x0000000000000000000000000000000000000000 0x578BAde599406A8fE3d24Fd7f7211c0911F5B29e"
    }
};

export default config;
