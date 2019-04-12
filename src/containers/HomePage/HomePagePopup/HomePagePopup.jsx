import React, { Component } from 'react'
import arrowImg from '../../../assets/images/icons8-forward-90_1icons8-forward-90.png';
import XImg from '../../../assets/images/x.svg';
export default class HomePagePopup extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    popHandler() {
        let pop1 = document.getElementById("homePagePopup");
        pop1.classList.toggle("showfooterPop");
        console.log("toggle")
    }
    innerPopHandler() {
        let pop2 = document.getElementById("popup_inner");
        pop2.classList.toggle("hidefooterPop");
        let pop3 = document.getElementById("popup_inner2");
        pop3.classList.toggle("showfooterPop");
        console.log("toggle")
    }
    innerPopHandler2() {
        let pop1 = document.getElementById("homePagePopup");
        pop1.classList.toggle("showfooterPop");
        let pop3 = document.getElementById("popup_inner2");
        pop3.classList.toggle("showfooterPop");
        console.log("toggle2")

    }
    popHandler2() {
        let pop1 = document.getElementById("homePagePopup");
        pop1.classList.toggle("showfooterPop");
        let pop2 = document.getElementById("popup_inner");
        pop2.classList.toggle("hidefooterPop");
        let pop3 = document.getElementById("popup_inner2");
        pop3.classList.toggle("showfooterPop");
        console.log("toggle")
    }
    render() {
        return (
            <div id={"homePagePopup"} className=" popup">
                <div id="popup_inner" className='popup_inner'>
                    <img src={XImg} alt="" onClick={this.popHandler} />
                    <h4>
                        4 BTC will be sent to this address.
                        Please use a new address with 0 balance in it.
                    </h4>
                    <p htmlFor="btcAddress">BTC Address</p>
                    <input type="text" name="btcAddress" />
                    <p htmlFor="reBtcAddress">Re-confirm BTC address</p>
                    <input type="text" name="reBtcAddress" />
                    <button onClick={this.innerPopHandler}>Pay Fees: 0.03370 ETH ($0.001)<img src={arrowImg} alt="" /></button>
                </div>
                <div id="popup_inner2" className='popup_inner2 '>
                    <img src={XImg} alt="" onClick={this.popHandler2} />
                    <h4>
                        Please have 120 ETH ready to pay once this transaction reaches 3 confirmations
                    </h4>
                    <div><p id="left">Confirmations:</p><p id="right"><span>0/3</span> (est: 35 minutes)</p></div>
                    <button href="/">CONTINUE<img src={arrowImg} alt="" /></button>
                </div>
            </div>
        )
    }
}
