import React, { useState } from 'react';
import { Modal, Form } from 'antd';
// import ButtonNext from "../../elements/ButtonNext/ButtonNext";
// import CurrencyInput from '../../elements/CurrencyInput/CurrencyInput';
import StepTitle from '../../elements/StepTitle/StepTitle';
import CreateLimitOrderStepOne from '../../components/CreateLimitOrderStepOne';
import styles from './CreateLimitOrder.module.css';
import './CreateLimitOrder.css';

export default ({ visible }) => {

	const [mVisible, setMVisible] = useState(visible);

	return (
		<div>
			<Modal
				visible={mVisible}
				footer={null}
				width={790}
				className="CreateLimitOrder_modal"
				onCancel={() => setMVisible(false)}
			>
				<div className={styles.cntr}>
					<div className={styles.stepsMenuCntr}>
						<StepTitle stepNumber={1} />
						<StepTitle stepNumber={2} />
					</div>
					<div className={styles.stepCntr}>
						<CreateLimitOrderStepOne
							onContinue={console.log}
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