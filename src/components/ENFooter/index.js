import React from 'react';
import OrderDetails from '../OrderDetails';
import Button from '../../elements/Button/Button';
import styles from './ENFooter.module.css';

export default ({ collateral }) => {
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
					}} price={{ amount: 28.19512548 }}
				/>
			</div>
			<div className={styles.collateralCntr}>
				<a className={styles.collateral} href="#collatral">{collateral.amount} {collateral.currencyAbbr} collateral</a>
			</div>
			<div className={styles.buyBtnCntr}>
				<Button className={styles.buyBtn} caption="Buy now" />
			</div>
		</div>
	)
}