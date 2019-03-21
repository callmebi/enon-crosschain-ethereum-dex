import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ENFooter from '../src/components/ENFooter';

storiesOf('ENFooter', module)
	.add('with 160 collaterals and ETH currency', () => (
		<ENFooter
			collateral={{
				amount: 160,
				currencyAbbr: 'ETH'
			}}
			buyBtn={{
				callback: action('buy button clicked')
			}}
		/>
	))
	.add('with 100 collaterals and BTC currency and custom caption for the button', () => (
		<ENFooter
			collateral={{
				amount: 100,
				currencyAbbr: 'BTC'
			}}
			buyBtn={{
				callback: action('buy button clicked'),
				caption: 'Awating for...'
			}}
		/>
	));
