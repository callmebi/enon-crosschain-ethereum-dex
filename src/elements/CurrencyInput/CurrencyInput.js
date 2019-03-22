import React, { useState } from 'react';
import { Input, Select } from 'antd';
import CurrencyAbbr from '../CurrencyAbbr/CurrencyAbbr'
import './CurrencyInput.css'

export default (props) => {

	const Option = Select.Option;

	let [inputVal, setInputVal] = useState(props.defaultValue ? props.defaultValue : '');
	let [selectVal, setSelectVal] = useState(props.defaultCurrency ? props.defaultCurrency : 'ETH');
	let [errorInputStyle, setErrorInputStyle] = useState({});

	function onChange(e) {
		let val = e.target.value;
		if (val.match(/^\d*(\.|\d{0,1})\d*(\s+|)$/ig)) {
			setInputVal(val);
			props.onInput({
				amount: e.target.value,
				abbr: selectVal
			}, e)
			setErrorInputStyle({})
		} else {
			setInputVal(val);
			props.onInput({
				err: new Error('Input value must be decimal number with or without decimal separator e.g. 120.55'),
				amount: e.target.value,
				abbr: selectVal
			})
			setErrorInputStyle({ borderColor: 'red', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px' })
		}
	}

	function onSelect(selectedOption, e) {
		setSelectVal(selectedOption);
		props.onInput({
			amount: inputVal,
			abbr: selectedOption,
		}, e)
	}

	const selectAfter = (
		<Select className="CurrencyInput_select" onSelect={onSelect} defaultValue={selectVal} >
			<Option value="BTC"><CurrencyAbbr abbr="BTC" iconSrc="/img/BTC.png" /></Option>
			<Option value="MNR"><CurrencyAbbr abbr="MNR" iconSrc="/img/MNR.png" /></Option>
			<Option value="ETH"><CurrencyAbbr abbr="ETH" iconSrc="/img/ETH.png" /></Option>
		</Select >
	);

	return (
		<Input
			size="large"
			onChange={onChange}
			addonAfter={selectAfter}
			defaultValue={props.defaultValue}
			placeholder={props.title}
			className={props.className}
			value={props.inputValue ? props.inputValue : inputVal}
			style={errorInputStyle}
		/>
	)
}

/*<div className="CurrencyInput_selectCntr"> <img
		className="CurrencyInput_currIcon"
		src={props.defaultCurrency ? `/img/${props.defaultCurrency}.png` : '/img/ETH.png'}
		alt={props.defaultCurrency ? `/img/${props.defaultCurrency}.png` : '/img/ETH.png'}
	/></div> */