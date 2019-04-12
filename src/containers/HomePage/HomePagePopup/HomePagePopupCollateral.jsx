import React, { Component } from 'react'
// import arrowImg from '../../../assets/images/icons8-forward-90_1icons8-forward-90.png';
import XImg from '../../../assets/images/x.svg';
export default class HomePagePopupCollateral extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    popHandler() {
        let pop1 = document.getElementById("homePagePopupCollateral");
        pop1.classList.toggle("showfooterPop");
        // let pop3 = document.getElementById("popup_inner2");
        // pop3.style.display = "none";
        // let pop2 = document.getElementById("popup_inner");
        // pop2.classList.toggle("hidefooterPop");
        console.log("toggle")
    }
    // innerPopHandler() {
    //     let pop2 = document.getElementById("popup_innerC");
    //     pop2.classList.toggle("hidefooterPop");
    //     let pop3 = document.getElementById("popup_inner2C");
    //     pop3.classList.toggle("showfooterPop");
    //     console.log("toggle")
    // }
    // innerPopHandler2() {
    //     let pop1 = document.getElementById("homePagePopupCollateral");
    //     pop1.classList.toggle("showfooterPop");
    //     let pop3 = document.getElementById("popup_inner2C");
    //     pop3.classList.toggle("showfooterPop");
    //     console.log("toggle2")

    // }
    // popHandler2() {
    //     let pop1 = document.getElementById("homePagePopupCollateral");
    //     pop1.classList.toggle("showfooterPop");
    //     let pop2 = document.getElementById("popup_innerC");
    //     pop2.classList.toggle("hidefooterPop");
    //     let pop3 = document.getElementById("popup_inner2C");
    //     pop3.classList.toggle("showfooterPop");
    //     console.log("toggle")
    // }
    render() {
        return (
            <div id={"homePagePopupCollateral"} className=" popup">
                {/* <div className='homePagePopup'> */}
                <div id="popup_innerC" className='popup_innerC'>
                    <img src={XImg} alt="" onClick={this.popHandler} />
                    <h4>Collateral</h4>
                    <p>If you don't receive your BTC after sending ETH, you will receive 160 ETH in collaterals. 
                        This is the list of all oracles for collaterals.
                         Oracles do not hold money.
                    </p>
                    <ul>
                        <li>
                            <p className="liHead">Enon (enon.com)</p>
                            <p className="liMid">0x7fdcd2a1e52f10c28cb7732f46393e297ecadda1</p>
                            <p><a href="#0" onClick={this.popHandler} className="liBot">Verify</a></p>
                        </li>
                        <li>
                            <p className="liHead">Enon (enon.com)</p>
                            <p className="liMid">0x7fdcd2a1e52f10c28cb7732f46393e297ecadda1</p>
                            <p><a href="#0" onClick={this.popHandler} className="liBot">Verify</a></p>
                        </li>
                        <li>
                            <p className="liHead">Enon (enon.com)</p>
                            <p className="liMid">0x7fdcd2a1e52f10c28cb7732f46393e297ecadda1</p>
                            <p><a href="#0" onClick={this.popHandler} className="liBot">Verify</a></p>
                        </li>
                        <li>
                            <p className="liHead">Enon (enon.com)</p>
                            <p className="liMid">0x7fdcd2a1e52f10c28cb7732f46393e297ecadda1</p>
                            <p><a href="#0" onClick={this.popHandler} className="liBot">Verify</a></p>
                        </li>
                        <li>
                            <p className="liHead">Enon (enon.com)</p>
                            <p className="liMid">0x7fdcd2a1e52f10c28cb7732f46393e297ecadda1</p>
                            <p><a href="#0" onClick={this.popHandler} className="liBot">Verify</a></p>
                        </li>
                        <li>
                            <p className="liHead">Enon (enon.com)</p>
                            <p className="liMid">0x7fdcd2a1e52f10c28cb7732f46393e297ecadda1</p>
                            <p><a href="#0" onClick={this.popHandler} className="liBot">Verify</a></p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
