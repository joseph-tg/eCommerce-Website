import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

import Logo from './../../Assets/Logo.jpg';

const Header = props => {
    return (
        <header className = "header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Joseph-TG LOGO" /> 
                    </Link>
                </div>
                <div className="callToActions">
                    <ul>
                        <li>
                            <Link to="/registration">
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;

