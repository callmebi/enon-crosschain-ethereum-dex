import React from 'react';
import Modal from 'react-responsive-modal';
import { NotificationManager } from 'react-notifications';
import { Form, Col, Button, Table, Tabs, Tab } from 'react-bootstrap';

import './Trade.css';

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
      tradeId: null,
      trade: {},
    };

    this.signOrder = this.signOrder.bind(this);
    this.makeOrder = this.makeOrder.bind(this);
    this.openTrade = this.openTrade.bind(this);

    const DEX = this.props.drizzle.contracts.DEX;
    DEX.events
      .TradeOpened()
      .on('data', (e) => {
          NotificationManager.success('Trade', 'Success opened');
          this.loadTrade(e.returnValues.id);
      })
      .on('error', (error) => console.log(error));
    DEX.events
      .TradeClosed()
      .on('data', (event) => { console.log(event); NotificationManager.success('Trade', 'Success closed'); })
      .on('error', (error) => console.log(error));
    DEX.events
      .TransferConfirmed()
      .on('data', (event) => {
          const tradeId = event.returnValues.id;
          const oracle = event.returnValues.oracle;
          NotificationManager.success('Trade ' + tradeId, 'Transfer confirmed by ' + oracle);
      })
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
        order.buy = params[1];
        order.sell = params[2];
        order.amount = order.buy / 10**8;
        order.price = order.sell / 10**18 / order.amount;
        order.collateral = params[3];
        return order;
    }
    fetch('http://cdex-relay.herokuapp.com/')
      .then(res => res.json())
      .then(orders => orders.map(order => decode(order)))
      .then(orders => this.setState({orders}))
      .catch(console.log);
  }

  async signOrder(mode, recipient, buy, sell, collateral) {
    const web3 = this.props.drizzle.web3;
    const account = this.props.account;

    const data = web3.utils.toHex(JSON.stringify({
      mode: mode,
      account: recipient,
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
    const collateral = this.state.collateral * 10**18;

    const allowance = await Collateral.methods.allowance(account, DEX.address).call();
    if (allowance < collateral)
      await Collateral.methods.approve.cacheSend(DEX.address, collateral, {from: account});

    const sell = this.state.buy * this.state.price;
    const signed = await this.signOrder(
      "BTC",
      this.state.account,
      (this.state.buy * 10**8).toString(),
      (sell * 10**18).toString(),
      collateral.toString()
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
      "ETH",
      account,
      maker.sell.toString(),
      maker.buy.toString(),
      maker.collateral.toString()
    );
    const stackId = DEX.methods.openTrade.cacheSend(
      maker.params,
      maker.signature,
      taker.params,
      taker.signature,
      {from: account}
    );
  }

  loadTrade(tradeId) {
    if (!tradeId) return null;
    const account = this.props.account;

    const { DEX } = this.props.drizzle.contracts;
    let state = this.state;
    DEX.methods.trades(tradeId).call().then(trade => {
      if (account == trade.maker) {
        DEX.methods.valueToBuy(tradeId, trade.taker).call().then(sell =>
          DEX.methods.extraData(tradeId, trade.taker).call().then(data => {
            state.trade = trade;
            state.trade.valueToSell = sell;
            state.trade.recipient = JSON.parse(new Buffer(data.substr(2), 'hex'))['account'];
            state.tradeId = tradeId;
          })
        )
      } else if (account == trade.taker) {
        DEX.methods.valueToBuy(tradeId, trade.maker).call().then(sell =>
          DEX.methods.extraData(tradeId, trade.maker).call().then(data => {
            state.trade = trade;
            state.trade.valueToSell = sell;
            state.trade.recipient = JSON.parse(new Buffer(data.substr(2), 'hex'))['account'];
            state.tradeId = tradeId;
          })
        )
      }
    });
  }

  closeTrade(tradeId) {
    const { DEX } = this.props.drizzle.contracts;
    const account = this.props.account;
    DEX.methods.closeTrade.cacheSend(tradeId, {from: account});
  }

  render() {
    return (
      <Tabs defaultActiveKey='orders'>
        <Tab eventKey='orders' title='OrderBook'>
          <Modal open={this.state.tradeId != null} onClose={() => this.setState({tradeId: null})} center>
            <div>
              <h2>Trade {this.state.tradeId}</h2>
              <p>Maker: {this.state.trade.maker}</p>
              <p>Taker: {this.state.trade.taker}</p>
              <p>Collateral: {this.state.trade.collateralValue / 10**18}</p>
              <hr/>
              <p>Send <b>{this.state.trade.valueToSell}</b> to <b>{this.state.trade.recipient}</b></p>
              <Button onClick={() => this.closeTrade(this.state.tradeId)}>Close</Button>
            </div>
          </Modal>
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
                <td>{order.collateral / 10**18}</td>
                <td><Button onClick={() => this.openTrade(order)}>Sell</Button></td>
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
                <Form.Control type='text' placeholder='38yZJPKtAFG8kr3ErvwmSMSTZWeTnbj5E7'
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
            <Button onClick={this.makeOrder}>Buy</Button>
          </Form>
        </Tab>
      </Tabs>
    );
  }
}


export default TradeBox;
