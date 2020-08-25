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

                        searchResultTableContent.appendChild(adminClientSearch.getElements())
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    searchClientButton.addEventListener("click", searchClientBtn);



})();