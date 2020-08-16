'use static';
(() => {
    const card = document.querySelectorAll(".js-card"),
        doneBtn = document.querySelector(".js-done-btn"),
        categoriesInput = document.querySelectorAll("input[name=categories]"),
        nextTimePickBtn = document.querySelector(".category__action-btns").firstElementChild,
        categoryForm = document.querySelector(".js-category-form");

    const CARD_ACTIVE = "card-item-active",
        DISABLE = "disabled";

    // 다음에 고를게요 버튼 이벤트
    function handleNextTimePickBtn() {
        categoriesInput.forEach(el => {
            el.checked = true;
        });
        nextTimePickBtn.type = "submit";
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
        let index = Array.from(card).indexOf(ev.target);
        const target = ev.currentTarget;
        const choiceCategory = target.children[2];

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
        buttonActiveEvent();

        card.forEach(el => {
            el.addEventListener("click", handleCardClickEvent);
        });
        nextTimePickBtn.addEventListener("click", handleNextTimePickBtn);
    }

    init();

})();