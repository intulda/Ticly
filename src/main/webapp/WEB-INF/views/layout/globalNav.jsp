<%@ page import="io.ticly.mint.articleBoard.model.dto.MemberDTO" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html>
<head>
    <title>Nav-Header</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/default.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/fonticon.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/layout/globalNav.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/member/singInUp.css">

    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
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
                byte[] bytes = nickname.getBytes();
                if(bytes.length > 2 ) {
                    nickname = new String(bytes, 0, 2);
                    System.out.println("nickname");
                }
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
                                <li class="text h6 text-color-gray200 text-weight-medium nav-list-active "><a herf="/">아티클 찾기</a></li>
                                <li class="text h6 text-color-gray200 text-weight-medium"><a herf="#">서비스보드</a></li>
                                <li class="text h6 text-color-white text-weight-medium" id="start-free-btn">무료로 시작하기</li>
                            </ul>
                        </c:when>
                        <c:otherwise>
                            <ul class="header-index">
                                <li class="text h6 text-color-gray200 text-weight-medium nav-list-active"><a herf="/">아티클 찾기</a></li>
                                <li class="text h6 text-color-gray200 text-weight-medium"><a herf="#">서비스보드</a></li>
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
                            <div class="header-learing-board">
                                <h6 class="text text-color-green text-weight-medium">내 학습 보드</h6>
                            </div>
                            <div id="header-profile" class="text leaning-header-profile"><%=nickname%></div>
                            <i for="header-profile" class="icon_caret-down profile-drop-button"></i>
                        </c:otherwise>
                    </c:choose>
                </div>
            </div>
        </header>

        <!--modal-->
        <c:import url="/WEB-INF/views/login/loginModal.jsp"></c:import>
        <script>
            //모달 열기
            document.getElementById('modal-open-button').addEventListener("click", function() {
                document.getElementById('signinup-modal').style.display = "flex";
                document.getElementById('main-login-form').classList.remove('hidden');
                document.getElementById('email-signup-form').classList.add('hidden');
                document.getElementById('email-signin-form').classList.add('hidden');
            });
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
