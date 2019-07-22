import React, { Component } from 'react';
import { DrizzleContext } from "drizzle-react";
import useIpfsFactory from './hooks/use-ipfs-factory.js'
import useIpfs from './hooks/use-ipfs.js'

// import logo from './logo.svg';
// import Login from './features/Login/Login';
import Dashboard from './pages/Dashboard/DashboardPage';
import './App.css';

import { Drizzle, generateStore } from 'drizzle';
import Collateral from './contracts/Collateral.json';
import Exchange from './contracts/Exchange.json';

function IpfsProvider({ children }) {
    const { ipfs, ipfsInitError } = useIpfsFactory({ commands: ['id'] })
    const id = useIpfs(ipfs, 'id')
    return children(ipfs)
}


class App extends Component {
	render() {
        const options = { contracts: [ Exchange, Collateral ] }
        const store = generateStore(options)

		return (
			<div className="App">
                <DrizzleContext.Provider drizzle={new Drizzle(options, store)}>
                    <IpfsProvider>
                        { ipfs => (
                            <Dashboard />
                        )}
                    </IpfsProvider>
                </DrizzleContext.Provider>
			</div>
		);
	}
}

export default App;
