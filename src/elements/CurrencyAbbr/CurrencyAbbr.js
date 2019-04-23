import React from 'react';
// import { Icon } from 'antd';
import './CurrencyAbbr.css'

export default (props) => {
	return (
		<div>
			<img className="Currency_abbrIcon" src={props.iconSrc} alt={props.abbr} /> {props.abbr}
		</div>
	)
}