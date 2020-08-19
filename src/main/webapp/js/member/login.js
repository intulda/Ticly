/*메인 로그인*/

let naver_login_btn = document.querySelector('.naver-login-button');

naver_login_btn.addEventListener("click", function (){
    axios({
        method: 'post',
        url: '/naver',
        headers: { 'content-type': 'application/json' }
    })
        .then(function (result){
            console.log("데이터 가져오기 성공");
            window.open(`learn/modal?url=${result.data}`, "네이버 로그인", 'width=500, height=650, status=no, menubar=no, toolbar=no, resizable=no');

        })
        .catch(function (error) {
            console.log("데이터 가져오기 실패");
        });


});