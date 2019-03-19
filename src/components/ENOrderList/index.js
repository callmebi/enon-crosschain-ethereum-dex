import React from 'react';
import { Table } from 'antd';
import ButtonSelectOrder from '../../elements/ButtonSelectOrder/ButtonSelectOrder';
import CurrencyBadge from '../../elements/CurrencyBadge/CurrencyBadge';
import styles from './ENOrderList.module.css';
import './ENOrderList.css'

const { Column, ColumnGroup } = Table;

const data = [{
	key: '1',
	receive: {
		amount: 4,
		name: 'Bitcoin',
		abbr: 'BTC'
	},
	send: {
		amount: 120,
		name: 'Ethereum',
		abbr: 'ETH'
	},
	order_total: 13846.92,
}, {
	key: '2',
	receive: {
		amount: 4,
		name: 'Bitcoin',
		abbr: 'BTC'
	},
	send: {
		amount: 120,
		name: 'Ethereum',
		abbr: 'ETH'
	},
	order_total: 13846.92,
}, {
	key: '3',
	receive: {
		amount: 4,
		name: 'Bitcoin',
		abbr: 'BTC'
	},
	send: {
		amount: 120,
		name: 'Ethereum',
		abbr: 'ETH'
	},
	order_total: 13846.92,
}];

/** 
 * @module ENOrderList 
 * The ENOrderList component that show list of limit orders.
 */

/**
 * This callback handles selection order item form order list.
 * @callback onOrderSelected
 * @param {number} index - Index of selected limit order.
 * @param {OrderItem} order - Selected limit order item. 
 */

/**
 * Function that creates React's ENOrderList component.
 * @function ENOrderList
 * @param {OrderItem[]} orders - Array of limit orders.
 * @param {onOrderSelected} onOrderSelected - The callback that handles selection order item from list of limit orders. 
 */
export default (props) => {
	return (
		<div className="ENOrderList_cntr">
			<Table className={styles.table} dataSource={props.orders ? props.orders : data} pagination={false}>
				<Column
					title="Receive"
					dataIndex="receive"
					key="receive"
					render={receive => (
						<CurrencyBadge gap="7px" name={receive.name} abbr={receive.abbr} amount={receive.amount} />
					)}
					className="ENOrderList_column"
				/>
				<Column
					title="Send"
					dataIndex="send"
					key="send"
					render={send => (
						<CurrencyBadge gap="7px" name={send.name} abbr={send.abbr} amount={send.amount} />
					)}
					className="ENOrderList_column"
				/>
				<Column
					title="Order total (USD)"
					dataIndex="order_total"
					key="order_total"
					width={130}
					render={order_total => (
						<span>${order_total}</span>
					)}
					className="ENOrderList_column"
				/>
				<Column
					title=""
					key="action"
					align="right"
					width={110}
					render={(text, record) => (
						<ButtonSelectOrder onClick={e => props.onOrderSelected(record.key, record)} />
					)}
					className="ENOrderList_column"
				/>
			</Table>
		</div>
	)
}