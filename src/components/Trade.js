import React from 'react';
import { NotificationManager } from 'react-notifications';
import { Form, Col, Button, Table, Tabs, Tab } from 'react-bootstrap';

import './Trade.css';

const TokenA = '0x7F6f1F236D748D3c8E07eC00a663E4F1474a2e04'
const TokenB = '0x70fD8ed25a2d9c9C98e1e48a50bd3592491F8c77'

class TradeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      pair: 0,
      buy: null,
      price: null,
      account: "",
      collateral: "",
    };

    this.signOrder = this.signOrder.bind(this);
    this.makeOrder = this.makeOrder.bind(this);
    this.openTrade = this.openTrade.bind(this);

    const DEX = this.props.drizzle.contracts.DEX;
    DEX.events
      .TradeOpened()
      .on('data', (event) => { console.log(event); NotificationManager.success('Trade', 'Success opened'); })
      .on('error', (error) => console.log(error));
    DEX.events
      .TradeClosed()
      .on('data', (event) => { console.log(event); NotificationManager.success('Trade', 'Success closed'); })
      .on('error', (error) => console.log(error));
    DEX.events
      .TransferConfirmed()
      .on('data', (event) => { console.log(event); NotificationManager.success('Trade', 'Transfer confirmed'); })
      .on('error', (error) => console.log(error));
  }

  componentDidMount() {
    const web3 = this.props.drizzle.web3;
    this.interval = setInterval(() => this.fetchOrders(web3), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchOrders(web3) {
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
      .then(orders => this.setState({orders}))
      .catch(console.log);
  }

  async signOrder(token, buy, sell, collateral) {
    const web3 = this.props.drizzle.web3;
    const account = this.props.account;

    const data = web3.utils.toHex(JSON.stringify({
      token: token,
      account: account,
      nonce: web3.utils.randomHex(4)
    }));

    const blockNumber = await web3.eth.getBlockNumber();
    const deadline = blockNumber + 1000;

    const params = web3.eth.abi.encodeParameters(
      ['bytes', 'uint256', 'uint256', 'uint256', 'uint256'],
      [data, buy, sell, collateral, deadline]
    );
    console.log('order params: '+[data, buy, sell, collateral, deadline]);
    const paramsHash = web3.utils.sha3(params);
    console.log('order hash: '+paramsHash);
    const signature = await web3.eth.personal.sign(paramsHash, account);
    console.log('order signature: '+signature);
    return {params, signature};
  }

  async makeOrder() {
    const { DEX, Collateral } = this.props.drizzle.contracts;
    const account = this.props.account;

    const allowance = await Collateral.methods.allowance(account, DEX.address).call();
    if (allowance < this.state.collateral)
      await Collateral.methods.approve.cacheSend(DEX.address, this.state.collateral, {from: account});

    const sell = this.state.buy * this.state.price;
    const signed = await this.signOrder(
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
      body: JSON.stringify(signed)
    });
  }

  async openTrade(maker) {
    const { DEX, Collateral } = this.props.drizzle.contracts;
    const account = this.props.account;

    // Approve when need
    const allowance = await Collateral.methods.allowance(account, DEX.address).call();
    if (allowance < maker.collateral)
      await Collateral.methods.approve.cacheSend(DEX.address, maker.collateral, {from: account});

    console.log('maker params: '+maker.amount+' '+maker.price+' '+maker.collateral);
    const taker = await this.signOrder(
      TokenB,
      (maker.amount / maker.price).toString(),
      maker.amount.toString(),
      maker.collateral.toString()
    );
    DEX.methods.openTrade.cacheSend(
      maker.params,
      maker.signature,
      taker.params,
      taker.signature,
      {from: account}
    );
  }

  render() {
    return (
      <Tabs defaultActiveKey='orders'>
        <Tab eventKey='orders' title='OrderBook'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Collateral</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order, index) =>
              <tr key={index}>
                <td>{index}</td>
                <td>{order.amount}</td>
                <td>{order.price}</td>
                <td>{order.collateral}</td>
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
