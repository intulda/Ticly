<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 2020/08/24
  Time: 12:24 오후
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
                        <h1 class="text text-color-gray100 text-weight-medium">이메일로 로그인</h1>
                    </hearder>
                    <div class="login-content-wrapper">
                        <div class="bs-component" id="login-fail-alert"></div>

                        <div class="login-input-group">
                            <label for="signin-email" class="text text-color-gray100 body1 text-weight-medium login-label-title">이메일 <span class="required-label">*</span></label>
                            <input type="text" class="form-control form-control-lg" id="signin-email" name="email" placeholder="ticly@ticly.io" />
                            <div class="signin-validation-message validation-message"></div>
                        </div>
                        <div class="login-input-group">
                            <label for="signin-password" class="text text-color-gray100 body1 text-weight-medium login-label-title">비밀번호 <span class="required-label">*</span></label>
                            <input type="password" class="form-control form-control-lg" id="signin-password" name="password" placeholder="비밀번호를 입력하세요." />
                            <div class="eyes-box" id="signin-eyes-box">
                                <i class="icon_show" id="signin-eyes-icon"></i>
                            </div>
                            <div class="signin-validation-message validation-message"></div>
                        </div>
                        <div class="signin-validation-message"></div>
                        <div class="signin-check">
                            <div class="signin-check-box custom-control custom-checkbox">
                                <input type="checkbox" id="signin-check" class="custom-control-input">
                                <label for="signin-check" class="custom-control-label text text-color-gray100 text-weight-regular body1 label-signin-check" id="stay-logined">로그인 상태 유지</label>
                            </div>
                            <div class="password-inquiry">
                                <a href="#" class="text body1 text-color-gray100 text-weight-regular">비밀번호 찾기</a>
                            </div>
                        </div>
                        <div class="login-modal-button">
                            <button id="signinSubmitBtn" class="btn btn-primary">로그인</button>
                        </div>
                    </div>
                    <footer class="login-modal-footer">
                        <h6 class="text text-color-gray300 text-weight-regular">아직 회원이 아니신가요?</h6>
                        <a href="/member/emailSignup" class="text text-color-gray200 text-weight-regular login-footer-moving h6" id="login-footer-signin-to-signup">회원가입</a>
                    </footer>
                </div>
        </div>
    </div>

    <!-- footer -->
    <c:import url="/WEB-INF/views/layout/globalFooter.jsp"></c:import>
</div>
<script src="${pageContext.request.contextPath}/js/member/signin.js"></script>

</body>
</html>
