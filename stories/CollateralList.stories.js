import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import CollateralList from '../src/components/CollateralList';

let three_collaterals = generateMockList(3);
let ten_collaterals = generateMockList(10);

storiesOf('CollateralList', module)
	.add('closed', () => <CollateralList
		visible={false}
	/>)
	.add('open with 10 collaterals', () => (
		<CollateralList
			visible={true}
			collaterals={ten_collaterals}
		/>
	))
	.add('open with 3 marketplace orders', () => (
		<CollateralList
			visible={true}
			collaterals={three_collaterals}
		/>
	));


function generateMockList(len) {

	let list = []

	for (let i = 0; i < len; i++) {
		list.push({
			key: i,
			site: 'Enon (enon.com)',
			eth_addr: '0x7fdcd2a1e52f10c28cb7732f46393e297ecadda1',
			verifyHref: '#verify'
		})

	}
	return list;

}