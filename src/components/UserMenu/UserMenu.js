import React from 'react';
<<<<<<< HEAD
import { Icon, Badge } from 'antd';
import styles from './UserMenu.module.css'
=======
// import { Icon, Badge } from 'antd';
import styles from './UserMenu.module.scss'
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c

export default (props) => {
	return (
		<div>
			<div className={styles.menuItem}>
<<<<<<< HEAD
				<div className={styles.iconCntr}>
					<Icon type="folder" />
				</div>
				<div className={styles.textCntr}>
					<span className={styles.itemText}>My orders</span>
				</div>
				{props.myNewOrderCount &&
=======
				{/* <div className={styles.iconCntr}>
					<Icon type="folder" />
				</div> */}
				<div className={styles.textCntr}>
					<span className={styles.itemText}>My orders</span><span>{props.myNewOrderCount}</span>
				</div>
				{/* {props.myNewOrderCount &&
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
					<div className={styles.badgeCntr}>
						<Badge
							count={props.myNewOrderCount}
						>
						</Badge>
<<<<<<< HEAD
					</div>}
			</div>
			<div className={styles.menuItem}>
=======
					</div>} */}
			</div>
			{/* <div className={styles.menuItem}>
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
				<div className={styles.iconCntr}>
					<div className={styles.gasIcon}></div>
				</div>
				<div className={styles.textCntr}>
					<span className={styles.itemText}>Gas</span>
				</div>
				<div className={styles.badgeCntr}></div>
<<<<<<< HEAD
			</div>
			<div className={styles.menuItem}>
				<div className={styles.iconCntr}>
					<Icon type="arrow-right" />
				</div>
=======
			</div> */}
			<div className={styles.menuItem}>
				{/* <div className={styles.iconCntr}>
					<Icon type="arrow-right" />
				</div> */}
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
				<div className={styles.textCntr}>
					<span className={styles.itemText}>Exit</span>
				</div>
				<div className={styles.badgeCntr}></div>
			</div>
		</div>
	)
}