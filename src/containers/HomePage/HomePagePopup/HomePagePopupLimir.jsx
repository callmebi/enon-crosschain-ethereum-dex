import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import arrowImg from '../../../assets/images/icons8-forward-90_1icons8-forward-90.png';
import XImg from '../../../assets/images/x.svg';
import TradeImage from '../../../assets/images/icons8-left-and-right-arrows-96_1icons8-left-and-right-arrows-96.png';
import EthIcon from '../../../assets/images/icons8-ethereum-90_1icons8-ethereum-90.png';
import BTCImage from '../../../assets/images/BC_Logo_.png';
import MinusImage from '../../../assets/images/minus.svg';
import PlusImage from '../../../assets/images/plus.svg';
import CheckImage from '../../../assets/images/icons8-ok-60_1icons8-ok-60.png';
export default class homePagePopupLimir extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    handleCheck() {
        document.getElementById("check").classList.toggle("check2")
    }
    handleCheck1() {
        document.getElementById("check1").classList.toggle("check2")
    }
    handleCheck2() {
        document.getElementById("check2").classList.toggle("check2")
    }
    handleCheck3() {
        document.getElementById("check3").classList.toggle("check2")
    }
    popHandler() {
        let pop1 = document.getElementById("homePagePopupLimir");
        pop1.classList.toggle("showfooterPop");
    }
    innerPopHandler() {
        let pop2 = document.getElementById("popup_innerLimit");
        pop2.classList.toggle("hidefooterPop");
        let pop3 = document.getElementById("popup_innerLimit2");
        pop3.classList.toggle("showfooterPop");
    }
    innerPopHandler2() {
        let pop1 = document.getElementById("homePagePopupLimir");
        pop1.classList.toggle("showfooterPop");
        let pop2 = document.getElementById("popup_innerLimit");
        pop2.classList.toggle("hidefooterPop");
        let pop3 = document.getElementById("popup_innerLimit2");
        pop3.classList.toggle("showfooterPop");

    }
    popHandler2() {
        let pop1 = document.getElementById("homePagePopupLimir");
        pop1.classList.toggle("showfooterPop");
        let pop2 = document.getElementById("popup_innerLimit");
        pop2.classList.toggle("hidefooterPop");
        let pop3 = document.getElementById("popup_innerLimit2");
        pop3.classList.toggle("showfooterPop");
    }
    comparePopHandlerHome() {
        let pop3 = document.getElementById("popup_innerLimit2");
        pop3.classList.toggle("showfooterPop");
        let pop2 = document.getElementById("popup_innerLimit");
        pop2.classList.toggle("hidefooterPop");
    }
    render() {
        return (
            <div id={"homePagePopupLimir"} className=" popup">
                <div id="popup_innerLimit" className='popup_innerLimit'>
                    <Container>
                        <Row>
                            <div className="leftColo">
                                <Row>
                                    <h2>1</h2>
                                    <p>step</p>
                                    <div className="step stepBlue"></div>
                                </Row>
                                <Row onClick={this.innerPopHandler}>
                                    <h2>2</h2>
                                    <p>step</p>
                                    <div className="step"></div>
                                </Row>
                            </div>
                            <Col xs={10} className="rightColo">
                                <Row>
                                    <Col xs={12}>
                                        <img src={XImg} alt="" onClick={this.popHandler} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <h4>Create limit order</h4>
                                    </Col>
                                </Row>
                                <Row className="tradeParag">
                                    <div className="coinParag">
                                        <div className="divleft">
                                            <p>Send</p>
                                            <p id="biggerNum">120</p>
                                        </div>
                                        <div className="imgright">
                                            <img src={EthIcon} alt="" />
                                            <p>ETH</p><i className="fas fa-chevron-down"></i>
                                        </div>
                                    </div>
                                    <div id="tradeimgP">
                                        <img className="tradeimg" src={TradeImage} alt="" />
                                    </div>
                                    <div className="coinParag">
                                        <div className="divleft">
                                            <p>Receive</p>
                                            <p id="biggerNum">4</p>
                                        </div>
                                        <div className="imgright">
                                            <img src={BTCImage} alt="" />
                                            <p>BTC</p><i className="fas fa-chevron-down"></i></div>
                                    </div>
                                </Row>
                                <Row className="divider">
                                    <Col xs={6} id="dividerLeft">
                                        <p>1 BTC = 0.00223 ETH</p>
                                    </Col>
                                    <Col xs={6} id="dividerRight">
                                        <img src={MinusImage} alt="" />
                                        <img src={PlusImage} alt="" />
                                    </Col>
                                </Row>
                                <Row className="paddingRow">
                                    <p>Your receiving BTC address</p>
                                </Row>
                                <Row className="formGroup">
                                    <form>
                                        <Row>
                                            <Col lg={6}>
                                                <input type="text" placeholder="Address" />
                                            </Col>
                                            <Col lg={6}>
                                                <input type="text" placeholder="Re-confirm" />
                                            </Col>
                                        </Row>
                                        <Col xs={12}>
                                            <div id="continueButton" onClick={this.innerPopHandler}>CONTINUE<img src={arrowImg} alt="" /></div>
                                        </Col>
                                    </form>
                                </Row>

                            </Col>
                        </Row>
                    </Container>
                </div>
                <div id="popup_innerLimit2" className='popup_innerLimit2 '>
                    <Container>
                        <Row>
                            <div className="leftColo">
                                <Row onClick={this.comparePopHandlerHome}>
                                    <h2>1</h2>
                                    <p>step</p>
                                    <div className="step "></div>
                                </Row>
                                <Row>
                                    <h2>2</h2>
                                    <p>step</p>
                                    <div className="step stepBlue"></div>
                                </Row>
                            </div>
                            <Col xs={10} className="rightColo">
                                <Row>
                                    <Col xs={12}>
                                        <img src={XImg} alt="" onClick={this.innerPopHandler2} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <h4>Limit order requires a collateral. Don't have collaterals? Buy a market order.</h4>
                                    </Col>
                                </Row>
                                <Row className="paddingRow">
                                    <p>Collaterals</p>
                                </Row>
                                <Row className="paddingRow">
                                    <Col xs={3} className="padCol">
                                        <div style={{ "display": "inline-flex" }}>
                                            <div onClick={this.handleCheck} className="checkDiv">
                                                <img src={CheckImage} alt="" id="check" className="check check2" />

                                            </div>
                                            <p id="textWhite">ETH <strong>WETH</strong></p>
                                        </div>
                                    </Col>
                                    <Col xs={3} className="padCol">
                                        <div style={{ "display": "inline-flex" }}>
                                            <div onClick={this.handleCheck1} className="checkDiv">
                                                <img src={CheckImage} alt="" id="check1" className="check check2" />

                                            </div>
                                            <p>USDT (ERC20)</p>
                                        </div>
                                    </Col>
                                    <Col xs={3} className="padCol">
                                        <div style={{ "display": "inline-flex" }}>
                                            <div onClick={this.handleCheck2} className="checkDiv">
                                                <img src={CheckImage} alt="" id="check2" className="check check2" />

                                            </div>
                                            <p>TUSD</p>
                                        </div>
                                    </Col>
                                    <Col xs={3} className="padCol">
                                        <div style={{ "display": "inline-flex" }}>
                                            <div onClick={this.handleCheck3} className="checkDiv">
                                                <img src={CheckImage} alt="" id="check3" className="check check2" />

                                            </div>
                                            <p>USDC</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="divider">
                                    <Col xs={6} id="dividerLeft">
                                        <p>Collateral Amount= 160 ETH</p>
                                    </Col>
                                    <Col xs={6} id="dividerRight">
                                        <img src={MinusImage} alt="" />
                                        <img src={PlusImage} alt="" />
                                    </Col>
                                </Row>
                                <Row className="paddingRow">
                                    <p id="pContinue">Your receiving BTC address</p>
                                </Row>
                                <Row className="paddingRow">
                                    <p id="pContinueWhite">WETH Balance: 0</p>
                                </Row>
                                <Row className="formGroup">
                                    <form>
                                        <Col xs={12}>
                                            <div id="continueButton" onClick={this.innerPopHandler2}>CONTINUE<img src={arrowImg} alt="" /></div>
                                        </Col>
                                    </form>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}
