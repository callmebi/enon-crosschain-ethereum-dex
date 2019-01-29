const OwnedOracle = artifacts.require('OwnedOracle');
const Collateral = artifacts.require('Collateral');
const DEX = artifacts.require('DEX');

module.exports = function(deployer, networks, accounts) {
  const tradingBlocks = 2;
  const minConfirmations = 1;
  const oracleAccount = accounts[4];

  deployer.deploy(OwnedOracle, oracleAccount).then(oracle =>
    deployer.deploy(DEX, Collateral.address, tradingBlocks, minConfirmations, [oracle.address])
  );
};
