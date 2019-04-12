//import packages
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


//import components
import Header from '../../components/Header/Header.jsx';
import Home from '../Home/Home.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import './App.scss';
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
            {/* <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} /> */}
            <Route path={["/", "/home"]} exact component={Home} />
            {/* <Route component={NotFound} /> */}
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
