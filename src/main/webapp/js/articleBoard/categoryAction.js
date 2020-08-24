'use static';

(() => {
    const card = document.querySelectorAll(".js-card"),
        doneBtn = document.querySelector(".js-done-btn"),
        categoriesInput = document.querySelectorAll("input[name=categories]"),
        categoryAllBtn = document.querySelector(".js-category__all-btn");

    const CARD_ACTIVE = "card-item-active",
        DISABLE = "disabled";

    //----------------------------------------------------------------------------------------------------

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
    }

    function init() {
        window.onpageshow = () => {
            pageLoadEvent();
        };

        //버튼 활성화 Event
        buttonActiveEvent();

        // 모든 분야 Click Event
        categoryAllBtn.addEventListener("click", handleCategoryAllBtn);

        // 개별 관심분야 Click Event
        card.forEach(el => {
            el.addEventListener("click", handleCardClickEvent);
        });

        // Modal Show Event
        document.querySelector('.js-category-modal-trigger').addEventListener("click", () => {
            document.getElementById('category-modal').style.display = "flex";
        });
    }

    init();

})();