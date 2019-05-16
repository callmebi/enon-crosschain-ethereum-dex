import React from 'react';
import { Button, Icon } from 'antd';
import './ButtonNext.css'

export default (props) => {
	return (
		<Button  {...props} shape="round" size="large" type="primary">
			{props.caption}<Icon type="right" />
		</Button>
	)
}