import React from 'react';
import Footer from "../common/Footer";
import Header from "../common/Header";
import PropTypes from 'prop-types';

function MenuLayout({children}) {
    return (
        <>
            <Header/>
                {children}
            <Footer/>
        </>
    )
}

MenuLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default MenuLayout;