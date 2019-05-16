import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { getLimitOrderDetails as onOrderSelected } from '../../redux/actions'
import ButtonSelectOrder from '../../elements/ButtonSelectOrder/ButtonSelectOrder';
import CurrencyBadge from '../../elements/CurrencyBadge/CurrencyBadge';
import styles from './ENOrderList.module.css';
<<<<<<< HEAD
import './ENOrderList.css'

=======
import './ENOrderList.css';
//add
import './ENOrderList.scss'
import {  Row, Col } from 'react-bootstrap';
import { getLimitOrders as onCurrencySelected } from '../../redux/actions'
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
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
 * @param {OrderItem} order - Selected limit order item. 
 */

/**
 * Function that creates React's ENOrderList component.
 * @function ENOrderList
 * @param {OrderItem[]} orders - Array of limit orders.
 * @param {onOrderSelected} onOrderSelected - The callback that handles selection order item from list of limit orders. 
 */
const ENOrderList = (props) => {
<<<<<<< HEAD
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
						<ButtonSelectOrder onClick={e => props.onOrderSelected(record)} />
					)}
					className="ENOrderList_column"
				/>
			</Table>
=======
	// function currSelected(currAbbr) {
	// 	if (props.onCurrencySelected)
	// 		props.onCurrencySelected(currAbbr, props.ipfs, props.web3)
	// }
	return (
		<div className="ENOrderList_cntr">
					<Col sm={9} xs={11} className="hPRightSection">
						<Row className="hPRightTopSection justify-content-md-start">
							<Col xs={11} >
								<button id="buybu">BUY BITCOIN</button>
								<button id="sellbu">SELL BITCOIN</button>
							</Col>
						</Row>
						<Table rowKey={props.id} className={styles.table} dataSource={props.orders ? props.orders : data} pagination={false}>
							<Column
								title="Receive"
								rowKey="uid" 
								dataIndex="receive"
								key="receive"
								render={receive => (
									<CurrencyBadge gap="7px" name={receive.abbr} abbr={receive.abbr} amount={receive.amount} />
								)}
								className="ENOrderList_column"
							/>
							<Column
								title="Send"
								rowKey="uid" 
								dataIndex="send"
								key="send"
								render={send => (
									<CurrencyBadge gap="7px" name={send.abbr} abbr={send.abbr} amount={send.amount} />
									// <CurrencyBadge gap="7px" name={send.name} abbr={send.abbr} amount={send.amount} />
									
								)}
								className="ENOrderList_column"
							/>
							<Column
								title="Order total USD"
								rowKey="uid" 
								dataIndex="order_total"
								key="order_total"
								// width={130}
								render={order_total => (
									<span>${order_total}</span>
								)}
								className="ENOrderList_column"
							/>
							<Column
								title=""
								rowKey="uid" 
								key="action"
								align="right"
								width={100}
								render={(text, record) => (
									<ButtonSelectOrder onClick={e => props.onOrderSelected(record)} />
								)}
								className="ENOrderList_column "
								// onMouseOver={(event.target).classList.toggle("mouseO")}
							/>
						</Table>
					</Col>
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
		</div>
	)
}

export default ENOrderList;

function mapState(state) {
	return {
		orders: state.limitOrderList.orders
	}
}

const ConnectedENOrderList = connect(mapState, { onOrderSelected })(ENOrderList);
<<<<<<< HEAD

export { ConnectedENOrderList };
=======
const ConnectedCurrencyMenu = connect(null, { onCurrencySelected })(ENOrderList);

export { ConnectedENOrderList, ConnectedCurrencyMenu };
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
