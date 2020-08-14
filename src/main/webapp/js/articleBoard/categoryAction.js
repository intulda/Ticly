'use static';
(() => {
    const card = document.querySelectorAll(".js-card"),
        doneBtn = document.querySelector(".js-done-btn"),
        categoriesInput = document.querySelectorAll("input[name=categories]"),
        categoryTitle = document.querySelector(".category__title").childNodes[1],
        categoryBodyText = document.querySelector(".category__title").childNodes[3];

    const CARD_ACTIVE = "card-item-active",
        DISABLE = "disabled";

    // // 화면이 줄어들었을 때 바뀌도록하는 함수
    // function pageWidthUnder360(){
    //     categoryTitle.classList.remove("h1");
    //     categoryTitle.classList.add("h2");
    //     categoryBodyText.classList.remove("h6");
    //     categoryBodyText.classList.add("body1");
    //     categoryTitle.innerHTML = "회원님의 관심 분야를 <br>알려주세요!";
    //     categoryBodyText.innerHTML = categoryBodyText.innerHTML.replace(/<br>\\*/g, "");
    //     console.log(categoryBodyText.innerHTML);
    // }

    // // 화면이 줄어들었을 때 바뀌도록하는 함수
    // function pageWidthUpper768(){
    //     categoryTitle.classList.remove("h2");
    //     categoryTitle.classList.add("h1");
    //     categoryBodyText.classList.remove("body1");
    //     categoryBodyText.classList.add("h6");
    //     categoryBodyText.innerHTML = "티클리는 회원님의 관심 분야의 영문 아티클을 기반으로 <br>영어 학습을 할 수 있도록 도와드립니다.";
    //     categoryTitle.innerHTML = categoryTitle.innerHTML.replace(/<br>\\*/g, "");
    //     console.log(categoryBodyText.innerHTML);
    // }

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
            // if(window.innerWidth <= 768){
            //     pageWidthUnder360();
            // }
            // if(window.innerWidth > 768){
            //     pageWidthUpper768();
            // }
            pageLoadEvent();
        };
        buttonActiveEvent();

        card.forEach(el => {
            el.addEventListener("click", handleCardClickEvent);
        });
        // window.addEventListener("resize", () =>{
        //     if(window.innerWidth <= 768){
        //         pageWidthUnder360();
        //     }
        //     if(window.innerWidth > 768){
        //         pageWidthUpper768();
        //     }
        // });
    }

    init();

})();