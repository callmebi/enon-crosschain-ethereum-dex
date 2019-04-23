import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ConfirmationNotice from '../src/components/ConfirmationNotice';

storiesOf('ConfirmationNotice', module)
	.add('closed modal', () => <ConfirmationNotice
		visible={false}
		send={{ amount: 120, abbr: 'ETH' }}
		confirmation={{
			counter_link: '#confirmationnumber',
			number: 0,
			all: 3,
			time_estimation: '35 minutes'
		}}
		onContinue={console.log}
	/>)
	.add('open with 120 ETH to send and 35 minutes of estimation time', () => (
		<ConfirmationNotice
			visible={true}
			send={{ amount: 120, abbr: 'ETH' }}
			confirmation={{
				counter_link: '#confirmationnumber',
				number: 0,
				all: 3,
				time_estimation: '35 minutes'
			}}
			onContinue={console.log}
		/>
	))
	.add('open with 100 ETH to send and 4 confirmations to success transaction and continue buying handler', () => (
		<ConfirmationNotice
			visible={true}
			send={{ amount: 100, abbr: 'ETH' }}
			confirmation={{
				counter_link: '#confirmationnumber',
				number: 0,
				all: 4,
				time_estimation: '50 minutes'
			}}
			onContinue={action('Continue buying')}
		/>
	));
