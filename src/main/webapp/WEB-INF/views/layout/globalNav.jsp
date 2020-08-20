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
<html>
<head>
    <title>Nav-Header</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/default.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/fonticon.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/layout/globalNav.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/member/singInUp.css">

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
</head>
<body>

        <%
            Object ologin = session.getAttribute("userInfo");

            String nickname ="";
            System.out.println("확인1111111111");
            if(ologin != null){
                System.out.println("확인222222222");
                MemberDTO memberDTO = (MemberDTO)ologin;
                nickname = memberDTO.getNickname();
                System.out.printf("memberDTO.getNickname() : "+memberDTO.getNickname());
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
                                <li class="text h6 text-color-gray200 text-weight-medium nav-list-active "><a href="/">아티클 찾기</a></li>
                                <li class="text h6 text-color-gray200 text-weight-medium"><a href="#">서비스보드</a></li>
                                <li class="text h6 text-color-white text-weight-medium" id="start-free-btn">무료로 시작하기</li>
                            </ul>
                        </c:when>
                        <c:otherwise>
                            <ul class="header-index">
                                <li class="text h6 text-color-gray200 text-weight-medium"><a href="/" class="nav-list-active">아티클 찾기</a></li>
                                <li class="text h6 text-color-gray200 text-weight-medium"><a href="#">서비스 소개</a></li>
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
                                <a href="/writeTest" class="text text-weight-medium" style="margin-right: 12px">관리자페이지</a>
                            </c:if>
                            <div class="header-learing-board">
                                <h6 class="text text-color-green text-weight-medium">내 학습 보드</h6>
                            </div>
                            <div class="dropdown">
                                <div class="header-profile-wrap" data-toggle="dropdown">
                                    <div id="header-profile" class="text leaning-header-profile"><%=nickname%></div>
                                    <i for="header-profile" class="icon_caret-down profile-drop-button"></i>
                                </div>
                                <div class="dropdown-menu" aria-labelledby="dropdown01">
                                    <a class="dropdown-item" href="#">마이페이지</a>
                                    <a class="dropdown-item" href="/member/logout">로그아웃</a>
                                </div>
                            </div>
                        </c:otherwise>
                    </c:choose>
                </div>
            </div>
        </header>
        <!--modal-->
        <c:import url="/WEB-INF/views/login/loginModal.jsp"></c:import>
        <script>
            (() => {
            //모달 열기

                if(document.getElementById('modal-open-button') != null) {
                    document.getElementById('modal-open-button').addEventListener("click", function() {
                        modalOpen('Ticly 로그인');
                    });

                    document.getElementById('start-free-btn').addEventListener("click", function() {
                        modalOpen('Ticly 무료로 시작하기')
                    });
                }

                function modalOpen(title) {
                    document.querySelector('#test').innerText = title;
                    document.getElementById('signinup-modal').style.display = "flex";
                    document.getElementById('main-login-form').classList.remove('hidden');
                    document.getElementById('email-signup-form').classList.add('hidden');
                    document.getElementById('email-signin-form').classList.add('hidden');
                }
            })();
        </script>

        <script>
            /*
            let nickname = "${userInfo.nickname}";


            function cutByLen(str, maxByte) {
                for(b=i=0;c=str.charCodeAt(i);) {
                    b+=c>>7?2:1;
                    if (b > maxByte)
                        break;
                    i++;
                }
                return str.substring(0,i);
            }
             */
        </script>
</body>
</html>
