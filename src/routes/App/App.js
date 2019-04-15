//import packages
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


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
let FooterComponent = Footer;
if(window.location.pathname === "/orderfirst" || window.location.pathname === "/orderSecond"){
  FooterComponent = FooterOrderFirst;
  } 
class App extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     clicked: false,
  //   }
  // }
  // footerPopupHandler = () => {
  //   let ace = !this.state.clicked
  //   this.setState({ clicked:  ace});
  //   console.log("smeneto");
  //   console.log(this.state.clicked);
  //   console.log(this.setState({ clicked: !this.state.clicked }));

  // }
  render() {
   
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            {/* <Route path="/about" component={About} /> */}
          <Route path="/orderSecond" component={OrderSecond} />
          <Route path="/orderfirst" component={Orderfirst} />
          <Route path="/buypage2" component={BuyPage2} />
          <Route path="/buypage1" component={BuyPage1} />
            <Route path={["/", "/home"]} exact component={Home} />
            {/* <Route component={NotFound} /> */}
          </Switch>
          <FooterComponent />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
