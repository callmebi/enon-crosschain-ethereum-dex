//import packages
import React from 'react';
import $ from 'jquery';
import {Container, Row, Col, Image } from 'react-bootstrap';
//import components
import '../../styles/containers/Security.scss';
//import files
import ImgRoad from '../../styles/assets/img/road.png';
import ImgScheme from '../../styles/assets/img/scheme.png';

export default class Security extends React.Component {
    componentWillMount(){
        $(document).ready(function($) {
			$('.image-wrapper').mousemove(function(e) {
				var maxWidth = $(this).width();
				var parentOffset = $(this).parent().offset();
			   	//or $(this).offset(); if you really just want the current element's offset
			   	var relX = e.pageX - parentOffset.left;
			   	// var relY = e.pageY - parentOffset.top;

			   	var rightPos = maxWidth - relX;
			   	$('.road').css('width', relX);
			   	$('.draggable-line').css('left', relX);
			   	$('.scheme').css('width', rightPos);
			   	// console.log(relX);
			   	$('.image-wrapper .road img, .image-wrapper .scheme img').css('width', maxWidth);
			});

			$(document).resize(function(event) {
				var maxWidth = $('.image-wrapper').width();

				$('.image-wrapper .road img, .image-wrapper .scheme img').css('width', maxWidth);
			});
            
            console.log( "ready!" );
            var windowWidthA = $(window).width();
            console.log(windowWidthA);
            if (windowWidthA <= 1199){
                console.log('pomina');
                $('.security').children('.container').removeClass('container').addClass('container-fluid')  ;
                // $('.security').queryselector('padLeft').removeClass('padLeft')  ;
            }else{
                $('.security').children('.container-fluid').removeClass('container-fluid').addClass('container')  ;
            }
        });
        $(window).resize(() => {
            var windowWidthA = $(window).width();
            console.log(windowWidthA);
            if (windowWidthA <= 1199){
                console.log('pomina');
                $('.security').children('.container').removeClass('container').addClass('container-fluid')  ;
                $('.needToModify').children('.pa').css("margin-right", "0%")
            }else{
                $('.security').children('.container-fluid').removeClass('container-fluid').addClass('container')  ;
            }
        });
    }
    render() {
        return (
            <div className="security">
                <Container>
                    <Row className="show-grid">
                        <Col xs={12} md={12} lg={12}>
                        
                            <div className="enon-security block-align">    
                                <Row className="show-grid">
                                    <header>
                                        <h5>Privacy guaranteed</h5>
                                        <Col lg={12} className="padLeft">
                                            <p>
                                                Trade without requiring personal data such as your passport or driver’s license while 
                                                the Enon trading mechanism focuses on enhanced privacy for assets owners.
                                            </p>
                                        </Col>
                                    </header>
                                </Row>
                                <div className="building-apps">
                                    <Row className="show-grid">
                                        <h6>High-level overview</h6>
                                        <Col mdHidden lg={2} className="needToRemove"></Col>
                                        <Col  md={12} lg={8} className="needToModify">
                                            <p className="pa">
                                                We removed limitations from varying blockchains to create a multi-layer trading solution that isn't affected by
                                                network congestions, high transaction fees and different network security requirements.
                                            </p>
                                        </Col>
                                        <Col mdHidden lg={2} className="needToRemove"></Col>
                                    </Row>
                                    <div className="building-apps__slider blick-align">
                                    <Row className="show-grid">
                                        <div className="captions">
                                            <span>Exchange securely</span>
                                            <span>... without a DEX's trading limitations</span>
                                        </div>
                                    </Row>
                                        <div className="wrapper">
                                            <div className="image-wrapper">
                                                <div className="road" style={{width: '50%'}}>
                                                    <img src={ImgRoad} width="100%" alt=""/>
                                                </div>
                                                <div className="draggable-line" style={{left: '50%'}}>
                                                </div>
                                                <div className="scheme" style={{width: '50%'}}>
                                                    <img src={ImgScheme} width="100%" alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}