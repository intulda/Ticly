import AdminClientSearch from './AdminClientSearch.js'

(() => {
    const searchClientButton = document.getElementById("search_Client_Button");
    const searchResultTableContent = document.getElementById("search_Result_Table_Content");
    const searchInput = document.getElementById("searchInput");

    /*라디오 버튼 값*/
    //let 회원 구분에서 선택된 라디오 박스 = 전체
    //let 마케팅 수신 정보에서 선택된 라디오 박스 = 수신허용

    /*체크박스 값*/
    //let 일반 이메일 체크 여부 =
    //let 네이버 체크 여부 =

    /*select박스 값*/
    //let 검색어 조건 = 전체 이메일

    let searchClientButtonCheck = true;

    /*  검색하기 버튼 클릭 시  */
    const searchClientBtn = () => {
        var searchKeyword = searchInput.value;
        /*검색 조건에 맞는 데이터를 가져온다.*/
        getMemberBySearch(searchKeyword);
    }

    function getMemberBySearch(searchKeyword){
        axios({
            method: 'get',
            url: '/admin/findMemberBySearch',
            params: {
                searchKeyword: searchKeyword
            }
        })
            .then(function (response) { //call back function
                if(searchClientButtonCheck){
                    searchResultTableContent.innerHTML = '';
                    for (let i=0; i<response.data.length; i++) {
                        const adminClientSearch = new AdminClientSearch(
                            response.data[i].rownum,
                            response.data[i].email,
                            response.data[i].nickname,
                            response.data[i].auth,
                            response.data[i].signup_type,
                            response.data[i].reg_date,
                            response.data[i].del,
                            response.data[i].marketing_agree
                        )
                        searchResultTableContent.appendChild(adminClientSearch.getElements())
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getMemberList() {
        //TODO: JQuery
        // $.ajax({
        //     url: '/admin/clientSearchButton',
        //     type: 'POST',
        //     success : function(response) {
        //         console.log(response);
        //     },
        //     error : function (error) {
        //         console.log(error);
        //     }
        // })
        //
        //TODO: Javascript
        // fetch('/admin/clientSearchButton', {
        //     method:'POST',
        // }).then(function (response) {
        //
        // })
        //TODO: Javascript external library
        axios({
            method: 'post',
            url: '/admin/clientSearchButton'
        })
            .then(function (response) { //call back function
                if(searchClientButtonCheck){
                    searchResultTableContent.innerHTML = '';
                    for (let i=0; i<response.data.length; i++) {
                        const adminClientSearch = new AdminClientSearch(
                            response.data[i].rownum,
                            response.data[i].email,
                            response.data[i].nickname,
                            response.data[i].auth,
                            response.data[i].signup_type,
                            response.data[i].reg_date,
                            response.data[i].del,
                            response.data[i].marketing_agree
                        )
                        searchResultTableContent.appendChild(adminClientSearch.getElements())
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    searchClientButton.addEventListener("click", searchClientBtn);

    $("#customSwitch").click(function(){
        checkSwitch();
    });

    function checkSwitch() {
        const switchValue = $('#customSwitch').prop('checked');
        if(switchValue) {
            searchBoxDisabledToggle(false);
        } else {
            searchBoxDisabledToggle(true);
        }
    }

    function searchBoxDisabledToggle(check) {
        //TODO: 일반 for
        // for(let i=0; i<$('#customSwitchContent').children().length; i++) {
        //     const node = $('#customSwitchContent').children()[i];
        //     if($(node).find('input') != null) {
        //         $(node).find('input').prop('disabled', check);
        //     }
        //
        //     if($(node).find('select') != null){
        //         $(node).find('select').prop('disabled', check);
        //     }
        // }
        //TODO: ES6 for of
        for(let node of $('#customSwitchContent').children()) {
            if($(node).find('input') != null) {
                $(node).find('input').prop('disabled', check);
            }

            if($(node).find('select') != null){
                $(node).find('select').prop('disabled', check);
            }
        }
    }

    function onTableClickHandler(event) {
        console.log(event.target);
        if(event.target.nodeName === 'I') {
            alert(1);
        }
    }

    checkSwitch();
    getMemberList();

    searchResultTableContent.addEventListener('click', onTableClickHandler);

})();