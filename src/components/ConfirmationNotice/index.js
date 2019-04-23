import React, { useState } from 'react';
import { Modal } from 'antd';
import ButtonNext from "../../elements/ButtonNext/ButtonNext";
import styles from './ConfirmationNotice.module.css';
import './ConfirmationNotice.css';

/**
 * The confirmation status of sending or receiving currency on blockchain.
 * @typedef {Object} ConfirmationStatus
 * @property {number} number - Number of confirmations (blocks after the transaction's block) in blockchain.
 * @property {string} counter_link - Link to blockchain's site where a user could see the transactions.
 * @property {string} time_estimation - Time estimation to complete the transaction.
 * @property {number} all - Number of confirmations (blocks after the transaction's block) in blockchain to regard the transaction safe complited.
 */

/** 
 * @module ConfirmationNotice 
 * The ConfirmationNotice component.
 */

/**
 * This callback handles user's choice to procceed buying.
 * @callback onContinue
 * @param {Confirmation} confirmation - The confirmation status of sending or receiving currency on blockchain.
 */

/**
 * Function that creates React's ConfirmationNotice component.
 * The ConfirmationNotice component that inform a user about the transaction success confirmation conditions.
 * @function ConfirmationNotice
 * @param {boolean} visible - The component state open or closed
 * @param {OrderItemTradeCurrency} send - How much and which cryptocurrency a user will send.
 * @param {Confirmation} confirmation - The data of the fee to pay for trade.
 * @param {onContinue} onContinue - The callback that handles the form submit. 
 */
export default ({ send, confirmation, onContinue, visible }) => {

	const [mVisible, setMVisible] = useState(visible);

	return (
		<div>
			<Modal
				visible={mVisible}
				footer={null}
				width={460}
				className="ConfirmationNotice_modal"
				onCancel={() => setMVisible(false)}
				centered={true}
			>
				<div className={styles.text}>
					Please have {send.amount} {send.abbr} ready to pay once this transaction reaches {confirmation.all} confirmations
				</div>
				<div className={styles.confirmationCntr}>
					<span className={styles.confirmationLable}>
						Confirmations:
					</span>
					<span className={styles.confirmationContent}>
						<a href={confirmation.counter_link} className={styles.confirmationCounter}>{confirmation.number}/{confirmation.all}</a>
						(est: {confirmation.time_estimation})
					</span>
				</div>
				<ButtonNext
					className={styles.continueBtn}
					onClick={e => onContinue(confirmation, e)}
					caption="Continue"
				/>
			</Modal>
		</div >
	)
}