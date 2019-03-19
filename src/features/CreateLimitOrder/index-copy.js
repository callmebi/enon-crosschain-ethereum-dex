import React, { useState } from 'react';
import { Modal, Form } from 'antd';
import ButtonNext from "../../elements/ButtonNext/ButtonNext";
import CurrencyInput from '../../elements/CurrencyInput/CurrencyInput';
import StepTitle from '../../elements/StepTitle/StepTitle';
import CreateLImitOrderStepOne from '../../components/CreateLImitOrderStepOne';
import styles from './CreateLimitOrder.module.css';
import './CreateLimitOrder.css';

export default ({ onContinue, visible }) => {

	const [mVisible, setMVisible] = useState(visible);

	const [youPay, setYouPay] = useState({ amount: undefined, abbr: 'ETH' });
	const [youGot, setYouGot] = useState({ amount: undefined, abbr: 'ETH' });

	function onSubmit(e) {
		e.preventDefault()
		onContinue({
			you_pay: youPay,
			you_got: youGot
		}, e)
	}

	return (
		<div>
			<Modal
				visible={mVisible}
				footer={null}
				width={790}
				className="CreateLimitOrder_modal"
				onCancel={() => setMVisible(false)}
			>
			<div>
				<div className="stepsMenuCntr">
					<StepTitle stepNumber={1} />
					<StepTitle stepNumber={2} />
				</div>
				<div className="stepCntr">
					<CreateLImitOrderStepOne />
				</div>				
			</div>
			</Modal>
		</div >
	)
}