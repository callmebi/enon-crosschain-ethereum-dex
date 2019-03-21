import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SwitchBuySellOrderList from '../src/components/SwitchBuySellOrderList';

storiesOf('SwitchBuySellOrderList', module)
	.add('with BTC currency', () => (
		<SwitchBuySellOrderList
			currency='BTC'
			onSwitch={action('switched')}
		/>
	))
	.add('with ETH currency', () => (
		<SwitchBuySellOrderList
			currency='ETH'
			onSwitch={action('switched')}
		/>
	));
