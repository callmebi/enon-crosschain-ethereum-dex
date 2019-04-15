import React, { Component } from 'react'
import ForwardImg from '../../../assets/images/icons8-forward-90_1icons8-forward-90.png';
import BtcImg from '../../../assets/images/BC_Logo_-p-130x130q80.png';
export default class BuyPage1Bottom extends Component {
  render() {
    return (
      <div className="buyPage1bottom">
        <div className="innerDiv">
          <p className="inP">Other trader will send after you,or you will receive 160 ETH in collaterals.</p>
          <div className="innerDiv2">
            <div className="innerP">
              <p>1PYDG8rSTbyfrDKKo3kvBP6cCfJqdcEzUh</p>
            </div>
            <div className="darkerDiv">
              <div>
                <p>Time Left</p>
                <p className="whiteP">45:00</p>
              </div>
              <img className="arrImg" src={ForwardImg} alt="" />
              <div>
                <p>Amount Required</p>
                <div className="imgP">
                  <img src={BtcImg} alt="" />
                  <p className="whiteP pad">4 <span>BTC (3 confirms required</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
