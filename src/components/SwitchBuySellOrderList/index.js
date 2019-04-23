import React from 'react';
import { Radio } from 'antd';
import styles from './SwitchBuySellOrderList.module.css';

/** 
 * @module SwitchBuySellOrderList 
 * The SwitchBuySellOrderList component that lets switch witch list of limit orders to show to buy currency or to sell.
 */

/**
 * This callback executes when a user want to get limit orders list to buy or to sell previously selected currency.
 * @callback onSwitch
 * @param {string} value - 'buy' or 'sell' string
 */

/**
 * function that creates React's SwitchBuySellOrderList component.
 * @function SwitchBuySellOrderList
 * @param {string} currency - abbreviation of currency for example 'ETH'.
 * @param {onSwitch} onSwitch - The callback that handles user's choice. 
 */
export default (props) => {
	return (
		<Radio.Group onChange={e => props.onSwitch(e.target.value)} defaultValue="buy" buttonStyle="solid">
			<Radio.Button value="buy">Buy {props.currency}</Radio.Button>
			<Radio.Button value="sell">Sell {props.currency}</Radio.Button>
		</Radio.Group>
	)
}