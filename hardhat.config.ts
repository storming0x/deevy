/* eslint-disable import/no-extraneous-dependencies */
import { config as dotenvConfig } from 'dotenv';
import { Accounts } from "@dogdefidev/utils"
import 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import { HardhatUserConfig } from 'hardhat/types';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-typechain';
import 'solidity-coverage';
import 'hardhat-gas-reporter';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-contract-sizer';

import './tasks';

dotenvConfig();

const blockchainApiKey = process.env.BLOCKCHAIN_API_KEY as string;
const providerApiKey = process.env.PROVIDER_API_KEY as string;
const accounts = new Accounts();

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: {
    compilers: [{
      version: '0.6.12',
      settings: {
        optimizer: {
          enabled: true,
          // Optimize for how many times you intend to run the code.
          // Lower values will optimize more for initial deployment cost, higher
          // values will optimize more for high-frequency usage.
          runs: 200,
        },
      }
    }],
  },
  mocha: {
    timeout: 0,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  networks: {
    hardhat: {},
    arb_mainnet: {
      url: '',
      chainId: 250,
      gasPrice: 20000000000,
      accounts: accounts.getPKs(),
    },
    arb_testnet: {
      /*
        https://developer.offchainlabs.com/docs/public_testnet
      */
      url: 'https://rinkeby.arbitrum.io/rpc',
      chainId: 421611,
      gasPrice: 20000000000,
      accounts: accounts.getPKs(),
    },
    eth_rinkeby: {
      url: `https://rinkeby.infura.io/v3/${providerApiKey}`,
      chainId: 4,
      gasPrice: 2000000000,
      accounts: accounts.getPKs(),
    },
    coverage: {
      url: 'http://localhost:8555',
    },
  },
  etherscan: {
    apiKey: blockchainApiKey,
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 150,
    // See more details: https://github.com/cgewecke/eth-gas-reporter/blob/master/docs/codechecks.md#failure-thresholds
    maxMethodDiff: 25,
    excludeContracts: []
  },
};
export default config;