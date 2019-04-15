//import packages
import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

//import componets
import HomePageLeftSection from '../../containers/HomePage/HomePageLeftSection/HomePageLeftSection.jsx';
import HomePageRightSection from '../../containers/HomePage/HomePageRightSection/HomePageRightSection.jsx';
import HomePagePopup from '../../containers/HomePage/HomePagePopup/HomePagePopup.jsx';
import HomePagePopupCollateral from '../../containers/HomePage/HomePagePopup/HomePagePopupCollateral.jsx';
import HomePagePopupLimir from '../../containers/HomePage/HomePagePopup/HomePagePopupLimir.jsx';
import HomePagePopupCompare from '../../containers/HomePage/HomePagePopup/HomePagePopupCompare.jsx';
import './Home.scss';
//import assets
export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <Container className="home">
                <HomePagePopup />
                <HomePagePopupCollateral />
                <HomePagePopupLimir />
                <HomePagePopupCompare />
                <Row>
                    <HomePageLeftSection />
                    <HomePageRightSection />
                </Row>
            </Container>
        )
    }
}
