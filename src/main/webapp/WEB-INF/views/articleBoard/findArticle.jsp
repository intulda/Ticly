<%--
  Created by IntelliJ IDEA.
  User: kkh
  Date: 2020/08/07
  Time: 12:54 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Insert title here</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="${ pageContext.request.contextPath }/css/bootstrap.css">
    <link rel="stylesheet" href="${ pageContext.request.contextPath }/css/fonticon.css">
    <link rel="stylesheet" href="${ pageContext.request.contextPath }/css/articleBoard/findArticleStyle.css">

</head>
<body>

<div class="container container-xxl">
    <!-- category tab -->
    <div class="category__tab-wrapper">
        <c:choose>
            <%-- 선택한 관심분야가 1개 이상일 경우--%>
            <c:when test="${fn:length(userInfo.categories) > 1}">
                <button class="category__tab btn active js-category-tab">ALL</button>
                <c:forEach items="${userInfo.categories}" var="category">
                    <button class="category__tab btn inactive js-category-tab" value="${category}">${category}</button>
                </c:forEach>
            </c:when>

            <%-- 관심분야를 1개만 선택한 경우--%>
            <c:otherwise>
                <div class="btn category__tab active">${userInfo.categories[0]}</div>
            </c:otherwise>

        </c:choose>
        <button class="category__tab btn inactive" onclick="location.href ='category'"><i class="icon_setting"></i> </button>
    </div>

    <!-- search bar -->
    <input type="text" class="form-control" placeholder="학습하고 싶은 아티클을 찾으세요!">
    <i class="icons icon_search"></i>

    <!-- new article section -->
    <p>아티클 배달 왔습니다!</p>
    <h1 class="text text-color-gray300">새로운 아티클<i class="icons icon_chevron-right lg"></i></h1>

    <div class="card__outer js-card-outer">
    </div>
</div>

<!-- 관심 분야 탭에서 ALL 버튼을 누를 때
     리스트에 담겨있는 전체 '사용자가 선택한 관심 분야'를 수집하기 위해
     categories 리스트의 사이즈 만큼,input 태그를 생성해 value 안에 값을 담아준다.
-->
<c:forEach items="${userInfo.categories}" var="category">
    <input type="hidden" class="js-categories-str" value=${category}>
</c:forEach>

<!-- script -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script type="module" src="${ pageContext.request.contextPath }/js/articleBoard/findArticleAction.js"></script>
</body>
</html>