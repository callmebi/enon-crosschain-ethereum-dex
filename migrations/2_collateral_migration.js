const Collateral = artifacts.require('Collateral');

module.exports = (deployer, network, accounts) => {
  if (network.startsWith('development')) {
    const collateralSupply = '1000000000000000000';
    deployer.deploy(Collateral, collateralSupply).then(async token => {
      if (network.startsWith('development')) {
        await token.transfer(accounts[1], '1000');
      }
    });
  }
};
