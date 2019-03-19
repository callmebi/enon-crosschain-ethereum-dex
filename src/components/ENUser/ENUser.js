import React from 'react';
import { Row, Col, Avatar, Badge, Icon } from 'antd';
import styles from './ENUser.module.css';

export default (props) => {
	return (
		<Row type="flex" align="middle">
			<Col span={5}>
				<Badge
					style={{
						width: '10px',
						height: '10px',
						backgroundColor: '#55efc4'
					}}
					status={props.onlineStatus == "online" ? "success" : "default"}
					offset={[0, 30]}>
					<Avatar src={props.avatarSrc} size={35} icon="user" />
				</Badge>
			</Col>
			<Col span={19}>
				<Row>
					<Col span={24} className={styles.ethAddr}>
						{props.ethAddr}
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						{props.etherAvailable} ETH
					</Col>
				</Row>
			</Col>
		</Row>

	)
}