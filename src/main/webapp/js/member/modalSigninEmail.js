
/*//////////////이메일로 로그인(signin)////////////////////*/
(() => {
    let modalSigninEmailElem = document.getElementById('modal-signin-email');  //이메일
    let modalSigninPasswordElem = document.getElementById('modal-signin-password');   //비밀번호

    let modalSigninErrorLabelElem = document.querySelectorAll('.modal-signin-validation-message');   //유효성 메세지

    let staySigned = document.getElementById('modal-stay-logined'); //로그인 상태 유지 체크 버튼

    let modalSigninSubmitBtn = document.getElementById('modal-signinSubmitBtn'); //회원가입 버튼

    let modalSigninEmailCheck = false;   //회원가입시, 이메일 유효성을 체크한다.
    let modalSigninPasswordCheck = false;    //회원가입시, 패스워드의 유효성을 체크한다.


    //눈표시 클릭 시 패스워드 보이기
    document.getElementById('modal-signin-eyes-box').addEventListener("click",function (){
        //  signupPasswordElem1.classList.toggle('active');
        if(modalSigninPasswordElem.type=='password'){
            document.getElementById('modal-signin-eyes-icon').className="icon_hide";
            modalSigninPasswordElem.type='text'
        }else if(modalSigninPasswordElem.type=='text'){
            document.getElementById('modal-signin-eyes-icon').className="icon_show";
            modalSigninPasswordElem.type='password'
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

    const onModalSigninHandler = () => {
        if(modalSigninEmailElem.value.trim()==""){
            modalSigninErrorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-red body2">이메일을 입력해주세요</p>';
            modalSigninEmailCheck = false;
        } else if(!isEmail(modalSigninEmailElem.value.trim())) {
            modalSigninErrorLabelElem[0].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-red body2">이메일 형식에 맞게 입력해주세요.</p>';
            modalSigninEmailCheck = false;
        } else{
            modalSigninErrorLabelElem[0].innerHTML = '';
            modalSigninEmailCheck = true;
        }

        if(modalSigninPasswordElem.value.trim()==""){
            modalSigninErrorLabelElem[1].innerHTML = '<i class="icon_info_circle validation-info-icon"></i><p class="text text-color-red body2">비밀번호를 입력해주세요.</p>';
            modalSigninPasswordCheck = false;
        } else{
            modalSigninErrorLabelElem[1].innerHTML = '';
            modalSigninPasswordCheck = true;
        }

        if(modalSigninEmailCheck && modalSigninPasswordCheck){
            const email = modalSigninEmailElem.value;
            const password = modalSigninPasswordElem.value;

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
    }

    function handleModalSigninByKeyPress(ev){
        if(ev.keyCode == 13){
            onModalSigninHandler();
        }
    }

    modalSigninPasswordElem.addEventListener("keypress", handleModalSigninByKeyPress)
    modalSigninSubmitBtn.addEventListener("click", onModalSigninHandler)
})();