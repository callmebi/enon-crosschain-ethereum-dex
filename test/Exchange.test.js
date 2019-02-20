const OwnedOracle = artifacts.require('OwnedOracle');
const Collateral = artifacts.require('Collateral');
const Exchange = artifacts.require('Exchange');

const helper = require('./helpers/helpers');
const chai = require('chai');
chai.use(require('chai-as-promised'))
chai.use(require('bn-chai')(web3.utils.BN));
chai.should();

contract('DEX', accounts => {
    const collateralSupply = '1000000000000000000';
    const makerTimeout = 2;
    const takerTimeout = 3;
    const minConfirmations = 1;

    const oracleAccount = accounts[4];
    const makerAccount = accounts[1];
    const takerAccount = accounts[2];
    const collateral = '100';

    let marketId;
    let oracle;
    let token;
    let dex;

    describe('when deployed', () => {
        it('first init params', async () => {
            dex = await Exchange.deployed();
            token = await Collateral.deployed();

            // Collateral token
            chai.expect(await token.totalSupply()).to.eq.BN(collateralSupply);
            chai.expect(await token.balanceOf(makerAccount)).to.eq.BN('1000');
            chai.expect(await token.balanceOf(takerAccount)).to.eq.BN('0');

            // DEX core contract
            (await dex.token()).should.equal(token.address);

            // Owned oracle contract
            oracle = await OwnedOracle.deployed();
            (await oracle.owner()).should.equal(oracleAccount);
            (await oracle.dex()).should.equal(dex.address);
        });

        it('test market params', async () => {
            const tx = await dex.addMarket(
                makerTimeout,
                takerTimeout,
                [ oracle.address ],
                minConfirmations
            ).should.be.fulfilled;

            tx.logs[0].event.should.equal('NewMarket');
            marketId = tx.logs[0].args.id;

            const market = await dex.getMarket(marketId);
            market.makerTimeout.toNumber().should.equal(makerTimeout);
            market.takerTimeout.toNumber().should.equal(takerTimeout);
            market.oracles[0].should.equal(OwnedOracle.address);
            market.minimalConfirmations.toNumber().should.equal(minConfirmations);
        });
    });

    describe('use cases', () => {
        it('both traders perform a transfer', async () => {
            await token.approve(
                dex.address,
                collateral,
                {from: makerAccount}
            ).should.be.fulfilled;

            const deadline = await web3.eth.getBlockNumber() + 5;
            const maker = await helper.genMakerOrder(web3, marketId, deadline, collateral, makerAccount);
            const taker = await helper.genTakerOrder(web3, marketId, deadline, takerAccount);

            let tx = await dex.startTrade(
                maker.order,
                maker.signature,
                taker.order,
                taker.signature
            ).should.be.fulfilled;

            tx.logs[2].event.should.equal('TradeStart');
            const tradeId = tx.logs[2].args.id;

            chai.expect(await token.balanceOf(dex.address)).to.eq.BN('100');

            let trade = await dex.getTrade(tradeId);
            trade.taker.should.equal(takerAccount);
            trade.maker.should.equal(makerAccount);
            chai.expect(trade.startBlock).to.eq.BN(tx.receipt.blockNumber);
            chai.expect(trade.partialBlock).to.eq.BN('0');
            chai.expect(trade.finishBlock).to.eq.BN('0');
            chai.expect(trade.collateral).to.eq.BN(collateral);

            const authority = await Exchange.at(oracle.address);
            tx = await authority.confirmTakerTransfer(
                tradeId,
                {from: oracleAccount}
            ).should.be.fulfilled;
            tx.logs[1].event.should.equal('TakerTransferConfirmed');

            trade = await dex.getTrade(tradeId);
            chai.expect(trade.partialBlock).to.eq.BN(tx.receipt.blockNumber);

            tx = await authority.confirmMakerTransfer(
                tradeId,
                {from: oracleAccount}
            ).should.be.fulfilled;
            tx.logs[1].event.should.equal('MakerTransferConfirmed');

            tx.logs[2].event.should.equal('TradeFinish');
            chai.expect(tx.logs[2].args.id).to.eq.BN(tradeId);

            trade = await dex.getTrade(tradeId);
            chai.expect(trade.finishBlock).to.eq.BN(tx.receipt.blockNumber);

            chai.expect(await token.balanceOf(makerAccount)).to.eq.BN('1000');
        });

        it('maker does not perform a transfer', async () => {
            await token.approve(
                dex.address,
                collateral,
                {from: makerAccount}
            ).should.be.fulfilled;

            const deadline = await web3.eth.getBlockNumber() + 5;
            const maker = await helper.genMakerOrder(web3, marketId, deadline, collateral, makerAccount);
            const taker = await helper.genTakerOrder(web3, marketId, deadline, takerAccount);

            let tx = await dex.startTrade(
                maker.order,
                maker.signature,
                taker.order,
                taker.signature
            ).should.be.fulfilled;

            tx.logs[2].event.should.equal('TradeStart');
            const tradeId = tx.logs[2].args.id;

            chai.expect(await token.balanceOf(dex.address)).to.eq.BN('100');

            let trade = await dex.getTrade(tradeId);
            trade.taker.should.equal(takerAccount);
            trade.maker.should.equal(makerAccount);
            chai.expect(trade.startBlock).to.eq.BN(tx.receipt.blockNumber);
            chai.expect(trade.partialBlock).to.eq.BN('0');
            chai.expect(trade.finishBlock).to.eq.BN('0');
            chai.expect(trade.collateral).to.eq.BN(collateral);

            const authority = await Exchange.at(oracle.address);
            tx = await authority.confirmTakerTransfer(
                tradeId,
                {from: oracleAccount}
            ).should.be.fulfilled;
            tx.logs[1].event.should.equal('TakerTransferConfirmed');

            trade = await dex.getTrade(tradeId);
            chai.expect(trade.partialBlock).to.eq.BN(tx.receipt.blockNumber);

            // noop oracle transaction (omit maker transfer for 2 blocks)
            await web3.eth.sendTransaction({from: oracleAccount, to: oracleAccount});

            // Try to finish before maker timeout
            await dex.finishTrade(
                tradeId,
                {from: takerAccount}
            ).should.be.rejected;

            await web3.eth.sendTransaction({from: oracleAccount, to: oracleAccount});

            // Taker finish trade and get refund
            tx = await dex.finishTrade(
                tradeId,
                {from: takerAccount}
            ).should.be.fulfilled;
            tx.logs[0].event.should.equal('TradeFinish');
            chai.expect(tx.logs[0].args.id).to.eq.BN(tradeId);

            trade = await dex.getTrade(tradeId);
            chai.expect(trade.finishBlock).to.eq.BN(tx.receipt.blockNumber);

            chai.expect(await token.balanceOf(takerAccount)).to.eq.BN(collateral);
        });

        it('taker does not perform a transfer', async () => {
            await token.approve(
                dex.address,
                collateral,
                {from: makerAccount}
            ).should.be.fulfilled;
            chai.expect(await token.balanceOf(makerAccount)).to.eq.BN('900');

            const deadline = await web3.eth.getBlockNumber() + 5;
            const maker = await helper.genMakerOrder(web3, marketId, deadline, collateral, makerAccount);
            const taker = await helper.genTakerOrder(web3, marketId, deadline, takerAccount);

            let tx = await dex.startTrade(
                maker.order,
                maker.signature,
                taker.order,
                taker.signature
            ).should.be.fulfilled;

            tx.logs[2].event.should.equal('TradeStart');
            const tradeId = tx.logs[2].args.id;

            chai.expect(await token.balanceOf(dex.address)).to.eq.BN('100');

            let trade = await dex.getTrade(tradeId);
            trade.taker.should.equal(takerAccount);
            trade.maker.should.equal(makerAccount);
            chai.expect(trade.startBlock).to.eq.BN(tx.receipt.blockNumber);
            chai.expect(trade.partialBlock).to.eq.BN('0');
            chai.expect(trade.finishBlock).to.eq.BN('0');
            chai.expect(trade.collateral).to.eq.BN(collateral);

            // noop oracle transaction (omit taker transfer for 1 blocks)
            await web3.eth.sendTransaction({from: oracleAccount, to: oracleAccount});

            // Try to finish before taker timeout
            await dex.finishTrade(
                tradeId,
                {from: makerAccount}
            ).should.be.rejected;

            // noop oracle transaction (omit taker transfer for 2 blocks)
            await web3.eth.sendTransaction({from: oracleAccount, to: oracleAccount});
            await web3.eth.sendTransaction({from: oracleAccount, to: oracleAccount});

            // Maker finish trade and get refund
            tx = await dex.finishTrade(
                tradeId,
                {from: makerAccount}
            ).should.be.fulfilled;
            tx.logs[0].event.should.equal('TradeFinish');
            chai.expect(tx.logs[0].args.id).to.eq.BN(tradeId);

            trade = await dex.getTrade(tradeId);
            chai.expect(trade.finishBlock).to.eq.BN(tx.receipt.blockNumber);

            chai.expect(await token.balanceOf(makerAccount)).to.eq.BN('900');
        });
    });

    describe('security checks', () => {
        it('try to confirm transfer from non oracle account', async () => {
            await token.approve(
                dex.address,
                collateral,
                {from: makerAccount}
            ).should.be.fulfilled;

            const deadline = await web3.eth.getBlockNumber() + 5;
            const maker = await helper.genMakerOrder(web3, marketId, deadline, collateral, makerAccount);
            const taker = await helper.genTakerOrder(web3, marketId, deadline, takerAccount);

            let tx = await dex.startTrade(
                maker.order,
                maker.signature,
                taker.order,
                taker.signature
            ).should.be.fulfilled;

            tx.logs[2].event.should.equal('TradeStart');
            const tradeId = tx.logs[2].args.id;

            chai.expect(await token.balanceOf(dex.address)).to.eq.BN('100');

            let trade = await dex.getTrade(tradeId);
            trade.taker.should.equal(takerAccount);
            trade.maker.should.equal(makerAccount);
            chai.expect(trade.startBlock).to.eq.BN(tx.receipt.blockNumber);
            chai.expect(trade.partialBlock).to.eq.BN('0');
            chai.expect(trade.finishBlock).to.eq.BN('0');
            chai.expect(trade.collateral).to.eq.BN(collateral);

            await dex.confirmTakerTransfer(
                tradeId,
                {from: takerAccount}
            ).should.be.rejected;
        });

        it('try to double trade with one order', async () => {
            await token.approve(
                dex.address,
                collateral,
                {from: makerAccount}
            ).should.be.fulfilled;

            const deadline = await web3.eth.getBlockNumber() + 5;
            const maker = await helper.genMakerOrder(web3, marketId, deadline, collateral, makerAccount);
            const taker = await helper.genTakerOrder(web3, marketId, deadline, takerAccount);

            await dex.startTrade(
                maker.order,
                maker.signature,
                taker.order,
                taker.signature,
            ).should.be.fulfilled;

            const maker2 = await helper.genMakerOrder(web3, marketId, deadline, collateral, makerAccount);
            await dex.startTrade(
                maker2.order,
                maker2.signature,
                taker.order,
                taker.signature,
            ).should.be.rejected;
        });
    });
});
