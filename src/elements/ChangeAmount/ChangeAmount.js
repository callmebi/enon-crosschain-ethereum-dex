import React from 'react';
import { Button} from 'antd';
import './ChangeAmount.scss'
// import MinusImage from '../../../assets/images/minus.svg';
// import PlusImage from '../../../assets/images/plus.svg';
export default (props) => {

	function onChange(e) {
		props.onAmountChange(e, parseInt(e.target.value));
	}

	return (
		<div className="ChangeAmount_cntr">
			<Button onClick={onChange} shape="circle" value="+1">
			<img src="/img/images/minus.svg" alt=""/>
				{/* <Icon type="plus-circle" /> */}
			</Button>
			<Button onClick={onChange} shape="circle" value="-1" style={{ marginLeft: '5px' }}>
				{/* <Icon type="minus-circle" /> */}
				<img src="/img/images/plus.svg" alt=""/>
			</Button>
		</div>
	)
}