const OraclizeOracle = artifacts.require('OraclizeOracle');
const OwnedOracle = artifacts.require('OwnedOracle');
const Collateral = artifacts.require('Collateral');
const Exchange = artifacts.require('Exchange');

module.exports = (deployer, network, accounts) => {
  const oracleAccount = accounts[4];
  if (network.startsWith('development'))
    deployer.deploy(Exchange, Collateral.address).then(dex => {
      return deployer.deploy(OwnedOracle, dex.address, oracleAccount);
    });
  else if (network.startsWith('kovan'))
    deployer.deploy(Exchange, "0xd0A1E359811322d97991E03f863a0C30C2cF029C").then(dex => {
      return deployer.deploy(OraclizeOracle, dex.address);
    });
};
