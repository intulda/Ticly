<%@ page import="io.ticly.mint.articleBoard.model.dto.MemberDTO" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


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

<html>
<head>
    <title></title>
<%--    <c:import url="/WEB-INF/views/layout/globalImport.jsp"></c:import>--%>
<%--    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/learn/learn.css">--%>
</head>
<body>
<header class="leaning-header-wrap">
    <div class="leaning-header">
        <div class="leaning-header-left">
            <button class="text btn btn-secondary btn-custom-option text-weight-medium header-btn-back" onclick="location.href='${pageContext.request.contextPath}/dashboard/my'">
                <i class="icon_chevron-left"></i>
                학습 끝내기
            </button>
            <ul class="learning__header-index">
                <li class="text">내 학습보드</li>
                <li class="text">${currentArticle.title}</li>
            </ul>
        </div>
        <div class="globalHeader-right">
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
        </div>
    </div>
</header>
</body>
</html>
