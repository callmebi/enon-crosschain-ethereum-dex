<<<<<<< HEAD
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
=======
// import React from 'react';
import { Modal } from 'antd';
// import styles from './CompareToMarketplaceOrder.module.css';
import './CompareToMarketplaceOrder.scss';

import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
// import XImg from '../../../public/img/images/x.svg';

// import BarImg1 from '/img/images/iconsBar/logo-desktop_1logo-desktop.png';
// import BarImg2 from '/img/images/iconsBar/270_1270.png';
// import BarImg3 from '/img/images/iconsBar/22_122.png';
// import BarImg4 from '/img/images/iconsBar/89_189.png';
// import BarImg5 from '/img/images/iconsBar/37_137.png';
// import BarImg6 from '/img/images/iconsBar/coin-market-cap-logo-p-130x130q80.png';
// import BarImg7 from '/img/images/iconsBar/24_124.png';
// import BarImg8 from '/img/images/iconsBar/157_1157.png';




// const { Column } = Table;

// const marketplaceMockData = [
// 	{
// 		key: '1',
// 		source: 'Kraken',
// 		price: 28.19512548,
// 		price_usd: 4536.22,
// 		order_total: 120.668,
// 		cheaper_usd: 35,
// 		expensive_usd: undefined
// 	}, {
// 		key: '2',
// 		source: 'Kraken',
// 		price: 28.19512548,
// 		price_usd: 4536.22,
// 		order_total: 120.668,
// 		cheaper_usd: 35,
// 		expensive_usd: undefined
// 	}, {
// 		key: '3',
// 		source: 'Kraken',
// 		price: 28.19512548,
// 		price_usd: 4536.22,
// 		order_total: 120.668,
// 		cheaper_usd: 35,
// 		expensive_usd: undefined
// 	}
// ];
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c

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
<<<<<<< HEAD
=======


class HomePagePopupCompare extends Component {
	constructor(props) {
	  super(props)
  
	  this.state = {
		firstPrice: "$3,846.92",
		secondPrice: "$3,846.92",
		thirdPrice: "$3,846.92",
		coin: [
		  { coinName: 1, coinIcon: "BarImg1", coinheight: -250 },
		  { coinName: 2, coinIcon: "BarImg1", coinheight: -270 },
		  { coinName: 3, coinIcon: "BarImg1", coinheight: -300 },
		  { coinName: 4, coinIcon: "BarImg1", coinheight: -270 },
		  { coinName: 5, coinIcon: "BarImg1", coinheight: -270 },
		  { coinName: 6, coinIcon: "BarImg1", coinheight: -200 },
		  { coinName: 7, coinIcon: "BarImg1", coinheight: -250 },
		  { coinName: 8, coinIcon: "BarImg1", coinheight: -270 }]
	  }
	}
	// handleCoinBarNumber(){
	//   let numberCol = 8;
  
	// }
	// popHandler() {
	//   let pop1 = document.getElementById("homePagePopupCompare");
	//   pop1.classList.toggle("showfooterPop");
	// }
	render() {
	  return (
		// <div id={"homePagePopupCompare"} className=" popup">
		  <div id="popup_innerCompare" className='popup_innerCompare'>
			{/* <img className="xbutton" src={`/img/images/x.svg`} alt="" onClick={this.popHandler} />
			<h4>Price Compare</h4> */}
			<Container className="BarChart">
			  <Row>
				<div className="leftCol">
				  <p>{this.state.firstPrice}<span></span></p>
				  <p>{this.state.secondPrice}<span></span></p>
				  <p>{this.state.thirdPrice}<span></span></p>
				</div>
				<div className="positionOnCol">
				  <div className="rightCol">
					{this.state.coin.map(item => {
					  return <div className="bar" key={item.coinName} style={{ marginTop: item.coinheight }}></div>
					})}
				  </div>
				</div>
  
				<div className="positionOnCol pogore">
				  <div className="rightCol iconBar">
					<img src={`/img/images/iconsBar/logo-desktop_1logo-desktop.png`} alt="" />
					<img src={`/img/images/iconsBar/270_1270.png`} alt="" />
					<img src={`/img/images/iconsBar/22_122.png`} alt="" />
					<img src={`/img/images/iconsBar/89_189.png`} alt="" />
					<img src={`/img/images/iconsBar/37_137.png`} alt="" />
					<img src={`/img/images/iconsBar/coin-market-cap-logo-p-130x130q80.png`} alt="" />
					<img src={`/img/images/iconsBar/24_124.png`} alt="" />
					<img src={`/img/images/iconsBar/157_1157.png`} alt="" />
				  </div>
				</div>
  
			  </Row>
			</Container>
  
		  </div>
		// </div>
	  )
	}
  }
  






>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
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
<<<<<<< HEAD
				<Row className={styles.theOrder}>
=======
<HomePagePopupCompare/>
				{/* <Row className={styles.theOrder}>
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
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
<<<<<<< HEAD
=======


 */}
























				
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
			</Modal>
		</div>
	)
}