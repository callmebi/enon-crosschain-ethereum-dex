
export function mockLimitOrderList(len, sync) {

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
	return sync == true ? orders : Promise.resolve(orders);

}