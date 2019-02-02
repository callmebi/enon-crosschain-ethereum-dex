import React from 'react';
import Approve from './Approve.js';
import { Form } from 'react-bootstrap';

class App extends React.Component {
  state = {
    loading: true,      // web3, contracts, accounts
    drizzleState: null, // drizzle props and state instead of Redux
    user: null
  };

  componentDidMount() {
    const { drizzle } = this.props;
    this.unsubscribe = drizzle.store.subscribe( () => { // subs to changes in store
      const drizzleState = drizzle.store.getState(); // sync state updates with store
      if (drizzleState.drizzleStatus.initialized) {
        this.setState( { loading: false, drizzleState });
      }
    });
    window.drizzle = drizzle; // #TODO 1
  }

  componentWillUnmount() {
    this.unsubscribe(); // no memory leaks
  }

  render() {
    // 1. Connecting
    if (this.state.loading)
      return "Connecting to network. Please unlock MetaMask.";

    // 2. Connected
    const account = this.state.drizzleState.accounts[0];
    return (
      <div className="App">
        <Form.Label>Account: {account}</Form.Label>
        <Approve
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      </div>
    );
  }
}

export default App;
