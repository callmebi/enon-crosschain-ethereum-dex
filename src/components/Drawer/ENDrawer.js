import React, { useState } from 'react';
import { Drawer, Divider } from 'antd';
import ENUser from '../ENUser/ENUser';
import UserMenu from '../UserMenu/UserMenu';
import CurrencyMenu from '../CurrencyMenu/CurrencyMenu';

/** 
 * @module ENDrawer 
 * The drawer component that containts essencial user data, user's menu and  lets select cryptocurrency to trading.
 */

/**
 * @callback onClose
 * @param {Object} e - drawer on close event.
 */

/**
 * function that creates React's ENDrawer component.
 * @function ENDrawer
 * @param {boolean} visible - opened or closed state of the component.
 * @param {onClose} onClose - on drawer close callback.
 */
export default (props) => {

	let [vsbl, setVsbl] = useState(props.visible ? props.visible : false)

	return (
		<Drawer
			placement="left"
			closable={false}
			onClose={e => {
				setVsbl(false);
				props.onClose(e);
			}}
			visible={vsbl}
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