import React from 'react';
import { Modal, Table, Row, Col } from 'antd';
import styles from './CollateralList.module.css';
import './CollateralList.css';

/**
 * The limit order data from marketplaces with marketplace name.
 * @typedef {Object} Collateral
 * @property {number} key - Unique index of the collateral data.
 * @property {string} site - Name of the collateral's site.
 * @property {string} eth_addr - Ethereum account address of the collateral.
 * @property {string} verifyHref - Link to verify the collateral.
 */

/** 
 * @module CollateralList 
 * The CollateralList
 */

/**
 * Function that creates React's CollateralList component. 
 * The component that show list of collaterals.
 * @function CollateralList
 * @param {MarketplaceOrder[]} collaterals - Array of Collateral's data.
 * @param {boolean} visible - The component state open or close.
 */
export default ({ collaterals, visible, setVisible }) => {

	let collateralList = [];
	if (collaterals) {
		collateralList = collaterals.map(collateral => (
			<li key={collateral.key} className={styles.listItem}>
				<div className={styles.site}>
					{collateral.site}
				</div>
				<div className={styles.ethAddr}>
					{collateral.eth_addr}
				</div>
				<div className={styles.verify}>
					<a href={collateral.verifyHref} className={styles.verifyHref}>Verify</a>
				</div>
			</li>
		))
	}

	return (
		<div className="CollateralList_cntr">
			<Modal
				visible={visible}
				onCancel={() => setVisible(false)}
				footer={null}
				width={900}
				title={<span className="CollateralList_modal_header" > Collateral </span>}
				className="CollateralList_modal"
			>
				<div className={styles.text}>
					If you don't receive your BTC after sending ETH, you will receive 160 ETH in collaterals. This is the list of all oracles for collaterals. Oracles do not hold money.
				</div>
				<ul className={styles.list}>
					{collateralList}
				</ul>
			</Modal>
		</div>
	)
}