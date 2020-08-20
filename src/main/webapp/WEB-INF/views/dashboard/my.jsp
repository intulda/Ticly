<%@ page import="java.util.List" %>
<%@ page import="io.ticly.mint.articleBoard.model.dto.MemberDTO" %>
<%@ page import="java.util.ArrayList" %><%--
  Created by IntelliJ IDEA.
  User: kkh
  Date: 2020/08/17
  Time: 6:41 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!-- CSS -->
<link rel="stylesheet" href="${ pageContext.request.contextPath }/css/default.css">
<link rel="stylesheet" href="${ pageContext.request.contextPath }/css/bootstrap.css">
<link rel="stylesheet" href="${ pageContext.request.contextPath }/css/fonticon.css">
<link rel="stylesheet" href="${ pageContext.request.contextPath }/css/dashboard/myStyle.css">

<!-- script -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script buffer type="module" src="${ pageContext.request.contextPath }/js/dashboard/myAction.js"></script>

<html>
<head>
    <title>MY LEARNING BOARD</title>
</head>
<body>
    <div class="container">
        <!-- Recently learned Article Section-->
        <div class="lastLearning__header">
            <h3 class="text text-color-gray100 text-weight-bold">최근 학습한 아티클</h3>
        </div>

        <!-- Recently learned Article Card-->
        <div class="lastLearning__card-section js-lastLearning-section">

        </div>

        <!-- My Article List Section-->
        <div class="learningList__header">
           <h3 class="text text-color-gray100 text-weight-bold">아티클 목록</h3>
            <div>
                <button class="learningList__doing-btn btn btn-tab active">학습중<span>(6)</span></button>
                <button class="learningList__done-btn btn btn-tab">학습 완료<span>(3)</span></button>
            </div>
            <select class="learningList__selectBox custom-select" name="sorting">
                <option selected value="">최근학습순</option>
                <option value="">최신발행순</option>
                <option value="">제목순</option>
            </select>
        </div>

        <!-- learning Article Card-->
        <div class="learningList__card-section js-learningList-section">
            <div class="my__card-outer card">
            </div>
        </div>
    </div>

    <input type="hidden" name="userEmail" value="${userInfo.email}">
</body>
</html>
