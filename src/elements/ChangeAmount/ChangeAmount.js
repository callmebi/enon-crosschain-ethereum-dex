import React from 'react';
<<<<<<< HEAD
import { Button, Icon } from 'antd';
import './ChangeAmount.css'

=======
import { Button} from 'antd';
import './ChangeAmount.scss'
// import MinusImage from '../../../assets/images/minus.svg';
// import PlusImage from '../../../assets/images/plus.svg';
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
export default (props) => {

	function onChange(e) {
		props.onAmountChange(e, parseInt(e.target.value));
	}

	return (
		<div className="ChangeAmount_cntr">
			<Button onClick={onChange} shape="circle" value="+1">
<<<<<<< HEAD
				<Icon type="plus-circle" />
			</Button>
			<Button onClick={onChange} shape="circle" value="-1" style={{ marginLeft: '5px' }}>
				<Icon type="minus-circle" />
=======
			<img src="/img/images/minus.svg" alt=""/>
				{/* <Icon type="plus-circle" /> */}
			</Button>
			<Button onClick={onChange} shape="circle" value="-1" style={{ marginLeft: '5px' }}>
				{/* <Icon type="minus-circle" /> */}
				<img src="/img/images/plus.svg" alt=""/>
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
			</Button>
		</div>
	)
}