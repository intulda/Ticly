(() => {
    function getCookie(name) {
        var cookie = document.cookie;
        if (document.cookie != "") {
            var cookieArray = cookie.split("; ");
            for ( var index in cookieArray) {
                var cookieName = cookieArray[index].split("=");
                if (cookieName[0] == "introPopup") {
                    return cookieName[1];
                }
            }
        } return ;
    }


    //페이지 로딩 시, 쿠키 값의 유무에 따라 팝업을 뛰어준다.
    document.addEventListener('DOMContentLoaded', function() {
        var cookieCheck = getCookie("introPopup");

        if (cookieCheck != "N"){
            document.getElementById('intro__modal').style.display = "flex";
        }
    });
    /*
    document.getElementById('test').addEventListener("click", function() {
        document.getElementById('intro__modal').style.display = "flex";
    });*/

    document.getElementById('intro__modal-close').addEventListener("click", function() {
        //쿠키 생성
        var date = new Date();
        date.setTime(date.getTime() + 24*60*60*1000); //1
        document.cookie = "introPopup=N; Expires="+ date.toUTCString();

        document.getElementById('intro__modal').style.display = "none";
    });
})();
