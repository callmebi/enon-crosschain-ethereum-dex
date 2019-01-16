var Collateral = artifacts.require("./Collateral.sol");

module.exports = function(deployer, networks, accounts) {
  const collateralSupply = "1000000000000000000";
  deployer.deploy(Collateral, collateralSupply).then(async token => {
    await token.transfer(accounts[1], "1000");
    await token.transfer(accounts[2], "1000");
  });
};
