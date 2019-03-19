import React from 'react';
import { Button } from 'antd';
import 'ButtonBuySell.css'

export default (props) => {
	return (
		<Button ghost={!props.isBackground} {...props} size="large">{props.caption}</Button>
	)
}