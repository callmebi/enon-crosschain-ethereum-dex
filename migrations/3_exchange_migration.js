const OwnedOracle = artifacts.require('OwnedOracle');
const Collateral = artifacts.require('Collateral');
const Exchange = artifacts.require('Exchange');

module.exports = (deployer, network, accounts) => {
  const oracleAccount = accounts[4];
  deployer.deploy(Exchange, Collateral.address).then(dex => {
    if (network.startsWith('development'))
        return deployer.deploy(OwnedOracle, dex.address, oracleAccount);
  });
};
