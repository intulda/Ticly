import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loginModalClose, loginRequestAction} from "../../action/member";
import '../../css/member/login.css';
import '../../css/member/modal.css';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmailHandler = (e) => {
        setEmail(e.target.value);
    }

    const onChangePasswordHandler = (e) => {
        setPassword(e.target.value);
    }

    const onClickModalHandler = (e) => {
        dispatch(loginModalClose());
    }

    const onLoginHandler = (e) => {
        dispatch(loginRequestAction(email, password));
    }

    return (
        <div className="ticly-modal" id="signinup-modal">
            <div className="ticly-modal-contents">
                <div className="intro_Button_Oval" id="modal-close" onClick={onClickModalHandler}>
                    <i className="icon_close intro_Button_X"></i>
                </div>
                <div className="email-signin-form" id="email-signin-form">
                    <div className="scroll-zone">
                        <header className="login-modal-header">
                            <h1 className="text text-color-gray100 text-weight-medium">이메일로 로그인</h1>
                        </header>
                        <div className="login-content-wrapper">
                                <div className="bs-component" id="login-fail-alert"></div>
                                <div className="login-input-group">
                                    <label htmlFor="modal-signin-email" className="text text-color-gray100 body1 text-weight-medium login-label-title">이메일 <span className="required-label">*</span></label>
                                    <input type="text" className="form-control form-control-lg" id="modal-signin-email" name="email" placeholder="ticly@ticly.io" onChange={onChangeEmailHandler}/>
                                    <div className="modal-signin-validation-message validation-message"></div>
                                </div>
                                <div className="login-input-group">
                                    <label htmlFor="modal-signin-password" className="text text-color-gray100 body1 text-weight-medium login-label-title">비밀번호 <span className="required-label">*</span></label>
                                    <input type="password" className="form-control form-control-lg" id="modal-signin-password" name="password" placeholder="비밀번호를 입력하세요." onChange={onChangePasswordHandler}/>
                                <div className="eyes-box" id="modal-signin-eyes-box">
                                    <i className="icon_show" id="modal-signin-eyes-icon"></i>
                                </div>
                                    <div className="modal-signin-validation-message validation-message"></div>
                                </div>
                        <div className="modal-signin-validation-message"></div>
                        <div className="signin-check">
                            <div className="signin-check-box custom-control custom-checkbox">
                                <input type="checkbox" id="modal-signin-check" className="custom-control-input"/>
                                <label htmlFor="modal-signin-check" className="custom-control-label text text-color-gray100 text-weight-regular body1 label-signin-check" id="modal-stay-logined">로그인 상태 유지</label>
                            </div>
                            <div className="password-inquiry">
                                <a href="#" className="text body1 text-color-gray100 text-weight-regular">비밀번호 찾기</a>
                            </div>
                        </div>
                        <div className="login-modal-button">
                            <button id="modal-signinSubmitBtn" className="btn btn-primary" onClick={onLoginHandler}>로그인</button>
                        </div>
                    </div>
                    <footer className="login-modal-footer">
                        <h6 className="text text-color-gray300 text-weight-regular">아직 회원이 아니신가요?</h6>
                        <h6 className="text text-color-gray200 text-weight-regular login-modal-footer-gosignup" id="login-footer-signin-to-signup">회원가입</h6>
                    </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;