import React from 'react';
import Header from './Header.js';
import Trade from './Trade.js';
import { Alert } from 'react-bootstrap';

class MetaMaskUnlocked extends React.Component {
  state = {
    drizzleState: this.props.drizzle.store.getState()
  };

  componentDidMount() {
    const { drizzle } = this.props;
    this.unsubscribe = drizzle.store.subscribe( () => { // subs to changes in store
      const drizzleState = drizzle.store.getState(); // sync state updates with store
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe(); // no memory leaks
  }

  render() {
    return (
      <div>
        <Alert variant="success">
          Connected as {this.state.drizzleState.accounts[0]}
        </Alert>
        <Trade
          drizzle = {this.props.drizzle}
          account = {this.state.drizzleState.accounts[0]}
        />
      </div>
    );
  }
}

const loadingInformerStyle = {
  margin: '0px',
};

class MetaMaskLocked extends React.Component {
  render() {
    return (
      <div style={loadingInformerStyle}>
        <Alert variant="info">
          <p>Connecting to network. Please unlock MetaMask.</p>
        </Alert>
      </div>
    );
  }
}

class ContentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visibleComponent: MetaMaskLocked,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.drizzle.store.subscribe( () => { // subs to changes in store
      if (this.props.drizzle.store.getState().drizzleStatus.initialized)
        this.setState({ loading: false, visibleComponent: MetaMaskUnlocked });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  changeVisibleComponent() {
    this.setState({ visibleComponent: MetaMaskUnlocked });
  }

  render() {
    const VisibleComponent = this.state.visibleComponent;
    return (
      <div>
        <VisibleComponent
          changeEventHandler={this.changeVisibleComponent}
          drizzle={this.props.drizzle}
        />
      </div>
    );
  }
}

const contentContainerStyle = {
  margin: '40px',
  marginTop: '88px',
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div>
          <Header appName="CDEX"/>
        </div>
        <div style={contentContainerStyle}>
          <ContentContainer
            drizzle = {this.props.drizzle}
          />
        </div>
      </div>
    );
  }
}

export default App;
