import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import arrowImg from '../../assets/images/icons8-forward-90_1icons8-forward-90.png';
import LogImg1 from '../../assets/images/user-check.svg';
import LogImg2 from '../../assets/images/icons8-up-down-arrow-52_1icons8-up-down-arrow-52.png';
import LogImg3 from '../../assets/images/percent.svg';
import LogImg4 from '../../assets/images/download-cloud.svg';
import LogImg5 from '../../assets/images/lock.svg';
import LogImg6 from '../../assets/images/repeat-1.svg';
import LogImg7 from '../../assets/images/users.svg';
import Ximg from '../../assets/images/x.svg';
import FoxImg from '../../assets/images/metamask-p-130x130q80.png';
import EthImg from '../../assets/images/icons8-ethereum-90_1icons8-ethereum-90.png';
import './Login.scss';
export default class Login extends Component {
    render() {
        return (
            <Container className="login">
                <Row>
                    {/* <Col xs={12}> */}
                    <Col xs={1}></Col>
                        <Col xs={5} className="leftLog">
                            <h4>You only need ETH to pay for smart contract fees</h4>
                            <a href="#0"><img id="firstimg"src={FoxImg} alt=""/> LOGIN WITH METAMASK</a>
                            <a href="#0"><img id="secondimg"src={EthImg} alt=""/> CREATE ETHEREUM ADDRESS</a>
                            <hr />
                            <p>Private key</p>
                            <input type="text" />
                            <a id="logButton" href="/"><button >LOG IN<img src={arrowImg} alt="" /></button></a>
                        </Col>
                        <Col xs={5}>
                        <img id="xbutton"src={Ximg} alt=""/>
                        <ul>
                            <li><div className="liDiv"><img src={LogImg1} alt=""/></div>No KYC</li>
                            <li><div className="liDiv"><img src={LogImg2} alt=""/></div>Cross-chain</li>
                            <li><div className="liDiv"><img src={LogImg3} alt=""/></div>0 trading fees</li>
                            <li><div className="liDiv"><img src={LogImg4} alt=""/></div>Open source & decentralized</li>
                            <li><div className="liDiv"><img src={LogImg5} alt=""/></div>You control your keys</li>
                            <li><div className="liDiv"><img src={LogImg6} alt=""/></div>Peer-to-peer</li>
                            <li><div className="liDiv"><img src={LogImg7} alt=""/></div>No middleman/escrow</li>
                        </ul>
                        </Col>
                    {/* </Col> */}
                </Row>
            </Container>
        )
    }
}
