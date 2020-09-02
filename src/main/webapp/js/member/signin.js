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

    const onSigninHandler = () => {
        if(signinEmailElem.value.trim()==""){
            signinErrorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-red body2">이메일을 입력해주세요</p>';
            signinEmailCheck = false;
        } else if(!isEmail(signinEmailElem.value.trim())) {
            signinErrorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-red body2">이메일 형식에 맞게 입력해주세요.</p>';
            signinEmailCheck = false;
        } else{
            signinErrorLabelElem[0].innerHTML = '';
            signinEmailCheck = true;
        }

        if(signinPasswordElem.value.trim()==""){
            signinErrorLabelElem[1].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-red body2">비밀번호를 입력해주세요.</p>';
            signinPasswordCheck = false;
        } else{
            signinErrorLabelElem[1].innerHTML = '';
            signinPasswordCheck = true;
        }

        if(signinEmailCheck && signinPasswordCheck){
            const email = signinEmailElem.value;
            const password = signinPasswordElem.value;

            let form = new FormData();
            form.append('email', email);
            form.append('password',password);

            /*
            //json객체에 담기
            const signinData={
                email : email,
                password : password
            };*/

            axios({
                method: 'post',
                url: '/member/loginPoc',
                headers: { 'content-type': 'application/json' },
                data : form
            })
                .then(function (result){
                    alert("로그인성공");
                    console.log(result);
                    if(result.data.okay == "true"){
                        window.location.href = result.data.prev_url;
                    } else {
                        failEmailLogin(); //로그인 실패시 경고 alert
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert("로그인에 실패했습니다.");
                });
        }
    }

    signinEmailElem.addEventListener('focus',function (){
        signinErrorLabelElem[0].innerHTML = '';
    });

    signinPasswordElem.addEventListener('focus',function (){
        signinErrorLabelElem[1].innerHTML = '';
    });


    function handleSigninByKeyPress(ev){
        if(ev.keyCode == 13){
            onSigninHandler();
        }
    }

    signinPasswordElem.addEventListener('keypress', handleSigninByKeyPress); //비밀번호의 유효성 여부를 실시간으로 보여줌
    signinSubmitBtn.addEventListener("click", onSigninHandler);
})();