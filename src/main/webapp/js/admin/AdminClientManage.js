import AdminClientSearch from './AdminClientSearch.js'

(() => {
    const searchClientButton = document.getElementById("search_Client_Button");
    const searchResultTableContent = document.getElementById("search_Result_Table_Content");
    let searchClientButtonCheck = true;

    /*  검색하기 버튼 클릭 시  */
    const searchClientBtn = () => {

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
                        // if(searchResultRowNum !== response.data.length)
                            searchResultTableContent.appendChild(adminClientSearch.getElements())

                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    searchClientButton.addEventListener("click", searchClientBtn);


    checkSwitch();

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


})();