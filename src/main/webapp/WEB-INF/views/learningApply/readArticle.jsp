<%@ page import="io.ticly.mint.articleBoard.model.dto.MemberDTO" %><%--
  Created by IntelliJ IDEA.
  User: kkh
  Date: 2020/08/26
  Time: 2:22 오전
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!-- 닉네임 설정 -->
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

    String nickname = "";
    if (ologin != null) {
        MemberDTO memberDTO = (MemberDTO) ologin;
        nickname = memberDTO.getNickname();
        nickname = subStringBytes(nickname, 2, 2);
        System.out.println("nickname : " + nickname);
    } else {
        System.out.println("로그인 세션 정보 없음");
    }
%>

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

<div class="header__wrapper">
    <div class="header__left-content">
        <button class="btn btn-outline-secondary btn-left-icon" onclick="history.back()">
            <i class="icon_chevron-left"></i>돌아가기
        </button>

        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="../articleBoard/findArticle">아티클 찾기</a></li>
            <li class="breadcrumb-item active">${articleInfo.title}</li>

        </ol>

        <input type="hidden" name="articleSeq" value="${articleInfo.article_seq}">
    </div>
    <div class="header__right-content">
        <button class="btn btn-primary js-learning-apply-btn">바로 학습하기</button>
        <div class="globalHeader-right">
            <c:choose>
                <c:when test="${empty sessionScope.userInfo.email}">
                    <h6 class="text text-color-gray200 text-weight-medium" id="modal-open-button">로그인</h6>
                </c:when>
                <c:otherwise>
                    <div class="dropdown">
                        <div class="header-profile-wrap" data-toggle="dropdown">
                            <div id="header-profile" class="text leaning-header-profile"><%=nickname%>
                            </div>
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

</div>

<object type="text/html" class="iframeBody js-object-body" data="${articleInfo.url}" allowFullScreen></object>

<%--<div class="default__null-wrapper">
    <div class="container">
        <div class="default__null">
            <p class="text h4 text-weight-medium">앗, 원문 사이트에서 아티클을 불러오는 것을 원하지 않네요🤭<br>아래 [원문 보러가기] 버튼을 눌러 이동해주세요!</p>
            <button class="btn btn-primary btn-right-icon mt-3">원문 보러가기<i class="icon_chevron-right"></i></button>
        </div>
    </div>
</div>--%>

<!--login modal-->
<c:import url="/WEB-INF/views/login/loginModal.jsp"></c:import>

<!-- javascript -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="${ pageContext.request.contextPath}/js/learningApply/readArticleAction.js"></script>

<!--Nav script-->
<script type="module" src="${pageContext.request.contextPath}/js/layout/globalNav.js"></script>

</body>
</html>
