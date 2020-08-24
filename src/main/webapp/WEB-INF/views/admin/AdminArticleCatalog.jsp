
<%--
  Created by IntelliJ IDEA.
  User: Hyeseung
  Date: 2020-08-18
  Time: 오후 3:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"/>
    <script type="text/javascript" src="js/bootstrap.js"></script>

    <style>
        .flex_container {
            display: flex;
            flex-direction: column;
            vertical-align: middle;
            text-align: center;
        }

        .clearfix:after {
            content: "";
            clear: both;
            display: block;
        }

        .item {
            float: left;
        }

        .word-info {
            display: inline-block;
            vertical-align: middle;
            margin: 0;
            padding: 0;

        }

        .myboardBtnGroup {
            margin: 30px;
            /*padding: 30px;*/
        }

        .Admin-header-menu-btn {
            margin: 30px;
        }

        .main-logo {
            margin: 17px;
        }

        .article-find-tab {
            margin-left: 50px;
            padding: 10px;
        }

        .Admin-header-menu-tab {
            margin: 1px 300px;
            padding: 12px;
        }

        .word-info {
            align-content: center;
        }

        .button {
            border-radius: 0;
            border: 0;
            outline: 0;
        }

        .table {
            border-collapse: collapse;
            border-spacing: 0;
        }

        .table td {
            padding: 0px;
            line-height: 0;
        }

        h1,h2,h3,h4,h5,h6 {
            display:inline
        }

        a {
            /*margin-left: 1px;*/
            padding: 6px;
        }



    </style>
</head>
<body>
<div class="flex_container">

    <!--  Ticly 로고 라인 탭 -->
    <div class="item">
        <div class="main-logo">
            <img src="./images/logo_color.svg" align="left">

            <a href="ArticleFindTab.jsp" style="text-decoration:none" align="center" class="article-find-tab" > 아티클 찾기 </a>
            <a href="IntroService.jsp" style="text-decoration:none" align="center" class="article-find-tab"> 서비스 소개 </a>
            <a href="AdminArticleWrite.jsp" style="text-decoration:none" align="center" class="article-find-tab"> 관리자 페이지 </a>

            <input type="image" src="./css/Admin/images/츄.png" border="0" style="float: right;">
            <input type="button" class="btn btn-success" value="내 학습 보드" style="float: right;">
        </div>
    </div>



    <!-- 관리자 페이지 내 Tab + 저장하기 -->
    <div class="item">
        <hr>
        <div class="Admin-header-menu-tab" align="left">
            <a class="text text-color-green text-weight-medium" style="text-decoration:none" href="/writeForm"> <h6> 아티클 등록하기 </h6> </a>
            <a class="text text-color-gray300 text-weight-medium" style="text-decoration:none" href="/ArticleList"> <h6> 아티클 목록 </h6> </a>
            <a class="text text-color-gray300 text-weight-medium" style="text-decoration:none" href="AdminMemberList.jsp" > <h6> 회원 관리 </h6> </a>
            <a class="text text-color-gray300 text-weight-medium" style="text-decoration:none" href="AdminAnalysis.jsp" > <h6> 통계 </h6> </a>

        </div>
        <hr>
    </div>
    <hr>
</div>




<table width="800" cellpadding="0" cellspacing="0" border="1">
    <colgroup>
        <col width="10"><col width="200"><col width="100"><col width="10">
    </colgroup>
    <tr>
        <td>번호</td>
        <td>아티클 제목</td>
        <td>작성일</td>
        <td>삭제</td>
    <tr>
    <c:forEach items="${list}" var="dto">
        <tr>
            <td>${dto.article_seq}</td>
            <%--<td><a href="${pageContext.request.contextPath}/AdminWriteDetail?title=${dto.title}">${dto.title}</td>--%>
            <td><a href="${pageContext.request.contextPath}/AdminWriteDetail?articleseq=${dto.article_seq}">${dto.title}</td>
            <td>${dto.reg_date}</a></td>
            <td><a href="delete?seq=${dto.article_seq}">X</a></td>
        <tr>
    </c:forEach>
</table>

<p><a href="/writeForm">아티클 등록하기</a></p>

</body>
</html>
