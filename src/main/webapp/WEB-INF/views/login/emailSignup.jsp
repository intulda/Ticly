<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 2020/08/24
  Time: 2:33 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Ticly - 최신 아티클로 영어공부를 하세요</title>
    <!-- Common -->
    <c:import url="/WEB-INF/views/layout/globalImport.jsp"></c:import>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/member/login.css">

</head>
<body>
<div class="ticly__basic-layout">
    <!-- header -->
    <c:import url="/WEB-INF/views/layout/globalNav.jsp"></c:import>

    <!-- content -->
    <div class="container-sm ticly__basic-content-layout">
        <div class="login-container">
            <div class="email-signinup-container" id="main-login-form">
                <hearder class="login-header">
                    <h1 class="text text-color-gray100 text-weight-medium">이메일로 회원가입</h1>
                </hearder>
                <div class="login-content-wrapper">
                    <div class="login-input-group">
                        <label for="signup-email" class="text text-color-gray100 body1 text-weight-medium login-label-title">이메일 <span class="required-label">*</span></label>
                        <input type="text" class="form-control form-control-lg" id="signup-email" name="email" placeholder="ticly@ticly.io" />
                        <!--이메일 유효성 검사-->
                        <div class="signup-validation-message validation-message"></div>
                    </div>
                    <div class="login-input-group">
                        <label for="signup-password" class="text text-color-gray100 body1 text-weight-medium login-label-title">비밀번호 <span class="required-label">*</span></label>
                        <input type="password" class="form-control form-control-lg" id="signup-password" name="password" placeholder="비밀번호를 입력해주세요" style="ime-mode:inactive;"/>
                        <div class="eyes-box" id="signup-eyes-box">
                            <i class="icon_show" id="signup-eyes-icon"></i>
                        </div>
                        <!--비밀번호 실시간 유효성 검사-->
                        <div class="signup-validation-message hidden" id="signup-validation-message">
                            <div class="validation-message"><i class="icon_info_circle" id="length-validation-info-icon"></i><p class="text text-color-gray200 body2" id="length-validation-info-message">8자 이상의 비밀번호를 입력해주세요.</p></div>
                            <div class="validation-message"><i class="icon_info_circle" id="number-validation-info-icon"></i><p class="text text-color-gray200 body2" id="number-validation-info-message">영문과 숫자를 포함해주세요.</p></div>
                        </div>
                    </div>

                    <!--회원가입 약관 동의-->
                    <div class="agreements">
                        <div class="agreement-list custom-control custom-checkbox">
                            <input type="checkbox" id="acceptTerm" class="custom-control-input">
                            <label for="acceptTerm" class="custom-control-label text text-color-gray200 text-weight-regular">Ticly의 <a href="#" class="text text-color-gray200 text-weight-bold">서비스 약관</a>과 <a href="#" class="text text-color-gray200 text-weight-bold">개인정보 취급방침</a>에 대해 동의합니다.(필수)</label>
                        </div>
                        <div class="agreement-list custom-control custom-checkbox">
                            <input type="checkbox" id="promotion" class="custom-control-input custom-control">
                            <label for="promotion" class="custom-control-label text text-color-gray200 text-weight-regular">Ticly의 이벤트, 프로모션, 알림 메일 및 SMS수신에 대해 동의합니다.(선택)</label>
                        </div>
                    </div>
                    <div class="login-modal-button">
                        <button id="signupSubmitBtn" class="btn btn-primary disabled">회원가입</button>
                    </div>
                </div>
                <footer class="login-footer">
                    <h6 class="text text-color-gray300 text-weight-regular">이미 티클리 계정이 있나요?</h6>
                    <a href="/member/login" class="text text-color-gray200 text-weight-regular login-footer-moving h6">로그인</a>
                </footer>
            </div>
        </div>
    </div>

    <!-- footer -->
    <c:import url="/WEB-INF/views/layout/globalFooter.jsp"></c:import>
</div>
<script src="${pageContext.request.contextPath}/js/member/signup.js"></script>
</body>
</html>
