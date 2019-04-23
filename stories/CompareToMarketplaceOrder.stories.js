import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CompareToMarketplaceOrder from '../src/components/CompareToMarketplaceOrder';

let three_orders = generateMockMarketplaceOrders(3);
let ten_orders = generateMockMarketplaceOrders(10);

storiesOf('CompareToMarketplaceOrder', module)
	.add('closed', () => <CompareToMarketplaceOrder
		visible={false}
		theOrder={{
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
		}}
	/>)
	.add('open with 10 marketplace orders', () => (
		<CompareToMarketplaceOrder
			visible={true}
			theOrder={{
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
			}}
			marketplaceData={ten_orders}
		/>
	))
	.add('open with 3 marketplace orders', () => (
		<CompareToMarketplaceOrder
			visible={true}
			theOrder={{
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
			}}
			marketplaceData={three_orders}
		/>
	));


function generateMockMarketplaceOrders(len) {

	let orders = []

	for (let i = 0; i < len; i++) {
		orders.push(
			{
				key: i,
				source: 'Kraken',
				price: 28.19512548,
				price_usd: 4536.22,
				order_total: 120.668,
				cheaper_usd: 35,
				expensive_usd: undefined
			}
		)

	}
	return orders;

}