import React from 'react';

import styles from './Header.module.css';
import './Header.css';

/** 
 * @module Header 
 * The header component that is placed on top of the App's interface and contain notifications and buttons for some features.
 */

/**
 * This callback handles menu clicks.
 * @callback onClickMenuItem
 * @param {HTMLElement} targetId - Target HTMLElement's Id that had clicked
 */

/**
 * function that creates React's Header component.
 * @function Header
 * @param {number} messageNumber - Number of new items or events to show on header, in the App is used to show number of new user's limit orders.
 * @param {onClickMenuItem} onClickMenuItem - The callback that handles clicks on menu items. 
 */
export default ({ messageNumber, onClickMenuItem }) => {
	return (
		<div className={styles.header} >
			<div className={styles.leftMenu}>
				<ul className={styles.menuCntr}>
					<li className={styles.menuItem}>
						<div className={styles.openDrawerBtn_MessageNumbBadge_cntr}>
							<div id="openDrawerBtn" onClick={e => onClickMenuItem(e.target.id)} className={styles.openDrawerBtn}>
							</div>
							{messageNumber && <div className={styles.messageNumbBagde}>{messageNumber}</div>}
						</div>
					</li>
					<li className={styles.menuItem}>
						<div className={styles.logo} />
					</li>
				</ul>
			</div>
			<div className={styles.rightMenu}>
				<ul className={styles.menuCntr}>
					<li id="createLimitOrderBtn" onClick={e => onClickMenuItem(e.currentTarget.id)} className={styles.menuItem}>
						<div className={styles.createLimitOrder}>Create limit order > </div>
					</li>
				</ul>
			</div>
		</div>
	)
}