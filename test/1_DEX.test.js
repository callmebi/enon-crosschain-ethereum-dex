const OwnedOracle = artifacts.require('OwnedOracle');
const Collateral = artifacts.require('Collateral');
const DEX = artifacts.require('DEX');

const helper = require('./helpers/helpers');
const chai = require('chai');
chai.use(require('chai-as-promised'))
chai.use(require('bn-chai')(web3.utils.BN));
chai.should();

contract('DEX', accounts => {
    const collateralSupply = '1000000000000000000';
    const tradingBlocks = 2;
    const minConfirmations = 1;

    const oracleAccount = accounts[4];
    const makerAccount = accounts[1];
    const takerAccount = accounts[2];
    const collateralValue = '100';

    describe('when deployed', () => {
        it('first init params', async () => {
            const dex = await DEX.deployed();
            const oracle = await OwnedOracle.deployed();
            const collateral = await Collateral.deployed();

            // Collateral token
            chai.expect(await collateral.totalSupply()).to.eq.BN(collateralSupply);
            chai.expect(await collateral.balanceOf(makerAccount)).to.eq.BN('1000');
            chai.expect(await collateral.balanceOf(takerAccount)).to.eq.BN('1000');

            // DEX core contract
            (await dex.collateral()).should.equal(collateral.address);
            (await dex.tradingBlocks()).toNumber().should.equal(tradingBlocks);
            (await dex.isTradeOracle(oracle.address)).should.equal(true);
            (await dex.minTransferConfirmations()).toNumber().should.equal(minConfirmations);
            
            // Owned oracle contract
            (await oracle.owner()).should.equal(oracleAccount);
        });
    });

    describe('use cases', () => {
        it('both traders perform a transfer', async () => {
            const dex = await DEX.deployed();
            const oracle = await OwnedOracle.deployed();
            const collateral = await Collateral.deployed();

            await collateral.approve(
                dex.address,
                collateralValue,
                {from: makerAccount}
            ).should.be.fulfilled;

            await collateral.approve(
                dex.address,
                collateralValue,
                {from: takerAccount}
            ).should.be.fulfilled;

            const deadline = await web3.eth.getBlockNumber() + 5;
            const maker = await helper.generateOrder(web3, deadline, collateralValue, makerAccount);
            const taker = await helper.generateOrder(web3, deadline, collateralValue, takerAccount);

            const openTx = await dex.openTrade(
                maker.data,
                deadline,
                maker.signature,
                taker.data,
                deadline,
                taker.signature,
                collateralValue
            ).should.be.fulfilled;

            openTx.logs[2].event.should.equal('TradeOpened');
            const tradeId = openTx.logs[2].args.trade_id;

            chai.expect(await collateral.balanceOf(dex.address)).to.eq.BN('200');

            let trade = await dex.trades(tradeId);
            trade.taker.should.equal(takerAccount);
            trade.maker.should.equal(makerAccount);
            chai.expect(trade.openBlock).to.eq.BN(openTx.receipt.blockNumber);
            chai.expect(trade.closeBlock).to.eq.BN('0');
            chai.expect(trade.collateralValue).to.eq.BN(collateralValue);

            await oracle.confirmTransfer(
                takerAccount,
                {from: oracleAccount}
            ).should.be.fulfilled;

            await oracle.confirmTransfer(
                makerAccount,
                {from: oracleAccount}
            ).should.be.fulfilled;

            const closeTx = await dex.closeTrade(
                tradeId,
                {from: oracleAccount}
            ).should.be.fulfilled;

            closeTx.logs[0].event.should.equal('TradeClosed');
            chai.expect(closeTx.logs[0].args.trade_id).to.eq.BN(tradeId);

            trade = await dex.trades(tradeId);
            chai.expect(trade.closeBlock).to.eq.BN(closeTx.receipt.blockNumber);

            chai.expect(await collateral.balanceOf(makerAccount)).to.eq.BN('1000');
            chai.expect(await collateral.balanceOf(takerAccount)).to.eq.BN('1000');
        });

        it('maker does not perform a transfer', async () => {
            const dex = await DEX.deployed();
            const oracle = await OwnedOracle.deployed();
            const collateral = await Collateral.deployed();

            await collateral.approve(
                dex.address,
                collateralValue,
                {from: makerAccount}
            ).should.be.fulfilled;

            await collateral.approve(
                dex.address,
                collateralValue,
                {from: takerAccount}
            ).should.be.fulfilled;

            const deadline = await web3.eth.getBlockNumber() + 5;
            const maker = await helper.generateOrder(web3, deadline, collateralValue, makerAccount);
            const taker = await helper.generateOrder(web3, deadline, collateralValue, takerAccount);

            const openTx = await dex.openTrade(
                maker.data,
                deadline,
                maker.signature,
                taker.data,
                deadline,
                taker.signature,
                collateralValue
            ).should.be.fulfilled;

            openTx.logs[2].event.should.equal('TradeOpened');
            const tradeId = openTx.logs[2].args.trade_id;

            chai.expect(await collateral.balanceOf(dex.address)).to.eq.BN('200');

            let trade = await dex.trades(tradeId);
            trade.taker.should.equal(takerAccount);
            trade.maker.should.equal(makerAccount);
            chai.expect(trade.openBlock).to.eq.BN(openTx.receipt.blockNumber);
            chai.expect(trade.closeBlock).to.eq.BN('0');
            chai.expect(trade.collateralValue).to.eq.BN(collateralValue);

            await oracle.confirmTransfer(
                takerAccount,
                {from: oracleAccount}
            ).should.be.fulfilled;

            // noop oracle transaction (omit maker transfer)
            await web3.eth.sendTransaction({from: oracleAccount, to: oracleAccount});

            const closeTx = await dex.closeTrade(
                tradeId,
                {from: oracleAccount}
            ).should.be.fulfilled;

            closeTx.logs[0].event.should.equal('TradeClosed');
            chai.expect(closeTx.logs[0].args.trade_id).to.eq.BN(tradeId);

            trade = await dex.trades(tradeId);
            chai.expect(trade.closeBlock).to.eq.BN(closeTx.receipt.blockNumber);

            chai.expect(await collateral.balanceOf(makerAccount)).to.eq.BN('900');
            chai.expect(await collateral.balanceOf(takerAccount)).to.eq.BN('1100');
        });

        it('taker does not perform a transfer', async () => {
            const dex = await DEX.deployed();
            const oracle = await OwnedOracle.deployed();
            const collateral = await Collateral.deployed();

            await collateral.approve(
                dex.address,
                collateralValue,
                {from: makerAccount}
            ).should.be.fulfilled;

            await collateral.approve(
                dex.address,
                collateralValue,
                {from: takerAccount}
            ).should.be.fulfilled;

            const deadline = await web3.eth.getBlockNumber() + 5;
            const maker = await helper.generateOrder(web3, deadline, collateralValue, makerAccount);
            const taker = await helper.generateOrder(web3, deadline, collateralValue, takerAccount);

            const openTx = await dex.openTrade(
                maker.data,
                deadline,
                maker.signature,
                taker.data,
                deadline,
                taker.signature,
                collateralValue
            ).should.be.fulfilled;

            openTx.logs[2].event.should.equal('TradeOpened');
            const tradeId = openTx.logs[2].args.trade_id;

            chai.expect(await collateral.balanceOf(dex.address)).to.eq.BN('200');

            let trade = await dex.trades(tradeId);
            trade.taker.should.equal(takerAccount);
            trade.maker.should.equal(makerAccount);
            chai.expect(trade.openBlock).to.eq.BN(openTx.receipt.blockNumber);
            chai.expect(trade.closeBlock).to.eq.BN('0');
            chai.expect(trade.collateralValue).to.eq.BN(collateralValue);

            // noop oracle transaction (omit taker transfer)
            await web3.eth.sendTransaction({from: oracleAccount, to: oracleAccount});

            await oracle.confirmTransfer(
                makerAccount,
                {from: oracleAccount}
            ).should.be.fulfilled;

            const closeTx = await dex.closeTrade(
                tradeId,
                {from: oracleAccount}
            ).should.be.fulfilled;

            closeTx.logs[0].event.should.equal('TradeClosed');
            chai.expect(closeTx.logs[0].args.trade_id).to.eq.BN(tradeId);

            trade = await dex.trades(tradeId);
            chai.expect(trade.closeBlock).to.eq.BN(closeTx.receipt.blockNumber);

            chai.expect(await collateral.balanceOf(makerAccount)).to.eq.BN('1000');
            chai.expect(await collateral.balanceOf(takerAccount)).to.eq.BN('1000');
        });

        it('both traders are offline', async () => {
            const dex = await DEX.deployed();
            const collateral = await Collateral.deployed();

            await collateral.approve(
                dex.address,
                collateralValue,
                {from: makerAccount}
            ).should.be.fulfilled;

            await collateral.approve(
                dex.address,
                collateralValue,
                {from: takerAccount}
            ).should.be.fulfilled;

            const deadline = await web3.eth.getBlockNumber() + 5;
            const maker = await helper.generateOrder(web3, deadline, collateralValue, makerAccount);
            const taker = await helper.generateOrder(web3, deadline, collateralValue, takerAccount);

            const openTx = await dex.openTrade(
                maker.data,
                deadline,
                maker.signature,
                taker.data,
                deadline,
                taker.signature,
                collateralValue
            ).should.be.fulfilled;

            openTx.logs[2].event.should.equal('TradeOpened');
            const tradeId = openTx.logs[2].args.trade_id;

            chai.expect(await collateral.balanceOf(dex.address)).to.eq.BN('200');

            let trade = await dex.trades(tradeId);
            trade.taker.should.equal(takerAccount);
            trade.maker.should.equal(makerAccount);
            chai.expect(trade.openBlock).to.eq.BN(openTx.receipt.blockNumber);
            chai.expect(trade.closeBlock).to.eq.BN('0');
            chai.expect(trade.collateralValue).to.eq.BN(collateralValue);

            // noop oracle transaction (omit taker transfer)
            await web3.eth.sendTransaction({from: oracleAccount, to: oracleAccount});

            // noop oracle transaction (omit maker transfer)
            await web3.eth.sendTransaction({from: oracleAccount, to: oracleAccount});

            const closeTx = await dex.closeTrade(
                tradeId,
                {from: oracleAccount}
            ).should.be.fulfilled;

            closeTx.logs[0].event.should.equal('TradeClosed');
            chai.expect(closeTx.logs[0].args.trade_id).to.eq.BN(tradeId);

            trade = await dex.trades(tradeId);
            chai.expect(trade.closeBlock).to.eq.BN(closeTx.receipt.blockNumber);

            chai.expect(await collateral.balanceOf(makerAccount)).to.eq.BN('1000');
            chai.expect(await collateral.balanceOf(takerAccount)).to.eq.BN('1000');
        });
    });

    describe('security checks', () => {
        it('try to confirm transfer from non oracle account', async () => {
            const dex = await DEX.deployed();
            const collateral = await Collateral.deployed();

            await collateral.approve(
                dex.address,
                collateralValue,
                {from: makerAccount}
            ).should.be.fulfilled;

            await collateral.approve(
                dex.address,
                collateralValue,
                {from: takerAccount}
            ).should.be.fulfilled;

            const deadline = await web3.eth.getBlockNumber() + 5;
            const maker = await helper.generateOrder(web3, deadline, collateralValue, makerAccount);
            const taker = await helper.generateOrder(web3, deadline, collateralValue, takerAccount);

            const openTx = await dex.openTrade(
                maker.data,
                deadline,
                maker.signature,
                taker.data,
                deadline,
                taker.signature,
                collateralValue
            ).should.be.fulfilled;

            openTx.logs[2].event.should.equal('TradeOpened');
            const tradeId = openTx.logs[2].args.trade_id;

            chai.expect(await collateral.balanceOf(dex.address)).to.eq.BN('200');

            let trade = await dex.trades(tradeId);
            trade.taker.should.equal(takerAccount);
            trade.maker.should.equal(makerAccount);
            chai.expect(trade.openBlock).to.eq.BN(openTx.receipt.blockNumber);
            chai.expect(trade.closeBlock).to.eq.BN('0');
            chai.expect(trade.collateralValue).to.eq.BN(collateralValue);

            await dex.confirmTransfer(
                tradeId,
                takerAccount,
                {from: takerAccount}
            ).should.be.rejected;

            await dex.confirmTransfer(
                tradeId,
                makerAccount,
                {from: makerAccount}
            ).should.be.rejected;
        });

        it('try to double trade with one order', async () => {
            const dex = await DEX.deployed();
            const collateral = await Collateral.deployed();

            await collateral.approve(
                dex.address,
                collateralValue,
                {from: makerAccount}
            ).should.be.fulfilled;

            await collateral.approve(
                dex.address,
                collateralValue,
                {from: takerAccount}
            ).should.be.fulfilled;

            const deadline = await web3.eth.getBlockNumber() + 5;
            const maker = await helper.generateOrder(web3, deadline, collateralValue, makerAccount);
            const taker = await helper.generateOrder(web3, deadline, collateralValue, takerAccount);

            const openTx = await dex.openTrade(
                maker.data,
                deadline,
                maker.signature,
                taker.data,
                deadline,
                taker.signature,
                collateralValue
            ).should.be.fulfilled;

            const maker2 = await helper.generateOrder(web3, deadline, collateralValue, makerAccount);
            const openTx2 = await dex.openTrade(
                maker2.data,
                deadline,
                maker2.signature,
                taker.data,
                deadline,
                taker.signature,
                collateralValue
            ).should.be.rejected;
        });
    });
});
