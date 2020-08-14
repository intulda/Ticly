<%--
  Created by IntelliJ IDEA.
  User: Charles
  Date: 2020-08-12
  Time: 오전 11:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>myPage</title>
    <link rel="stylesheet" href="/css/mypage/myPage.css" />
    <link rel="stylesheet" href="/css/default.css" />
    <link rel="stylesheet" href="/css/bootstrap.css" />
    <link rel="stylesheet" href="/css/fonticon.css" />
</head>
<body>
<div class="container myPage_Nav"></div>
<div class="container myPage_Container">
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
                />
                <button type="submit"
                        class="btn btn-outline-primary">
                        변경하기
                </button>
            </div>
            <span class="div_Contents">이메일</span><br>
            <span class="text h5 text-color-gray100 basicInfo_Email">kkh@ticly.com</span>
        </div>
    </div>
    <div class="rectangle myPage_Rectangle"></div>
    <div class="password_Div">
        <span class="myPage_Subtitle">비밀번호 변경</span>
        <div class="password_DivContents">
            <span class="div_Contents">현재 비밀번호</span>
            <input
                    type="password"
                    class="form-control password_PresentType"
                    placeholder="현재 비밀번호를 입력하세요."
            />
            <span class="div_Contents">새로운 비밀번호</span>
            <input
                    type="password"
                    class="form-control password_NewType"
                    placeholder="새로운 비밀번호를 입력하세요."
            />
            <span class="text body2 text-color-gray300 sixPassword_Input">
                <i class="icon_info_circle InfoIcon_Size sixPassword_Icon"></i>
            6자리 이상의 비밀번호를 입력하세요 </span
            >
            <button type="submit"
                    class="btn btn-outline-primary">
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
            >코드짜개님</span
            ><span>의 </span
            ><span class="text text-weight-bold text-color-red"
            >계정이 영구적으로 삭제</span
            ><span>됩니다.</span><br />
                <span>모든 데이터가 삭제되며 되돌릴 수 없습니다.</span>
            </div>
            <button type="submit"
                    class="btn btn-outline-danger">
                탈퇴하기
            </button>
        </div>
    </div>
</div>
</div>
</body>
</html>
