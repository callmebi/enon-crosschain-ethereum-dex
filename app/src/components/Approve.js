import React from 'react';
import { InputGroup, Form, Button} from 'react-bootstrap';
import './Approve.css';

class ApproveBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  handleKeyDown = (e) => {
    this.setState({ value: e.target.value }); // update input value, #TODO: filter wrong input
    if (e.keyCode === 13) { // Enter
      this.sendApprove();
    }
  }

  handleClick = () => {
    this.sendApprove();
  }

  sendApprove = async () => { // approve from account to DEX
    if (!this.state.value) // filter without value provided
      return;
    const { drizzle, drizzleState } = this.props;
    const collateral = drizzle.contracts.Collateral;
    const dex = drizzle.contracts.DEX;
    const decimals = await collateral.methods['decimals']().call();
    const approveValue = this.state.value * Math.pow(10, decimals); // float input to uint for tx
    console.log('Sending approve. Value: ', approveValue,
              ', Recv DEX: ', dex.address,
              ', Sender: ', drizzleState.accounts[0]);
    await collateral.methods['approve'].cacheSend(
      dex.address, approveValue, {from: drizzleState.accounts[0]});
  }
  
  render() {
    return (
      <div>
        <InputGroup className="mb-3">
          <Form.Control type="number" step="any" min="0" onKeyUp={this.handleKeyDown}/>
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={this.handleClick}>Approve</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}

export default ApproveBox;
