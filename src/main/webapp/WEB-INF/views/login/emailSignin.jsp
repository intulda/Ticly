<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 2020/08/24
  Time: 12:24 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Ticly - 최신 아티클로 영어공부를 하세요</title>
    <!-- Common -->
    <c:import url="/WEB-INF/views/layout/globalImport.jsp"></c:import>
    <style>
        .login-container{
            padding-top: 140px;
        }

        .email-login-container{
            width: 500px;
            margin: 0 auto;
            padding: 60px 50px;
            position: relative;
            border: 1px solid #e9ecef;
        }

        /*로그인 페이지 header*/
        .login-header{
            display: block;
            text-align: center;
            margin-bottom: 24px;
        }

        /*로그인 페이지 footer*/
        .login-footer{
            display: flex;
            justify-content: center;
            line-height: 28px;
        }

        .login-footer-moving{
            padding-left: 8px;
            text-decoration: underline;
            cursor: pointer;
        }

        .signin-validation-message{
            margin-top: 4px;
            display: flex;
            align-items: center;
        }


    </style>
</head>
<body>
<div class="ticly__basic-layout">
    <!-- header -->
    <c:import url="/WEB-INF/views/layout/globalNav.jsp"></c:import>

    <!-- content -->
    <div class="container-sm ticly__basic-content-layout">
        <div class="login-container">
            <div class="email-login-container">
                <div class="main-login-container" id="main-login-form">
                    <hearder class="login-header">
                        <h1 class="text text-color-gray100 text-weight-medium">이메일로 로그인</h1>
                    </hearder>
                    <div class="login-content-wrapper">
                        <div class="bs-component" id="login-fail-alert"></div>

                        <div class="login-input-group">
                            <label for="signin-email" class="text text-color-gray100 body1 text-weight-medium login-label-title">이메일 <span class="required-label">*</span></label>
                            <input type="text" class="form-control form-control-lg" id="signin-email" name="email" placeholder="ticly@ticly.io" />
                            <div class="signin-validation-message"></div>
                        </div>
                        <div class="login-input-group">
                            <label for="signin-password" class="text text-color-gray100 body1 text-weight-medium login-label-title">비밀번호 <span class="required-label">*</span></label>
                            <input type="password" class="form-control form-control-lg" id="signin-password" name="password" placeholder="비밀번호를 입력하세요." />
                            <div class="eyes-box" id="signin-eyes-box">
                                <i class="icon_show" id="signin-eyes-icon"></i>
                            </div>
                            <div class="signin-validation-message"></div>
                        </div>
                        <div class="signin-validation-message"></div>
                        <div class="signin-check">
                            <div class="signin-check-box custom-control custom-checkbox">
                                <input type="checkbox" id="signin-check" class="custom-control-input">
                                <label for="signin-check" class="custom-control-label text text-color-gray100 text-weight-regular body1 label-signin-check" id="stay-logined">로그인 상태 유지</label>
                            </div>
                            <div class="password-inquiry">
                                <a href="#" class="text body1 text-color-gray100 text-weight-regular">비밀번호 찾기</a>
                            </div>
                        </div>
                        <div class="login-modal-button">
                            <button id="signinSubmitBtn" class="btn btn-primary">로그인</button>
                        </div>
                    </div>
                    <footer class="login-modal-footer">
                        <h6 class="text text-color-gray300 text-weight-regular">아직 회원이 아니신가요?</h6>
                        <a href="/member/emailSignup" class="text text-color-gray200 text-weight-regular login-footer-moving h6" id="login-footer-signin-to-signup">회원가입</a>
                    </footer>
                </div>
            </div>
        </div>
    </div>

    <!-- footer -->
    <c:import url="/WEB-INF/views/layout/globalFooter.jsp"></c:import>
</div>
<script>
    /*//////////////emailSignIn////////////////////*/
    (() => {
        let signinEmailElem = document.getElementById('signin-email');  //이메일
        let signinPasswordElem = document.getElementById('signin-password');   //비밀번호

        let signinErrorLabelElem = document.querySelectorAll('.signin-validation-message');   //유효성 메세지

        let staySigned = document.getElementById('stay-logined'); //로그인 상태 유지 체크 버튼

        let signinSubmitBtn = document.getElementById('signinSubmitBtn'); //회원가입 버튼

        let signinEmailCheck = false;   //회원가입시, 이메일 유효성을 체크한다.
        let signinPasswordCheck = false;    //회원가입시, 패스워드의 유효성을 체크한다.


        //눈표시 클릭 시 패스워드 보이기
        document.getElementById('signin-eyes-box').addEventListener("click",function (){
            //  signupPasswordElem1.classList.toggle('active');
            if(signinPasswordElem.type=='password'){
                document.querySelector('#signin-eyes-icon').className="icon_hide";
                signinPasswordElem.type='text'
            }else if(signinPasswordElem.type=='text'){
                document.querySelector('#signin-eyes-icon').className="icon_show";
                signinPasswordElem.type='password'
            }
        });

        //이메일 정규식 확인 함수
        function isEmail(asValue){
            const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
            return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
        };

        //로그인 실패시
        function failEmailLogin(){
            document.getElementById("login-fail-alert").innerHTML = '<div class="alert alert-primary signin-alert-message">\n' +
                '                            <i class="icon_info_circle"></i>\n' +
                '                            <span class="text body1 text-weight-regular">가입하지 않은 이메일이거나, 잘못된 비밀번호입니다.</span>\n' +
                '                            <button type="button" class="close" data-dismiss="alert">×</button>\n' +
                '                        </div>';
        }

        signinSubmitBtn.addEventListener("click", function () {
            if(signinEmailElem.value.trim()==""){
                signinErrorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-gray300 body2">이메일을 입력해주세요</p>';
                signinEmailCheck = false;
            } else if(!isEmail(signinEmailElem.value.trim())) {
                signinErrorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-gray300 body2">이메일 형식에 맞게 입력해주세요.</p>';
                signinEmailCheck = false;
            } else{
                signinErrorLabelElem[0].innerHTML = '';
                signinEmailCheck = true;
            }

            if(signinPasswordElem.value.trim()==""){
                signinErrorLabelElem[1].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-gray300 body2">비밀번호를 입력해주세요.</p>';
                signinPasswordCheck = false;
            } else{
                signinErrorLabelElem[1].innerHTML = '';
                signinPasswordCheck = true;
            }

            if(signinEmailCheck && signinPasswordCheck){
                const email = signinEmailElem.value;
                const password = signinPasswordElem.value;

                //json객체에 담기
                const signinData={
                    email : email,
                    password : password
                };

                axios({
                    method: 'post',
                    url: '/member/signin',
                    headers: { 'content-type': 'application/json' },
                    data : JSON.stringify(signinData)
                })
                    .then(function (result){
                        console.log(result)
                        if(result.data.okay == "true"){
                            if(result.data.sessionInfo==="카테고리데이터있음"){
                                window.location.href = result.data.prev_url;
                            }else if(result.data.sessionInfo==="카테고리데이터없음"){
                                alert("카테고리를 먼저 선택해보세요!");
                                window.location.href = "/articleBoard/category";
                            }
                        } else {
                            failEmailLogin(); //로그인 실패시 경고 alert
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("로그인에 실패했습니다.");
                    });
            }
        });
    })();
</script>
</body>
</html>
