import React from 'react';
<<<<<<< HEAD
import { Row, Col, Avatar, Badge, Icon } from 'antd';
import makeBlockie from 'ethereum-blockies-base64'
=======
import { Row, Col} from 'antd';
// import makeBlockie from 'ethereum-blockies-base64'
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
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
<<<<<<< HEAD
			<Col span={5}>
=======
			{/* <Col span={5}>
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
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
<<<<<<< HEAD
			</Col>
			<Col span={19}>
				<Row>
=======
			</Col> */}
			<Col span={19} className="newpadTopBot">
				<Row className="newpadTopBot">
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
					<Col span={24} className={styles.ethAddr}>
						{props.ethAddr}
					</Col>
				</Row>
				<Row>
<<<<<<< HEAD
					<Col span={24}>
=======
					<Col span={24} className={styles.ethAddr2}>
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
						{props.etherAvailable} ETH
					</Col>
				</Row>
			</Col>
		</Row>

	)
}
