import React, { useState } from 'react';
import { Modal, Form, Row, Col } from 'antd';
import ENInput from "../../elements/ENInput/ENInput";
import ButtonNext from "../../elements/ButtonNext/ButtonNext";
import styles from './ReceiveAddressForm.module.css';
import './ReceiveAddressForm.css';

/**
 * The fee to pay for the trade.
 * @typedef {Object} Fee
 * @property {number} amount - Amount of the cryptocurrency for fee.
 * @property {string} abbr - Abbreviation of the currency  for fee e.g. BTC.
 * @property {number} amount_usd - Amount of the cryptocurrency for fee in USD.
 */

/** 
 * @module ReceiveAddressForm 
 * The ReceiveAddressForm component.
 */

/**
 * This callback handles menu clicks.
 * @callback onSubmit
 * @param {string} address - Address that will be used to receive currency during trading.
 */

/**
 * Function that creates React's ReceiveAddressForm component.
 * The ReceiveAddressForm component that lets a user to input address to receive cryptocurrency on during trading.
 * @function ReceiveAddressForm
 * @param {boolean} visible - The component state open or closed
 * @param {OrderItemTradeCurrency} receive - How much and which cryptocurrency a user will receive.
 * @param {Fee} fee - The data of the fee to pay for trade.
 * @param {onSubmit} onSubmit - The callback that handles the form submit. 
 */
export default ({ receive, fee, onSubmit, visible }) => {

	// const defaultVisible = visible;

	const [input_addr, setInputAddr] = useState('');
	const [input_reconfirm, setInputReconfirm] = useState('');
	const [mVisible, setMVisible] = useState(visible);

	function onFormSubmit(e) {
		e.preventDefault();
		if (input_addr == input_reconfirm)
			onSubmit(input_addr, input_reconfirm, e)
		else
			onSubmit(new Error('Submitted Address does not match Re-confirm!'))
	}

	return (
		<div>
			<Modal
				visible={mVisible}
				footer={null}
				width={460}
				className="ReceiveAddressForm_modal"
				onCancel={() => setMVisible(false)}
			>
				<div className={styles.text}>
					{receive.amount} {receive.abbr} will be sent to this address. Please use a new address with 0 balance in it.
				</div>
				<Form onSubmit={onFormSubmit} layout="vertical">
					<Form.Item className={styles.address} label={`${receive.abbr} Address`}>
						<ENInput value={input_addr} onChange={e => { setInputAddr(e.target.value) }} />
					</Form.Item>
					<Form.Item className={styles.reconfirm} label={`Re-confirm ${receive.abbr} Address`}>
						<ENInput value={input_reconfirm} onChange={e => { setInputReconfirm(e.target.value) }} />
					</Form.Item>
					<Form.Item className={styles.submit}>
						<ButtonNext
							htmlType="submit"
							className={styles.submitBtn}
							caption={`Pay fees: ${fee.amount} ${fee.abbr} $(${fee.amount_usd})`}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}