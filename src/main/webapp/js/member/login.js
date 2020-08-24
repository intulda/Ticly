(() => {
    //메인 로그인에서 '이메일 로그인'으로 이동
    document.getElementById('login-to-signin').addEventListener("click", function (){
        window.location.href="/member/emailSignin"
    });

    /*Naver OAuth Login*/
    let naverLoginBtn = document.getElementById('naver-login-button');

    naverLoginBtn.addEventListener("click", function (){
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