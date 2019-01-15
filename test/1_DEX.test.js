const DEX = artifacts.require('DEX');
const Collateral = artifacts.require('Collateral');

const chai = require('chai');
chai.use(require('chai-as-promised'))
chai.should();

contract('DEX', () => {

    describe('when deployed', () => {
        it('first init params', async () => {
            const dex = await DEX.deployed();
            const collateral = await Collateral.deployed();

            (await dex.collateral()).should.equal(collateral.address);
            (await dex.tradingBlocks()).toNumber().should.equal(10);
        });
    });

});
