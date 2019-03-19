import React, { useState } from 'react';
import { Modal, Form } from 'antd';
import ButtonNext from "../../elements/ButtonNext/ButtonNext";
import CurrencyInput from '../../elements/CurrencyInput/CurrencyInput';
import styles from './CLOEnterCurrAndAmount.module.css';
import './CLOEnterCurrAndAmount.css';

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
				title="Limit order"
				width={400}
				className="CLOEnterCurrAndAmount_modal"
				onCancel={() => setMVisible(false)}
			>
				<Form onSubmit={onSubmit} layout="vertical">
					<Form.Item label="You pay" className={styles.youPayCntr}>
						<CurrencyInput
							onInput={(input) => setYouPay(input)}
							defaultCurrency={'ETH'}
							title='You pay'
						/>
					</Form.Item>
					<Form.Item className={styles.exchangeIconCntr}>
						<img className={styles.exchangeIcon} src="/img/icons8-up-down-arrow-52.png" alt="/img/icons8-up-down-arrow-52.png" />
					</Form.Item>
					<Form.Item label="You got" className={styles.youGotCntr}>
						<CurrencyInput
							onInput={(input) => setYouGot(input)}
							defaultCurrency={'BTC'}
							title='You got'
						/>
					</Form.Item>
					<Form.Item className={styles.continueBtnCntr}>
						<ButtonNext
							className={styles.continueBtn}
							caption="Continue"
							htmlType="submit"
						/>
					</Form.Item>
				</Form>
			</Modal>
		</div >
	)
}