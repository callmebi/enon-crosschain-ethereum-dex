import React from 'react';
import { Button } from 'antd';
import './LoginOpt.css'

export default (props) => {
	return (
		<Button className={props.className} onClick={props.onClick} size="large">
			<img className="login_opt_icon" src={props.iconSrc} alt={props.caption} />
			<span className="login_opt_caption" >{props.caption}</span>
		</Button>
	)
}