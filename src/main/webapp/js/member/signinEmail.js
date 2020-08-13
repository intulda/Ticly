
/*//////////////이메일로 로그인(signin)////////////////////*/

let signinEmailElem = document.getElementById('signin-email');  //이메일
let signinPasswordElem = document.getElementById('signin-password');   //비밀번호

let signinErrorLabelElem = document.querySelectorAll('.signin-validation-message');   //유효성 메세지

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
        console.log(email + password)
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
                alert(result.data)
                if(result.data == "1"){
                    alert("로그인을 완료했습니다.");
                } else {
                    alert("가입 정보가 없습니다.");
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("로그인에 실패했습니다.");
            });
    }
});
