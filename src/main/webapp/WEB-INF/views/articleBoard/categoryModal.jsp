<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!--category Modal-->
<div class="ticly-modal" id="category-modal">
    <div class="category__content ticly-modal-contents">

        <!--닫기 버튼-->
        <div class="intro_Button_Oval" id="modal-close">
            <i class="icon_close intro_Button_X"></i>
        </div>

        <div class="category__wrapper">
            <div class="category__scroll scroll-zone">
                <!-- title section -->
                <div class="category__title">
                    <p class="text h3 text-color-gray100 text-weight-medium">관심 분야를 알려주세요</p>
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
                            <input type="checkbox" class="js-categories-item hide" name="categories" value="개발">
                        </div>
                        <div class="category__item js-card">
                            <h6 class="text text-weight-medium"><b>🎨</b>디자인</h6>
                            <i class="icon_plus"></i>
                            <input type="checkbox" class="js-categories-item hide" name="categories" value="디자인">
                        </div>
                        <div class="category__item js-card">
                            <h6 class="text text-weight-medium"><b>📝</b>브랜딩</h6>
                            <i class="icon_plus"></i>
                            <input type="checkbox" class="js-categories-item hide" name="categories" value="브랜딩">
                        </div>
                        <div class="category__item js-card">
                            <h6 class="text text-weight-medium"><b>🎯</b>마케팅</h6>
                            <i class="icon_plus"></i>
                            <input type="checkbox" class="js-categories-item hide" name="categories" value="마케팅">
                        </div>
                        <div class="category__item js-card ">
                            <h6 class="text text-weight-medium"><b>💰</b>경제</h6>
                            <i class="icon_plus"></i>
                            <input type="checkbox" class="js-categories-item hide" name="categories" value="경제">
                        </div>
                    </div>

                    <!-- Submit button -->
                    <button type="button" class="category__action-btn btn btn-primary btn-lg js-done-btn">다 했어요</button>

                </form>
            </div>
        </div>
    </div>
</div>

<c:forEach items="${userInfo.categories}" var="category">
    <input type="hidden" class="js-category-list" value=${category}>
</c:forEach>