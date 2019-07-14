const OraclizeOracle = artifacts.require('OraclizeOracle');
const OwnedOracle = artifacts.require('OwnedOracle');
const Collateral = artifacts.require('Collateral');
const Exchange = artifacts.require('Exchange');

module.exports = (deployer, network, accounts) => {
  if (network.startsWith('development'))
    deployer.deploy(Exchange, Collateral.address).then(dex => {
      const oracleAccount = accounts[4];
      return deployer.deploy(OwnedOracle, dex.address, oracleAccount);
    });
  else if (network.startsWith('kovan'))
    deployer.deploy(Exchange, "0xd0A1E359811322d97991E03f863a0C30C2cF029C");
  else if (network.startsWith('ropsten'))
    deployer.deploy(Exchange, "0xc778417e063141139fce010982780140aa0cd5ab");
};
