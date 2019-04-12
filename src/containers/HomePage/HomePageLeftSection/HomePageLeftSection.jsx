//import packages
import React, { Component } from 'react';
// import { Col } from 'react-bootstrap';
export default class HomePageLeftSection extends Component {
    render() {
        return (
            <div className="hPLeftSection">
                <div className="hPLeftSection1">
                    <p id="address">0x1B0....3CA50</p>
                    <p id="balance">0.0 ETH</p>
                </div>
                <div className="hPLeftSection2">
                    <p id="coin1">Bitoin</p>
                    <p id="">Monero</p>
                    <p id="">Ethereum</p>
                </div>
                <div className="hPLeftSection3">
                    <p id="orders">My orders<span>2</span></p>
                    <p id="">Exit</p>
                </div>
            </div>
        )
    }
}
