import React from 'react';
// import { , } from 'antd';
import './CurrencyBadge.css'

export default (props) => {

	return (
<<<<<<< HEAD
		<div onClick={props.onClick} className={props.className ? 'currency_badge_cntr ' + props.className : 'currency_badge_cntr'}>
=======
		<div  onClick={props.onClick} className={props.className ? 'currency_badge_cntr ' + props.className : 'currency_badge_cntr'}>
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
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
<<<<<<< HEAD
			<span className="currency_badge_abbr">({props.abbr})</span>
=======
			{/* <span className="currency_badge_abbr">({props.abbr})</span> */}
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
		</div>
	)
}