import React from 'react';
import Trade from './Trade.js';
import { Alert, Container } from 'react-bootstrap';

class App extends React.Component {
  state = {
    loading: true,      // web3, contracts, accounts
    drizzleState: null, // drizzle props and state instead of Redux
  };

  componentDidMount() {
    const { drizzle } = this.props;
    this.unsubscribe = drizzle.store.subscribe( () => { // subs to changes in store
      const drizzleState = drizzle.store.getState(); // sync state updates with store
      if (drizzleState.drizzleStatus.initialized) {
        this.setState( { loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe(); // no memory leaks
  }

  render() {
    // 1. Connecting
    if (this.state.loading)
      return (
        <div className="App">
          <Container>
            <Alert variant="danger">
              Unable to loading, try to install MetaMask or unlock it.
            </Alert>
          </Container>
        </div>
      );

    // 2. Connected
    return (
      <div className="App">
        <Container>
          <Alert variant="success">
            Connected as {this.state.drizzleState.accounts[0]}
          </Alert>
          <Trade
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />
        </Container>
      </div>
    );
  }
}

export default App;
