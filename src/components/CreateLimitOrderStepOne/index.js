import React, { useState } from 'react';
// import { Modal, Form } from 'antd';
import ButtonNext from "../../elements/ButtonNext/ButtonNext";
import CurrencyInput from '../../elements/CurrencyInput/CurrencyInput';
import styles from './CreateLimitOrderStepOne.module.css';
import './CreateLimitOrderStepOne.css';
import ChangeAmount from '../../elements/ChangeAmount/ChangeAmount';
import ENInput from '../../elements/ENInput/ENInput';

export default ({ onContinue, send, receive, priceCalc, onPriceChange }) => {

	const sendDefault = send ? send : { amount: undefined, abbr: 'ETH' };
	const receiveDefault = receive ? receive : { amount: undefined, abbr: 'ETH' };

	const [youPay, setYouPay] = useState(sendDefault);
	const [youGot, setYouGot] = useState(receiveDefault);
	const [priceChange, setPriceChange] = useState(0);
	const [address, setAddress] = useState('');
	const [reconfirm, setReconfirm] = useState('');

	function onBtnClick(e) {
		e.preventDefault()
		onContinue({
			send: youPay,
			receive: youGot,
			address: (address === reconfirm) ? address : new Error('Address does not match re-confirm!')
		}, e)
	}

	function priceChangeHandle(diff) {
		setPriceChange(priceChange + diff)
		let pChange = priceChange + diff;

		let onPriceChangeOutput = onPriceChange(youPay.amount, youGot.amount, pChange);

		youPay.amount = onPriceChangeOutput.newSendAmount ? onPriceChangeOutput.newSendAmount : youPay.amount;
		youGot.amount = onPriceChangeOutput.newReceiveAmount ? onPriceChangeOutput.newReceiveAmount : youGot.amount;

	}

	return (
		<div className={styles.cntr}>
			<div className={styles.title}>Create limit order</div>
			<div className={styles.content}>
				<div className={styles.exchangeCntr}>
					<CurrencyInput
						onInput={(input) => setYouPay(input)}
						defaultCurrency={'ETH'}
						title='Send'
						className={styles.sendInput}
					/>
					<img className={styles.exchangeIcon} src="/img/icons8-up-down-arrow-52.png" alt="/img/icons8-up-down-arrow-52.png" />
					<CurrencyInput
						onInput={(input) => setYouGot(input)}
						defaultCurrency={'ETH'}
						title='Receive'
						className={styles.receiveInput}
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