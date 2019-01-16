var Collateral = artifacts.require("./Collateral.sol");
var DEX = artifacts.require("./DEX.sol");

module.exports = function(deployer, networks, accounts) {
  const tradingBlocks = 2;
  const minConfirmations = 1;
  const oracle = accounts[4];

  deployer.deploy(DEX, Collateral.address, tradingBlocks, minConfirmations, [oracle]);
};
