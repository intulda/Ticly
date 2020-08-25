(() => {
    //모달 열기
    if(document.getElementById('modal-open-button') != null) {
        document.getElementById('modal-open-button').addEventListener("click", function() {
            modalOpen('Ticly 로그인');
        });

        document.getElementById('start-free-btn').addEventListener("click", function() {
            modalOpen('Ticly 무료로 시작하기')
        });
    }

    function modalOpen(title) {
        document.querySelector('#test').innerText = title;
        document.getElementById('signinup-modal').style.display = "flex";
        document.getElementById('main-login-form').classList.remove('hidden');
        document.getElementById('email-signup-form').classList.add('hidden');
        document.getElementById('email-signin-form').classList.add('hidden');
    }

    /*네비 클릭 이벤트*/
    document.addEventListener('DOMContentLoaded', function() {
        var current_page_URL = location.href;

        let navTabs = document.querySelectorAll('.navTabs');

        for(var i = 0; i < navTabs.length; i++){
            var thisNavTabs = navTabs[i];

            if(thisNavTabs.href !== "#"){
                var target_URL = thisNavTabs.href;

                if(current_page_URL === target_URL) {

                    for (var i = 0; i < navTabs.length; i++) {
                        navTabs[i].classList.remove('nav-list-active');
                    }
                    thisNavTabs.classList.add('nav-list-active');
                    return false;
                }
            }
        }
    });
})();