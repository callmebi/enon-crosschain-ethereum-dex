import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Header from '../src/components/Header/Header';

storiesOf('Header', module)
	.add('with 2 new limit orders badge', () => <Header messageNumber={2} />)
	.add('without limit order badge', () => (
		<Header />
	))
	.add('with menu item click handler', () => (
		<Header
			messageNumber={1}
			onClickMenuItem={action('Header menu item had clicked')}
		/>
	));
