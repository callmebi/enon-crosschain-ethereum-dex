export function getLimitOrderDetails(key) {
	return Promise.resolve({
		order: {
			send: {
				abbr: 'ETH',
				amount: 120 * key,
				amountDollar: 10000
			},
			receive: {
				abbr: 'BTC',
				amount: 4 * key,
				amountDollar: 10000
			}
		},
		price: { amount: 28.19512548 * key }
	})

}