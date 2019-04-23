import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ReceiveAddressForm from '../src/components/ReceiveAddressForm';

storiesOf('ReceiveAddressForm', module)
	.add('closed modal', () => <ReceiveAddressForm
		visible={false}
		receive={{ amount: 4, abbr: 'BTC' }}
		fee={{ amount: 0.03370, abbr: 'ETH', amount_usd: 0.001 }}
		onSubmit={console.log}
	/>)
	.add('open with 4 BTC to receive and 0.03370 ETH to fee', () => (
		<ReceiveAddressForm
			visible={true}
			receive={{ amount: 4, abbr: 'BTC' }}
			fee={{ amount: 0.03370, abbr: 'ETH', amount_usd: 0.001 }}
			onSubmit={console.log}
		/>
	))
	.add('open with 120 ETH to receive and 0.04 ETH to fee and submit handler', () => (
		<ReceiveAddressForm
			visible={true}
			receive={{ amount: 120, abbr: 'ETH' }}
			fee={{ amount: 0.04, abbr: 'ETH', amount_usd: 0.002 }}
			onSubmit={action('submit the cryptocurrency address')}
		/>
	));
