<%--
  Created by IntelliJ IDEA.
  User: kkh
  Date: 2020/08/15
  Time: 9:57 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

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

    <div class="findArticle__header">
        <!-- category tab -->
        <div class="category__tab-wrapper">
            <c:choose>
                <%-- 선택한 관심분야가 1개 이상일 경우--%>
                <c:when test="${fn:length(userInfo.categories) > 1}">
                    <button class="category__tab btn active js-category-tab">ALL</button>
                    <c:forEach items="${userInfo.categories}" var="category">
                        <button class="category__tab btn inactive js-category-tab"
                                value="${category}">${category}</button>
                    </c:forEach>
                </c:when>

                <%-- 관심분야를 1개만 선택한 경우--%>
                <c:otherwise>
                    <button class="category__tab btn active">${userInfo.categories[0]}</button>
                </c:otherwise>

            </c:choose>
            <button class="category__tab btn inactive" onclick="location.href ='category'"><i
                    class="icons icon_setting md"></i></button>
        </div>

        <!-- search bar -->
        <form class="input-add-item" action="goToSearchPage">
            <input type="text" class="form-control" name="searchKeyword" placeholder="학습하고 싶은 아티클을 찾으세요!" autocomplete="off" value="${searchKeyword}">
            <!-- 카테고리 전송 -->
            <c:forEach items="${userInfo.categories}" var="category">
                <input type="hidden" name="categories" value=${category}>
            </c:forEach>
            <button class="btn" type용="submit"><i class="text icons icon_search text-color-gray200 md"></i></button>
        </form>
    </div>

    <!-- search article section -->
    <div class="findArticle__section">
        <div class="findArticle__section-title text h3 text-color-gray100 text-weight-bold">
            '${searchKeyword}'에 대한 검색 결과 <b class="js-searchResult-count text text-color-green text-weight-bold">0개</b>
        </div>
        <div class="card__outer js-searchResult-section-card-outer">
        </div>
    </div>

    <!-- 관심 분야 탭에서 ALL 버튼을 누를 때
         리스트에 담겨있는 전체 '사용자가 선택한 관심 분야'를 수집하기 위해
         categories 리스트의 사이즈 만큼,input 태그를 생성해 value 안에 값을 담아준다. -->
    <c:forEach items="${userInfo.categories}" var="category">
        <input type="hidden" class="js-categories-str" value=${category}>
    </c:forEach>

    <!-- 검색 키워드-->
    <input type="hidden" class="js-search-keyword" value=${searchKeyword}>

    <!-- script -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script type="module" src="${ pageContext.request.contextPath }/js/articleBoard/searchAction.js"></script>
</body>
</html>