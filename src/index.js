import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { Drizzle, generateStore } from 'drizzle';
import App from './components/App';
import Collateral from './contracts/Collateral.json'; // token
import Exchange from './contracts/Exchange.json';

const options = {
  web3: {
    fallback: { // if there is no web3 provider in browser, fallback to local
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [ Exchange, Collateral ]
};
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));
