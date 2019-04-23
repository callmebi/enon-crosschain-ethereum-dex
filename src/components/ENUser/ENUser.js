import React from 'react';
import { Row, Col, Avatar, Badge, Icon } from 'antd';
import makeBlockie from 'ethereum-blockies-base64'
import styles from './ENUser.module.css';

/** 
 * @module ENUser 
 * The ENUser component.
 */

/**
 * Function that creates React's ENUser component.
 * The ENUser component that show essential data about logged in user.
 * @function ENUser
 * @param {string} avatarSrc - Link to the user avatar image.
 * @param {string} ethAddr - User's etherium account address.
 * @param {number} etherAvailable - Amout of the ether on the user's account.
 * @param {'online'|'offline'} onlineStatus - The status of the user: online or offline.
 */
export default (props) => {
	return (
		<Row type="flex" align="middle">
			{/* <Col span={5}>
				<Badge
					style={{
						width: '10px',
						height: '10px',
						backgroundColor: (props.onlineStatus == "online") ? '#55efc4' : 'grey'
					}}
					status={props.onlineStatus == "online" ? "success" : "default"}
					offset={[0, 30]}>
					<Avatar src={makeBlockie(props.ethAddr)} size={35} icon="user" />
				</Badge>
			</Col> */}
			<Col span={19}>
				<Row>
					<Col span={24} className={styles.ethAddr}>
						{props.ethAddr}
					</Col>
				</Row>
				<Row>
					<Col span={24} className={styles.ethAddr2}>
						{props.etherAvailable} ETH
					</Col>
				</Row>
			</Col>
		</Row>

	)
}
