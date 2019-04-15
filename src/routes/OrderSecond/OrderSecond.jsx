//import packages
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {  Link } from "react-router-dom";
//import componets

import BtcImg from '../../assets/images/BC_Logo_-p-130x130q80.png';
import './OrderSecond.scss';
export default class OrderSecond extends Component {
    render() {
        return (
            <Container fluid className="orderSecond">
                <Row>
                    <Col xs={3}>
                        <h2>Trade is completed.</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <p>Your ETH address:</p>
                    </Col>
                    <Col xs={2}>
                        <p>
                            <img src={BtcImg} alt="" /> 3JQSigWTCHyBLRD979JWgEtWP5YiiFwcQB
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <p>Your ETH address:</p>
                    </Col>
                    <Col xs={2}>
                    <p>
                            <img src={BtcImg} alt="" /> 4/4 BTC
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <p>Confirmations:</p>
                    </Col>
                    <Col xs={2}>
                        <p>
                            3
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <p>Transaction ID</p>
                    </Col>
                    <Col xs={2}>
                        <p> 
                            3JQSigWTCHyBLRD979JWgEtWP5YiiFwcQB
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                    <Link to="/">return home</Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}
