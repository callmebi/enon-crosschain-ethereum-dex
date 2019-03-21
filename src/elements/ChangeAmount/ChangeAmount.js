import React from 'react';
import { Button, Icon } from 'antd';
import './ChangeAmount.css'

export default (props) => {

	function onChange(e) {
		props.onAmountChange(e, parseInt(e.target.value));
	}

	return (
		<div className="ChangeAmount_cntr">
			<Button onClick={onChange} shape="circle" value="+1">
				<Icon type="plus-circle" />
			</Button>
			<Button onClick={onChange} shape="circle" value="-1" style={{ marginLeft: '5px' }}>
				<Icon type="minus-circle" />
			</Button>
		</div>
	)
}