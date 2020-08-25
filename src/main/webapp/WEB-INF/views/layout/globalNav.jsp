<%@ page import="io.ticly.mint.articleBoard.model.dto.MemberDTO" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>


<%!
    public String subStringBytes(String str, int byteLength, int sizePerLetter) {
        int retLength = 0;
        int tempSize = 0;
        int asc;
        if (str == null || "".equals(str) || "null".equals(str)) {
            str = "";
        }

        int length = str.length();

        for (int i = 1; i <= length; i++) {
            asc = (int) str.charAt(i - 1);
            if (asc > 127) {
                if (byteLength >= tempSize + sizePerLetter) {
                    tempSize += sizePerLetter;
                    retLength++;
                }
            } else {
                if (byteLength > tempSize) {
                    tempSize++;
                    retLength++;
                }
            }
        }

        return str.substring(0, retLength);
    }
%>


<%
    Object ologin = session.getAttribute("userInfo");

    String nickname ="";
    if(ologin != null){
        MemberDTO memberDTO = (MemberDTO)ologin;
        nickname = memberDTO.getNickname();
        nickname = subStringBytes(nickname, 2, 2);
        System.out.println("nickname : " +nickname);
    }else{
        System.out.println("로그인 세션 정보 없음");
    }
%>

<header class="globalHeader-wrap">
    <div class="globalHeader">
        <div class="globalHeader-left">
            <a href="/">
                <img src = "${pageContext.request.contextPath}/images/logo_color.svg" alt="logoColor" class="header-logo">
            </a>
        </div>
        <div class="globalHeader-center">
            <c:choose>
                <c:when test="${empty sessionScope.userInfo.email}">
                    <ul class="header-index">
                        <li class="text h6 text-color-gray200 text-weight-medium moveArticleBoardTab"><a href="/articleBoard/findArticle" class="navTabs" id="">아티클 찾기</a></li>
                        <li class="text h6 text-color-gray200 text-weight-medium moveServiceIntrdTab"><a href="/service" class="moveServiceuIntrdText navTabs">서비스 소개</a></li>
                        <li class="text h6 text-color-white text-weight-medium" id="start-free-btn">무료로 시작하기</li>
                    </ul>
                </c:when>
                <c:otherwise>
                    <ul class="header-index">
                        <li class="text h6 text-color-gray200 text-weight-medium moveArticleBoardTab"><a href="/articleBoard/findArticle" class="navTabs">아티클 찾기</a></li>
                        <li class="text h6 text-color-gray200 text-weight-medium moveServiceIntrdTab"><a href="/service" class="moveServiceIntrdText navTabs">서비스 소개 </a></li>
                    </ul>
                </c:otherwise>
            </c:choose>

        </div>
        <div class="globalHeader-right">
            <c:choose>
                <c:when test="${empty sessionScope.userInfo.email}">
                     <h6 class="text text-color-gray200 text-weight-medium" id="modal-open-button">로그인</h6>
                </c:when>
                <c:otherwise>
                    <c:if test="${sessionScope.userInfo.auth eq 0}">
                        <a href="/writeForm" class="text text-weight-medium" style="margin-right: 12px">관리자페이지</a>
                    </c:if>
                    <button class="globalHeader__move-learing-board btn btn-outline-primary btn-right-icon" id="move-learning-board">
                        내 학습 보드
                    </button>
                    <div class="dropdown">
                        <div class="header-profile-wrap" data-toggle="dropdown">
                            <div id="header-profile" class="text leaning-header-profile"><%=nickname%></div>
                            <i for="header-profile" class="icon_caret-down profile-drop-button"></i>
                        </div>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="/mypage">마이페이지</a>
                            <a class="dropdown-item" href="/member/logout">로그아웃</a>
                        </div>
                    </div>
                </c:otherwise>
            </c:choose>
        </div>
    </div>
</header>

<!--login modal-->
<c:import url="/WEB-INF/views/login/loginModal.jsp"></c:import>

<!--Nav script-->
<script type="module" src="${pageContext.request.contextPath}/js/layout/globalNav.js"></script>