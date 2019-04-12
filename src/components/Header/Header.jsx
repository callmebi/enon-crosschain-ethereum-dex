import React, { Component } from 'react'
import {Navbar} from 'react-bootstrap';

//import components
import './Header.scss';
//imnport assets
import LogoImg from '../../assets/images/Screen_Shot_2019-03-06_at_12.52.40_PM.png';
import ArrowImg from '../../assets/images/chevron-right.svg';

export default class Header extends Component {
  LimirPopHandler () {
    let pop1 = document.getElementById("homePagePopupLimir");
    pop1.classList.toggle("showfooterPop");
    // let pop2 = document.getElementById("popup_innerLimit");
    //     pop2.classList.toggle("showfooterPop");
    console.log("toggle")
  }
  render() {
    return (
        <Navbar>
        <Navbar.Brand ><img src={LogoImg} 
                        className="float-right align-center"
                        alt=""
                        href="/" /></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="#0" onClick={this.LimirPopHandler}>CREATE LIMIT ORDER<img src={ArrowImg} alt=""/></a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
