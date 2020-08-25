'use static';

(() => {
    const card = document.querySelectorAll(".js-card"),
        doneBtn = document.querySelector(".js-done-btn"),
        categoriesInput = document.querySelectorAll(".js-categories-item"),
        categoryAllBtn = document.querySelector(".js-category__all-btn"),
        categoryList = document.querySelectorAll(".js-category-list"),
        userAuth = document.querySelector("input[name=userAuth]").value,
        categorySettingBtn = document.querySelector(".js-category-setting-btn"),
        modalTrigger = document.querySelector('.js-category-modal-trigger'),
        modalCloseBtn = document.querySelector(".js-modal-close-btn"),
        modalWrapper = document.getElementById('category-modal'),
        currentPageURLInput = document.querySelector("input[name=currentPageURL]");

    const CARD_ACTIVE = "card-item-active",
        DISABLE = "disabled";

    //----------------------------------------------------------------------------------------------------

    // 사용자가 이미 선택한 카테고리가 있으면, 데이터를 탐색해 checked true 해주기
    function alreadyCheckedTrue(){
        categoryList.forEach(listElem => {
            categoriesInput.forEach(inputElem => {
                if (listElem.value === inputElem.value){
                    inputElem.parentNode.classList.add(CARD_ACTIVE);
                    inputElem.checked = true;
                }
            });
        });
    }


    // 모든 분야 버튼 이벤트
    function handleCategoryAllBtn() {
        if (!(categoryAllBtn.lastElementChild.checked)) {
            categoriesInput.forEach(el => {
                el.checked = true;
                if (el.classList.contains(CARD_ACTIVE)) {
                    el.parentNode.classList.remove(CARD_ACTIVE);
                }
                el.parentNode.classList.add(CARD_ACTIVE);
            });
        } else {
            categoriesInput.forEach(el => {
                el.checked = false;
                el.parentNode.classList.remove(CARD_ACTIVE);
            });
        }
    }

    // 다했어요 버튼 활성화 함수
    function buttonActiveEvent() {
        for (var i = 0; i < categoriesInput.length; i++) {
            if (categoriesInput[i].checked) {
                doneBtn.classList.remove(DISABLE);
                doneBtn.type = "submit";
                return;
            } else {
                doneBtn.classList.add(DISABLE);
                doneBtn.type = "button"
            }
        }
    }

    // 카드 클릭 이벤트 함수
    function handleCardClickEvent(ev) {
        const target = ev.currentTarget;
        const choiceCategory = target.children[2];

        let checkCount = 0;
        categoriesInput.forEach(el => {
           if(el.checked == true){
               checkCount++;
           }
        });

        // 모든 분야가 선택되어 있다면?
        if(categoryAllBtn.lastElementChild.checked && checkCount > 0){
            categoryAllBtn.classList.remove(CARD_ACTIVE);
            categoryAllBtn.lastElementChild.checked = false;
        }

        // 카드 활성화/비활성화
        target.classList.toggle(CARD_ACTIVE);

        // 선택한 카드의 체크박스 활성화 유무에 따라 checked되도록하기
        if (choiceCategory.checked) choiceCategory.checked = false;
        else choiceCategory.checked = true;

        buttonActiveEvent();

    }

    // 페이진 전환 후 뒤로가기에 의해 관심분야 설정 페이지로 돌아왔을 경우
    // 여전히 체크박스가 checked로 남아있는 현상을 방지하기 위한 함수
    function pageLoadEvent() {
        for (var i = 0; i < categoriesInput.length; i++) {
            categoriesInput[i].checked = false;
        }

        // Guest가 아니면, 관심분야 세팅 버튼 그려주기
        if (userAuth != 1 && userAuth != "" ){
            categorySettingBtn.classList.remove("hide");
        }
    }

    // Modal Show Event
    function handleCategorySettingBtnClickEvent(){
        modalWrapper.style.display = "flex";
        // 이미 선택한 관심 분야 표시하기
        alreadyCheckedTrue();
        // Done 버튼 활성화 Event
        buttonActiveEvent();
    }

    // Modal hide Event - Close Btn
    function handleCloseBtnClickEvent(){
        modalWrapper.style.display = "none";
    }

    // Modal hide Event - background
    function handleBackgroundClickEvent(ev){
        if(ev.target.id === 'category-modal'){
            modalWrapper.style.display = "none";
        }
    }

    function init() {
        window.onpageshow = () => {
            pageLoadEvent();
        };

        // 모든 분야 Click Event
        categoryAllBtn.addEventListener("click", handleCategoryAllBtn);

        // 개별 관심분야 Click Event
        card.forEach(el => {
            el.addEventListener("click", handleCardClickEvent);
        });

        // Modal Show Event
        modalTrigger.addEventListener("click", handleCategorySettingBtnClickEvent);

        // Modal hide Event - Close Btn
        modalCloseBtn.addEventListener("click", handleCloseBtnClickEvent);

        // Modal hide Event - background
        modalWrapper.addEventListener("click", handleBackgroundClickEvent);

    }

    init();

})();