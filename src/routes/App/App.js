//import packages
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Container } from 'react-bootstrap';

//import components
import Header from '../../components/Header/Header.jsx';
import Home from '../Home/Home.jsx';
import BuyPage1 from '../BuyPage1/BuyPage1.jsx';
import BuyPage2 from '../BuyPage2/BuyPage2.jsx';
import Orderfirst from '../Orderfirst/Orderfirst.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import OrderSecond from '../OrderSecond/OrderSecond.jsx';
import './App.scss';
import FooterOrderFirst from '../../components/Footer/FooterOrderFirst.jsx';
import FooterOrderFirst2 from '../../components/Footer/FooterOrderFirst2.jsx';
import FooterOrderFirst3 from '../../components/Footer/FooterOrderFirst3.jsx';
import FooterEmpty from '../../components/Footer/FooterEmpty.jsx';
import HaderEmpty from '../../components/Header/HeaderEmpty.jsx';
import Login from '../Login/Login.jsx';
import PreHome from '../Prehome/scripts/routes/Home.jsx';
import HeaderPre from '../Prehome/scripts/components/Header.jsx';
import FooterPre from '../Prehome/scripts/components/Footer.jsx';
let FooterComponent = Footer;
let HeaderComponent = Header;
class App extends Component {
  render() {
    if (window.location.pathname === "/buyPage1") {
      FooterComponent = FooterOrderFirst;
    } else if (window.location.pathname === "/buyPage2") {
      FooterComponent = FooterOrderFirst2;
    } else if (window.location.pathname === "/orderfirst") {
      FooterComponent = FooterOrderFirst3;
    } else if (window.location.pathname === "/login"){
      FooterComponent =FooterEmpty
      HeaderComponent =HaderEmpty
    }else if (window.location.pathname === "/prehome"){
      FooterComponent =FooterPre
      HeaderComponent =HeaderPre
    }
    return (
      <div className="App">
        <BrowserRouter>
          <HeaderComponent />
          <Switch>
          <Route path="/prehome" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/orderSecond" component={OrderSecond} />
            <Route path="/orderfirst" component={Orderfirst} />
            <Route path="/buypage2" component={BuyPage2} />
            <Route path="/buypage1" component={BuyPage1} />
            <Route path={["/", "/home"]} exact component={PreHome} />
          </Switch>
          <FooterComponent />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
