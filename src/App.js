import React, { Component } from 'react';
import { DrizzleContext } from "drizzle-react";
// import logo from './logo.svg';
<<<<<<< HEAD
import Login from './features/Login/Login';
=======
// import Login from './features/Login/Login';
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
import Dashboard from './pages/Dashboard/DashboardPage';
import './App.css';

import IpfsHttpClient from 'ipfs-http-client';
import { Drizzle, generateStore } from 'drizzle';
import Collateral from './contracts/Collateral.json';
import Exchange from './contracts/Exchange.json';

class App extends Component {
	render() {
        const ipfs = IpfsHttpClient({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https'
        });
        const options = { contracts: [ Exchange, Collateral ] };
        const drizzleStore = generateStore(options);
        const drizzle = new Drizzle(options, drizzleStore);

		return (
			<div className="App">
                <DrizzleContext.Provider drizzle={drizzle}>
				    <Dashboard ipfs={ipfs}/>
                    {/* <Login /> */}
                </DrizzleContext.Provider>
			</div>
		);
	}
}

export default App;
