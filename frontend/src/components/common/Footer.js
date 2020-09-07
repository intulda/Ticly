import React from 'react';
import '../../css/layout/globalFooter.css';

const Footer = () => {
    return (
        <div className="box_Footer">
            <div className="left_Footer">
                <img src="../../../images/logo_gray.svg" alt="logoGray" className="footer_Logo_Gray"/>
                <span className="text body2 text-weight-medium text-color-gray300 mint_Copyright">
                    ⓒ 2020 Mint Salamender. All Rights Reserved.
                </span>
            </div>
            <div className="right_Footer">
                <a href="" className="text body2 text-weight-medium text-color-gray100" target="blank">
                    이용약관
                </a>
                <a href="" className="text body2 text-weight-medium text-color-gray100" target="blank">
                    개인정보처리방침
                </a>
                <a href="" className="text body2 text-weight-medium text-color-gray100" target="blank">
                    도움말
                </a>
            </div>
        </div>
    )
}

export default Footer;