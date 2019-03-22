import React, { useState } from 'react';
import { ConnectedOrderDetails as OrderDetails } from '../OrderDetails';
import Button from '../../elements/Button/Button';
import styles from './ENFooter.module.css';
import CollateralList from '../../components/CollateralList';

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

	let [collateralVisible, setCollateralVisible] = useState(false);

	const collaterals = [];

	for (let i = 0; i < 6; i++) {
		collaterals.push({
			key: i,
			site: 'Enon (enon.com)',
			eth_addr: '0x7fdcd2a1e52f10c28cb7732f46393e297ecadda1',
			verifyHref: '#verify'
		})
	}

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
				<a onClick={e => setCollateralVisible(true)} className={styles.collateral} href="#collatral">{collateral.amount} {collateral.currencyAbbr} collateral</a>
			</div>
			<CollateralList visible={collateralVisible} setVisible={setCollateralVisible} collaterals={collaterals} />
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