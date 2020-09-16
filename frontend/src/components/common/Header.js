import React, {useState} from 'react';
import '../../css/layout/globalNav.css';
import logoColor from '../../images/logo_color.svg';
import {useDispatch, useSelector} from "react-redux";
import {Dropdown} from 'react-bootstrap';
import {loginModalOpen, logoutRequestAction} from "../../action/member";

const Header = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.memberReducer);
    const onClickHandler = (e) => {
        dispatch(loginModalOpen());
    }

    const onLogoutHandler = () => {
        dispatch(logoutRequestAction());
    }

    return (
        <>
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
                        {
                            user.userInfo === undefined
                                ? <h6 className="text text-color-gray200 text-weight-medium" id="modal-open-button" onClick={onClickHandler}>로그인</h6>
                                :
                                <>
                                    {
                                        user.userInfo.auth === 0
                                        ? <a href="#" className="text text-weight-medium">관리자페이지</a>
                                        : ''
                                    }
                                    <button className="globalHeader__move-learing-board btn btn-outline-primary btn-right-icon" id="move-learning-board">
                                    내 학습 보드
                                    </button>

                                    <Dropdown className="dropdown">
                                        <Dropdown.Toggle variant="warning" className="text leaning-header-profile" id="header-profile">
                                            {user.userInfo.nickname}
                                            <i htmlFor="header-profile" className="icon_caret-down profile-drop-button"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">마이페이지</Dropdown.Item>
                                            <Dropdown.Item onClick={onLogoutHandler}>로그아웃</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                        }

                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;