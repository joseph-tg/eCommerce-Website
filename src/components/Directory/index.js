import React from 'react';
import ShopMen from './../../Assets/MensWear.jpg';
import ShopWomen from './../../Assets/WemensWear.jpg';
import './style.scss';

const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div 
                className="item"
                style={{
                    backgroundImage: `url(${ShopWomen})`
                    }}
                >
                    <a href="#">Shop Women</a>
                </div>
                <div 
                className="item"
                style={{
                    backgroundImage: `url(${ShopMen})`
                    }}
                >
                    <a href="#">Shop Men</a>
                </div>
            </div>
        </div>

    );
};


export default Directory;
