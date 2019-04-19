import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import './Footer.scss';
//import assets
import EthImage from '../../assets/images/eth.svg';
import BtcImage from '../../assets/images/BC_Logo_.png';
export default class FooterOrderFirst3 extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }
  popHandler() {
    let pop1 = document.getElementById("homePagePopup");
    pop1.classList.toggle("showfooterPop");
  }
  collateralPopHandler() {
    let pop1 = document.getElementById("homePagePopupCollateral");
    pop1.classList.toggle("showfooterPop");
  }
  comparePopHandler() {
    let pop1 = document.getElementById("homePagePopupCompare");
    pop1.classList.toggle("showfooterPop");
  }
  render() {
    return (
      <Container fluid className="footerHome">
        <Row>
          <Container>
            <Row>
              <Col lg={7} xs={12} className="leftFooterSection">
                <Row>
                  <Col xs={4}>
                    <p>You send</p>
                    <img src={EthImage} alt="" /><span><strong>120</strong> ETH</span>
                  </Col>
                  <Col xs={4}>
                    <p>You receive</p>
                    <img src={BtcImage} alt="" /><span><strong>4</strong> BTC</span>
                  </Col>
                  <Col xs={4}>
                    <p>Price 1 BTC<a href="#0" onClick={this.comparePopHandler}>Compare</a></p>
                    <p><strong>28.19512548</strong> ETH</p>
                  </Col>
                </Row>
              </Col>
              <Col lg={5} xs={12} className="rightFooterSection">
                <Row>
                  <Col xs={4}>
                    <p onClick={this.collateralPopHandler}>160 ETH collateral</p>
                  </Col>
                  <Col xs={8}>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    )
  }
}
