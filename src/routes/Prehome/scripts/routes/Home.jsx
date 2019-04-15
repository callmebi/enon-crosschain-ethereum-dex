//import packages
import React from 'react';

//import components
import About from '../containers/About.jsx';
import Advantages from '../containers/Advantages.jsx';
import Product from '../containers/Product.jsx';
import Security from '../containers/Security.jsx';
import Support from '../containers/Support.jsx';


export default class PreHome extends React.Component {
    render() {
        return (
            <div>
                <About/>
                <Advantages/>
                <Product/>
                <Support/>
                <Security/>
            </div>
        );
    }
}