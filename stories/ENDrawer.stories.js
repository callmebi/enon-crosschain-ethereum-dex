import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ENDrawer from '../src/components/Drawer/ENDrawer';

import { Provider } from 'react-redux';
import store from '../src/redux/store';

const withProvider = (story) => (
	<Provider store={store}>
		{story()}
	</Provider>
)

storiesOf('ENDrawer', module)
	.addDecorator(withProvider)
	.add('open', () => <ENDrawer visible={true} onClose={action('close drawer')} />)
	.add('closed', () => (
		<ENDrawer visible={false} />
	));
