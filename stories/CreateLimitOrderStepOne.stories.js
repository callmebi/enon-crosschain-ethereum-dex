import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CreateLimitOrderStepOne from '../src/components/CreateLimitOrderStepOne';
import { Modal } from 'antd';

storiesOf('CreateLimitOrder', module)
	.add('without predefined amount', () => (
		<Modal visible={true} footer={null} width={790}>
			<CreateLimitOrderStepOne
				onContinue={action('Submit')}
				priceCalc={(receiveAmount, sendAmount) => {
					console.log(sendAmount, receiveAmount)
					return sendAmount / receiveAmount
				}}
				onPriceChange={(sendAmount, receiveAmount, priceChange) => {
					let oldPrice = sendAmount / receiveAmount;
					let newPrice = oldPrice + priceChange;
					let newReceiveAmount = sendAmount / newPrice;
					return { newSendAmount: undefined, newReceiveAmount: newReceiveAmount };
				}}
			/>
		</Modal>
	))
	.add('with 120 ETH to sell and 4 BTC to buy by default', () => (
		<Modal visible={true} footer={null} width={790}>
			<CreateLimitOrderStepOne
				onContinue={action('Submit')}
				send={{
					abbr: 'ETH',
					amount: 120
				}}
				receive={{
					abbr: 'BTC',
					amount: 4
				}}
				priceCalc={(receiveAmount, sendAmount) => sendAmount / receiveAmount}
				onPriceChange={(sendAmount, receiveAmount, priceChange) => {
					let oldPrice = sendAmount / receiveAmount;
					let newPrice = oldPrice + priceChange;
					let newReceiveAmount = sendAmount / newPrice;
					return { newSendAmount: undefined, newReceiveAmount: newReceiveAmount };
				}}
			/>
		</Modal>
	));
