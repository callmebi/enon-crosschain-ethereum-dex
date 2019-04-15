//import packages
import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Button,Container, Row,Col} from 'react-bootstrap';
import $ from 'jquery';
//import components
import '../../styles/components/Header.scss';
//import files

export default class Header extends React.Component {
    componentWillMount() {
        $( document ).ready(function() {
            console.log( "ready!" );
            var windowWidthA = $(window).width();
            console.log(windowWidthA);
            if (windowWidthA <= 1199){
                console.log('pomina');
                $('.headerNav').children('.container').removeClass('container').addClass('container-fluid')  ;
            }else{
                $('.headerNav').children('.container-fluid').removeClass('container-fluid').addClass('container')  ;
            }
        });
        $(window).resize(() => {
            var windowWidthA = $(window).width();
            console.log(windowWidthA);
            if (windowWidthA <= 1199){
                console.log('pomina');
                $('.headerNav').children('.container').removeClass('container').addClass('container-fluid')  ;
            }else{
                $('.headerNav').children('.container-fluid').removeClass('container-fluid').addClass('container')  ;
            }
        });
    }
    componentDidMount() {
        /* language */

        var app = document.querySelector(".root");
        var languageBtn = document.querySelector(".page-header__list .language");
        var languagesList = document.querySelector(".language-wrapper");
        if(app){
            app.addEventListener("mousedown", function(){
            languagesList.classList.remove("language-wrapper--opened");
            });
        }
        if(languageBtn){
            languageBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            languagesList.classList.toggle("language-wrapper--opened");
            });
        }
        var headerLogo = document.querySelector(".page-header .logo");
        var burgerBtn = document.querySelector(".burger-btn");
        var menuList = document.querySelector(".page-header__list");

        burgerBtn.addEventListener("click", function() {
        menuList.classList.toggle("page-header__list--opened");
        if (menuList.classList.contains("page-header__list--opened")) {
            headerLogo.style = `
            position: fixed;
            top: 31px;
            left: 33px;
            z-index: 6;
            `;
        } else {
            headerLogo.style = ``;
        }
        });
    }
    render() {
        return (
            <div className="headerNav">
            <Container> 
                <header className="page-header block-align">
                    <a href="#" className="logo">enon</a>
                    <ul className="page-header__list">
                        <li className="active">
                            <a href="https://docs.google.com/document/d/e/2PACX-1vTFHqUi5bvNPd-T1pdgT1PbOiyuu1O8T4NSSWUoSZYVAJJ0Vb-Iorb1x7z7GOFfff2l1oJGGV2ZpMbt/pub">Roadmap</a>
                        </li>
                        <li>
                            <a href="#">Team</a>
                        </li>
                        <li>
                            <a href="https://t.me/Enonchain">Telegram</a>
                        </li>
                        <li>
                            <a href="#">Blog</a>
                        </li>
                        <li className="language">
                            <a className="lang">English</a>
                            <ul className="language-wrapper">
                                <li>
                                    <a href="" className="eng">English</a>
                                </li>
                                <li>
                                    <a href="" className="lat">Latvian</a>
                                </li>
                                <li>
                                    <a href="" className="fra">French</a>
                                </li>
                                <li>
                                    <a href="" className="jap">Japanese</a>
                                </li>
                                <li>
                                    <a href="" className="chi">Chinese</a>
                                </li>
                                <li>
                                    <a href="" className="gre">Greek</a>
                                </li>
                            </ul>
                        </li>
                        <li className="log-in">
                            <a href="#">Whitepaper</a>
                        </li>
                    </ul>
                    <span className="burger-btn"></span>
                </header>
            </Container>
            </div>
        );
    }
} 