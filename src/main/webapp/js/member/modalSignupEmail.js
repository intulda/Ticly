(() => {
        let modalSignupEmailElem = document.getElementById('modal-signup-email');  //이메일
        let modalSignupPasswordElem = document.getElementById('modal-signup-password');   //비밀번호
        //let signupPasswordElem2 = document.querySelector('#signup-password-confirm');   //비밀번호 확인

        let modalErrorLabelElem = document.querySelectorAll('.modal-signup-validation-message');   //유효성 메세지

        let modalAcceptTermCheckBox  = document.getElementById('modal-AcceptTerm'); //서비스 약관 동의 체크버튼
        let modalPromotionCheckBox = document.getElementById('modal-promotion');  //마케팅 정보 수신 동의 체크버


    let modalSignupSubmitBtn = document.querySelector('#modal-signupSubmitBtn'); //회원가입 버튼

        let modalSignupEmailCheck = false;   //회원가입시, 이메일 유효성을 체크한다.
        let modalSignupPasswordCheck = false;    //회원가입시, 패스워드의 유효성을 체크한다.
        //let signupPasswordCompare = false;  //회원가입시, 패스워드 확인의 유효성을 체크한다.
        let modalAcceptTermCheck = false; //회원가입시, 약관 동의 여부를 체크한다.

        //눈표시 클릭 시 패스워드 보이기
        document.getElementById('modal-signup-eyes-box').addEventListener("click",function (){
          //  modalSignupPasswordElem.classList.toggle('active');
            if(modalSignupPasswordElem.type=='password'){
                document.getElementById('modal-signup-eyes-icon').className="icon_hide";
                modalSignupPasswordElem.type='text'
            }else if(modalSignupPasswordElem.type=='text'){
                document.getElementById('modal-signup-eyes-icon').className="icon_show";
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
                modalErrorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-red body2">이메일을 입력해주세요.</p>';
            } else if(!isEmail(modalSignupEmailElem.value)) {
                modalErrorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-red body2">이메일 형식에 맞게 입력해주세요.</p>';
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
                            modalErrorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon" id="modalAvailableEmail"></i><p class="text text-color-green body2">사용 가능한 이메일입니다.</p>'
                            document.getElementById('modalAvailableEmail').style.color= '#008E6D';
                            modalSignupEmailCheck = true;
                        } else if(response.data==1){
                            modalErrorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-red body2">이미 사용 중인 이메일입니다.</p>'
                            modalSignupEmailCheck = false;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            onModalSignupButtonEvent();
        }

        const showModalPasswordValidation = () => {
            document.getElementById('modal-signup-validation-message').classList.remove('hidden');
        }

        const onModalSignupPasswordCheck = () => {
            //비밀번호 글자수를 실시간으로 체크
            if(modalSignupPasswordElem.value.trim().length>=8) {
                document.getElementById('modal-length-validation-info-icon').style.color= '#008E6D';
                document.getElementById('modal-length-validation-info-message').style.color= '#008E6D';
            } else{
                document.getElementById('modal-length-validation-info-icon').style.color= '#525463';
                document.getElementById('modal-length-validation-info-message').style.color= '#525463';
            }

            //영문과 숫자를 입력했는지 실시간으로 체크
            if(isJobPassword(modalSignupPasswordElem.value)) {
                document.getElementById('modal-number-validation-info-icon').style.color= '#008E6D';
                document.getElementById('modal-number-validation-info-message').style.color= '#008E6D';
            } else {
                document.getElementById('modal-number-validation-info-icon').style.color= '#525463';
                document.getElementById('modal-number-validation-info-message').style.color= '#525463';
            }

            if(modalSignupPasswordElem.value.trim().length>=8 && isJobPassword(modalSignupPasswordElem.value)){
                modalSignupPasswordCheck = true;
            }else{
                modalSignupPasswordCheck = false
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
        function onModalSignupHandler() {
            if(modalSignupEmailCheck && modalSignupPasswordCheck && modalAcceptTermCheck){
                const email = modalSignupEmailElem.value;
                const password = modalSignupPasswordElem.value;
                let marketing_agree = 0;
                if(modalPromotionCheckBox.checked){
                    marketing_agree=1;
                }

                //json객체에 담기
                const member={
                    email : email,
                    password : password,
                    marketing_agree : marketing_agree
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

        function handleModalSignupByKeyPress(ev){
            if(ev.keyCode == 13){
                onModalSignupHandler();
            }
        }

        modalSignupEmailElem.addEventListener('blur', onModalSignupEmailCheck);// blur시, 이메일 중복 확안
        modalSignupPasswordElem.addEventListener('focus', showModalPasswordValidation); //input에 focus하면 비밀번호 유효성 조건을 보여줌
        modalSignupPasswordElem.addEventListener('input', onModalSignupPasswordCheck); //비밀번호의 유효성 여부를 실시간으로 보여줌
        modalSignupPasswordElem.addEventListener("keypress", handleModalSignupByKeyPress);
      //  modalSignupPasswordElem.addEventListener('blur', onModalSignupPasswordCheck);
        //signupPasswordElem2.addEventListener('blur', onSignupPasswordCompare);
        modalAcceptTermCheckBox.addEventListener("click", onModalSignupButtonEvent);
        modalSignupSubmitBtn.addEventListener("click", onModalSignupHandler);
})();