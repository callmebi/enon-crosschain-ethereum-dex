import React from 'react';
import { Drawer } from 'antd';

import { storiesOf } from '@storybook/react';

import ENUser from '../src/components/ENUser/ENUser';

storiesOf('ENUser', module)
	.add('with 30 ETH and offline', () => (
		<Drawer
			placement="left"
			closable={false}
			visible={true}
			width={290}
		>
			<ENUser
				avatarSrc="/img/download_1download.png"
				ethAddr="0xf8cda97c0bb729f60cf1867c76e38769df9155d4"
				etherAvailable="30.0"
				onlineStatus="offline"
			/>
		</Drawer>
	))
	.add('with 2.0 ETH and online', () => (
		<Drawer
			placement="left"
			closable={false}
			visible={true}
			width={290}
		>
			<ENUser
				avatarSrc="/img/download_1download.png"
				ethAddr="0xf8cda97c0bb729f60cf1867c76e38769df9155d4"
				etherAvailable="2.0"
				onlineStatus="online"
			/>
		</Drawer>
	));
