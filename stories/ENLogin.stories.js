import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ENLogin from '../src/components/ENLogIn/ENLogIn';

storiesOf('Login', module)
	.add('closed', () => (
		<ENLogin
			visible={false}
			onLoginOpt={(opt) => console.log(opt)}
		/>
	))
	.add('open. with submit handler', () => (
		<ENLogin
			visible={true}
			onLoginOpt={action('Log In')}
		/>
	));
