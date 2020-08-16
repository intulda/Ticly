<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!--signinup Modal-->
<div class="signinup-modal" id="signinup-modal">
    <div class="signinup-modal-contents">
        <!--login-->
        <!--닫기 버튼-->
        <div class="modal-close" id="modal-close">+</div>

        <!--로그인 메인-->
        <div class="main-login-form hidden" id="main-login-form">
                <hearder class="login-modal-header">
                    <h1 class="text text-color-gray100 text-weight-medium">Ticly 로그인</h1>
                    <h5 class="text text-color-gray300 text-weight-regular modal-header-content">트렌드 파악과 함께 영어 공부를 시작해볼까요?</h5>
                </hearder>
                <div class="login-button-wrapper">
                    <div class="login-button naver-login-button">
                        <img scr="">
                        <h5 class="text text-color-white text-weight-medium">네이버로 로그인</h5>
                    </div>
                    <div class="login-button email-login-button" id="login-to-signin">
                        <h5 class="text text-color-gray100 text-weight-medium">이메일로 로그인</h5>
                    </div>
                </div>
                <footer class="login-modal-footer">
                    <h6 class="text text-color-gray300 text-weight-regular">아직 회원이 아니신가요?</h6>
                    <h6 class="text text-color-gray200 text-weight-regular login-modal-footer-gosignup" id="login-footer-login-to-signup">회원가입</h6>
                </footer>
        </div>

        <!--이메일로 로그인하기-->
        <div class="email-signin-form hidden" id="email-signin-form">
            <hearder class="login-modal-header">
                <h1 class="text text-color-gray100 text-weight-medium">이메일로 로그인</h1>
            </hearder>
            <div class="login-content-wrapper">
                <div class="bs-component" id="login-fail-alert">

                </div>

                <div class="login-input-group">
                    <label for="signin-email" class="text text-color-gray100 body1 text-weight-medium login-label-title">이메일 <span class="required-label">*</span></label>
                    <input type="text" class="form-control form-control-lg" id="signin-email" name="email" placeholder="ticly@ticly.io" />
                    <div class="signin-validation-message"></div>
                </div>
                <div class="login-input-group">
                    <label for="signup-password" class="text text-color-gray100 body1 text-weight-medium login-label-title">비밀번호 <span class="required-label">*</span></label>
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
                <h6 class="text text-color-gray200 text-weight-regular login-modal-footer-gosignup" id="login-footer-signin-to-signup">회원가입</h6>
            </footer>
        </div>

        <!--이메일로 회원가입-->
        <div class="email-signup-form hidden" id="email-signup-form">
            <hearder class="login-modal-header">
                <h1 class="text text-color-gray100 text-weight-medium">이메일로 회원가입</h1>
            </hearder>
            <div class="login-content-wrapper">
                <div class="login-input-group">
                    <label for="signup-email" class="text text-color-gray100 body1 text-weight-medium login-label-title">이메일 <span class="required-label">*</span></label>
                    <input type="text" class="form-control form-control-lg" id="signup-email" name="email" placeholder="ticly@ticly.io" />
                    <div class="signup-validation-message"></div>
                </div>
                <div class="login-input-group">
                    <label for="signup-password" class="text text-color-gray100 body1 text-weight-medium login-label-title">비밀번호 <span class="required-label">*</span></label>
                    <input type="password" class="form-control form-control-lg" id="signup-password" name="password" placeholder="숫자 포함, 8자 이상" />
                    <div class="eyes-box" id="signup-eyes-box">
                        <i class="icon_show" id="signup-eyes-icon"></i>
                    </div>

                    <p class="signup-validation-message"></p>
                </div>
                <!--
                <div class="login-input-group">
                    <label for="signup-password-confirm" class="text text-color-gray100 body1 text-weight-medium login-label-title">비밀번호 확인 <span class="required-label">*</span></label>
                    <input type="password" class="form-control form-control-lg" id="signup-password-confirm" placeholder="비밀번호를 한 번 더 입력해주세요."/>
                    <p class="signup-validation-message"></p>
                </div>-->

                <!--회원가입 약관 동의-->
                <div class="agreements">
                    <div class="agreement-list custom-control custom-checkbox">
                        <input type="checkbox" id="AcceptTerm" class="custom-control-input">
                        <label for="AcceptTerm" class="custom-control-label text text-color-gray200 text-weight-regular">Ticly의 <a href="#" class="text text-color-gray200 text-weight-bold">서비스 약관</a>과 <a href="#" class="text text-color-gray200 text-weight-bold">개인정보 취급방침</a>에 대해 동의합니다.(필수)</label>
                    </div>
                    <div class="agreement-list custom-control custom-checkbox">
                        <input type="checkbox" id="promotion" class="custom-control-input custom-control">
                        <label for="promotion" class="custom-control-label text text-color-gray200 text-weight-regular">Ticly의 이벤트, 프로모션, 알림 메일 및 SMS수신에 대해 동의합니다.(선택)</label>
                    </div>
                </div>
                <div class="login-modal-button">
                    <button id="signupSubmitBtn" class="btn btn-primary disabled">회원가입</button>
                </div>
            </div>
            <footer class="login-modal-footer">
                <h6 class="text text-color-gray300 text-weight-regular">이미 티클리 계정이 있나요?</h6>
                <h6 class="text text-color-gray200 text-weight-regular login-modal-footer-gosignup" id="login-footer-signup-to-login">로그인</h6>
            </footer>
        </div>
    </div>
</div>


<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<!--이메일로 로그인-->
<script src="js/member/signinEmail.js"></script>

<!--이메일로 회원가입-->
<script src="js/member/signupEmail.js"></script>

<script>
    (() => {
        /* 모달 내 이동*/
        //모달 열기
    /*    document.getElementById('modal-open-button').addEventListener("click", function() {
            document.getElementById('signinup-modal').style.display = "flex";
            document.getElementById('main-login-form').classList.remove('hidden');
            document.getElementById('email-signup-form').classList.add('hidden');
            document.getElementById('email-signin-form').classList.add('hidden');
        });*/
        //모달열기
        function openModal(){
            document.getElementById('signinup-modal').style.display = "flex";
            document.getElementById('main-login-form').classList.remove('hidden');
            document.getElementById('email-signup-form').classList.add('hidden');
            document.getElementById('email-signin-form').classList.add('hidden');
        }

        //모달 닫기
        document.getElementById('modal-close').addEventListener("click", function() {
            document.getElementById('signinup-modal').style.display = "none";
        });

        //메인 로그인에서 '이메일 로그인'으로 이동
        document.getElementById('login-to-signin').addEventListener("click", function (){
            document.getElementById('main-login-form').classList.add('hidden');
            document.getElementById('email-signin-form').classList.remove('hidden');
        });

        //메인 로그인에서 '이메일 회원가입'으로 이동
        document.getElementById('login-footer-login-to-signup').addEventListener("click", function() {
            document.getElementById('main-login-form').classList.add('hidden');
            document.getElementById('email-signup-form').classList.remove('hidden');
        });

        //이메일 회원가입에서 '메인 로그인'으로 이동
        document.getElementById('login-footer-signup-to-login').addEventListener("click",function (){
            document.getElementById('email-signup-form').classList.add('hidden');
            document.getElementById('main-login-form').classList.remove('hidden');
        });

        //'이메일 로그인'에서 '이메일 회원가입'으로 이동
        document.getElementById('login-footer-signin-to-signup').addEventListener("click",function (){
            document.getElementById('email-signin-form').classList.add('hidden');
            document.getElementById('email-signup-form').classList.remove('hidden');
        });
    })();
</script>