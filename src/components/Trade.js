import React from 'react';
import { Form, Col, Button, Table, Tabs, Tab } from 'react-bootstrap';

import './Trade.css';

const TokenA = '0x7F6f1F236D748D3c8E07eC00a663E4F1474a2e04'
const TokenB = '0x70fD8ed25a2d9c9C98e1e48a50bd3592491F8c77'

async function makeOrder(web3, account, token, buy, sell, collateral) {
    const data = web3.utils.toHex(JSON.stringify({
        token: token,
        account: account,
        nonce: Math.random()
    }));

    const blockNumber = await web3.eth.getBlockNumber();
    const deadline = blockNumber + 100;

    const params = web3.eth.abi.encodeParameters(
        ['bytes', 'uint256', 'uint256', 'uint256', 'uint256'],
        [data, buy, sell, collateral, deadline]
    );

    const signature = await web3.eth.sign(web3.utils.sha3(params), account);
    return {params, signature};
}

class TradeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      collateral: null,
      buy: null,
      price: null,
      account: null,
      pair: null
    };
  }

  componentDidMount = () => {
    const web3 = this.props.drizzle.web3;
    function decode(order) {
        const params = web3.eth.abi.decodeParameters(
          ['bytes', 'uint256', 'uint256', 'uint256', 'uint256'],
          order.params
        );
        order.amount = params[1];
        order.price = params[2] / params[1];
        order.collateral = params[3];
        return order;
    }
    fetch('http://cdex-relay.herokuapp.com/')
      .then(res => res.json())
      .then(orders => orders.map(order => decode(order)))
      .then(orders => this.setState({orders}));
  }

  makeOrder = async () => {
    const { drizzle } = this.props;
    const collateral = drizzle.contracts.Collateral;
    const dex = drizzle.contracts.DEX;

    const allowance = await collateral.methods.allowance(this.props.account, dex.address).call();
    console.log(allowance);
    if (allowance < this.state.collateral)
      collateral.methods.approve.cacheSend(
        dex.address, this.state.collateral, {from: this.props.account});

    const sell = this.state.buy * this.state.price;
    const order = await makeOrder(
        drizzle.web3,
        this.props.account,
        TokenA,
        this.state.buy.toString(),
        sell.toString(),
        this.state.collateral.toString()
    );
    fetch('http://cdex-relay.herokuapp.com/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
  }

  openTrade = async (maker) => {
    const { drizzle } = this.props;
    const collateral = drizzle.contracts.Collateral;
    const dex = drizzle.contracts.DEX;

    // Approve when need
    const collateralBalance = await collateral.methods.balanceOf(this.props.account).call();
    console.log('collateral balance: '+collateralBalance);
    const allowance = await collateral.methods.allowance(this.props.account, dex.address).call();
    console.log('collateral allowance: '+collateralBalance+' required: '+maker.collateral);
    if (allowance < maker.collateral)
      collateral.methods.approve.cacheSend(dex.address, maker.collateral, {from: this.props.account});

    const taker = await makeOrder(
        drizzle.web3,
        this.props.account,
        TokenB,
        (maker.amount / maker.price).toString(),
        maker.amount.toString(),
        maker.collateral.toString()
    );
    dex.methods.openTrade.cacheSend(
        maker.params,
        maker.signature,
        taker.params,
        taker.signature,
        {from: this.props.account}
    );
  }

  render() {
    return (
      <Tabs defaultActiveKey='orders'>
        <Tab eventKey='orders' title='OrderBook'>
          <Table striped bordered hover>
            <thead>
              <th>#</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Action</th>
            </thead>
            <tbody>
              {this.state.orders.map(order =>
              <tr>
                <td>0</td>
                <td>{order.amount}</td>
                <td>{order.price}</td>
                <td><Button onClick={() => this.openTrade(order)}>Buy</Button></td>
              </tr>
              )}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey='new' title='NewOrder'>
          <Form>
            <Form.Row>
              <Form.Group as={Col} md='3'>
                <Form.Control as='select' onChange={e => this.setState({ pair: e.target.value })}>
                  <option>TokenA / TokenB</option>
                  <option>TokenB / TokenA</option>
                  <option>ETH / BTC</option>
                  <option>BTC / ETH</option>
                </Form.Control>
                <Form.Text className='text-muted'>
                  Trading pair.
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control type='number' placeholder='How much'
                  value={this.state.buy}
                  onChange={e => this.setState({ buy: e.target.value })}/>
                <Form.Text className='text-muted'>
                  Total amount of trade.
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control type='number' placeholder='Price'
                  value={this.state.price}
                  onChange={e => this.setState({ price: e.target.value })}/>
                <Form.Text className='text-muted'>
                  Price of one traded unit.
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control type='text' placeholder='0x...'
                  value={this.state.account}
                  onChange={e => this.setState({ account: e.target.value })}/>
                <Form.Text className='text-muted'>
                  Recipient account address.
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control type='number' placeholder='Collateral amount'
                  value={this.state.collateral}
                  onChange={e => this.setState({ collateral: e.target.value })}/>
                <Form.Text className='text-muted'>
                  Value of collateral token to lock on DEX contract.
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Button onClick={this.makeOrder}>Sell</Button>
          </Form>
        </Tab>
      </Tabs>
    );
  }
}

export default TradeBox;
