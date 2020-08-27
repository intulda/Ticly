<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 2020/08/21
  Time: 7:49 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!--complete Modal-->
<div class="ticly-modal" id="signinup-modal">
    <div class="ticly-modal-contents">
        <!--close btn-->
        <div class="intro_Button_Oval" id="modal-close">
            <i class="icon_close intro_Button_X"></i>
        </div>

        <!--congratulation-icon-->
        <div class="congratulation-box" id="congratulations">
            <img src = "${pageContext.request.contextPath}/images/learn/popper.png" class="congratulations">
        </div>

        <!--Main-->
        <div class="complete-modal-form hidden" id="main-login-form">
            <div class="scroll-zone">
                <hearder class="complete-modal-header">
                    <h1 class="text text-color-gray100 text-weight-medium" id="test">목표를 달성했습니다!</h1>
                    <h5 class="text text-color-gray300 text-weight-regular modal-header-content">이제 원문을 술술 일어보러 가볼까요?</h5>
                </hearder>
                <div class="complete-button-wrapper">
                    <div class="complete-button move-original-article-button" id="move-original-article">
                        <h5 class="text text-color-gray100 text-weight-medium text-color-white">원문 보러가기</h5>
                    </div>
                    <div class="complete-button move-another-article-button" id="move-another-article">
                        <h5 class="text text-color-gray100 text-weight-medium">다른 아티클 학습하기</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
