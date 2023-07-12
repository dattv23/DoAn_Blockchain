// https://eth-sepolia.g.alchemy.com/v2/zCOpbqqnV2rXUNzdatsrEc-g9FdNsP-h

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepodia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/zCOpbqqnV2rXUNzdatsrEc-g9FdNsP-h',
      accounts: ['4b44ffd701ee2c48eb754309404d49b963c2ec6d6dccb863977454fd5673f00d']
    }
  }
}