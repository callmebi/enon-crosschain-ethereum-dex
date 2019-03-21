import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ENDrawer from '../src/components/Drawer/ENDrawer';

storiesOf('ENDrawer', module)
	.add('open', () => <ENDrawer visible={true} onClose={action('close drawer')} />)
	.add('closed', () => (
		<ENDrawer visible={false} />
	));
