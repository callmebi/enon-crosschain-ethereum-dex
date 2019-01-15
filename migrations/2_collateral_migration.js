var Collateral = artifacts.require("./Collateral.sol");

module.exports = function(deployer) {
  deployer.deploy(Collateral, "1000000000000000000");
};
