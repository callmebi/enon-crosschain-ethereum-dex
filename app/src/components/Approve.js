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
    this.setState({ value: e.target.value }); // update input value
    if (e.keyCode === 13) { // Enter
      this.sendApprove();
    }
  }

  handleClick = () => {
    this.sendApprove();
  }

  sendApprove = () => { // approve from account to DEX
    if (!this.state.value)
      return;
    const { drizzle, drizzleState } = this.props;
    const collateral = drizzle.contracts.Collateral;
    const dex = drizzle.contracts.DEX;
    console.log('Sending approve. Value: ', this.state.value,
              ', Recv DEX: ', dex.address,
              ', Sender: ', drizzleState.accounts[0]);
    collateral.methods['approve'].cacheSend(
      dex.address, this.state.value, {from: drizzleState.accounts[0]});
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
