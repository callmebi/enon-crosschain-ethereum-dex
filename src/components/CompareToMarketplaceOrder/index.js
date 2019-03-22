import React from 'react';
import { Modal, Table, Row, Col } from 'antd';
import styles from './CompareToMarketplaceOrder.module.css';
import './CompareToMarketplaceOrder.css';

const { Column } = Table;

const marketplaceMockData = [
	{
		key: '1',
		source: 'Kraken',
		price: 28.19512548,
		price_usd: 4536.22,
		order_total: 120.668,
		cheaper_usd: 35,
		expensive_usd: undefined
	}, {
		key: '2',
		source: 'Kraken',
		price: 28.19512548,
		price_usd: 4536.22,
		order_total: 120.668,
		cheaper_usd: 35,
		expensive_usd: undefined
	}, {
		key: '3',
		source: 'Kraken',
		price: 28.19512548,
		price_usd: 4536.22,
		order_total: 120.668,
		cheaper_usd: 35,
		expensive_usd: undefined
	}
];

/**
 * The limit order data from marketplaces with marketplace name.
 * @typedef {Object} MarketplaceOrder
 * @property {number} key - Unique index of the order data.
 * @property {string} source - Name of the marketplace.
 * @property {number} price - Price in cryptocurrency.
 * @property {number} price_usd - Price in USD.
 * @property {number} order_total - Order total.
 * @property {?number} cheaper_usd - How much cheaper the selected to compare order in USD.
 * @property {?number} expensive_usd - How much expensive the selected to compare order in USD.
 */

/** 
 * @module CompareToMarketplaceOrder 
 * The CompareToMarketplaceOrder
 */

/**
 * Function that creates React's CompareToMarketplaceOrder component. 
 * The component that show list of limit orders from marketplaces and show difference in price between 
 * each marketplace order and selected enon.com order.
 * @function CompareToMarketplaceOrder
 * @param {MarketplaceOrder[]} marketplaceData - Array of limit orders data from marketplaces with marketplace name.
 * @param {OrderItem} theOrder - The order selected to compare.
 * @param {boolean} visible - The component state open or close.
 */
export default ({ theOrder, visible, marketplaceData, setVisible }) => {

	return (
		<div className="CompareToMarketpalceOrder_cntr">
			<Modal
				visible={visible}
				footer={null}
				width={900}
				onCancel={() => setVisible(false)}
				title={<span className="CompareToMarketpalceOrder_modal_header" > Price Compare </span>}
				className="CompareToMarketpalceOrder_modal"
			>
				<Row className={styles.theOrder}>
					<Col span={6} className={styles.theOrderCntr}>
						<Row className={styles.theOrderHeader}>
							Price 1 {theOrder.receive.abbr}
						</Row>
						<Row className={styles.theOrderContent}>
							<span className={styles.theOrderAmount}>{theOrder.price.amount}</span>
							<span className={styles.theOrderCurrAbbr}>{theOrder.send.abbr}</span>
						</Row>
					</Col>
					<Col span={6} className={styles.theOrderCntr}>
						<Row className={styles.theOrderHeader}>
							Order total
						</Row>
						<Row className={styles.theOrderContent}>
							<span className={styles.theOrderAmount}>{theOrder.send.amount}</span>
							<span className={styles.theOrderCurrAbbr}>{theOrder.send.abbr}</span>
						</Row>
					</Col>
				</Row>
				<Row className={styles.marketplaceOrderListCntr}>
					<Table
						dataSource={marketplaceData ? marketplaceData : marketplaceMockData}
						className={styles.marketplaceOrderList}
						pagination={false}
					>
						<Column
							title="Source"
							width='30%'
							dataIndex="source"
							key="source"
							render={source => (
								<div>
									<img className={styles.sourceLogo} src={`/img/${source}.png`} alt={`/img/${source}.png`} />
									<span className={styles.sourceName}>{source}</span>
								</div>
							)}
						/>
						<Column
							title={`Price (${theOrder.send.abbr})`}
							key="price"
							render={(text, record) => (
								<div>
									<span className={styles.price}>{record.price}</span>
									<span className={styles.priceUsd}>${record.price_usd}</span>
								</div>
							)}
						/>
						<Column
							title="Order total"
							key="order_total"
							render={(text, record) => (
								<div>
									<span className={styles.orderTotal}>{record.order_total}</span>
									{record.cheaper_usd && <span className={styles.cheaperUsd}>${record.cheaper_usd} cheaper</span>}
									{record.expensive_usd && <span className={styles.expensiveUsd}>${record.expensive_usd} expensive</span>}
								</div>
							)}
						/>
					</Table>
				</Row>
			</Modal>
		</div>
	)
}