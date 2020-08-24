/*메인 로그인*/
(() => {
    /* 모달 내 이동*/
    //모달 닫기
    document.getElementById('modal-close').addEventListener("click", function() {
        document.getElementById('signinup-modal').style.display = "none";
    });

    //메인 로그인에서 '이메일 로그인'으로 이동
    document.getElementById('modal-login-to-signin').addEventListener("click", function (){
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

    /*Naver OAuth Login*/
    let modalNaverLoginBtn = document.getElementById('modal-naver-login-button');

    modalNaverLoginBtn.addEventListener("click", function (){
        axios({
            method: 'post',
            url: '/naver',
            headers: { 'content-type': 'application/json' }
        })
            .then(function (result){
                console.log("데이터 가져오기 성공");
                window.open(result.data, "네이버 로그인", 'width=500, height=650, status=no, menubar=no, toolbar=no, resizable=no');
                /*learn/modal?url=${result.data}*/
            })
            .catch(function (error) {
                console.log("데이터 가져오기 실패");
            });
    });
})();