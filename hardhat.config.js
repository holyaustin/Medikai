require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
   
    scrollAlpha: {
      url: "https://alpha-rpc.scroll.io/l2" || "", 
      chainId: 534353,
      accounts: [process.env.PRIVATE_KEY],
    },
    zkEVM: {
      url: "https://rpc.public.zkevm-test.net", 
      chainId: 1442,
      accounts: [process.env.PRIVATE_KEY],
    },
    optimism: {
      url: "https://mainnet.optimism.io", 
      chainId: 10,
      accounts: [process.env.PRIVATE_KEY],
    },
    gnosis: {
      url: "https://rpc.gnosischain.com/", 
      chainId: 100,
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli", 
      chainId: 5,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
