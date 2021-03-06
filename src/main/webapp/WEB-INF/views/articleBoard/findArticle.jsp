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
    <title>Ticly - 최신 아티클로 영어공부를 하세요</title>

    <!-- Common -->
    <c:import url="/WEB-INF/views/layout/globalImport.jsp"></c:import>

    <!-- CSS -->
    <link rel="stylesheet" href="${ pageContext.request.contextPath }/css/articleBoard/findArticleStyle.css">
    <link rel="stylesheet" href="${ pageContext.request.contextPath }/css/articleBoard/searchBarStyle.css">
    <link rel="stylesheet" href="${ pageContext.request.contextPath }/css/articleBoard/skeletonCardStyle.css">
    <link rel="stylesheet" href="${ pageContext.request.contextPath }/css/articleBoard/categoryModalStyle.css">
    <link rel="stylesheet" href="${ pageContext.request.contextPath }/css/intro/introPage.css">
</head>
<body>

<div class="ticly__basic-layout">

    <!-- header -->
    <c:import url="/WEB-INF/views/layout/globalNav.jsp"></c:import>
    <c:import url="/WEB-INF/views/intro/introPage.jsp"></c:import>

    <!-- content -->
    <div class="container container-xxl ticly__basic-content-layout">

        <!-- Choice Category Section-->
        <div class="findArticle__header">
            <!-- category tab -->
            <div class="category__tab-wrapper">
                <c:choose>
                    <%-- 선택한 관심분야가 1개 이상일 경우--%>
                    <c:when test="${fn:length(userInfo.categories) > 1}">
                        <button class="category__tab btn btn-tab active js-category-tab">ALL</button>
                        <c:forEach items="${userInfo.categories}" var="category">
                            <button class="category__tab btn btn-tab js-category-tab" value="${category}">${category}</button>
                        </c:forEach>
                    </c:when>

                    <%-- 관심분야를 1개만 선택한 경우--%>
                    <c:otherwise>
                        <button class="category__tab btn btn-tab active">${userInfo.categories[0]}</button>
                    </c:otherwise>

                </c:choose>
                <button class="btn btn-tab hide js-category-setting-btn js-category-modal-trigger" name="tooltip" data-placement="bottom" title="관심분야 설정"><i class="icon_setting"></i></button>
            </div>

            <!-- search bar -->
            <form class="searchBar js-search-bar" action="goToSearchPage">
                <input type="text" class="form-control" name="searchKeyword" placeholder="학습하고 싶은 아티클을 찾으세요!" autocomplete="off">
                <button type="button" class="searchBar__search-btn btn text text-color-gray200 js-searchBar-search-btn"><i class="icons icon_search sm"></i></button>
                <!-- 카테고리 전송 -->
                <c:forEach items="${userInfo.categories}" var="category">
                    <input type="hidden" name="categories" value=${category}>
                </c:forEach>
                <button type="button" class="searchBar-cancel-btn btn text text-color-gray300 js-searchBar-cancel-btn" name="tooltip" data-placement="bottom" title="입력 취소"><i class="icons icon_error_circle sm"></i></button>
            </form>
        </div>

            <!-- Last learning Article Section-->
            <div class="lastLearning__Section hide js-lastLearning-section">
<%--                <p class="text body1 text-color-green" style="margin-bottom: 0.4rem">반갑습니다 ${userInfo.nickname}님! </p>--%>
                <h3 class="lastLearning__Section-title text h3 text-weight-medium mt-2">${userInfo.nickname}님, 학습을 계속 진행해볼까요?📚</h3>
                <div class="lastLearning__card-section js-lastLearning-card-section">
                </div>
            </div>

        <!-- new article section -->
        <div class="findArticle__section">
            <p class="text text-color-green text-weight-medium" style="font-size: 15px">아티클 배달 왔습니다!</p>
            <div><a href="javascript:void(0);" id="newArticle" class="findArticle__section-title text h3 text-color-gray100 text-weight-medium">새로운 아티클<i class="text text-color-green icons icon_chevron-right lg"></i></a></div>
            <div class="card__outer js-new-section-card-outer">
            </div>
        </div>

        <!-- popular article section -->
        <div class="findArticle__section">
            <p class="text text-color-green text-weight-medium" style="font-size: 15px">꼭 읽어보세요!</p>
            <div><a href="javascript:void(0);" id="mustArticle" class="findArticle__section-title text h3 text-color-gray100 text-weight-medium">필독 아티클<i class="text text-color-green icons icon_chevron-right lg"></i></a></div>
            <div class="card__outer js-popular-section-card-outer">
            </div>
        </div>
    </div>

    <!-- footer -->
    <c:import url="/WEB-INF/views/layout/globalFooter.jsp"></c:import>
</div>

<!-- Category Setting Modal -->
<c:import url="/WEB-INF/views/articleBoard/categoryModal.jsp"></c:import>

<!-- '사용자가 선택한 전체 관심 분야'를 수집하기 위한 처리-->
<c:forEach items="${userInfo.categories}" var="category">
    <input type="hidden" class="js-categories-str" value=${category}>
</c:forEach>

<!-- Get User info-->
<input type="hidden" name="userEmail" value="${userInfo.email}">
<input type="hidden" name="userAuth" value="${userInfo.auth}">

<!-- script -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script bufer type="module" src="${ pageContext.request.contextPath }/js/articleBoard/findArticleAction.js"></script>
<script bufer type="module" src="${ pageContext.request.contextPath }/js/articleBoard/searchBarAction.js"></script>
<script type="module" src="${ pageContext.request.contextPath }/js/articleBoard/categoryModalAction.js"></script>

</body>
</html>