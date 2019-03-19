import React from 'react';
import { Radio, Icon } from 'antd';
import './ChangeAmount.css'

export default (props) => {
	return (
		<Radio.Group defaultValue="plus" buttonStyle="solid">
			<Radio.Button onClick={(e) => props.onAmountChange(e, +1)} shape="circle" value="plus">
				<Icon type="plus-circle" />
			</Radio.Button>
			<Radio.Button onClick={(e) => props.onAmountChange(e, -1)} shape="circle" value="minus">
				<Icon type="minus-circle" />
			</Radio.Button>
		</Radio.Group>
	)
}