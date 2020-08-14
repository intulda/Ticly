<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 14/08/2020
  Time: 12:55 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>모달 열기</title>
    <link rel="stylesheet" href="/css/default.css">
    <link rel="stylesheet" href="/css/bootstrap.css">
    <link rel="stylesheet" href="/css/fonticon.css">
    <link rel="stylesheet" href="/css/member/singInUp.css">
</head>
<body>
<div>
    <a href="#" id="modal-open-button" class="button">Click Me</a>
</div>
<c:import url="/WEB-INF/views/login/loginModal.jsp"></c:import>

<script>
    //모달 열기
    document.getElementById('modal-open-button').addEventListener("click", function() {
        document.getElementById('signinup-modal').style.display = "flex";
        document.getElementById('main-login-form').classList.remove('hidden');
        document.getElementById('email-signup-form').classList.add('hidden');
        document.getElementById('email-signin-form').classList.add('hidden');
    });
</script>
</body>
</html>
