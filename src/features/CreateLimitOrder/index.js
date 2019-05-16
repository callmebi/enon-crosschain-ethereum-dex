import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
// import ButtonNext from "../../elements/ButtonNext/ButtonNext";
// import CurrencyInput from '../../elements/CurrencyInput/CurrencyInput';
// import StepTitle from '../../elements/StepTitle/StepTitle';
import CreateLimitOrderStepOne from '../../components/CreateLimitOrderStepOne';
import styles from './CreateLimitOrder.module.css';
import { makeOrder } from '../../relayBackend/relayApi';
import './CreateLimitOrder.scss';

const CreateLimitOrder = ({ visible, onClose, ipfs, drizzle, account }) => {
	const { contracts, web3 } = drizzle;
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
							onContinue={(order) => {
								onClose();
								order.collateral = web3.utils.toWei('1', 'ether');
								console.log(order);
								makeOrder(contracts, ipfs, web3, account, order);
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
