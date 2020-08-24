
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
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!-- Common -->
    <c:import url="/WEB-INF/views/layout/globalImport.jsp"></c:import>

    <style>
        .flex_container {
            display: flex;
            flex-direction: column;
            text-align: center;
        }

        .clearfix:after {
            content: "";
            clear: both;
            display: block;
        }

        .admin-header{
            width: 100%;
            display: flex;
            align-items: center;
        }

        .Admin-header-menu-tab {
            display: flex;
            padding: 32px;
            text-align: justify;
        }

        .article-find-tab {
            display: flex;
            margin-left: 50px;
            padding: 10px;
            margin-right: 50px;
            justify-content: space-between
        }

        .item {
            float: left;
            margin-left: 30px;
            margin-right: 50px;
            justify-content: space-between;
        }


    </style>
</head>
<body>
<c:import url="/WEB-INF/views/layout/globalNav.jsp"></c:import>
<div class="admin-catalog ticly__basic-layout">
    <div class="flex_container ticly__basic-content-layout">


        <!-- 관리자 페이지 내 Tab + 저장하기 -->
        <div class="item">
            <div class="item admin-header">
                <div class="Admin-header-menu-tab" align="left">
                    <a style="text-decoration:none" href="/writeForm"> <h6 class="text text-color-green text-weight-medium" > 아티클 등록하기 </h6> </a>
                    <a style="text-decoration:none" href="/ArticleList"> <h6 class="text text-color-gray300 text-weight-medium"> 아티클 목록 </h6> </a>
                    <a style="text-decoration:none" href="AdminMemberList.jsp" > <h6 class="text text-color-gray300 text-weight-medium"> 회원 관리 </h6> </a>
                    <a style="text-decoration:none" href="AdminAnalysis.jsp" > <h6 class="text text-color-gray300 text-weight-medium"> 통계 </h6> </a>
                </div>
            </div>
        </div>




    <table width="1000" class="table table-hover">
        <colgroup>
            <col width="20"><col width="300"><col width="100"><col width="20">
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

</div>
<c:import url="/WEB-INF/views/layout/globalFooter.jsp"></c:import>
</body>
</html>
