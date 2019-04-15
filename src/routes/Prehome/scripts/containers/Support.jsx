//import packages
import React from 'react';
import {Container, Row, Col, Image } from 'react-bootstrap';
import $ from 'jquery';
//import components
import '../../styles/containers/Support.scss';
//import files
import ImgMap from '../../styles/assets/img/map.png';

export default class Support extends React.Component {

     componentWillMount() {
            $( document ).ready(function() {
                console.log( "ready!" );
            var windowWidthA = $(window).width();
            console.log(windowWidthA);
            if (windowWidthA <= 1199){
                console.log('pomina');
                $('.support').children('.container').removeClass('container').addClass('container-fluid')  ;
            }else{
                $('.support').children('.container-fluid').removeClass('container-fluid').addClass('container')  ;
            }
        });
        $(window).resize(() => {
            var windowWidthA = $(window).width();
            console.log(windowWidthA);
            if (windowWidthA <= 1199){
                console.log('pomina');
                $('.support').children('.container').removeClass('container').addClass('container-fluid')  ;
            }else{
                $('.support').children('.container-fluid').removeClass('container-fluid').addClass('container')  ;
            }
        });
    }
    render() {
        return (
            <Container className="support">
                {/* <Container> */}
                    <Row  className="fillColor">
                            {/* <div class="enon-accessibility ">  */}
                                <Col xs={12} md={12} lg={5} >
                                    <div class="enon-accessibility__title">
                                        <h4>Distributed & resilient</h4>
                                        <p>
                                            Open-source technology, built on the 
                                            principles of blockchain with a 
                                            growing set of validators.
                                        </p>
                                        <p>
                                            Distributed entities and resources 
                                            including non-corruptible components 
                                            resulting in a byzantine fault tolerant system.
                                        </p>
                                    </div>
                                </Col>
                                <Col xs={12} md={12} lg={7} >
                                    <Image fluid src={ImgMap} width="611px" height="358px" alt=""/>
                                </Col>
                            {/* </div> */}
                    </Row>
                    {/* <Row  className="fillColorBottom">
                        <Col xs={12} md={12} lg={12} >
                            <div class="enon-accessibility__links">
                                <a href="https://docs.google.com/document/d/e/2PACX-1vTFHqUi5bvNPd-T1pdgT1PbOiyuu1O8T4NSSWUoSZYVAJJ0Vb-Iorb1x7z7GOFfff2l1oJGGV2ZpMbt/pub">our road map &nbsp;&nbsp;<i class="fas fa-arrow-right"></i></a>
                                <a href="#0">Last news &nbsp;&nbsp;<i class="fas fa-arrow-right"></i></a>
                            </div>
                        </Col>
                    </Row> */}
                {/* </Container> */}
            </Container>
        );
    }
}