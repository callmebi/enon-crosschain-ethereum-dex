//import packages
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import $ from 'jquery';
//import components
import '../../styles/containers/Advantages.scss';

export default class Advantages extends React.Component {
    
    componentWillMount() {
        $( document ).ready(function() {
            console.log( "ready!" );
            var windowWidthA = $(window).width();
            console.log(windowWidthA);
            if (windowWidthA <= 1199){
                console.log('pomina');
                $('.advantages').children('.container').removeClass('container').addClass('container-fluid')  ;
            }else{
                $('.advantages').children('.container-fluid').removeClass('container-fluid').addClass('container')  ;
            }
        });
        $(window).resize(() => {
            var windowWidthA = $(window).width();
            console.log(windowWidthA);
            if (windowWidthA <= 1199){
                console.log('pomina');
                $('.advantages').children('.container').removeClass('container').addClass('container-fluid')  ;
            }else{
                $('.advantages').children('.container-fluid').removeClass('container-fluid').addClass('container')  ;
            }
        });
    }
    render() {
        return (
            <div className="advantages">
                <Container>
                    <Row className="show-grid justColor">
                        <Col  md={12} lg={12} xs={12} >
                            <Row className="show-grid">
                                <Col  md={9} lg={3} >
                                    <div className="enon-advantages">
                                            <h2>
                                                The advantages of Enon 
                                                decentralized exchange.
                                            </h2>
                                    </div>
                                </Col>
                                <Col mdHidden lg={5}>
                                </Col>
                                <Col  md={3} lg={4} >
                                    <button type="button" className="get-started" name="button">LEARN MORE </button>
                                </Col>
                            </Row>
                            <div className="enon-advantages__list enon-advantages">
                                <Row className="show-grid">
                                    <Col  md={9} lg={2} xs={12} className="sho">
                                        <div className="enon-advantages__item">
                                            <p>Secure</p>
                                            <span>
                                                Gateway, the first layer, leveraging 
                                                multisignature supported blockchains 
                                                guarantees secure deposits, withdrawals 
                                                and IOUs issuance.
                                            </span>
                                        </div>
                                    </Col>
                                    <Col  md={9} lg={2}  xs={12} className="sho">
                                        <div className="enon-advantages__item">
                                            <p>Robust</p>
                                            <span>
                                                Trading floor, the second layer, which 
                                                operates on the Enon blockchain 
                                                provides high performance and cost 
                                                efficient trading.
                                            </span>
                                        </div>
                                    </Col>
                                    <Col  md={9} lg={2} xs={12} className="sho">
                                        <div className="enon-advantages__item">
                                            <p>Trustless</p>
                                            <span>
                                                Trading fees redistributed as 
                                                ENO tokens incentivize miners, 
                                                validators, and all participants 
                                                to exhibit desired behavior.
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}