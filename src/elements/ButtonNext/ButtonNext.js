import React from 'react';
import { Button, Icon } from 'antd';
import './ButtonNext.css'

export default (props) => {
	return (
<<<<<<< HEAD
		<Button {...props} shape="round" size="large" type="primary">
=======
		<Button  {...props} shape="round" size="large" type="primary">
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
			{props.caption}<Icon type="right" />
		</Button>
	)
}