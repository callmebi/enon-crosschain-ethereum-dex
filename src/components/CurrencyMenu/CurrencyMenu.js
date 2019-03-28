import React from 'react';
import { connect } from 'react-redux';
import { getLimitOrders as onCurrencySelected } from '../../redux/actions'
import styles from './CurrencyMenu.module.css';
import CurrencyBadge from '../../elements/CurrencyBadge/CurrencyBadge';

const CurrencyMenu = (props) => {

	function currSelected(currAbbr) {
		if (props.onCurrencySelected)
			props.onCurrencySelected(currAbbr, props.ipfs, props.web3)
	}

	return (
		<div>
			<div onClick={() => currSelected('BTC')} className={styles.menuItem} >
				<CurrencyBadge
					iconSrc="/img/BC_Logo_.png"
					name="Bitcoin"
					abbr="BTC"
				/>
			</div>
            {/*
			<div onClick={() => currSelected('MRN')} className={styles.menuItem} >
				<CurrencyBadge
					iconSrc="/img/monero.png"
					name="Monero"
					abbr="MRN"
				/>
			</div>
            */}
			<div onClick={() => currSelected('ETH')} className={styles.menuItem} >
				<CurrencyBadge
					iconSrc="/img/icons8-ethereum-90_1icons8-ethereum-90.png"
					name="Ethereum"
					abbr="ETH"
				/>
			</div>
		</div>
	)
}

export default CurrencyMenu;

// function onCurrencySelected(currAbbr) {
// 	return {
// 		type: 'SELECT_CURRENCY',
// 		payload: currAbbr
// 	}
// }

const ConnectedCurrencyMenu = connect(null, { onCurrencySelected })(CurrencyMenu);

export { ConnectedCurrencyMenu }
