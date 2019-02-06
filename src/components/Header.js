import React from 'react';
import { Navbar } from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <Navbar expand="lg" fixed="top" bg="light">
        <Navbar.Brand>{this.props.appName}</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Header;
