import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CLOEnterCurrAndAmount from '../src/components/CLOEnterCurrAndAmount';

storiesOf('CLOEnterCurrAndAmount', module)
	.add('closed modal', () => <CLOEnterCurrAndAmount
		visible={false}
		onContinue={console.log}
	/>)
	.add('open with form submitting handler', () => (
		<CLOEnterCurrAndAmount
			visible={true}
			onContinue={action('submit amount and cryptocurrencies that user want to trade')}
		/>
	));
