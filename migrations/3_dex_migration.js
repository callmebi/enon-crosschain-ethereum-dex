var Collateral = artifacts.require("./Collateral.sol");
var DEX = artifacts.require("./DEX.sol");

module.exports = function(deployer) {
  deployer.deploy(DEX, Collateral.address, 10);
};
