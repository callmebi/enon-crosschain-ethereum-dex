import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ENOrderList from '../src/components/ENOrderList';

let three_orders = generateMockOrders(3);
let ten_orders = generateMockOrders(10);
let seven_orders = generateMockOrders(7);

storiesOf('ENOrderList', module)
	.add('with 3 orders', () => <ENOrderList
		orders={three_orders}
	/>)
	.add('with 10 orders', () => (
		<ENOrderList
			orders={ten_orders}
		/>
	))
	.add('with 7 orders select order handler', () => (
		<ENOrderList
			orders={seven_orders}
			onOrderSelected={action('Limit order selected')}
		/>
	));


function generateMockOrders(len) {

	let orders = []

	for (let i = 0; i < len; i++) {
		orders.push(
			{
				key: i,
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
			}
		)

	}
	return orders;

}