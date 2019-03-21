import React, { useState } from 'react';
import { Drawer, Divider } from 'antd';
import ENUser from '../ENUser/ENUser';
import UserMenu from '../UserMenu/UserMenu';
import { ConnectedCurrencyMenu as CurrencyMenu } from '../CurrencyMenu/CurrencyMenu';
import { connect } from 'react-redux';

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
const ENDrawer = (props) => {

	console.log(props)

	if (!props.connected) {
		var [vsbl, setVsbl] = useState(props.visible ? props.visible : false)
	} else {
		var vsbl = props.visible;
	}

	return (
		<Drawer
			placement="left"
			closable={false}
			onClose={e => {
				!props.connected && setVsbl(false);
				props.onClose && props.onClose(e);
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

export default ENDrawer;

function onClose(id) {
	console.log(id)
	return {
		type: 'CLOSE_DRAWER',
		payload: id
	}
}

function mapState(state) {
	console.log(state);

	return {
		visible: state.drawer.visible,
		connected: true
	}

}

const ConnectedENDrawer = connect(mapState, { onClose })(ENDrawer);

export { ConnectedENDrawer }