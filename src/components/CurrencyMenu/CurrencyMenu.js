import React from 'react';
import styles from './CurrencyMenu.module.css';
import CurrencyBadge from '../../elements/CurrencyBadge/CurrencyBadge';

export default (props) => {

	function currSelected(currAbbr) {
		if (props.onCurrencySelected)
			props.onCurrencySelected(currAbbr)
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
			<div onClick={() => currSelected('MRN')} className={styles.menuItem} >
				<CurrencyBadge
					iconSrc="/img/monero.png"
					name="Monero"
					abbr="MRN"
				/>
			</div>
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