<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 11/08/2020
  Time: 10:14 오전
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="/css/default.css">
    <link rel="stylesheet" href="/css/bootstrap.css">
    <link rel="stylesheet" href="/css/fonticon.css">
    <link rel="stylesheet" href="/css/member/singInUp.css">
</head>
<body>
<div>
    <a href="#" id="button" class="button">Click Me</a>
</div>

<!--signinup Modal-->
<div class="signinup-modal">
    <div class="signinup-modal-contents">
        <!--login-->
        <!--닫기 버튼-->
        <div class="close">+</div>

        <!--로그인 메인-->
        <div class="main-login-form hidden" id="login-form">
            <hearder class="login-modal-header">
                <h1 class="text text-color-gray100 text-weight-medium">Ticly 로그인</h1>
                <h5 class="text text-color-gray300 text-weight-regular modal-header-content">트렌드 파악과 함께 영어 공부를 시작해볼까요?</h5>
            </hearder>
            <div class="login-button-wrapper">
                <div class="login-button naver-login-button">
                    <img scr="">
                    <h5 class="text text-color-white text-weight-medium">네이버로 로그인</h5>
                </div>
                <div class="login-button email-login-button">
                    <h5 class="text text-color-gray100 text-weight-medium">이메일로 로그인</h5>
                </div>
            </div>
            <footer class="login-modal-footer">
                <h6 class="text text-color-gray300 text-weight-regular">아직 회원이 아니신가요?</h6>
                <h6 class="text text-color-gray200 text-weight-regular login-modal-footer-gosignup" id="login-modal-footer-gosignup">회원가입</h6>
            </footer>
        </div>

        <!--이메일로 로그인하기-->
        <div class="email-Login-form hidden" id="emailLogin-form">
            <hearder class="modal-header">
                <h1 class="text text-color-gray100 text-weight-medium" class="login-label-title">이메일로 로그인</h1>
            </hearder>
            <form action="">
                <div class="form-group">
                    <label for="login-email" class="text text-color-gray100 body1 text-weight-medium">이메일 <span class="required-label">*</span></label>
                    <input type="text" class="form-control" id="login-email" name="email" placeholder="ticly@ticly.io" />
                    <p class="validation-message"></p>
                </div>
                <div class="form-group">
                    <label for="signup-password" class="login-label-title">비밀번호 <span class="required-label">*</span></label>
                    <input type="password" class="form-control" id="login-password" name="password" placeholder="비밀번호를 입력하세요." />
                    <p class="validation-message"></p>
                </div>
            </form>
            <footer class="modal-footer">
                <button id="loginSubmitBtn" class="submitButton">로그인</button>
            </footer>
        </div>

        <!--이메일로 회원가입-->
        <div class="email-singup-form hidden">
            <hearder class="login-modal-header">
                <h1 class="text text-color-gray100 text-weight-medium">이메일로 회원가입</h1>
            </hearder>
            <div class="signup-content-wrapper">
                <div class="login-input-group">
                    <label for="signup-email" class="text text-color-gray100 body1 text-weight-medium login-label-title">이메일 <span class="required-label">*</span></label>
                    <input type="text" class="form-control" id="signup-email" name="email" placeholder="ticly@ticly.io" />
                    <p class="validation-message"></p>
                </div>
                <div class="login-input-group">
                    <label for="signup-password" class="text text-color-gray100 body1 text-weight-medium login-label-title">비밀번호 <span class="required-label">*</span></label>
                    <input type="password" class="form-control" id="signup-password" name="password" placeholder="숫자 포함, 8자 이상" />
                    <p class="validation-message"></p>
                </div>
                <div class="login-input-group">
                    <label for="signup-password-confirm" class="text text-color-gray100 body1 text-weight-medium login-label-title">비밀번호 확인 <span class="required-label">*</span></label>
                    <input type="password" class="form-control" id="signup-password-confirm" placeholder="비밀번호를 한 번 더 입력해주세요."/>
                    <p class="validation-message"></p>
                </div>

                <div class="agreements">
                    <div class="agreement-list custom-control custom-checkbox">
                        <input type="checkbox" id="term" class="custom-control-input">
                        <label for="term" class="custom-control-label text text-color-gray200 text-weight-regular">Ticly의 <a href="#" class="text text-color-gray200 text-weight-bold">서비스 약관</a>과 <a href="#" class="text text-color-gray200 text-weight-bold">개인정보 취급방침</a>에 대해 <br>동의합니다.(필수)</label>
                    </div>
                    <div class="agreement-list custom-control custom-checkbox">
                        <input type="checkbox" id="promotion" class="custom-control-input custom-control">
                        <label for="promotion" class="custom-control-label text text-color-gray200 text-weight-regular">Ticly의 이벤트, 프로모션, 알림 메일 및 SMS수신에 <br>대해 동의합니다.(선택)</label>
                    </div>
                </div>
                <button id="signupSubmitBtn" class="btn btn-primary disabled" id="signupSubmitBt">회원가입</button>
            </div>
        </div>
    </div>
</div>
<script>
    (() => {
        //모달 열기
        document.getElementById('button').addEventListener("click", function() {
            document.querySelector('.signinup-modal').style.display = "flex";
            document.querySelector('.main-login-form').classList.remove('hidden');
            document.querySelector('.email-singup-form').classList.add('hidden');
        });

        //모달 닫기
        document.querySelector('.close').addEventListener("click", function() {
            document.querySelector('.signinup-modal').style.display = "none";
        });

        //이메일로 로그인

        //회원가입으로 이동
        document.querySelector('.login-modal-footer-gosignup').addEventListener("click", function() {
            document.querySelector('.main-login-form').classList.add('hidden');
            document.querySelector('.email-singup-form').classList.remove('hidden');
        });

    })();
</script>
</body>
</html>