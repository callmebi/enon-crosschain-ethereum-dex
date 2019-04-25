import React, { useState } from 'react';
import { Alert } from 'antd';
import ButtonNext from "../../elements/ButtonNext/ButtonNext";
import CurrencyInput from '../../elements/CurrencyInput/CurrencyInput';
import styles from './CreateLimitOrderStepOne.module.css';
import './CreateLimitOrderStepOne.css';
import ChangeAmount from '../../elements/ChangeAmount/ChangeAmount';
import ENInput from '../../elements/ENInput/ENInput';

/** 
 * @module CreateLimitOrderStepOne 
 * The CreateLimitOrderStepOne component.
 */

/**
 * This callback handles the trade data submiting.
 * @callback onContinue
 * @param {Object} limitOrderData - How much and which currency will be trading.
 * @param {Object} limitOrderData.send - How much and which currency will be sending.
 * @param {number} limitOrderData.send.amount - Currency amount to send.
 * @param {string} limitOrderData.send.abbr - Currency abbreviation that will be sent.
 * @param {Object} limitOrderData.receive - How much and which currency will be receiving.
 * @param {number} limitOrderData.receive.amount - Currency amount to receive while trade.
 * @param {string} limitOrderData.receive.abbr - Currency abbreviation that will be received.
 * @param {string} limitOrderData.address - Blockchain account address to receive cryptocurrency.
 */

/**
 * This function calculates the price of the currency for the limit order.
 * @callback priceCalc
 * @param {number} receiveAmount - Currency amount that would be buyed.
 * @param {number} sendAmount - Currency amount that would be sell.
 * @returns {number} price - The price of the buying currency. 
 */
/**
 * This callback handles event when a user change the price.
 * The callback defines what should be done either send amount or receive amount changes or something else.
 * @callback onPriceChange
 * @param {number} receiveAmount - Currency amount that would be buyed.
 * @param {number} sendAmount - Currency amount that would be sell.
 * @param {number} pChange - Change of the price.
 * @returns {{newSendAmount:number, newReceiveAmount:number}} newAmountToTrade - Amount to buy or to sell based on new price.
 */

/**
 * Function that creates React's CreateLimitOrderStepOne component.
 * The CreateLimitOrderStepOne component that lets a user to submit data required to create new limit order.
 * @function CreateLimitOrderStepOne
 * @param {TradeCurrency} send - Default amount and currency abbreviation that would be sell.
 * @param {TradeCurrency} receive - Default amount and currency abbreviation that would be buyed.
 * @param {priceCalc} priceCalc - D.
 * @param {onPriceChange} onPriceChange - D.
 * @param {onContinue} onContinue - The callback that handles the limit order data submiting. 
 */
export default ({ onContinue, send, receive, priceCalc, onPriceChange }) => {

	const sendDefault = send ? send : { amount: undefined, abbr: 'ETH' };
	const receiveDefault = receive ? receive : { amount: undefined, abbr: 'ETH' };

	const [youPay, setYouPay] = useState(sendDefault);
	const [youGot, setYouGot] = useState(receiveDefault);
	const [address, setAddress] = useState('');
	const [reconfirm, setReconfirm] = useState('');
	const [validationError, setValidationError] = useState(null)

	function onBtnClick(e) {
		e.preventDefault()
		onContinue({
			send: youPay,
			receive: youGot,
			address: (address === reconfirm) ? address : new Error('Address does not match re-confirm!')
		}, e)
	}

	function priceChangeHandle(diff) {

		let pChange = diff;
		let onPriceChangeOutput = onPriceChange(youPay.amount, youGot.amount, pChange);

		youPay.amount = onPriceChangeOutput.newSendAmount ? onPriceChangeOutput.newSendAmount : youPay.amount;
		youGot.amount = onPriceChangeOutput.newReceiveAmount ? onPriceChangeOutput.newReceiveAmount : youGot.amount;

		setYouPay({
			amount: youPay.amount,
			abbr: youPay.abbr
		});
		setYouGot({
			amount: youGot.amount,
			abbr: youGot.abbr
		})

	}

	function onCurrencyInput(input, set) {
		console.log(input);

		if (!input.err) {
			set(input)
			setValidationError(null)
		}
		else {
			set(input)
			setValidationError(input.err.message)
		}

	}

	return (
		<div className={styles.cntr}>
			<div className={styles.title}>Create limit order</div>
			<div className={styles.content}>
				{validationError && <Alert
					message="Validation error"
					description={validationError}
					type="error"
					showIcon
				/>}
				<div className={styles.exchangeCntr}>
					<CurrencyInput
						onInput={input => onCurrencyInput(input, setYouPay)}
						title='Send'
						className={styles.sendInput}
						defaultCurrency={youPay.abbr}
						defaultValue={youPay.amount}
						inputValue={youPay.amount}
					/>
					<img className={styles.exchangeIcon} src="/img/images/icons8-left-and-right-arrows-96_1icons8-left-and-right-arrows-96.png" alt="/img/images/icons8-left-and-right-arrows-96_1icons8-left-and-right-arrows-96.png" />
					<CurrencyInput
						onInput={input => onCurrencyInput(input, setYouGot)}
						title='Receive'
						className={styles.receiveInput}
						defaultCurrency={youGot.abbr}
						defaultValue={youGot.amount}
						inputValue={youGot.amount}
					/>
				</div>
				<div className={styles.priceCntr}>
					<span className={styles.priceCntrTitle}>{youGot.abbr} price</span>
					<span className={styles.price}>1 {youGot.abbr} = {priceCalc(youGot.amount, youPay.amount)} {youPay.abbr}  </span>
					<span className={styles.priceChangerCntr}>
						<ChangeAmount onAmountChange={(e, diff) => priceChangeHandle(diff)} />
					</span>
				</div>
				<div className={styles.receivingAddressCntr}>
					<div className={styles.receivingAddresTitle}>Your receiving {youGot.abbr} address</div>
					<div className={styles.receivingAddressInputCntr}>
						<ENInput onChange={e => setAddress(e.target.value)} className={styles.address} placeholder="Address" />
						<ENInput onChange={e => setReconfirm(e.target.value)} className={styles.reconfirm} placeholder="Re-confirm" />
					</div>
				</div>
				<div className={styles.continueBtnCntr}>
					<ButtonNext
						className={styles.continueBtn}
						caption="Continue"
						onClick={onBtnClick}
					/>
				</div>
			</div>
		</div >
	)
}