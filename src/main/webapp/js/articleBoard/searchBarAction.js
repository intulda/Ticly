'use static';

(() => {
    const searchBar = document.querySelector(".js-search-bar"),
        searchBtn = document.querySelector(".js-searchBar-search-btn"),
        cancelBtn = document.querySelector(".js-searchBar-cancel-btn");

    //----------------------------------------------------------------------------------------------------

    // cancle 버튼을 누르면, 인풋 내용 초기화 하기
    function handleCancelBtnClickEvent() {
        searchBar.firstElementChild.value = "";
        searchBar.firstElementChild.focus();
    }

    // 검색바에 아무것도 입력하지 않았을 때 이동하는 것 막아주기(by 검색 버튼)
    function handleSearchBarBySearchBtn() {
        if(searchBar.firstElementChild.value.length === 0) searchBtn.type = "button";
        else searchBtn.type = "button";
    }

    // 검색바에 아무것도 입력하지 않았을 때 이동하는 것 막아주기(by 검색 버튼)
    function handleSearchBarByCancleBtn() {
        if(searchBar.firstElementChild.value.length === 0) searchBtn.type = "button";
        else searchBtn.type = "button";
    }

    // 검색바에 아무것도 입력하지 않았을 때 이동하는 것 막아주기(by 엔터키)
    function handleSearchBarByKeyPress(ev){
        if (ev.keyCode == 13){
            ev.preventDefault();
            if (ev.target.value.length > 0){
                searchBar.submit();
            }
        }
    }

    function init() {
        handleSearchBarBySearchBtn();

        // 검색 관련 이벤트 제어
        searchBar.addEventListener("input", handleSearchBarBySearchBtn);
        searchBar.addEventListener("keypress", handleSearchBarByKeyPress);
        cancelBtn.addEventListener("click", handleCancelBtnClickEvent);
    }
    init();
})();