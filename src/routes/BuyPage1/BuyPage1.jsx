//import packages
import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

//import componets
import BuyPage1Top from './BuyPage1Top/BuyPage1Top.jsx';
import BuyPage1Bottom from './BuyPage1Bottom/BuyPage1Bottom.jsx';
export default class BuyPage1 extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <BuyPage1Bottom />
                    <BuyPage1Top />
                </Row>
            </Container>
        )
    }
}
