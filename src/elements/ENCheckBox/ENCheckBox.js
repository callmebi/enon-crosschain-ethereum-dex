import React from 'react';
import { Checkbox } from 'antd';
import 'ENCheckBox.css'

export default (props) => {
	return (
		<Checkbox {...props} >{props.caption}</Checkbox>
	)
}