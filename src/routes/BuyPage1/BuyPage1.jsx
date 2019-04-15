//import packages
import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

//import componets
import BuyPage1Top from './BuyPage1Top/BuyPage1Top.jsx';
import BuyPage1Bottom from './BuyPage1Bottom/BuyPage1Bottom.jsx';
import './BuyPage.scss';
export default class BuyPage1 extends Component {
    render() {
        return (
            <Container className="buyPage1">
                <Row>
                    <BuyPage1Top />
                    <BuyPage1Bottom />
                </Row>
            </Container>
        )
    }
}
