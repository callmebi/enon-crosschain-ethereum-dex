import React from 'react';
import './ENAdvantageList.css'

export default (props) => {
	return (
		<div className={props.className}>
			<div className="ENAdvantageList_advantage_cntr">
				<img src="/img/user-check.svg" alt="Privacy" className="ENAdvantageList_advantage_icon" />
				<span className="ENAdvantageList_advantage_title">Privacy</span>
			</div>
			<div className="ENAdvantageList_advantage_cntr">
				<img src="/img/icons8-up-down-arrow-52.png" alt="Cross-chain" className="ENAdvantageList_advantage_icon" />
				<span className="ENAdvantageList_advantage_title">Cross-chain</span>
			</div>
			<div className="ENAdvantageList_advantage_cntr">
				<img src="/img/percent.svg" alt="0 trading fees" className="ENAdvantageList_advantage_icon" />
				<span className="ENAdvantageList_advantage_title">0 trading fees</span>
			</div>
			<div className="ENAdvantageList_advantage_cntr">
				<img src="/img/download-cloud.svg" alt="Open source &amp; decentralized" className="ENAdvantageList_advantage_icon" />
				<span className="ENAdvantageList_advantage_title">Open source &amp; decentralized</span>
			</div>
			<div className="ENAdvantageList_advantage_cntr">
				<img src="/img/lock.svg" alt="You control your keys" className="ENAdvantageList_advantage_icon" />
				<span className="ENAdvantageList_advantage_title">You control your keys</span>
			</div>
			<div className="ENAdvantageList_advantage_cntr">
				<img src="/img/repeat-1.svg" alt="Peer-to-peer" className="ENAdvantageList_advantage_icon" />
				<span className="ENAdvantageList_advantage_title">Peer-to-peer</span>
			</div>
			<div className="ENAdvantageList_advantage_cntr">
				<img src="/img/users.svg" alt="No middleman/escrow" className="ENAdvantageList_advantage_icon" />
				<span className="ENAdvantageList_advantage_title">No middleman/escrow</span>
			</div>
		</div>
	)
}