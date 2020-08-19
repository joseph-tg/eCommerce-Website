import React from 'react';
import Header from './../components/Header';
import './../default.scss';
import Footer from './../components/Footer';


const HomepageLayout = props => {
    return (
        <div className="fullWidth">
            <Header {...props} />
            {props.children}
            <Footer />
        </div>
    );
};

export default HomepageLayout;

