<%--
  Created by IntelliJ IDEA.
  User: Charles
  Date: 2020-08-11
  Time: 오전 4:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <div class="rectangle introPage_Rectangle" id ="intro__modal">
        <div class="introPage_Container">
            <div type="button" class="intro_Button_Oval" id="intro__modal-close">
                <i class="icon_close intro_Button_X"></i>
            </div>
            <div class="introPage_Mask">
                <div class="text h4 text-color-white text-weight-medium">
                    바쁜 김대리의 영어 공부 방법!
                </div>
                <div class="text display-4 text-color-white text-weight-light introPage_Word">
                    <span class="text text-weight-bold trendSearchColor">트렌드 파악</span>과
                    <span class="text text-weight-bold englishStudyColor">영어 공부</span>를 함께하세요!<br/>
                    <span class="text text-weight-bold text-color-white">Ticly</span>는 관심 분야의
                    <span class="text text-weight-bold text-color-white">영문 아티클을 막힘없이<br />읽게 만들어</span>드립니다.
                </div>
                <img src="${pageContext.request.contextPath}/images/main_img.png" alt="IntroImage" class="introPage_img"/>
            </div>
        </div>
    </div>
<!--intro script-->
<script type="module" src="${pageContext.request.contextPath}/js/layout/introModal.js"></script>



