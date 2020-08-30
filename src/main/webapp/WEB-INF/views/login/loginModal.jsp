<%@ page import="java.net.URLEncoder" %>
<%@ page import="java.security.SecureRandom" %>
<%@ page import="java.math.BigInteger" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!--signinup Modal-->
<div class="ticly-modal" id="signinup-modal">
    <div class="ticly-modal-contents">
        <!--login-->
        <!--닫기 버튼-->
        <div class="intro_Button_Oval" id="modal-close">
            <i class="icon_close intro_Button_X"></i>
        </div>

        <!--로그인 메인-->
        <div class="main-login-form hidden" id="main-login-form">
            <div class="scroll-zone">
                <hearder class="login-modal-header">
                    <h1 class="text text-color-gray100 text-weight-medium" id="test">Ticly 로그인</h1>
                    <h5 class="text text-color-gray300 text-weight-regular modal-header-content">트렌드 파악과 함께 영어 공부를 시작해볼까요?</h5>
                </hearder>
                <div class="login-button-wrapper">
                    <div class="login-button naver-login-button" id="modal-naver-login-button">
                        <img scr="">
                        <h5 class="text text-color-white text-weight-medium">네이버로 로그인</h5>
                    </div>
                    <div class="login-button email-login-button" id="modal-login-to-signin">
                        <h5 class="text text-color-gray100 text-weight-medium">이메일로 로그인</h5>
                    </div>
                </div>
                <footer class="login-modal-footer">
                    <h6 class="text text-color-gray300 text-weight-regular">아직 회원이 아니신가요?</h6>
                    <h6 class="text text-color-gray200 text-weight-regular login-modal-footer-gosignup" id="login-footer-login-to-signup">회원가입</h6>
                </footer>
            </div>
        </div>

        <!--이메일로 로그인하기-->
        <div class="email-signin-form hidden" id="email-signin-form">
            <div class="scroll-zone">
                <hearder class="login-modal-header">
                    <h1 class="text text-color-gray100 text-weight-medium">이메일로 로그인</h1>
                </hearder>
                <div class="login-content-wrapper">
                    <div class="bs-component" id="login-fail-alert"></div>

                    <div class="login-input-group">
                        <label for="modal-signin-email" class="text text-color-gray100 body1 text-weight-medium login-label-title">이메일 <span class="required-label">*</span></label>
                        <input type="text" class="form-control form-control-lg" id="modal-signin-email" name="email" placeholder="ticly@ticly.io" autocomplete=”off”/>
                        <div class="modal-signin-validation-message validation-message"></div>
                    </div>
                    <div class="login-input-group">
                        <label for="modal-signin-password" class="text text-color-gray100 body1 text-weight-medium login-label-title">비밀번호 <span class="required-label">*</span></label>
                        <input type="password" class="form-control form-control-lg" id="modal-signin-password" name="password" placeholder="비밀번호를 입력하세요."  autocomplete=”off”/>
                        <div class="eyes-box" id="modal-signin-eyes-box">
                            <i class="icon_show" id="modal-signin-eyes-icon"></i>
                        </div>
                        <div class="modal-signin-validation-message validation-message"></div>
                    </div>
                    <div class="modal-signin-validation-message"></div>
                    <div class="signin-check">
                        <div class="signin-check-box custom-control custom-checkbox">
                            <input type="checkbox" id="modal-signin-check" class="custom-control-input">
                            <label for="modal-signin-check" class="custom-control-label text text-color-gray100 text-weight-regular body1 label-signin-check" id="modal-stay-logined">로그인 상태 유지</label>
                        </div>
                        <div class="password-inquiry">
                            <a href="#" class="text body1 text-color-gray100 text-weight-regular">비밀번호 찾기</a>
                        </div>
                    </div>
                    <div class="login-modal-button">
                        <button id="modal-signinSubmitBtn" class="btn btn-primary">로그인</button>
                    </div>
                </div>
                <footer class="login-modal-footer">
                    <h6 class="text text-color-gray300 text-weight-regular">아직 회원이 아니신가요?</h6>
                    <h6 class="text text-color-gray200 text-weight-regular login-modal-footer-gosignup" id="login-footer-signin-to-signup">회원가입</h6>
                </footer>
            </div>
        </div>

        <!--이메일로 회원가입-->
        <div class="email-signup-form hidden" id="email-signup-form">
            <div class="scroll-zone">
                <hearder class="login-modal-header">
                    <h1 class="text text-color-gray100 text-weight-medium">이메일로 회원가입</h1>
                </hearder>
                <div class="login-content-wrapper">
                    <div class="login-input-group">
                        <label for="modal-signup-email" class="text text-color-gray100 body1 text-weight-medium login-label-title" >이메일 <span class="required-label">*</span></label>
                        <input type="text" class="form-control form-control-lg" id="modal-signup-email" name="email" placeholder="ticly@ticly.io" autocomplete=”off” autocapitalize="off"/>
                        <div class="modal-signup-validation-message validation-message"></div>
                    </div>
                    <div class="login-input-group">
                        <label for="modal-signup-password" class="text text-color-gray100 body1 text-weight-medium login-label-title">비밀번호 <span class="required-label">*</span></label>
                        <input type="password" class="form-control form-control-lg" id="modal-signup-password" name="password" placeholder="숫자 포함, 8자 이상"  autocomplete="new-password"/>
                        <div class="eyes-box" id="modal-signup-eyes-box">
                            <i class="icon_show" id="modal-signup-eyes-icon"></i>
                        </div>
                        <!--비밀번호 실시간 유효성 검사-->
                        <div class="modal-signup-validation-message hidden" id="modal-signup-validation-message">
                            <div class="validation-message"><i class="icon_info_circle" id="modal-length-validation-info-icon"></i><p class="text text-color-gray200 body2" id="modal-length-validation-info-message">8자 이상의 비밀번호를 입력해주세요.</p></div>
                            <div class="validation-message"><i class="icon_info_circle" id="modal-number-validation-info-icon"></i><p class="text text-color-gray200 body2" id="modal-number-validation-info-message">영문과 숫자를 포함해주세요.</p></div>
                        </div>
                    </div>
                    <!--
                    <div class="login-input-group">
                        <label for="signup-password-confirm" class="text text-color-gray100 body1 text-weight-medium login-label-title">비밀번호 확인 <span class="required-label">*</span></label>
                        <input type="password" class="form-control form-control-lg" id="signup-password-confirm" placeholder="비밀번호를 한 번 더 입력해주세요."/>
                        <p class="modal-signup-validation-message"></p>
                    </div>-->

                    <!--회원가입 약관 동의-->
                    <div class="agreements">
                        <div class="agreement-list custom-control custom-checkbox">
                            <input type="checkbox" id="modal-AcceptTerm" class="custom-control-input">
                            <label for="modal-AcceptTerm" class="custom-control-label text text-color-gray200 text-weight-regular">Ticly의 <a href="#" class="text text-color-gray200 text-weight-bold">서비스 약관</a>과 <a href="#" class="text text-color-gray200 text-weight-bold">개인정보 취급방침</a>에 대해 동의합니다.(필수)</label>
                        </div>
                        <div class="agreement-list custom-control custom-checkbox">
                            <input type="checkbox" id="modal-promotion" class="custom-control-input custom-control">
                            <label for="modal-promotion" class="custom-control-label text text-color-gray200 text-weight-regular">Ticly의 이벤트, 프로모션, 알림 메일 및 SMS수신에 대해 동의합니다.(선택)</label>
                        </div>
                    </div>
                    <div class="login-modal-button">
                        <button id="modal-signupSubmitBtn" class="btn btn-primary disabled">회원가입</button>
                    </div>
                </div>
                <footer class="login-modal-footer">
                    <h6 class="text text-color-gray300 text-weight-regular">이미 티클리 계정이 있나요?</h6>
                    <h6 class="text text-color-gray200 text-weight-regular login-modal-footer-gosignup" id="login-footer-signup-to-login">로그인</h6>
                </footer>
            </div>
        </div>
    </div>
</div>

<!--modal script-->
<div>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <!--Main Login-->
    <script src="${pageContext.request.contextPath}/js/member/modalLogin.js"></script>

    <!--Email Login-->
    <script src="${pageContext.request.contextPath}/js/member/modalSigninEmail.js"></script>

    <!--Email Signup-->
    <script src="${pageContext.request.contextPath}/js/member/modalSignupEmail.js"></script>

    <script>

    </script>
</div>