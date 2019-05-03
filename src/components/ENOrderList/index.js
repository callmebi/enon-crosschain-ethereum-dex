import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { getLimitOrderDetails as onOrderSelected } from '../../redux/actions'
import ButtonSelectOrder from '../../elements/ButtonSelectOrder/ButtonSelectOrder';
import CurrencyBadge from '../../elements/CurrencyBadge/CurrencyBadge';
import styles from './ENOrderList.module.css';
import './ENOrderList.css';
//add
import './ENOrderList.scss'
import {  Row, Col } from 'react-bootstrap';
import { getLimitOrders as onCurrencySelected } from '../../redux/actions'
const { Column} = Table;

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
						<Table className={styles.table} dataSource={props.orders ? props.orders : data} pagination={false}>
							<Column
								title="Receive"
								dataIndex="receive"
								key="receive"
								render={receive => (
									<CurrencyBadge gap="7px" name={receive.abbr} abbr={receive.abbr} amount={receive.amount} />
								)}
								className="ENOrderList_column"
							/>
							<Column
								title="Send"
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
const ConnectedCurrencyMenu = connect(null, { onCurrencySelected })(ENOrderList);

export { ConnectedENOrderList, ConnectedCurrencyMenu };
