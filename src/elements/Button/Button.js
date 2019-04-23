import React from 'react';
import { Button } from 'antd';
import './Button.css';

export default (props) => {
	return (
		<Button {...props} type="primary" shape="round" size="large">{props.caption}</Button>
	)
}