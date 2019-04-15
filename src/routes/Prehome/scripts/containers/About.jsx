//import packages
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import $ from 'jquery';
//import components
import '../../styles/containers/About.scss';
export default  class About extends React.Component {
    componentWillMount() {
        $( document ).ready(function() {
            console.log( "ready!" );
            var windowWidthA = $(window).width();
            console.log(windowWidthA);
            if (windowWidthA <= 1199){
                console.log('pomina');
                $('.about').children('.container').removeClass('container').addClass('container-fluid')  ;
            }else{
                $('.about').children('.container-fluid').removeClass('container-fluid').addClass('container')  ;
            }
        });
        $(window).resize(() => {
            var windowWidthA = $(window).width();
            console.log(windowWidthA);
            if (windowWidthA <= 1199){
                console.log('pomina');
                $('.about').children('.container').removeClass('container').addClass('container-fluid')  ;
            }else{
                $('.about').children('.container-fluid').removeClass('container-fluid').addClass('container')  ;
            }
        });
    }
    render() {
        return (
            <div className="about">
                <Container>
                    <Row className="show-grid">
                        <Col xs={12} md={12} lg={12}>
                            <div class="enon-about block-align">
                                <Row className="show-grid">
                                    <Col lg={8}>
                                    <h1>
                                        Decentralized cross-chain 
                                        exchange for crypto-assets.
                                    </h1>
                                    </Col>
                                </Row>
                                <Row className="show-grid">
                                    <Col lg={7}>
                                        <p>
                                            Enon leverages multiple layers of distributed technologies to achieve
                                            decentralization, security and trading robustness.
                                        </p>
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