import React, { Component } from 'react';
// import { Modal, Form } from 'antd';
// import LoginOpt from '../../elements/LoginOpt/LoginOpt';
import ReceiveAddressForm from '../../components/ReceiveAddressForm';
import './BuyCurrency.css';
<<<<<<< HEAD
import styles from './BuyCurrency.module.css';
=======
// import styles from './BuyCurrency.module.css';
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
import ConfirmationNotice from '../../components/ConfirmationNotice';
import TradingView from '../../components/TradingView';

class BuyCurrency extends Component {
	constructor(props) {
		super(props)


		this.state = {

		}

	}
	render() {
		return (
			<div className="BuyCurrency_component">
				<ReceiveAddressForm
					visible={false}
					receive={{ amount: 4, abbr: 'BTC' }}
					fee={{ amount: 0.03370, abbr: 'ETH', amount_usd: 0.001 }}
					onSubmit={console.log}
				/>
				<ConfirmationNotice
					visible={false}
					send={{ amount: 120, abbr: 'ETH' }}
					confirmation={{
						counter_link: '#confirmationnumber',
						number: 0,
						all: 3,
						time_estimation: '35 minutes'
					}}
					onContinue={console.log}
				/>
				<TradingView
					title={`Please send ${'ETH'} to the following address within the time limit.`}
					address="0xf8cda97c0bb729f60cf1867c76e38769df9155d4"
					trading={{
						progress: 40,
						time_left: '45:00',
						abbr: 'ETH',
						amount: 120
					}}
					confirmation={{
						count: 3,
						text: 'confirmations required'
					}}
					backgroundSkin="green"
					clipboardCopyBtn={true}
					onAddressCopy={console.log}
					onTimeAmountCopy={console.log}
				/>
			</div>
		)
	}

}

export default BuyCurrency;