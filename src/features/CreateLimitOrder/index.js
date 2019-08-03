import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
// import ButtonNext from "../../elements/ButtonNext/ButtonNext";
// import CurrencyInput from '../../elements/CurrencyInput/CurrencyInput';
// import StepTitle from '../../elements/StepTitle/StepTitle';
import CreateLimitOrderStepOne from '../../components/CreateLimitOrderStepOne';
import styles from './CreateLimitOrder.module.css';
import useIpfsFactory from '../../hooks/use-ipfs-factory.js'
import useIpfs from '../../hooks/use-ipfs.js'
import { MARKET_ID, signMakerOrder } from '../../relayBackend/relayApi';
import './CreateLimitOrder.scss';

async function makeOrder(web3, ipfs, contracts, account, order) {
    const { Exchange, Collateral } = contracts;

    const collateralBalance = await Collateral.methods.balanceOf(account).call();
    console.log('Collateral balance = '+collateralBalance);
    if (collateralBalance < order.collateral) {
        console.log('Balance is low, request more');
        await web3.eth.sendTransaction({from: account, to: Collateral.address, value: order.collateral, gas: 200000});
    }

    const allowance = await Collateral.methods.allowance(account, Exchange.address).call();
    console.log('Allowance = '+allowance);
    if (allowance < order.collateral) {
        console.log('Allowance is low, request more');
        await Collateral.methods.approve.cacheSend(Exchange.address, order.collateral, {from: account, gas: 200000});
    }
    
    console.log("order.collateral is: ", order.collateral)
    return await signMakerOrder(
        ipfs,
        web3,
        account,
        order.address,
        order.receive.abbr === 'BTC' ? order.receive.amount * 10**8 : undefined,
        order.send.abbr === 'ETH' ? web3.utils.toWei(order.send.amount.toString(), 'ether') : undefined,
        order.collateral
    );
}

const CreateLimitOrder = ({ visible, onClose, drizzle, account }) => {
	const { contracts, web3 } = drizzle;
    const { ipfs, ipfsInitError } = useIpfsFactory({ commands: ['id', 'add', 'get'] });

	return (
		<div>
			<Modal
				visible={visible}
				footer={null}
				width={790}
				className="CreateLimitOrder_modal"
				onCancel={onClose}
			>
				<div className={styles.cntr}>
					<div className={styles.stepsMenuCntr}>
						{/* <StepTitle stepNumber={1} /> */}
						{/* <StepTitle stepNumber={2} /> */}
						<div>
							<h2>1</h2>
							<p>step</p>
							<div className="step stepBlue"></div>
						</div>
						<div>
							<h2>2</h2>
							<p>step</p>
							<div className="step"></div>
						</div>
					</div>
					<div className={styles.stepCntr}>
						<CreateLimitOrderStepOne
							onContinue={async (order) => {
								onClose();

                                order.collateral = 10**16;
                                console.log(order);
								const signed = await makeOrder(web3, ipfs, contracts, account, order);
                                const buf = Buffer.from(JSON.stringify(signed), 'utf8');
                                console.log(signed);
                                console.log(buf);
                                setInterval(() => {
                                    ipfs.pubsub.publish(MARKET_ID, buf, (err) => {
                                        if (err) {
                                            return console.error(`failed to publish to ${MARKET_ID}`, err)
                                        }
                                        console.log(`published to ${MARKET_ID}`)
                                    });
                                }, 2000);
							}}
							send={{
								abbr: 'ETH',
								amount: 120
							}}
							receive={{
								abbr: 'BTC',
								amount: 4
							}}
							priceCalc={(sendAmount, receiveAmount) => sendAmount / receiveAmount}
							onPriceChange={(sendAmount, receiveAmount, priceChange) => {
								let oldPrice = sendAmount / receiveAmount;
								let newPrice = oldPrice + priceChange;
								let newReceiveAmount = sendAmount / newPrice;
								return { newSendAmount: undefined, newReceiveAmount: newReceiveAmount };
							}}
						/>
					</div>
				</div>
			</Modal>
		</div >
	)
}

function onClose(id) {
	console.log(id)
	return {
		type: 'CREATE_LIMIT_ORDER_STOP',
		payload: id
	}
}

function mapState(state) {
	console.log(state);

	return {
		visible: state.createLimitOrder.visible,
	}

}

export default connect(mapState, { onClose })(CreateLimitOrder);
