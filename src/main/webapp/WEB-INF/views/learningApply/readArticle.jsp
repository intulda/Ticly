<%--
  Created by IntelliJ IDEA.
  User: kkh
  Date: 2020/08/26
  Time: 2:22 오전
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Ticly - 최신 아티클로 영어공부를 하세요</title>

    <!-- Common -->
    <c:import url="/WEB-INF/views/layout/globalImport.jsp"></c:import>

    <!-- CSS -->
    <link rel="stylesheet" href="${ pageContext.request.contextPath }/css/learningApply/readArticleStyle.css">

</head>
<body>

<!--login modal-->
<c:import url="/WEB-INF/views/login/loginModal.jsp"></c:import>

<div class="header">
    <div>${articleInfo.title}</div>
    <input type="hidden" name="articleSeq" value="${articleInfo.article_seq}">
    <button class="btn btn-primary btn-lg js-learning-apply-btn">바로 학습하기</button>
</div>

<iframe class="iframeBody" src="${articleInfo.url}">${articleInfo.url}</iframe>

<!-- javascript -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="${ pageContext.request.contextPath }/js/learningApply/readArticleAction.js"></script>

</body>
</html>
