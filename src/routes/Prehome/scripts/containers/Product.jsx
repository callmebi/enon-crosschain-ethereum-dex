//import packages
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import $ from 'jquery';
//import components
import '../../styles/containers/Product.scss';
//import files
import ImgProduct from '../../styles/assets/img/enon-screen.png';
export default class Product extends React.Component {
    componentWillMount() {
        $(document).ready(function () {
            console.log("ready!");
            var windowWidthA = $(window).width();
            console.log(windowWidthA);
            if (windowWidthA <= 1199) {
                console.log('pomina');
                $('.product').children('.container').removeClass('container').addClass('container-fluid');
            } else {
                $('.product').children('.container-fluid').removeClass('container-fluid').addClass('container');
            }
        });
        $(window).resize(() => {
            var windowWidthA = $(window).width();
            console.log(windowWidthA);
            if (windowWidthA <= 1199) {
                console.log('pomina');
                $('.product').children('.container').removeClass('container').addClass('container-fluid');
            } else {
                $('.product').children('.container-fluid').removeClass('container-fluid').addClass('container');
            }
        });
    }
    render() {
        return (
            <div className="product">
                <Container>
                    <Row >
                        <Col xs={12} sm={7} md={7} lg={9}>
                            <div className="try-product__title">
                                <h3>Launching in <span>2019</span> </h3>
                                <p>Built for end-users with scalability requirements for market makers.</p>
                            </div>
                        </Col>
                        <Col xs={12} sm={5} md={5} lg={3}>
                            <div className="try-product__btns">
                                <a href="#0" className="whitepaper">Whitepaper</a>
                                <a href="#0" className="research">DEXs Research&nbsp;&nbsp;<i class="fas fa-arrow-right"></i></a>
                            </div>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={12} lg={12} className="noPaddingMedium">
                            <div className="product-wrapper">
                                <Col xs={12} sm={12} md={12} lg={9} className="noPadding" >
                                    <Image fluid src={ImgProduct} alt="" />
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={3} className="noPaddingRight" >
                                    <div className="try-product__info-wrapper">
                                        <div className="try-product__info">
                                            <p>Easy onboarding</p>
                                            <span>
                                                Exchange like you always
                                                have without painful
                                                extra onboarding requirements.
                                            </span>
                                        </div>
                                        <div className="try-product__info try-product__info--centred">
                                            <p>Open Access</p>
                                            <span>
                                                Retain control over your assets,
                                                personal information and what you trade.
                                            </span>
                                        </div>
                                        <div className="try-product__info">
                                            <p>Multi-assets </p>
                                            <span>
                                                Compatible with the majority
                                                of blockchain assets
                                                and privacy coins.
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}