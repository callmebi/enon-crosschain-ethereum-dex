const OraclizeOracle = artifacts.require('OraclizeOracle');
const OwnedOracle = artifacts.require('OwnedOracle');
const Collateral = artifacts.require('Collateral');
const DEX = artifacts.require('DEX');

module.exports = (deployer, network, accounts) => {
  const tradingBlocks = 2;
  const minConfirmations = 1;
  const oracleAccount = accounts[4];

  if (network.startsWith('development')) {
    deployer.deploy(DEX, Collateral.address, tradingBlocks, minConfirmations).then(dex => {
      return deployer.deploy(OwnedOracle, dex.address, oracleAccount).then(oracle => {
        return dex.setOracles([oracle.address]);
      });
    });
  } else {
    deployer.deploy(DEX, Collateral.address, tradingBlocks, minConfirmations).then(dex => {
      return deployer.deploy(OraclizeOracle, dex.address).then(oracle => {
        return dex.setOracles([oracle.address]);
      });
    });
  }
};
