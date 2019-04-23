import React from 'react';
import { Button } from 'antd';
import styles from './ButtonSelectOrder.module.css'

export default (props) => {
	return (
		<Button {...props} className={styles.selectOrderBtn} size="large">{props.caption ? props.caption : 'select'}</Button>
	)
}