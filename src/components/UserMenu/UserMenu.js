import React from 'react';
import { Icon, Badge } from 'antd';
import styles from './UserMenu.module.scss'

export default (props) => {
	return (
		<div>
			<div className={styles.menuItem}>
				{/* <div className={styles.iconCntr}>
					<Icon type="folder" />
				</div> */}
				<div className={styles.textCntr}>
					<span className={styles.itemText}>My orders</span><span>{props.myNewOrderCount}</span>
				</div>
				{/* {props.myNewOrderCount &&
					<div className={styles.badgeCntr}>
						<Badge
							count={props.myNewOrderCount}
						>
						</Badge>
					</div>} */}
			</div>
			{/* <div className={styles.menuItem}>
				<div className={styles.iconCntr}>
					<div className={styles.gasIcon}></div>
				</div>
				<div className={styles.textCntr}>
					<span className={styles.itemText}>Gas</span>
				</div>
				<div className={styles.badgeCntr}></div>
			</div> */}
			<div className={styles.menuItem}>
				<div className={styles.iconCntr}>
					<Icon type="arrow-right" />
				</div>
				<div className={styles.textCntr}>
					<span className={styles.itemText}>Exit</span>
				</div>
				<div className={styles.badgeCntr}></div>
			</div>
		</div>
	)
}