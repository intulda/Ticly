<%--
  Created by IntelliJ IDEA.
  User: kkh
  Date: 2020/08/07
  Time: 12:51 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>카테고리를 선택해주세요</title>

    <!-- Common -->
    <c:import url="/WEB-INF/views/layout/globalImport.jsp"></c:import>

    <!-- CSS -->
    <link rel="stylesheet" href="${ pageContext.request.contextPath }/css/articleBoard/categoryStyle.css">

</head>
<body>
<div class="ticly__basic-layout">
    <!-- header -->
    <c:import url="/WEB-INF/views/layout/globalNav.jsp"></c:import>

    <!-- category section -->
    <div class="category__outer container container-xxl">
        <div class="category__wrapper">
            <div class="category__title">
                <p class="text h1 text-color-gray100 text-weight-medium">회원님의 관심 분야를 알려주세요!</p>
                <p class="text h6 text-color-gray200 text-weight-regular">티클리는 회원님의 관심 분야의 영문 아티클을 기반으로 <br>영어 학습을 할 수 있도록 도와드립니다.</p>
            </div>
            <form id="js-category-form" action="choiceDone">
                <div class="category__cards">
                    <div class="category__item js-card card-item-basic">
                        <img alt="computer" src="${ pageContext.request.contextPath }/images/articleBoard/category_img_development.png">
                        <h4 class="text text-weight-medium">개발</h4>
                        <input type="checkbox" class="hide" name="categories" value="개발">
                    </div>
                    <div class="category__item js-card card-item-basic">
                        <img alt="palette" src="${ pageContext.request.contextPath }/images/articleBoard/category_img_ux_ui.png">
                        <h4 class="text text-weight-medium">디자인</h4>
                        <input type="checkbox" class="hide" name="categories" value="디자인">
                    </div>
                    <div class="category__item js-card card-item-basic">
                        <img alt="paperAndPen" src="${ pageContext.request.contextPath }/images/articleBoard/category_img_branding.png">
                        <h4 class="text text-weight-medium">브랜딩</h4>
                        <input type="checkbox" class="hide" name="categories" value="브랜딩">
                    </div>
                    <div class="category__item js-card card-item-basic">
                        <img alt="target" src="${ pageContext.request.contextPath }/images/articleBoard/category_img_marketing.png">
                        <h4 class="text text-weight-bold">마케팅</h4>
                        <input type="checkbox" class="hide" name="categories" value="마케팅">
                    </div>
                    <div class="category__item js-card card-item-basic">
                        <img alt="money" src="${ pageContext.request.contextPath }/images/articleBoard/category_img_economy.png">
                        <h4 class="text text-weight-medium">경제</h4>
                        <input type="checkbox" class="hide" name="categories" value="경제">
                    </div>
                </div>

                <div class="category__action-btns">
                    <button type="button" class="btn btn-secondary btn-lg">다음에 고를게요</button>
                    <button type="button" class="js-done-btn btn btn-primary btn-lg">다 했어요</button>
                </div>
            </form>
        </div>
    </div>

    <!-- footer -->
    <c:import url="/WEB-INF/views/layout/globalFooter.jsp"></c:import>
</div>
    <!-- script -->
    <script type="module" src="${ pageContext.request.contextPath }/js/articleBoard/categoryAction.js"></script>



</body>
</html>
