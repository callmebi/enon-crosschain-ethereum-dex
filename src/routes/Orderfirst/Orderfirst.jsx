//import packages
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//import componets
import EthImg from '../../assets/images/eth.svg';
import './Orderfirst.scss';
export default class Orderfirst extends Component {
    render() {
        return (
            <Container fluid className="orderFirst">
                <Row>
                    <Col xl={6} lg={10} sm={8}>
                        <h2>Since the other trader didn't send BTC, you received
                            160 ETH to your address.
                    </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={2} xs={3}>
                        <p>Your ETH address:</p>
                    </Col>
                    <Col sm={5} xs={9}>
                        <p>
                            <img src={EthImg} alt="" /> 3JQSigWTCHyBLRD979JWgEtWP5YiiFwcQB
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={2} xs={3}>
                        <p>Collateral status:</p>
                    </Col>
                    <Col sm={5} xs={9}>
                        <p>
                            You received 160 ETH
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={2} xs={3}>
                        <p>Transaction ID:</p>
                    </Col>
                    <Col sm={5} xs={9}>
                        <p>
                            3JQSigWTCHyBLRD979JWgEtWP5YiiFwcQB
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <a href="/orderSecond">return home</a>
                    </Col>
                </Row>
            </Container>
        )
    }
}
