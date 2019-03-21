import React from 'react';
import OrderDetails from '../OrderDetails';
import Button from '../../elements/Button/Button';
import styles from './ENFooter.module.css';

/** 
 * @module ENFooter 
 * The ENFooter component.
 */

/**
 * @callback onBuyBtnClick
 * @param {Object} e - onClick callback event.
 */

/**
 * Function that creates React's ENFooter component.
 * The ENFooter component that represent footer of the app and contains limit order details and button to start buying process.
 * @function ENFooter
 * @param {Object} collateral - Collateral badge data.
 * @param {number} collateral.amount - Number of the collaterals that support the limit order.
 * @param {string} collateral.currencyAbbr - Abbreviation of the selected currency to sell.
 * @param {Object} buyBtn - Button to start buying process.
 * @param {string} buyBtn.caption - Caption of the button.
 * @param {onBuyBtnClick} buyBtn.callback - OnClick callback of the button.
 */
export default ({ collateral, buyBtn }) => {

	return (
		<div className={styles.cntr}>
			<div className={styles.orderDetails}>
				<OrderDetails
					order={{
						send: {
							abbr: 'ETH',
							amount: 120,
							amountDollar: 10000
						},
						receive: {
							abbr: 'BTC',
							amount: 4,
							amountDollar: 10000
						}
					}}
					price={{ amount: 28.19512548 }}
				/>
			</div>
			<div className={styles.collateralCntr}>
				<a className={styles.collateral} href="#collatral">{collateral.amount} {collateral.currencyAbbr} collateral</a>
			</div>
			<div className={styles.buyBtnCntr}>
				<Button
					id="footer_buy_btn"
					className={styles.buyBtn}
					onClick={e => buyBtn.callback(e.target.id, e)}
					caption={buyBtn && buyBtn.caption ? buyBtn.caption : 'Buy now'}
				/>
			</div>
		</div>
	)
}