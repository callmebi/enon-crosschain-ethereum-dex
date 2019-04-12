import React, { Component } from 'react';
import BarsImage from '../../../assets/images/bars1.png';
import XImg from '../../../assets/images/x.svg';
export default class HomePagePopupCompare extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
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
                    <img src={BarsImage} alt="" />
                </div>
            </div>
        )
    }
}
