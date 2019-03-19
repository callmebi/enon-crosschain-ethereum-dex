import React from 'react';
import { Drawer, Divider } from 'antd';
import ENUser from '../ENUser/ENUser';
import UserMenu from '../UserMenu/UserMenu';
import CurrencyMenu from '../CurrencyMenu/CurrencyMenu';

/** 
 * @module ENDrawer 
 * The drawer component that containts essencial user data, user's menu and  lets select cryptocurrency to trading.
 */

/**
 * function that creates React's ENDrawer component.
 * @function ENDrawer
 * @param {boolean} visible - opened or closed state of the component.
 */
export default (props) => {
	return (
		<Drawer
			placement="left"
			closable={false}
			//   onClose={this.onClose}
			visible={props.visible}
			width={290}
		>
			<ENUser
				avatarSrc="/img/download_1download.png"
				ethAddr="0x1B0....3CA50"
				etherAvailable="0.0"
				onlineStatus="online"
			/>
			<Divider />
			<UserMenu myNewOrderCount={2} />
			<Divider />
			<CurrencyMenu onCurrencySelected={currAbbr => console.log(currAbbr)} />
			<Divider />
		</Drawer>
	)
}