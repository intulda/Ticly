import React, {useState} from 'react';
import Footer from "../common/Footer";
import Header from "../common/Header";
import PropTypes from 'prop-types';
import Login from "../login/Login";
import {useSelector} from "react-redux";

function MenuLayout({children}) {
    const {isLoginModalOpen} = useSelector((state) => state.memberReducer);

    return (
        <>
            {
                isLoginModalOpen === true
                    ? <Login/>
                    : ''
            }
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