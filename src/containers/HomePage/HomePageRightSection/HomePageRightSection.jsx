//import packages
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
//import componets
//import assets
import BitcoinImage from '../../../assets/images/BC_Logo_-p-130x130q80.png';
import Ethereum from '../../../assets/images/eth.svg';
import MoneroImage from '../../../assets/images/monero_1monero.png';
import Coin1Image from '../../../assets/images/1765_11765.png';
import Coin2Image from '../../../assets/images/825_1825.png';
import Coin3Image from '../../../assets/images/2_12.png';
import Coin4Image from '../../../assets/images/3408_13408.png';

export default class HomePageRightSection extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
    
        }
      }
      popHandler() {
        let pop1 = document.getElementById("homePagePopup");
        pop1.classList.toggle("showfooterPop");
      }
    render() {
        return (
            <Col className="hPRightSection">
                <Row className="hPRightTopSection">
                    <button id="buybu">BUY BITCOIN</button>
                    <button id="sellbu">SELL BITCOIN</button>
                </Row>
                <Col xs={12}>
                    <Row className="hPRightBottomSection">
                        <div className="coinTable">
                            <Row className="head">
                                <Col xs={4}>
                                    <p>Receive</p>
                                </Col>
                                <Col xs={4}>
                                    <p>Send</p>
                                </Col>
                                <Col xs={4}>
                                    <p>Order total USD</p>
                                </Col>
                            </Row>
                            <Row className="coinRow active">
                                <Col xs={4}>
                                    <img src={BitcoinImage} alt="" className="firstIcon" />
                                    <p>4 BTC</p>
                                </Col>
                                <Col xs={4}>
                                    <img src={Ethereum} alt="" /><p> 120 ETH</p>
                                </Col>
                                <Col xs={4}>
                                    <p className="valueDolar">$12.845.92</p>
                                    <a onClick={this.popHandler}>SELECT</a>
                                </Col>
                            </Row>
                            <Row className="coinRow">
                                <Col xs={4}>
                                    <img src={BitcoinImage} alt="" className="firstIcon" />
                                    <p>4 BTC</p>
                                </Col>
                                <Col xs={4}>
                                    <img src={MoneroImage} alt="" /><p>12 MNR</p>
                                </Col>
                                <Col xs={4}><p className="valueDolar">$12.845.92</p>
                                </Col>
                            </Row>
                            <Row className="coinRow">
                                <Col xs={4}>
                                    <img src={BitcoinImage} alt="" className="firstIcon" />
                                    <p>4 BTC</p>
                                </Col>
                                <Col xs={4}>
                                    <img src={Coin1Image} alt="" /><p>12 ETH</p>
                                </Col>
                                <Col xs={4}><p className="valueDolar">$12.845.92</p>
                                </Col>
                            </Row>
                            <Row className="coinRow">
                                <Col xs={4}>
                                    <img src={BitcoinImage} alt="" className="firstIcon" />
                                    <p>4 BTC</p>
                                </Col>
                                <Col xs={4}>
                                    <img src={Coin2Image} alt="" /><p>120 USDT</p>
                                </Col>
                                <Col xs={4}><p className="valueDolar">$12.845.92</p>
                                </Col>
                            </Row>
                            <Row className="coinRow">
                                <Col xs={4}>
                                    <img src={BitcoinImage} alt="" className="firstIcon" />
                                    <p>4 BTC</p>
                                </Col>
                                <Col xs={4}>
                                    <img src={Coin3Image} alt="" /><p>120 LTC</p>
                                </Col>
                                <Col xs={4}><p className="valueDolar">$12.845.92</p>
                                </Col>
                            </Row>
                            <Row className="coinRow">
                                <Col xs={4}>
                                    <img src={BitcoinImage} alt="" className="firstIcon" />
                                    <p>4 BTC</p>
                                </Col>
                                <Col xs={4}>
                                    <img src={Coin4Image} alt="" /><p> 120 ETH</p>
                                </Col>
                                <Col xs={4}><p className="valueDolar">$12.845.92</p>
                                </Col>
                            </Row>
                            <Row className="coinRow">
                                <Col xs={4}>
                                    <img src={BitcoinImage} alt="" className="firstIcon" />
                                    <p>4 BTC</p>
                                </Col>
                                <Col xs={4}>
                                    <img src={Ethereum} alt="" /><p> 120 ETH</p>
                                </Col>
                                <Col xs={4}><p className="valueDolar">$12.845.92</p>
                                </Col>
                            </Row>
                            <Row className="coinRow">
                                <Col xs={4}>
                                    <img src={BitcoinImage} alt="" className="firstIcon" />
                                    <p>4 BTC</p>
                                </Col>
                                <Col xs={4}>
                                    <img src={Ethereum} alt="" /><p> 120 ETH</p>
                                </Col>
                                <Col xs={4}><p className="valueDolar">$12.845.92</p>
                                </Col>
                            </Row>
                            <Row className="coinRow">
                                <Col xs={4}>
                                    <img src={BitcoinImage} alt="" className="firstIcon" />
                                    <p>4 BTC</p>
                                </Col>
                                <Col xs={4}>
                                    <img src={Ethereum} alt="" /><p>120 ETH</p>
                                </Col>
                                <Col xs={4}><p className="valueDolar">$12.845.92</p>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </Col>
            </Col>
        )
    }
}
