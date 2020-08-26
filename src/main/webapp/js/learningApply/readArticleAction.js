'use strict';

(() => {
    const articleSeq = document.querySelector("input[name=articleSeq]").value,
        learningApplyBtn = document.querySelector(".js-learning-apply-btn"),
        iframeBody = document.querySelector(".js-iframe-body");

    const SAVE_LEARNING_APPLY_INFO_PATH = "saveLearningApplyInfo?";


    function creatPath() {
        let path = SAVE_LEARNING_APPLY_INFO_PATH;
        path += "seq=" + articleSeq;
        path += "&previousPath=" + document.referrer;

        return path;
    }

    // Modal Show Event
    function showModal(){
        document.querySelector("#signinup-modal").style.display = "flex";
        document.querySelector(".main-login-form").classList.remove("hidden");
    }

    // Modal hide Event - Close Btn
    function hideModal(){
        document.querySelector("#signinup-modal").style.display = "none";
        document.querySelector(".main-login-form").classList.add("hidden");
    }

    // 바로 학습하기 버튼을 누르면, 비동기 통신 처리.
    function handleLearningApplyBtnClickEvent() {
        axios({
            method: 'get',
            url   : creatPath()
        })
            .then(function (json) {
                console.log("Receive Success!");
                console.log(json.data);

                // 로그인 전이면,
                if (json.data.auth == 1){
                    showModal();
                }

                // 로그인 후
                else {
                    location.href = "../" + json.data.article_path;
                }
            });
    }

    function init() {
        iframeBody.onload = () => {
            alert("success");
        }

        learningApplyBtn.addEventListener("click", handleLearningApplyBtnClickEvent);

        // Modal hide Event - Close Btn
        document.querySelector("#modal-close").addEventListener("click", hideModal);
    }

    init();
})();