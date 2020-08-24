<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 2020/08/24
  Time: 12:23 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Ticly - 최신 아티클로 영어공부를 하세요</title>
    <!-- Common -->
    <c:import url="/WEB-INF/views/layout/globalImport.jsp"></c:import>
    <style>
        .login-container{
            padding-top: 140px;
        }

        .main-login-container{
            width: 500px;
            text-align: center;
            margin: 0 auto;
            padding: 60px 50px;
            position: relative;
            border: 1px solid #e9ecef;
        }

        /*로그인 페이지 header*/
        .login-header{
            display: block;
            margin-bottom: 24px;
        }

        .main-login-container .login-header{
            margin-bottom: 0;
        }

        /*로그인 페이지 footer*/
        .login-footer{
            display: flex;
            justify-content: center;
            line-height: 28px;
        }

        .login-footer-moving{
            padding-left: 8px;
            text-decoration: underline;
            cursor: pointer;
        }


    </style>
</head>
<body>
<div class="ticly__basic-layout">
    <!-- header -->
    <c:import url="/WEB-INF/views/layout/globalNav.jsp"></c:import>

    <!-- content -->
    <div class="container-sm ticly__basic-content-layout">
        <div class="login-container">
            <div class="main-login-container" id="main-login-form">
                <hearder class="login-header">
                    <h1 class="text text-color-gray100 text-weight-medium" id="test">Ticly 로그인</h1>
                    <h5 class="text text-color-gray300 text-weight-regular modal-header-content">트렌드 파악과 함께 영어 공부를 시작해볼까요?</h5>
                </hearder>
                <div class="login-button-wrapper">
                    <div class="login-button naver-login-button" id="naverIdLogin">
                        <img scr="">
                        <h5 class="text text-color-white text-weight-medium">네이버로 로그인</h5>
                    </div>
                    <div class="login-button email-login-button" id="login-to-signin">
                        <h5 class="text text-color-gray100 text-weight-medium">이메일로 로그인</h5>
                    </div>
                </div>
                <footer class="login-footer">
                    <h6 class="text text-color-gray300 text-weight-regular">아직 회원이 아니신가요?</h6>
                    <a href="/member/emailSignup" class="text text-color-gray200 text-weight-regular login-footer-moving h6" id="login-footer-login-to-signup">회원가입</a>
                </footer>
            </div>
        </div>
    </div>

    <!-- footer -->
    <c:import url="/WEB-INF/views/layout/globalFooter.jsp"></c:import>
</div>
</body>
</html>