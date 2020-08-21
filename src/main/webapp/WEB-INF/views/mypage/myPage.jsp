<%--
  Created by IntelliJ IDEA.
  User: Charles
  Date: 2020-08-12
  Time: 오전 11:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>myPage</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/mypage/myPage.css" />
    <c:import url="/WEB-INF/views/layout/globalImport.jsp"></c:import>
</head>
<body>
<div class="ticly__basic-layout">
    <c:import url="/WEB-INF/views/layout/globalNav.jsp"></c:import>
    <div class="container myPage_Container ticly__basic-content-layout">
        <div class="myPage_Div">
            <span class="text h3 text-weight-bold myPage_Title">내 정보 수정</span>
            <div class="basicInfo_Div">
                <span class="myPage_Subtitle">기본 정보</span>
                <div class="basicInfo_DivContents">
                    <span class="div_Contents">닉네임</span>
                    <div class="nickname_Change">
                        <input
                                type="text"
                                class="form-control nickname_Input"
                                placeholder="변경할 닉네임을 입력하세요."
                                value="${sessionScope.userInfo.nickname}"
                                id="nickname_Change_Input"
                        />
                        <button type="submit"
                                class="btn btn-outline-primary"
                                id="nickname_Change_Button">
                                변경하기
                        </button>
                    </div>
                    <p class="myPage_Error_Message"></p>
                    <span class="div_Contents">이메일</span><br>
                    <span class="text h5 text-color-gray100 basicInfo_Email"
                          id="basicInformation_Email"
                    >
                    ${sessionScope.userInfo.email}
                        </span>
                </div>
            </div>
            <div class="rectangle myPage_Rectangle"></div>
            <div class="password_Div">
                <span class="myPage_Subtitle">비밀번호 변경</span>
                <div class="password_DivContents">
                    <div class="password_Type_Div">
                    <span class="div_Contents">현재 비밀번호</span>
                    <input
                            type="password"
                            class="form-control"
                            id="password_PresentType"
                            placeholder="현재 비밀번호를 입력하세요."
                    />

                    <div class="eyes-box" id="password-eyes-box">
                        <i class="icon_show" id="password-eyes-icon"></i>
                    </div>

                    <p class="myPage_Error_Message"></p>
                    </div>
                    <div class="password_Type_Div">
                    <span class="div_Contents">새로운 비밀번호</span>
                    <input
                            type="password"
                            class="form-control"
                            id="password_NewType"
                            placeholder="새로운 비밀번호를 입력하세요."
                    />

                    <div class="eyes-box" id="new-password-eyes-box">
                        <i class="icon_show" id="new-password-eyes-icon"></i>
                    </div>

                    <p class="myPage_Error_Message"></p>
                    </div>
                    <button type="submit"
                            class="btn btn-outline-primary"
                            id="password_Change_Button">
                        변경하기
                    </button>
                </div>
            </div>
            <div class="rectangle myPage_Rectangle"></div>
            <div class="withdraw_Div">
                <span class="myPage_Subtitle">회원 탈퇴</span>
                <div class="withdraw_DivContents">
                    <div class="withdraw_Warning">
                    <span class="text text-color-gray100">탈퇴하기를 누르시면 </span
                    ><span class="text text-weight-bold withdraw_Nickname"
                    >${sessionScope.userInfo.nickname}</span
                    ><span>의 </span
                    ><span class="text text-weight-bold text-color-red"
                    >계정이 영구적으로 삭제</span
                    ><span>됩니다.</span><br />
                        <span>모든 데이터가 삭제되며 되돌릴 수 없습니다.</span>
                    </div>
                    <button type="submit"
                            class="btn btn-outline-danger"
                            id="membership_Withdrawal_Button">
                        탈퇴하기
                    </button>
                </div>
            </div>
        </div>
    </div>
    <c:import url="/WEB-INF/views/layout/globalFooter.jsp"></c:import>
</div>

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script type="module" src="${pageContext.request.contextPath}/js/member/mypage.js"></script>
</body>
</html>
