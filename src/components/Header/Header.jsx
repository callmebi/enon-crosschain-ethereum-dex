import React, { Component } from 'react'
import {Container,Row,Col, Navbar } from 'react-bootstrap';

//import components
import './Header.scss';
//imnport assets
import LogoImg from '../../assets/images/Screen_Shot_2019-03-06_at_12.52.40_PM.png';
import ArrowImg from '../../assets/images/chevron-right.svg';

export default class Header extends Component {
  LimirPopHandler() {
    let pop1 = document.getElementById("homePagePopupLimir");
    pop1.classList.toggle("showfooterPop");
  }
  componentDidMount() {
    if(window.innerWidth <= 580){
document.getElementById("mobWidth").classList.toggle("col-12")
    }
  }
  render() {
    return (
      <Container fluid>
      <Row>
        <Col id="mobWidth" xs={10}>
      <Navbar>
        <Navbar.Brand href="/"><img src={LogoImg}
          className="float-right align-center widthImg" 
          alt=""
           /></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="#0" onClick={this.LimirPopHandler}>CREATE LIMIT ORDER<img src={ArrowImg} alt="" /></a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      </Col>
      </Row>
      </Container>
    )
  }
}
