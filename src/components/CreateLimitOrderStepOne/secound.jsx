import React, { Component } from 'react'
import {Row,Col} from 'react-bootstrap';
import $ from 'jquery';
export default class secound extends Component {
    componentDidMount(){
        let id1 = function ace(){
            // document.getElementById("check").classList.toggle("check2")
            $("#check").toggle( "check2" );
        }
        document.getElementById("id1").addEventListener("click",id1);
        let id2 = function ace(){
            // document.getElementById("check").classList.toggle("check2")
            $("#check1").toggle( "check2" );
        }
        document.getElementById("id2").addEventListener("click",id2);
        let id3 = function ace(){
            // document.getElementById("check").classList.toggle("check2")
            $("#check2").toggle( "block" );
        }
        document.getElementById("id3").addEventListener("click",id3);
        let id4 = function ace(){
            // document.getElementById("check").classList.toggle("check2")
            $("#check3").toggle( "check2" );
        }
        document.getElementById("id4").addEventListener("click",id4);
        // document.getElementById("id2").addEventListener("click", 		document.getElementById("check1").classList.toggle("check2")
        // ); document.getElementById("id3").addEventListener("click", 		document.getElementById("check2").classList.toggle("check2")
        // ); document.getElementById("id4").addEventListener("click", 		document.getElementById("check3").classList.toggle("check2")
        // );
        // console.log($("#check").css("display"));
    }
     handleCheck(){
        // console.log($("#check").css("display"));
         if($("#check").css("display") === "none"){
            console.log("aceee");
         }
		// document.getElementById("check").style.display = "block";
        // document.getElementById("check1").style.display = "none";
        // document.getElementById("check2").style.display = "none";
        // document.getElementById("check3").style.display = "none";
		// console.log(document.getElementById("check"))
        // document.getElementById("check").classList.toggle("check2")
    }
     handleCheck1() {
		// document.getElementById("check1").classList.toggle("check2")

		// document.getElementById("check1").style.display = "block";
        // document.getElementById("check").style.display = "none";
        // document.getElementById("check2").style.display = "none";
        // document.getElementById("check3").style.display = "none";
    }
     handleCheck2() {
        // document.getElementById("check2").classList.toggle("check2")
    }
     handleCheck3() {
        // document.getElementById("check3").classList.toggle("check2")
    }
  render() {
    return (
      <div>
        <Row className="paddingRow">
                                    <Col xs={3} className="padCol">

                                        <div style={{ "display": "inline-flex" }}>
                                            <div  id="id1"className="checkDiv">
                                                <img src="img/images/icons8-ok-60_1icons8-ok-60.png" alt="" id="check" className="check check2" />

                                            </div>
                                            <p id="textWhite">ETH <strong>WETH</strong></p>
                                        </div>
                                    </Col>
                                    <Col xs={3} className="padCol">
                                        <div style={{ "display": "inline-flex" }}>
                                            <div onClick={this.handleCheck1()} id="id2" className="checkDiv">
                                                <img src="img/images/icons8-ok-60_1icons8-ok-60.png" alt="" id="check1" className="check check2" />

                                            </div>
                                            <p>USDT (ERC20)</p>
                                        </div>
                                    </Col>
                                    <Col xs={3} className="padCol">
                                        <div style={{ "display": "inline-flex" }}>
                                            <div onClick={this.handleCheck2()} id="id3" className="checkDiv">
                                                <img src="img/images/icons8-ok-60_1icons8-ok-60.png" alt="" id="check2" className="check check2" />

                                            </div>
                                            <p>TUSD</p>
                                        </div>
                                    </Col>
                                    <Col xs={3} className="padCol">
                                        <div style={{ "display": "inline-flex" }}>
                                            <div onClick={this.handleCheck3()} id="id4" className="checkDiv">
                                                <img src="img/images/icons8-ok-60_1icons8-ok-60.png" alt="" id="check3" className="check check2" />

                                            </div>
                                            <p>USDC</p>
                                        </div>
                                    </Col>
                                </Row>
      </div>
    )
  }
}
