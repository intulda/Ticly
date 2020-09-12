import React from 'react';
import '../../css/layout/globalNav.css';
import logoColor from '../../images/logo_color.svg';
import Axios from "axios";

const Header = () => {


    const onClickHandler = (event) => {
        Axios({
            url: '/member/test',
            method: 'POST',
        }).then(response => console.log(response));
    }

    return (
        <header className="globalHeader-wrap">
            <div>
                <div className="globalHeader-left">
                    <a href="/">
                        <img src={logoColor} alt="logoColor"
                             className="header-logo"/>
                    </a>
                </div>
                <div className="globalHeader-center">
                    <ul className="header-index">
                        <li className="text h6 text-color-gray200 text-weight-medium moveArticleBoardTab"><a
                            href="/articleBoard/findArticle" className="navTabs" id="">아티클 찾기</a></li>
                        <li className="text h6 text-color-gray200 text-weight-medium moveServiceIntrdTab"><a
                            href="/service" className="moveServiceuIntrdText navTabs">서비스 소개</a></li>
                        <li>
                            <button className="btn btn-primary btn-bg" id="start-free-btn">무료로 시작하기</button>
                        </li>
                    </ul>
                </div>
                <div className="globalHeader-right">
                    <h6 className="text text-color-gray200 text-weight-medium" id="modal-open-button" onClick={onClickHandler}>로그인</h6>
                </div>
            </div>
        </header>
    )
}

export default Header;