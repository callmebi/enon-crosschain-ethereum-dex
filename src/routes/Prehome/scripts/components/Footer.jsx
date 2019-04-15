//import packages
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
//import components
import '../../styles/components/Footer.scss';
export default  class Footer extends React.Component {
    
    render() {
        return (
            <div className="footer">
                <Container fluid>
                    <Row className="show-grid">
                        <Col sm={12} md={6}>
                            <h3>Ready to start testing today?</h3>
                        </Col>
                        <Col xsHidden smHidden md={6}>
                        </Col>
                    </Row>
                    <Row className="show-grid" >
                        <Col md={12} lg={6} pushRight style={{backgroundColor: '#060d23'}}>
                        {/* <Col smHidden mdHidden lg={6}></Col> */}
                        {/* <Col  md={12} lg={5}> */}

                            <div className="page-footer__info-subscribe float-right">
                                <a href="https://enon.us19.list-manage.com/subscribe/post?u=a82d9bdc95dbeebd84531f3e9&id=a419ded280">SUBSCRIBE</a>
                                <i href="https://enon.us19.list-manage.com/subscribe/post?u=a82d9bdc95dbeebd84531f3e9&id=a419ded280" class="fas fa-arrow-right"></i>
                                <p>
                                    Be up to date with all project’s progress. 
                                    We won’t send emails unless it’s related 
                                    to the project’s development.
                                </p>
                            </div>
                            {/* </Col> */}
                        </Col>
                        <Col md={12} lg={6}  pullLeft style={{backgroundColor: '#f8f8f9'}}>
                            <div className="page-footer__info-hiring">
                                <Row className="show-grid" >
                                <Col lg={12}>
                                    <a href="https://goo.gl/forms/9w7xJJJaNd4wD7zq2">WE ARE HIRING</a>
                                    <i href="https://goo.gl/forms/9w7xJJJaNd4wD7zq2" class="fas fa-arrow-right"></i>
                                    </Col>
                                </Row>
                                <Row className="show-grid" >
                                    <Col sm={12} lg={5}>
                                        <p>
                                            We look for people with similar work 
                                            ethics, mindset and interest in building 
                                            a secure and efficient DEX.
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