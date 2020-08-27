import AdminClientSearch from './AdminClientSearch.js'

(() => {
    const searchClientButton = document.getElementById("search_Client_Button");
    const searchResultTableContent = document.getElementById("search_Result_Table_Content");
    const searchInput = document.getElementById("searchInput");

    /*  검색하기 버튼 클릭 시  */
    const searchClientBtn = () => {
        let searchType = document.querySelector("#searchCategory").value; //검색 셀렉트바
        let searchKeyword = searchInput.value; //검색어

        let clientType = document.querySelector('input[name="client_radio"]:checked').value; //회원구분 라디오 버튼
        let marketingAgree = document.querySelector('input[name="marketing_radio"]:checked').value; //마케팅 수신 정보 라디오 버튼

        //계정 구분 - 일반이메일
        let selectNormalEmail = 'noChecked'
        if (document.querySelector('input[id="accountCheckboxEmail"]').checked){
            selectNormalEmail = document.querySelector('input[id="accountCheckboxEmail"]:checked').value;
        }

        //계정 구분 - 네이버
        let selectNaver = 'noChecked'
        if (document.querySelector('input[id="accountCheckboxNaver"]').checked){
            selectNaver = document.querySelector('input[id="accountCheckboxNaver"]:checked').value;
        }

        console.log(searchKeyword);
        console.log(clientType);
        console.log(marketingAgree);
        console.log(selectNormalEmail);
        console.log(selectNaver);
        console.log(searchType);

        //데이터 객체 생성
        const obj = {
            searchKeyword: searchKeyword,
            clientType: clientType,
            marketingAgree: marketingAgree,
            selectNormalEmail: selectNormalEmail,
            selectNaver: selectNaver,
            searchType: searchType
        }

        /*검색 조건에 맞는 데이터를 가져온다.*/
        getMemberBySearch(obj);
    }

    function getMemberBySearch(obj){
        axios({
            method: 'get',
            url: '/admin/findMemberBySearch',
            params: obj
        })
            .then(function (response) { //call back function
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