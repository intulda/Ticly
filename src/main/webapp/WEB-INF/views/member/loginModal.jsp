<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>회원가입</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <style>
        .agreement-list{
            display: block;
        }

        .
    </style>
</head>
<body>
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="singup">
                <hearder class="modal-header">
                    <h5>이메일로 회원가입</h5>
                </hearder>
                <form class="signup-form">
                    <div class="form-group">
                        <label for="signup-email">이메일 *</label>
                        <input type="text" class="form-control" id="signup-email" name="email" placeholder="ticly@ticly.io" />
                        <p class="validation-message"></p>
                    </div>
                    <div class="form-group">
                        <label for="signup-password">비밀번호 *</label>
                        <input type="password" class="form-control" id="signup-password" name="password" placeholder="비밀번호를 입력하세요." />
                        <p class="validation-message"></p>
                    </div>
                    <div class="form-group">
                        <label for="signup-password-confirm">비밀번호 확인 *</label>
                        <input type="password" class="form-control" id="signup-password-confirm" placeholder="비밀번호를 한 번 더 입력해주세요."/>
                        <p class="validation-message"></p>
                    </div>
                    <div class="agreements">
                        <label class="agreement-list">
                            <input type="checkbox" title="약관동의" class="agreement-checkbox">
                            <span class="message">Ticly의 <a href="#">서비스 약관</a>과 <a href="#">개인정보 취급방침</a>에 대해 동의합니다.(필수)</span>
                        </label>
                        <label class="agreement-list">
                            <input type="checkbox" title="프로모션 동의" class="agreement-checkbox">
                            <span>Ticly의 이벤트, 프로모션, 알림 메일 및 SMS수신에 대해 동의합니다.(선택)</span>
                        </label>
                    </div>
                </form>
                <footer class="modal-footer">
                    <button id="signupBtn" class="button">회원가입</button>
                </footer>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <script>
        (() => {
            let signupEmailElem = document.querySelector('#signup-email');

            let signupPasswordElem1 = document.querySelector('#signup-password');
            let signupPasswordElem2 = document.querySelector('#signup-password-confirm');

            let errorLabelElem = document.querySelectorAll('.validation-message');

            let signupEmailCheck = false;
            let signupPasswordCheck = false;



            const isEmail = (asValue) => {
                const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
                return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
            };

            const isJobPassword = (asValue) => {
                const checkNumber = asValue.search(/[0-9]/g);
                const checkEnglish = asValue.search(/[a-z]/ig);
                if(checkNumber <0 || checkEnglish <0){
                    //숫자와 영문을 혼용하지 않은 경우
                    return false;
                }else{
                    return true;
                }
            //    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/; //  8자 이상, 숫자 조합
                //   return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
            };

            const onSignupEmailCheck = () => {
                if(signupEmailElem.value.trim()==""){
                    errorLabelElem[0].innerText = '이메일을 입력해주세요.';
                } else if(!isEmail(signupEmailElem.value)) {
                    errorLabelElem[0].innerText = '이메일 형식에 맞게 입력해주세요.';
                    return;
                } else {
                    axios({
                        method: 'post',
                        url: '/emailCheck',
                        params: {
                            email: signupEmailElem.value.trim()
                        }
                    })
                        .then(function (response){
                         // alert("전송 성공"+response.data);
                            if(response.data==0){
                                errorLabelElem[0].innerText = '사용 가능한 이메일입니다.'
                                signupEmailCheck = true;
                            } else if(response.data==1){
                                errorLabelElem[0].innerText = '이미 사용 중인 이메일입니다.'
                                signupEmailCheck = false;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
            const onSignupPasswordCheck = () => {
                if(signupPasswordElem1.value.trim()==""){
                    errorLabelElem[1].innerText = '비밀번호를 입력해주세요';
                    return;
                } else if(signupPasswordElem1.value.length<8) {
                    errorLabelElem[1].innerText = '8자 이상의 비밀번호를 입력하세요';
                    return;
                } else if(!isJobPassword(signupPasswordElem1.value)) {
                    errorLabelElem[1].innerText = '숫자와 영문자를 혼용하여야 합니다.';
                    return;
                } else {
                    errorLabelElem[1].innerText = '';
                    signupPasswordCheck = true;
                }
            }

            signupEmailElem.addEventListener('blur', onSignupEmailCheck);
            signupPasswordElem1.addEventListener('blur', onSignupPasswordCheck);

        })();
    </script>
</body>
</html>
