import React from 'react';
// import { , } from 'antd';
import './CurrencyBadge.css'

export default (props) => {

	return (
		<div onClick={props.onClick} className={props.className ? 'currency_badge_cntr ' + props.className : 'currency_badge_cntr'}>
			<img
				style={{ marginRight: props.gap ? props.gap : '20px' }}
				src={props.iconSrc ? props.iconSrc : `/img/${props.abbr}.png`}
				alt={props.name}
				className="currency_badge_img"
			/>
			{props.amount && <span
				style={{ marginRight: props.gap ? props.gap : '20px' }}
				className="currency_badge_amount"
			>{props.amount}</span>}
			<span className="currency_badge_name">{props.name}</span>
			<span className="currency_badge_abbr">({props.abbr})</span>
		</div>
	)
}