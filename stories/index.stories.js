import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// import { Button } from '@storybook/react/demo';
import Header from '../src/components/Header/Header';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Header', module)
	.add('with 2 new limit orders badge', () => <Header messageNumber={2} />)
	.add('without limit order badge', () => (
		<Header />
	));
