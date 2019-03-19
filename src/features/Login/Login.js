import React from 'react';
import ENLogIn from '../../components/ENLogIn/ENLogIn';

export default (props) => {

	return (
		<div>
			<ENLogIn
				visible={true}
				onLoginOpt={(e) => console.log(e, 'onMetamaskLogin')}
			// onMetamaskLogin={(e) => console.log(e, 'onMetamaskLogin')}
			// onCreateEthAddr={(e) => console.log(e, 'onCreateEthAddr')}
			// onPrivateKeySubmit={(e) => {
			// 	e.preventDefault()
			// 	console.log(e, 'onPrivateKeySubmit')
			// }}
			/>
		</div>
	)
}