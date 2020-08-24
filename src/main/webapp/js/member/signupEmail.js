(() => {
        let modalSignupEmailElem = document.querySelector('#modal-signup-email');  //이메일
        let modalSignupPasswordElem = document.querySelector('#modal-signup-password');   //비밀번호
        //let signupPasswordElem2 = document.querySelector('#signup-password-confirm');   //비밀번호 확인

        let modalErrorLabelElem = document.querySelectorAll('.modal-signup-validation-message');   //유효성 메세지

        let modalAcceptTermCheckBox  = document.querySelector('#modal-AcceptTerm'); //서비스 약관 동의 체크버튼

        let modalSignupSubmitBtn = document.querySelector('#modal-signupSubmitBtn'); //회원가입 버튼

        let modalSignupEmailCheck = false;   //회원가입시, 이메일 유효성을 체크한다.
        let modalSignupPasswordCheck = false;    //회원가입시, 패스워드의 유효성을 체크한다.
        //let signupPasswordCompare = false;  //회원가입시, 패스워드 확인의 유효성을 체크한다.
        let modalAcceptTermCheck = false; //회원가입시, 약관 동의 여부를 체크한다.

        //눈표시 클릭 시 패스워드 보이기
        document.getElementById('signup-eyes-box').addEventListener("click",function (){
          //  modalSignupPasswordElem.classList.toggle('active');
            if(modalSignupPasswordElem.type=='password'){
                document.querySelector('#signup-eyes-icon').className="icon_hide";
                modalSignupPasswordElem.type='text'
            }else if(modalSignupPasswordElem.type=='text'){
                document.querySelector('#signup-eyes-icon').className="icon_show";
                modalSignupPasswordElem.type='password'
            }
        });


        //이메일 정규식 확인 함수
        function isEmail (asValue){
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
        };

        //모든 유효성이 성립되면 버튼이 활성화된다.
        const onModalSignupButtonEvent = () => {
        /*    console.log(modalSignupEmailCheck)
            console.log(modalSignupPasswordCheck)
            console.log(signupPasswordCompare) */
            if(modalSignupEmailCheck && modalSignupPasswordCheck && modalAcceptTermCheckBox){
                modalSignupSubmitBtn.classList.remove('disabled');
            }else{
                modalSignupSubmitBtn.classList.add('disabled');
            }
        };

        const onModalSignupEmailCheck = () => {
            if(modalSignupEmailElem.value.trim()==""){
                modalErrorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-gray300 body2">이메일을 입력해주세요.</p>';
            } else if(!isEmail(modalSignupEmailElem.value)) {
                modalErrorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-gray300 body2">이메일 형식에 맞게 입력해주세요.</p>';
            } else {
                axios({
                    method: 'post',
                    url: '/member/emailCheck',
                    params: {
                        email: modalSignupEmailElem.value.trim()
                    }
                })
                    .then(function (response){
                        // alert("전송 성공"+response.data);
                        if(response.data==0){
                            modalErrorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-gray300 body2">사용 가능한 이메일입니다.</p>'
                            modalSignupEmailCheck = true;
                        } else if(response.data==1){
                            modalErrorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-gray300 body2">이미 사용 중인 이메일입니다.</p>'
                            modalSignupEmailCheck = false;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            onModalSignupButtonEvent();
        }
        const onModalSignupPasswordCheck = () => {
            if(modalSignupPasswordElem.value.trim()==""){
                modalErrorLabelElem[1].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-gray300 body2">비밀번호를 입력해주세요.</p>';
                modalSignupPasswordCheck = false;

            } else if(modalSignupPasswordElem.value.length<8) {
                modalErrorLabelElem[1].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-gray300 body2">8자 이상의 비밀번호를 입력하세요.</p>';
                modalSignupPasswordCheck = false;

            } else if(!isJobPassword(modalSignupPasswordElem.value)) {
                modalErrorLabelElem[1].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-gray300 body2">숫자와 영문자를 혼용하여야 합니다.</p>';
                modalSignupPasswordCheck = false;

            } else {
                modalErrorLabelElem[1].innerHTML = '';
                modalSignupPasswordCheck = true;
            }

            onModalSignupButtonEvent();
        }


        /*
        const onSignupPasswordCompare = () => {
            if(signupPasswordElem2.value.trim()===""){
                modalErrorLabelElem[2].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-gray300 body2">필수 정보입니다.</p>';
                signupPasswordCompare = false;

            } else if(signupPasswordElem2.value.trim() !== modalSignupPasswordElem.value.trim()) {
                modalErrorLabelElem[2].innerHTML= '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-gray300 body2">비밀번호가 일치하지 않습니다.</p>';
                signupPasswordCompare = false;

            } else if(signupPasswordElem2.value.trim() === modalSignupPasswordElem.value.trim()) {
                modalErrorLabelElem[2].innerHTML = '';
                signupPasswordCompare = true;
            }

            onModalSignupButtonEvent();
        }
        */

        modalAcceptTermCheckBox.addEventListener("click", function (){
            if(modalAcceptTermCheckBox.checked == true){
                modalAcceptTermCheck = true;
                onModalSignupButtonEvent();
            }else{
                modalAcceptTermCheck = false;
                onModalSignupButtonEvent();
            }
        });

        //회원가입페이지에서 '이메일로 로그인' 페이지로 이동하는 함수
        function goSignup(){
            document.getElementById('email-signup-form').classList.add('hidden');
            document.getElementById('email-signin-form').classList.remove('hidden');
        }

        //회원가입 버튼 클릭 시 이벤트 핸들러
        const onModalSignupHandler  = () => {
            if(modalSignupEmailCheck && modalSignupPasswordCheck && modalAcceptTermCheck){
                const email = modalSignupEmailElem.value;
                const password = modalSignupPasswordElem.value;

                //json객체에 담기
                const member={
                    email : email,
                    password : password
                };
                axios({
                    method: 'post',
                    url: '/member/signup',
                    headers: { 'content-type': 'application/json' },
                    data : JSON.stringify(member)
                    /*
                    params: {
                        email : email,
                        password : password
                    }*/
                })
                    .then(function (result){
                        console.log(result);

                        if(result.data.message == "success"){
                            alert("회원가입이 완료되었습니다.");
                            goSignup() //로그인페이지로 이동

                        } else {
                            alert("회원가입이 완료되지 않았습니다.");
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }

        modalSignupEmailElem.addEventListener('blur', onModalSignupEmailCheck);
        modalSignupPasswordElem.addEventListener('blur', onModalSignupPasswordCheck);
        //signupPasswordElem2.addEventListener('blur', onSignupPasswordCompare);
        modalAcceptTermCheckBox.addEventListener("click", onModalSignupButtonEvent);
        modalSignupSubmitBtn.addEventListener("click", onModalSignupHandler);
})();