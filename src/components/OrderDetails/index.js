import React from 'react';
import styles from './OrderDetails.module.css';

export default ({ order, price }) => {
	return (
		<div className={styles.cntr} >
			<div className={styles.section}>
				<div className={styles.sHeader}>
					You send (~${order.send.amountDollar})
				</div>
				<div className={styles.sContent}>
					<img className={styles.currIcon} src={`/img/${order.send.abbr}.png`} alt={`/img/${order.send.abbr}.png`} />
					<span className={styles.amount}>{order.send.amount}</span>
					<span className={styles.abbr}>{order.send.abbr}</span>
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.sHeader}>
					You receive (~${order.receive.amountDollar})
				</div>
				<div className={styles.sContent}>
					<img className={styles.currIcon} src={`/img/${order.receive.abbr}.png`} alt={`/img/${order.receive.abbr}.png`} />
					<span className={styles.amount}>{order.receive.amount}</span>
					<span className={styles.abbr}>{order.receive.abbr}</span>
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.sHeader}>
					Price 1 {order.receive.abbr}
					<a href="#compare" className={styles.compare}>Compare</a>
				</div>
				<div className={styles.sContent}>
					<span className={styles.priceAmount}>{price.amount}</span>
					<span className={styles.abbr}>{order.send.abbr}</span>
				</div>
			</div>
		</div>
	)
}