import React from 'react';
import { Form, Button} from 'react-bootstrap';

import './Trade.css';

const TokenA = '0x7F6f1F236D748D3c8E07eC00a663E4F1474a2e04'
const TokenB = '0x70fD8ed25a2d9c9C98e1e48a50bd3592491F8c77'

async function makeParams(web3, accounts, buy, sell, collateral) {
    let makerData = web3.utils.toHex(JSON.stringify({
        token: TokenA,
        account: accounts[0],
        nonce: 1
    }));

    let takerData = web3.utils.toHex(JSON.stringify({
        token: TokenB,
        account: '0x4af013AfBAdb22D8A88c92D68Fc96B033b9Ebb8a',
        nonce: 1
    }));

    let blockNumber = await web3.eth.getBlockNumber();
    let deadline = blockNumber + 100;

    let makerOrder = web3.eth.abi.encodeParameters(
        ['bytes', 'uint256', 'uint256', 'uint256', 'uint256'],
        [makerData, buy, sell, collateral, deadline]
    );

    let takerOrder = web3.eth.abi.encodeParameters(
        ['bytes', 'uint256', 'uint256', 'uint256', 'uint256'],
        [takerData, sell, buy, collateral, deadline]
    );

    let makerSignature = await web3.eth.sign(web3.utils.sha3(makerOrder), accounts[0]);
    let takerSignature = "0xc471469f31b790c4fa809539d0e5cf8fb4dce4ca3e24fcc58f8c6798b9fe6271291e3119ddd64b4d707cd08941cd93abcff2973b94c38225be6b4f8edf473b091b";

    return [makerOrder, makerSignature, takerOrder, takerSignature];
}

class TradeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collateral: null,
      buy: null,
      price: null,
      account: null,
      pair: null,
    };
  }

  handleClick = () => {
    this.openTrade();
  }

  openTrade = async () => {
    const { drizzle, drizzleState } = this.props;
    const collateral = drizzle.contracts.Collateral;
    const dex = drizzle.contracts.DEX;
    collateral.methods.approve.cacheSend(
      dex.address, this.state.collateral, {from: drizzleState.accounts[0]});
    const sell = this.state.buy * this.state.price;
    const params = await makeParams(drizzle.web3, drizzleState.accounts, this.state.buy.toString(), sell.toString(), this.state.collateral.toString());
    dex.methods.openTrade.cacheSend(params[0], params[1], params[2], params[3], {from: drizzleState.accounts[0]}) 
  }

  render() {
    return (
      <Form>
        <Form.Group controlId="tradeFrom.pair">
          <Form.Label>Trading pair</Form.Label>
          <Form.Control as="select" onChange={e => this.setState({ pair: e.target.value })}>
            <option>TokenA / TokenB</option>
            <option>TokenB / TokenA</option>
            <option>ETH / BTC</option>
            <option>BTC / ETH</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="tradeForm.buy">
          <Form.Label>Buy</Form.Label>
          <Form.Control type="number" placeholder="42"
            onChange={e => this.setState({ buy: e.target.value })}/>
          <Form.Text className="text-muted">
            How much you want to buy.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="tradeForm.price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" placeholder="1"
            onChange={e => this.setState({ price: e.target.value })}/>
          <Form.Text className="text-muted">
            What is a price of your order.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="tradeForm.collateral">
          <Form.Label>Collateral</Form.Label>
          <Form.Control type="number" placeholder="1"
            onChange={e => this.setState({ collateral: e.target.value })}/>
          <Form.Text className="text-muted">
            Collateral value to lock on DEX contract.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="tradeForm.account">
          <Form.Label>Receive to</Form.Label>
          <Form.Control type="text" placeholder="0x..."
            onChange={e => this.setState({ account: e.target.value })}/>
          <Form.Text className="text-muted">
            Recipient account address.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" onClick={this.handleClick}>Trade</Button>
      </Form>
    );
  }
}

export default TradeBox;
