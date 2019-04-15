import React, { Component } from 'react'
import ForwardImg from '../../../assets/images/icons8-forward-90_1icons8-forward-90.png';
import BtcImg from '../../../assets/images/eth.svg';
import CopyImg from '../../../assets/images/copy.svg';
export default class BuyPage1Top extends Component {
  render() {
    return (
      <div className="buyPage1Top">
        <div className="innerDiv">
          <p className="inP">Complete! Waiting for other party to send. You can now exit this app.</p>
          <div className="innerDiv2">
            <div className="innerP">
              <p>0xf8cda97c0bb729f60cf1867c76e38769df9155d4
              </p>
              <img src={CopyImg} alt="" />
            </div>
            <div className="greyDiv"></div>
            <div className="darkerDiv">
              <div>
                <p>Time Left</p>
                <p className="whiteP">Completed</p>
              </div>
              <img className="arrImg" src={ForwardImg} alt="" />
              <div>
                <p>Amount Required</p>
                <div className="imgP">
                  <img src={BtcImg} alt="" />
                  <p className="whiteP pad">120 <span> ETH (3 confirms required</span></p>
                    <img  className="smallImg" src={CopyImg} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
