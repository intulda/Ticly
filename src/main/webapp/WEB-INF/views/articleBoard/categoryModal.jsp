<%--
  Created by IntelliJ IDEA.
  User: kkh
  Date: 2020/08/24
  Time: 6:06 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <!-- Common -->
    <c:import url="/WEB-INF/views/layout/globalImport.jsp"></c:import>

    <!-- CSS -->
    <link rel="stylesheet" href="${ pageContext.request.contextPath }/css/articleBoard/categoryStyle.css">
</head>
<body>
<!-- header -->
<c:import url="/WEB-INF/views/layout/globalNav.jsp"></c:import>

<div class="ticly__basic-layout">
    <div class="container container-xxl ticly__basic-content-layout">

        <button class="js-category-modal-trigger">click</button>

        <!-- footer -->
    </div>
    <c:import url="/WEB-INF/views/layout/globalFooter.jsp"></c:import>
</div>


<!--category Modal-->
<div class="ticly-modal" id="category-modal">
    <div class="ticly-modal-contents">

        <!--닫기 버튼-->
        <div class="intro_Button_Oval" id="modal-close">
            <i class="icon_close intro_Button_X"></i>
        </div>

        <div class="category__wrapper">
            <div class="scroll-zone">
                <!-- title section -->
                <div class="category__title">
                    <p class="text h2 text-color-gray100 text-weight-medium">관심 분야를 알려주세요!</p>
                    <p class="text h6 text-color-gray200 text-weight-regular">티클리는 회원님의 관심 분야의 영문 아티클을 기반으로
                        <br>영어 학습을 할 수 있도록 도와드립니다.</p>
                </div>

                <!-- category list -->
                <form id="js-category-form" action="choiceDone">

                    <div class="category__cards">
                        <!-- 모든 분야 -->
                        <div class="category__item js-card js-category__all-btn">
                            <h6 class="text text-weight-medium"><b>🙌</b>모든 분야</h6>
                            <i class="icon_plus"></i>
                            <input type="checkbox" class="hide">
                        </div>

                        <div class="category__item js-card">
                            <h6 class="text text-weight-medium"><b>💻</b>개발</h6>
                            <i class="icon_plus"></i>
                            <input type="checkbox" class="hide" name="categories" value="개발">
                        </div>
                        <div class="category__item js-card">
                            <h6 class="text text-weight-medium"><b>🎨</b>디자인</h6>
                            <i class="icon_plus"></i>
                            <input type="checkbox" class="hide" name="categories" value="디자인">
                        </div>
                        <div class="category__item js-card">
                            <h6 class="text text-weight-medium"><b>📝</b>브랜딩</h6>
                            <i class="icon_plus"></i>
                            <input type="checkbox" class="hide" name="categories" value="브랜딩">
                        </div>
                        <div class="category__item js-card">
                            <h6 class="text text-weight-medium"><b>🎯</b>마케팅</h6>
                            <i class="icon_plus"></i>
                            <input type="checkbox" class="hide" name="categories" value="마케팅">
                        </div>
                        <div class="category__item js-card ">
                            <h6 class="text text-weight-medium"><b>💰</b>경제</h6>
                            <i class="icon_plus"></i>
                            <input type="checkbox" class="hide" name="categories" value="경제">
                        </div>
                    </div>

                    <!-- Submit button -->
                    <button type="button" class="category__action-btn btn btn-primary btn-lg js-done-btn">다 했어요</button>

                </form>
            </div>
        </div>
    </div>
</div>

<!-- script -->
<script type="module" src="${ pageContext.request.contextPath }/js/articleBoard/categoryAction.js"></script>


</body>
</html>
