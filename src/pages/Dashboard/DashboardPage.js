import React from 'react';
import Header from '../../components/Header/Header';
import ENDrawer from '../../components/Drawer/ENDrawer';
import ENOrderList from '../../components/ENOrderList';
import SwitchBuySellOrderList from '../../components/SwitchBuySellOrderList';
import OrderDetails from '../../components/OrderDetails';
import ENFooter from '../../components/ENFooter';
import CompareToMarketplaceOrder from '../../components/CompareToMarketplaceOrder';
import CollateralList from '../../components/CollateralList';
import BuyCurrency from '../../features/BuyCurrency/BuyCurrency';
import CLOEnterCurrAndAmount from '../../components/CLOEnterCurrAndAmount';
import CreateLimitOrder from '../../features/CreateLimitOrder';

/**
 * The TradeCurrency object contains data about selling or buying currency.
 * @typedef {Object} OrderItemTradeCurrency
 * @property {number} amount - Amount of the cryptocurrency to trade.
 * @property {string} name - Name of the currency e.g. Bitcoin.
 * @property {string} abbr - Abbreviation of the currency e.g. BTC.
 */

/**
 * The OrderItem object that represents some limit order data of list of limit orders.
 * @typedef {Object} OrderItem
 * @property {number} key - Index of the item in OrderList.
 * @property {OrderItemTradeCurrency} receive - Object that contains data about receiving currency.
 * @property {OrderItemTradeCurrency} send - Object that contains data about sending currency.
 * @property {number} order_total - Order total in usd.
 */

export default (props) => {

	const collaterals = [];

	for (let i = 0; i < 6; i++) {
		collaterals.push({
			key: i,
			site: 'Enon (enon.com)',
			eth_addr: '0x7fdcd2a1e52f10c28cb7732f46393e297ecadda1',
			verifyHref: '#verify'
		})
	}

	return (
		<div>
			<Header />
			{/* <ENDrawer /> */}
			{/* <SwitchBuySellOrderList onSwitch={console.log} /> */}
			{/* <ENOrderList onOrderSelected={console.log} /> */}
			<CompareToMarketplaceOrder visible={false} theOrder={{
				price: {
					amount: 28.19512548
				},
				send: {
					abbr: 'ETH',
					amount: 120.669
				},
				receive: {
					abbr: 'BTC'
				}
			}} />
			<CollateralList visible={false} collaterals={collaterals} />
			{/* <BuyCurrency /> */}
			{/* <CLOEnterCurrAndAmount
				visible={true}
				onContinue={console.log}
			/> */}
			<CreateLimitOrder visible={true} />
			<ENFooter collateral={{
				amount: 160,
				currencyAbbr: 'ETH'
			}} />
		</div>
	)
}