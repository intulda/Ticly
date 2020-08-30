(() => {
    let signupEmailElem = document.getElementById('signup-email');  //이메일
    let signupPasswordElem = document.getElementById('signup-password');   //비밀번호
    //let signupPasswordElem2 = document.querySelector('#signup-password-confirm');   //비밀번호 확인

    let errorLabelElem = document.querySelectorAll('.signup-validation-message');   //유효성 메세지

    let acceptTermCheckBox  = document.getElementById('acceptTerm'); //서비스 약관 동의 체크버튼
    let promotionCheckBox = document.getElementById('promotion');  //마케팅 정보 수신 동의 체크버

    let signupSubmitBtn = document.getElementById('signupSubmitBtn'); //회원가입 버튼

    let signupEmailCheck = false;   //회원가입시, 이메일 유효성을 체크한다.
    let signupPasswordCheck = false;    //회원가입시, 패스워드의 유효성을 체크한다.
    //let signupPasswordCompare = false;  //회원가입시, 패스워드 확인의 유효성을 체크한다.
    let acceptTermCheck = false; //회원가입시, 약관 동의 여부를 체크한다.

    //눈표시 클릭 시 패스워드 보이기
    document.getElementById('signup-eyes-box').addEventListener("click",function (){
        //  signupPasswordElem.classList.toggle('active');
        if(signupPasswordElem.type=='password'){
            document.getElementById('signup-eyes-icon').className="icon_hide";
            signupPasswordElem.type='text'
        }else if(signupPasswordElem.type=='text'){
            document.getElementById('signup-eyes-icon').className="icon_show";
            signupPasswordElem.type='password'
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
    const signupButtonEvent = () => {
        /*    console.log(signupEmailCheck)
            console.log(signupPasswordCheck)
            console.log(signupPasswordCompare) */
        if(signupEmailCheck && signupPasswordCheck && acceptTermCheck){
            signupSubmitBtn.classList.remove('disabled');
        }else{
            signupSubmitBtn.classList.add('disabled');
        }
    };

    const onSignupEmailCheck = () => {
        if(signupEmailElem.value.trim()==""){
            errorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-red body2">이메일을 입력해주세요.</p>';
        } else if(!isEmail(signupEmailElem.value)) {
            errorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-red body2">이메일 형식에 맞게 입력해주세요.</p>';
        } else {
            axios({
                method: 'post',
                url: '/member/emailCheck',
                params: {
                    email: signupEmailElem.value.trim()
                }
            })
                .then(function (response){
                    //alert("전송 성공"+response.data);
                    if(response.data==0){
                        errorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon" id="availableEmail"></i><p class="text text-color-green body2">사용 가능한 이메일입니다.</p>'
                        document.getElementById('availableEmail').style.color= '#008E6D';
                        signupEmailCheck = true;
                    } else if(response.data==1){
                        errorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-red body2">이미 사용 중인 이메일입니다.</p>'
                        signupEmailCheck = false;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        signupButtonEvent();
    }

    const showPasswordValidation = () => {
        document.getElementById('signup-validation-message').classList.remove('hidden');
    }

    const onSignupPasswordCheck = () => {
        //비밀번호 글자수를 실시간으로 체크
        if(signupPasswordElem.value.trim().length>=8) {
            document.getElementById('length-validation-info-icon').style.color= '#008E6D';
            document.getElementById('length-validation-info-message').style.color= '#008E6D';
        } else{
            document.getElementById('length-validation-info-icon').style.color= '#525463';
            document.getElementById('length-validation-info-message').style.color= '#525463';
        }

        //영문과 숫자를 입력했는지 실시간으로 체크
        if(isJobPassword(signupPasswordElem.value)) {
            document.getElementById('number-validation-info-icon').style.color= '#008E6D';
            document.getElementById('number-validation-info-message').style.color= '#008E6D';
        } else {
            document.getElementById('number-validation-info-icon').style.color= '#525463';
            document.getElementById('number-validation-info-message').style.color= '#525463';
        }

        if(signupPasswordElem.value.trim().length>=8 && isJobPassword(signupPasswordElem.value)){
            signupPasswordCheck = true;
        }else{
            signupPasswordCheck = false
        }
        signupButtonEvent();
    }

    /*
    const onSignupPasswordCheck = () => {
        if(signupPasswordElem.value.trim()==""){
            errorLabelElem[1].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-red body2">비밀번호를 입력해주세요.</p>';
            signupPasswordCheck = false;

        } else if(signupPasswordElem.value.length<8) {
            errorLabelElem[1].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-red body2">8자 이상의 비밀번호를 입력하세요.</p>';
            signupPasswordCheck = false;

        } else if(!isJobPassword(signupPasswordElem.value)) {
            errorLabelElem[1].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-red body2">숫자와 영문자를 혼용하여야 합니다.</p>';
            signupPasswordCheck = false;

        } else {
            errorLabelElem[1].innerHTML = '';
            signupPasswordCheck = true;
        }

        signupButtonEvent();
    }
    */

    /*
    const onSignupPasswordCompare = () => {
        if(signupPasswordElem2.value.trim()===""){
            errorLabelElem[2].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-gray300 body2">필수 정보입니다.</p>';
            signupPasswordCompare = false;

        } else if(signupPasswordElem2.value.trim() !== signupPasswordElem.value.trim()) {
            errorLabelElem[2].innerHTML= '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-gray300 body2">비밀번호가 일치하지 않습니다.</p>';
            signupPasswordCompare = false;

        } else if(signupPasswordElem2.value.trim() === signupPasswordElem.value.trim()) {
            errorLabelElem[2].innerHTML = '';
            signupPasswordCompare = true;
        }

        signupButtonEvent();
    }
    */

    acceptTermCheckBox.addEventListener("click", function (){
        if(acceptTermCheckBox.checked == true){
            acceptTermCheck = true;
            signupButtonEvent();
        }else{
            acceptTermCheck = false;
            signupButtonEvent();
        }
    });

    //회원가입페이지에서 '이메일로 로그인' 페이지로 이동하는 함수
    function goSignup(){
        document.getElementById('email-signup-form').classList.add('hidden');
        document.getElementById('email-signin-form').classList.remove('hidden');
    }

    //회원가입 버튼 클릭 시 이벤트 핸들러
    const onSignupHandler  = () => {
        if(signupEmailCheck && signupPasswordCheck && acceptTermCheck){
            const email = signupEmailElem.value;
            const password = signupPasswordElem.value;
            let marketing_agree = 0;
            if(promotionCheckBox.checked) {
                marketing_agree = 1;
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
                    if(result.data.message == "success"){
                        window.location.href="/member/emailSignin";
                    } else {
                        alert("회원가입이 완료되지 않았습니다.");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    function handleSignupByKeyPress(ev){
        if(ev.keyCode == 13){
            onSignupHandler();
        }
    }

    signupEmailElem.addEventListener('blur', onSignupEmailCheck);   //blur시 이메일의 유효 여부를 체크하기 위한 함수
    signupPasswordElem.addEventListener('focus', showPasswordValidation); //input에 focus하면 비밀번호 유효성 조건을 보여줌
    signupPasswordElem.addEventListener('input', onSignupPasswordCheck); //비밀번호의 유효성 여부를 실시간으로 보여줌
    signupPasswordElem.addEventListener('keypress', handleSignupByKeyPress); //비밀번호의 유효성 여부를 실시간으로 보여줌

    //signupPasswordElem2.addEventListener('blur', onSignupPasswordCompare);
    acceptTermCheckBox.addEventListener("click", signupButtonEvent);
    signupSubmitBtn.addEventListener("click", onSignupHandler); //회원가입 버튼 클릭 시 이벤트 핸들러


})();