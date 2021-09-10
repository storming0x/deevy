# Deevy Loot

## Arbitrum Public Testnet Contracts

https://developer.offchainlabs.com/docs/public_testnet

## Deploy

- Deploy Contracts in L2

L2 Testnet
```sh
yarn deploy-l2:arb_testnet --sender-index 0 --set-name "Eldritch Legends" --set-fore-color black --set-back-color "#8EB12A" --set-end 10000 --l1-target 0x0000000000000000000000000000000000000000 --send-tx false
```
L2 Mainnet
```sh
yarn deploy-l2:arb_mainnet --sender-index 0 --set-name "Eldritch Legends" --set-fore-color black --set-back-color "#8EB12A" --set-end 11111 --l1-target 0x0000000000000000000000000000000000000000 --send-tx false
```

- Update config `./arb_testnet/index.ts` or `./arb_mainnet/index.ts` file.
- Deploy Contracts in L1. Copy / paste the DeevyBridgeMinter address to inject it into the LootPortal.

L1 Rinkeby
```sh
yarn deploy-l1-rinkeby:eth_rinkeby --sender-index 0 --l2-target PASTE_L2_MINTER_ADDRESS --send-tx false
```

L1 Mainnet
```sh
yarn deploy-l1-mainnet:eth_mainnet --sender-index 0 --l2-target PASTE_L2_BRIDGE_MINTER_ADDRESS --send-tx false
```

- Update config `./eth_rinkeby/index.ts` or `./eth_mainnet/index.ts` file.

- DeevyBridgeMinter: Set L1 target

L2 Testnet

```sh
yarn bridge-set-l1-target:arb_testnet --l1-target PASTE_L1_LOOT_PORTAL --send-tx false
```

L2 Mainnet

```sh
yarn bridge-set-l1-target:arb_mainnet --l1-target PASTE_L1_LOOT_PORTAL --send-tx false
```

## Other Scripts

- Mint Loots (Rinkeby)

```sh
yarn loot-mint:eth_rinkeby --sender-index 0 --separator , --loot-ids 1,2,3,4,5 --send-tx false
```

- Transfer Loots (Rinkeby)

```sh
yarn loot-transfer:eth_rinkeby --sender-index 0 --separator , --loot-ids 1,2,3,4,5 --to 0x123...123 --send-tx false
```

- Test Warp Loot (Rinkeby)

```sh
yarn tx-l2-info --loot-id 1
```

Then, copy/paste the CLI printed out at the end of the execution.

- Print L2 TX Hashes.

Copy the ticket ID from the L1 execution, and paste it as parameter to see the TX status.

```sh
yarn tx-l2-hashes --ticket-id 12345
```

- Print Deevy Token Details (L2).

```sh
yarn deevy-print-token-info:arb_testnet --token-id 1
```
