import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TradingView from '../src/components/TradingView';

storiesOf('TradingView', module)
	.add('Sending trading operation', () => <TradingView
		title={`Please send ${'ETH'} to the following address within the time limit.`}
		address="0xf8cda97c0bb729f60cf1867c76e38769df9155d4"
		trading={{
			progress: 40,
			time_left: '45:00',
			abbr: 'ETH',
			amount: 120
		}}
		confirmation={{
			count: 3,
			text: 'confirmations required'
		}}
		backgroundSkin="green"
		clipboardCopyBtn={true}
		onAddressCopy={action('Copy address button clicked')}
		onTimeAmountCopy={action('Copy trading status button clicked')}
	/>)
	.add('Sending operation completed', () => (
		<TradingView
			title={`Complete! Waiting for other party to send. You can now exit this app.`}
			address="0xf8cda97c0bb729f60cf1867c76e38769df9155d4"
			trading={{
				progress: 100,
				time_left: 'Completed',
				abbr: 'ETH',
				amount: 120
			}}
			confirmation={{
				count: 3,
				text: 'confirmations'
			}}
			backgroundSkin="gray"
			clipboardCopyBtn={true}
			onAddressCopy={action('Copy address button clicked')}
			onTimeAmountCopy={action('Copy trading status button clicked')}
		/>
	));
