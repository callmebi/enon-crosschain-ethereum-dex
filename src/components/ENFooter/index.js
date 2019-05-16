import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ConnectedOrderDetails as OrderDetails } from '../OrderDetails';
import { startTrade } from '../../relayBackend/relayApi';
import Button from '../../elements/Button/Button';
import styles from './ENFooter.module.css';
import CollateralList from '../../components/CollateralList';
import {Container,Row} from 'react-bootstrap';
/** 
 * @module ENFooter 
 * The ENFooter component.
 */

/**
 * @callback onBuyBtnClick
 * @param {Object} e - onClick callback event.
 */

/**
 * Function that creates React's ENFooter component.
 * The ENFooter component that represent footer of the app and contains limit order details and button to start buying process.
 * @function ENFooter
 */
const ENFooter = ({ dispatch, order, ipfs, drizzle, account }) => {

    const { contracts, web3 } = drizzle;

	let [collateralVisible, setCollateralVisible] = useState(false);

	const collaterals = [];

	for (let i = 0; i < 6; i++) {
		collaterals.push({
			key: i,
			site: 'Enon (enon.com)',
			eth_addr: '0x7fdcd2a1e52f10c28cb7732f46393e297ecadda1',
			verifyHref: '#verify'
		})
	}

    if (!order) return '';

	return (
		<Container fluid className={styles.footerBot}>
		<Row>
			<Container>
		<div className={styles.cntr}>
			<div className={styles.orderDetails}>
				<OrderDetails order={order}/>
			</div>
			<div className={styles.collateralCntr}>
				<a onClick={e => setCollateralVisible(true)} className={styles.collateral} href="#collatral">{order.collateral.amount} {order.collateral.currencyAbbr} collateral</a>
			</div>
			<CollateralList visible={collateralVisible} setVisible={setCollateralVisible} collaterals={collaterals} />
			<div className={styles.buyBtnCntr}>
				<Button
					id="footer_buy_btn"
					className={styles.buyBtn}
					onClick={() => {
                        startTrade(contracts, ipfs, web3, account, order);
		                dispatch({type: 'SET_LIMIT_ORDER_DETAILS', payload: null});
                    }}
					caption="BUY NOW"
				/>
			</div>
		</div>
		</Container>
		</Row>
		</Container>
	)
}

export default ENFooter;

function mapState(state) {
	return {
        order: state.limitOrderDetails
	}
}

const ConnectedENFooter = connect(mapState)(ENFooter);

export { ConnectedENFooter };
