import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import XImg from '../../../assets/images/x.svg';

import BarImg1 from '../../../assets/images/iconsBar/logo-desktop_1logo-desktop.png';
import BarImg2 from '../../../assets/images/iconsBar/270_1270.png';
import BarImg3 from '../../../assets/images/iconsBar/22_122.png';
import BarImg4 from '../../../assets/images/iconsBar/89_189.png';
import BarImg5 from '../../../assets/images/iconsBar/37_137.png';
import BarImg6 from '../../../assets/images/iconsBar/coin-market-cap-logo-p-130x130q80.png';
import BarImg7 from '../../../assets/images/iconsBar/24_124.png';
import BarImg8 from '../../../assets/images/iconsBar/157_1157.png';


export default class HomePagePopupCompare extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstPrice: "$3,846.92",
      secondPrice: "$3,846.92",
      thirdPrice: "$3,846.92",
      coin: [
        { coinName: 1, coinIcon: BarImg1, coinheight: -250 },
        { coinName: 2, coinIcon: BarImg1, coinheight: -270 },
        { coinName: 3, coinIcon: BarImg1, coinheight: -300 },
        { coinName: 4, coinIcon: BarImg1, coinheight: -270 },
        { coinName: 5, coinIcon: BarImg1, coinheight: -270 },
        { coinName: 6, coinIcon: BarImg1, coinheight: -200 },
        { coinName: 7, coinIcon: BarImg1, coinheight: -250 },
        { coinName: 8, coinIcon: BarImg1, coinheight: -270 }]
    }
  }
  // handleCoinBarNumber(){
  //   let numberCol = 8;

  // }
  popHandler() {
    let pop1 = document.getElementById("homePagePopupCompare");
    pop1.classList.toggle("showfooterPop");
  }
  render() {
    return (
      <div id={"homePagePopupCompare"} className=" popup">
        <div id="popup_innerCompare" className='popup_innerCompare'>
          <img className="xbutton" src={XImg} alt="" onClick={this.popHandler} />
          <h4>Price Compare</h4>
          <Container className="BarChart">
            <Row>
              <div className="leftCol">
                <p>{this.state.firstPrice}<span></span></p>
                <p>{this.state.secondPrice}<span></span></p>
                <p>{this.state.thirdPrice}<span></span></p>
              </div>
              <div className="positionOnCol">
                <div className="rightCol">
                  {this.state.coin.map(item => {
                    return <div className="bar" key={item.coinName} style={{ marginTop: item.coinheight }}></div>
                  })}
                </div>
              </div>

              <div className="positionOnCol pogore">
                <div className="rightCol iconBar">
                  <img src={BarImg1} alt="" />
                  <img src={BarImg2} alt="" />
                  <img src={BarImg3} alt="" />
                  <img src={BarImg4} alt="" />
                  <img src={BarImg5} alt="" />
                  <img src={BarImg6} alt="" />
                  <img src={BarImg7} alt="" />
                  <img src={BarImg8} alt="" />
                </div>
              </div>

            </Row>
          </Container>

        </div>
      </div>
    )
  }
}
