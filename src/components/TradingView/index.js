<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React from 'react';
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
import { Progress, Icon } from 'antd';
// import ButtonNext from "../../elements/ButtonNext/ButtonNext";
import styles from './TradingView.module.css';
import './TradingView.css';

/**
 * The status of confirmation process.
 * @typedef {Object} ConfirmationProcessStatus
 * @property {number} count - Number of confirmations (blocks after the transaction's block) in blockchain.
 * @property {string} text - Text that describes the process.
 */

/**
 * The trading process status data.
 * @typedef {Object} Trading
 * @property {number} progress - Trading operation (e.g. sending or receiving) progress percentage.
 * @property {string} time_left - How much time left to operation to be completed.
 * @property {string} abbr - Abbreviation of the currency the trading operation to deal with.
 * @property {number} amount - Amount of the currency the trading operation to deal with.
 */

/** 
 * @module TradingView 
 * The TradingView component.
 */

/**
 * This callback handles copy to clipboard icon click.
 * @callback onAddressCopy
 * @param {string} address - The cryprocurrency account address. 
 */

/**
 * This callback handles .
 * @callback onTimeAmountCopy
 * @param {{trading:Trading, confirmation: ConfirmationProcessStatus}} tradingStatus - The progress and status of the trading operation.
 */

/**
 * Function that creates React's TradingView component.
 * The TradingView component that inform a user about the trading progress and status.
 * @function TradingView
 * @param {string} title - The title.
 * @param {string} address - Address to trading deal with.
 * @param {Trading} trading - Trading operation status.
 * @param {ConfirmationProcessStatus} confirmation - Show how many confirmations completed.
 * @param {'green'|'gray'} backgroundSkin - The background skin of the component.
 * @param {boolean} clipboardCopyBtn - Enables clipboard copy callbacks and renders copy buttons.
 * @param {onAddressCopy} onAddressCopy - The callback that handles copy address click. 
 * @param {onTimeAmountCopy} onTimeAmountCopy - The callback that handles copy trading status click.
 */
export default ({ title, address, trading, confirmation, backgroundSkin, clipboardCopyBtn, onAddressCopy, onTimeAmountCopy }) => {

	let cntrBgSkin = {};
	let contentBgSkin = {};
	let pbColor = 'rgb(40, 95, 93)';

	if (backgroundSkin === 'green') {
		cntrBgSkin = {};
		contentBgSkin = {};
	} else if (backgroundSkin === 'gray') {
		cntrBgSkin = { backgroundColor: '#fff' };
		contentBgSkin = { backgroundColor: 'hsla(0, 0%, 49%, .83)' };
		pbColor = 'rgb(95, 95, 95)';
	}

	function onTACopy(e) {

		onTimeAmountCopy({
			trading: trading,
			confirmation: confirmation
		}, e)

	}

	console.log(backgroundSkin, cntrBgSkin, contentBgSkin);

	return (
		<div className={styles.cntr} style={cntrBgSkin}>
			<div className={styles.title}>{title}</div>
			<div className={styles.content} style={contentBgSkin}>
				<div className={styles.currencyAddressCntr}>
					<span className={styles.currencyAddress}>{address}</span>
					{clipboardCopyBtn && (<span className={styles.clipboardCopyBtnCntr}>
						<span onClick={e => onAddressCopy(address, e)} className={styles.clipboardCopyBtn}>
							<Icon type="copy" />
						</span>
					</span>)}
				</div>
				<div className={styles.progressBarCntr}>
					<Progress
						strokeLinecap={'square'}
						showInfo={false}
						percent={trading.progress}
						strokeColor={pbColor}
						strokeWidth={12}
					/>
				</div>
				<div className={styles.timeAmountCntr}>
					<div className={styles.timeCntr}>
						<div className={styles.timeHeader}>Time Left</div>
						<div className={styles.timeContent}>{trading.time_left}</div>
					</div>
					<div className={styles.arrowCntr}>></div>
					<div className={styles.amountCntr}>
						<div className={styles.amountHeader}>Amount Required</div>
						<div className={styles.amountContent}>
							<img src={`/img/${trading.abbr}.png`} alt={`/img/${trading.abbr}.png`} className={styles.currencyIcon} />
							<div className={styles.amount}>{trading.amount}</div>
							<div className={styles.currencyAbbr}>{trading.abbr}</div>
							<div className={styles.confirmationCntr}>({confirmation.count} {confirmation.text ? confirmation.text : 'confirmations'})</div>
						</div>
					</div>
					{clipboardCopyBtn && (<span className={styles.clipboardCopyBtnCntr}>
						<span onClick={onTACopy} className={styles.clipboardCopyBtn} style={{ position: 'relative', top: '10px' }}>
							<Icon type="copy" />
						</span>
					</span>)}
				</div>
			</div>
		</div>
	)
}