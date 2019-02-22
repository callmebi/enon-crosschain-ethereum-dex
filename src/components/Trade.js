import React from 'react';
import Modal from 'react-responsive-modal';
import IpfsHttpClient from 'ipfs-http-client';
import { NotificationManager } from 'react-notifications';
import { Form, Col, Button, Table, Tabs, Tab, InputGroup } from 'react-bootstrap';

import './Trade.css';

class Orderbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      tradeId: null,
      trade: {},
    };
    this.ipfs = this.props.ipfs;
    this.signTakerOrder = this.signTakerOrder.bind(this);
    this.startTrade = this.startTrade.bind(this);
    this.fetchOrders = this.fetchOrders.bind(this);

    const Exchange = this.props.drizzle.contracts.Exchange;
    Exchange.events
      .TradeStart()
      .on('data', (e) => {
          NotificationManager.success('Trade', 'Start');
          const tradeId = e.returnValues.id;
          Exchange.methods.getTrade(tradeId).call().then(trade => {
            if (this.props.account == trade.taker)
              this.loadTrade(tradeId);
          });
      })
      .on('error', (error) => console.log(error));
    Exchange.events
      .TradePartial()
      .on('data', (e) => {
        NotificationManager.success('Trade', 'Partial');
        const tradeId = e.returnValues.id;
        Exchange.methods.getTrade(tradeId).call().then(trade => {
          if (this.props.account == trade.maker)
            this.loadTrade(tradeId);
        });
      })
      .on('error', (error) => console.log(error));
    Exchange.events
      .TradeFinish()
      .on('data', (e) => {
          NotificationManager.success('Trade', 'Finish');
          if (e.returnValues.id == this.state.tradeId)
            this.setState({tradeId: null});
      })
      .on('error', (error) => console.log(error));
    Exchange.events
      .TakerTransferConfirmation()
      .on('data', (event) => {
          const tradeId = event.returnValues.id;
          const oracle = event.returnValues.oracle;
          NotificationManager.success('Trade ' + tradeId, 'Taker transfer confirmed by ' + oracle);
      })
      .on('error', (error) => console.log(error));
    Exchange.events
      .MakerTransferConfirmation()
      .on('data', (event) => {
          const tradeId = event.returnValues.id;
          const oracle = event.returnValues.oracle;
          NotificationManager.success('Trade ' + tradeId, 'Maker transfer confirmed by ' + oracle);
      })
      .on('error', (error) => console.log(error));
  }

  componentDidMount() {
    this.interval = setInterval(this.fetchOrders, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchOrders() {
    const web3 = this.props.drizzle.web3;
    const ipfs = this.ipfs;
    async function decode(order) {
        const params = web3.eth.abi.decodeParameters(
          ['bytes32', 'bytes32', 'uint256', 'uint256', 'bytes'],
          order.params
        );
        const ipfsRes = await ipfs.get(web3.utils.hexToAscii(params[4]));
        const makerExtra = JSON.parse(ipfsRes[0].content);
        order = Object.assign(order, makerExtra);
        order.amount = order.buy / 10**8;
        order.price = order.sell / 10**18 / order.amount;
        return order;
    }
    fetch('http://cdex-relay.herokuapp.com/')
      .then(res => res.json())
      .then(orders => Promise.all(orders.map(order => decode(order))))
      .then(orders => this.setState({orders}))
      .catch(console.log);
  }

  async signTakerOrder(recipient, maker) {
    const web3 = this.props.drizzle.web3;
    const account = this.props.account;

    const extra = JSON.stringify({
      market: maker.market,
      deal: maker.deal,
      account: recipient,
      sell: maker.buy,
      buy: maker.sell,
      nonce: web3.utils.randomHex(4)
    });
    const ipfsRes = await this.ipfs.add(new Buffer(extra));
    const extraHash = ipfsRes[0].hash;

    const blockNumber = await web3.eth.getBlockNumber();
    const deadline = blockNumber + 1000;

    const params = web3.eth.abi.encodeParameters(
      ['bytes32', 'bytes32', 'uint256', 'bytes'],
      [maker.market, maker.deal, deadline, web3.utils.toHex(extraHash)]
    );
    console.log('maker order params: '+[maker.market, maker.deal, deadline, web3.utils.toHex(extraHash)]);
    const paramsHash = web3.utils.sha3(params);
    console.log('taker order hash: '+paramsHash);
    const signature = await web3.eth.personal.sign(paramsHash, account);
    console.log('taker order signature: '+signature);
    return {params, signature};
  }

  async startTrade(maker) {
    const { Exchange } = this.props.drizzle.contracts;
    const account = this.props.account;

    console.log('maker params: '+maker.market+' '+maker.deal);
    const taker = await this.signTakerOrder(account, maker);
    Exchange.methods.startTrade.cacheSend(
      maker.params,
      maker.signature,
      taker.params,
      taker.signature,
      {from: account}
    );
  }

  loadTrade(tradeId) {
    if (!tradeId) return null;
    this.setState({tradeId: tradeId});

    const web3 = this.props.drizzle.web3;
    const ipfs = this.ipfs;
    const account = this.props.account;
    const { Exchange } = this.props.drizzle.contracts;

    Exchange.methods.getTrade(tradeId).call().then(trade => {
        const extraHash = account == trade.maker ? trade.takerExtra : trade.makerExtra; 
        ipfs.get(web3.utils.hexToAscii(extraHash)).then(ipfsRes => {
            const extra = JSON.parse(ipfsRes[0].content);
            this.setState({trade: Object.assign(trade, extra)});
        });
    });
  }

  render() {
    return (
      <>
      <Modal open={this.state.tradeId != null} onClose={() => this.setState({tradeId: null})} center>
        <div>
          <h2>Trade {this.state.tradeId}</h2>
          <p>Maker: {this.state.trade.maker}</p>
          <p>Taker: {this.state.trade.taker}</p>
          <hr/>
          <p>Send <b>{this.state.trade.buy}</b> to <b>{this.state.trade.account}</b></p>
        </div>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{width: '50px'}}>#</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.state.orders.map((order, index) =>
          <tr key={index}>
            <td>{index}</td>
            <td>{order.amount}</td>
            <td>{order.price}</td>
            <td><Button onClick={() => this.startTrade(order)}>Sell</Button></td>
          </tr>
          )}
        </tbody>
      </Table>
      </>
    );
  }
}

class NewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pair: 0,
      buy: null,
      price: null,
      recAccount: "", // recepient acccount, don't confuse with user account provided by web3
      collateral: "",
      trade: {}
    };
    this.ipfs = this.props.ipfs;
    this.signMakerOrder = this.signMakerOrder.bind(this);
    this.makeOrder = this.makeOrder.bind(this);

  }

  async signMakerOrder(recipient, buy, sell, collateral) {
    const web3 = this.props.drizzle.web3;
    const account = this.props.account;

    // BTC/ETH market id
    const market = '0xe0f4a6724033427de1d4e3b8b41f0ae08de7d949a567627dac8482a3fe5d7dc6'; 
    const deal = web3.utils.soliditySha3(
        {t: 'bytes32', v: market}
      , {t: 'uint256', v: sell}
      , {t: 'uint256', v: buy}
    );

    const extra = JSON.stringify({
      market: market,
      deal: deal,
      account: recipient,
      sell: sell,
      buy: buy,
      nonce: web3.utils.randomHex(4)
    });
    const ipfsRes = await this.ipfs.add(new Buffer(extra));
    const extraHash = ipfsRes[0].hash;

    const blockNumber = await web3.eth.getBlockNumber();
    const deadline = blockNumber + 1000;

    const params = web3.eth.abi.encodeParameters(
      ['bytes32', 'bytes32', 'uint256', 'uint256', 'bytes'],
      [market, deal, deadline, collateral, web3.utils.toHex(extraHash)]
    );
    console.log('maker order params: '+[market, deal, deadline, collateral, web3.utils.toHex(extraHash)]);
    const paramsHash = web3.utils.sha3(params);
    console.log('maker order hash: '+paramsHash);
    const signature = await web3.eth.personal.sign(paramsHash, account);
    console.log('maker order signature: '+signature);
    return {params, signature};
  }

  async makeOrder() {
    const { Exchange, Collateral } = this.props.drizzle.contracts;
    const account = this.props.account;
    const collateral = this.state.collateral * 10**18;

    const allowance = await Collateral.methods.allowance(account, Exchange.address).call();
    if (allowance < collateral)
      await Collateral.methods.approve.cacheSend(Exchange.address, collateral, {from: account});

    const sell = this.state.buy * this.state.price;
    const signed = await this.signMakerOrder(
      this.state.recAccount,
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

  handleSubmit(event) { // validate input and make an order
    event.preventDefault();
    event.stopPropagation();
    event.target.className += " was-validated";
    if (event.currentTarget.checkValidity() === true)
      this.makeOrder();
  }

  render() {
    return (
      <Form style={{margin: '40px'}} noValidate onSubmit={e => this.handleSubmit(e)}>
        <Form.Group as={Form.Row}>
          <InputGroup as={Col} md='3'>
            <Form.Control as='select' onChange={e => this.setState({ pair: e.target.value })}>
              <option>BTC / ETH</option>
            </Form.Control>
          </InputGroup>
          <InputGroup as={Col}>
            <Form.Control required type='number' placeholder='How much'
              value={this.state.buy || ""}
              onChange={e => this.setState({ buy: e.target.value })}/>
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2">BTC</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <InputGroup as={Col}>
            <Form.Control required type='number' placeholder='Price'
              value={this.state.price || ""}
              onChange={e => this.setState({ price: e.target.value })}/>
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2">ETH per BTC</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control required type='text' placeholder='38yZJPKtAFG8kr3ErvwmSMSTZWeTnbj5E7'
              value={this.state.recAccount}
              onChange={e => this.setState({ recAccount: e.target.value })}/>
            <Form.Text className='text-muted'>
              Recipient account address
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control required type='number' placeholder='Collateral amount'
              value={this.state.collateral}
              onChange={e => this.setState({ collateral: e.target.value })}/>
            <Form.Text className='text-muted'>
              Value of collateral token to lock on DEX contract
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <Button type="submit">Buy</Button>
      </Form>
    );
  }
}

class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.ipfs = IpfsHttpClient({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https'
    });
  }

  render() {
    return (
      <Tabs defaultActiveKey='orders'>
        <Tab eventKey='orders' title='OrderBook'>
          <Orderbook
            drizzle = {this.props.drizzle}
            account = {this.props.account}
            ipfs = {this.ipfs}
          />
        </Tab>
        <Tab eventKey='new' title='NewOrder'>
          <NewOrder
            drizzle = {this.props.drizzle}
            account = {this.props.account}
            ipfs = {this.ipfs}
          />
        </Tab>
      </Tabs>
    );
  }
}

export default Trade;
