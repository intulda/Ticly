import ArticleCard from './articleCard.js';
import SkeletonCard from './skeletonCard.js';

(() => {
    const categoryTabBtn = document.querySelectorAll(".js-category-tab"),
        newSectionCardOuter = document.querySelector(".js-new-section-card-outer"),
        popularSectionCardOuter = document.querySelector(".js-popular-section-card-outer"),
        categoriesStr = document.querySelectorAll(".js-categories-str");

    const GET_ARTICLE_CARD_PATH = "findMyTypeArticle?";

    let articleList = [];
    //----------------------------------------------------------------------------------------------------

    // category tab 영역의 버튼 클릭시 상태가 바뀌도록 처리하는 함수
    function handleCategoryTabClickEvent(ev) {
        let target = ev.target;

        categoryTabBtn.forEach(el => {
            el.classList.remove("active");
        });
        target.classList.add("active");
    }

    // 관심 분야 버튼을 눌렀을 때 이벤트
    function categoryTabBtnEvent(ev) {
        const target = ev.currentTarget;
        let path = GET_ARTICLE_CARD_PATH;

        // 관심분야 탭의 ALL 버튼 클릭시 아티클 찾기 페이지에서 받아온
        // 전체 관심 분야를, axios를 통해 header에 담아 보낼 수 있도록 movePath에 담기
        if (target.innerHTML === "ALL") {
            const categoriesArr = [];

            categoriesStr.forEach(el => {
                categoriesArr.push(el.value);
            });

            // url에 배열 요소 붙이기
            categoriesArr.forEach(el => {
                path += "&categories=" + el;
            });
        }

        // ALL 버튼 외의 관심분야 탭 버튼의 처리
        else {
            path += "&categories=" + target.value;
        }
        getArticleInfo(path);
    }

    // null인지 확인하는 함수
    function isNull(v) {
        return (v === undefined || v === null) ? true : false;
    }

    // 리스트를 인기/최신순 정렬해 화면에 그려주는 함수
    function cardSortingAndPaint(section, state) {
        let newSortedList = articleList;
        if (newSortedList.length > 1) {
            switch (state) {
                // 최신순 정렬
                case "latest" :
                    newSortedList.sort((a, b) => {
                        return a.reg_date > b.reg_date ? -1 : a.reg_date < b.reg_date ? 1 : 0;
                    });
                    break;

                // 인기순
                case "popularity" :
                    newSortedList.sort((a, b) => {
                        return a.apply_count > b.apply_count ? -1 : a.apply_count < b.apply_count ? 1 : 0;
                    });
                    break;
            }
            paintCard(section, newSortedList);
        } else {
            while (section.hasChildNodes()) {
                section.removeChild(section.firstChild);
            }
            paintDefault(section);
        }
    }

    // 디폴트 페이지 그려주기
    function paintDefault(section) {

        // default message
        const defaultStateWrapper = document.createElement("div");
        defaultStateWrapper.className = "default__null text h4";

        const defaultText = document.createElement("div");
        defaultText.className = "text h4";
        defaultText.innerHTML = `준비된 아티클이 없네요🙈<br> 티클리에서 열심히 준비중이니 조금만 기다려주세요!`;

        defaultStateWrapper.appendChild(defaultText);
        section.appendChild(defaultStateWrapper);
        section.style.display = "block";
    }

    // 리스트에 담긴 아티클 정보를 화면에 카드를 그려주는 함수
    function paintCard(section, list) {
        // sectionCardOuter의 모든 자식 요소 삭제
        while (section.hasChildNodes()) {
            section.removeChild(section.firstChild);
        }

        section.style.display = "grid";

        if (!isNull(list)) {
            let count = 0;
            for (let key of list) {
                section.appendChild(new ArticleCard(
                    JSON.stringify(key.article_seq)
                    , JSON.stringify(key.url)
                    , JSON.stringify(key.category_title)
                    , JSON.stringify(key.hashtag)
                    , JSON.stringify(key.title)
                    , JSON.stringify(key.summary)
                    , JSON.stringify(key.reg_date)
                ).getElements());
                count++;

                if (count === 3) {
                    break;
                }
            }
        }
    }

    // 아티클 정보 받아와서 리스트에 담아주는 함수
    function getArticleInfo(path) {
        paintSkeletonCard();

        // 관심 분야 데이터를 넘겨 아티클 정보 받아오기
        axios({
            method: 'get',
            url   : path
        })
            .then(function (json) {
                console.log("Receive Success!");

                articleList = json.data;
                cardSortingAndPaint(newSectionCardOuter, "latest");
                cardSortingAndPaint(popularSectionCardOuter, "popularity");

            });
    }

    // 스켈레톤 UI 그려주는 함수
    function paintSkeletonCard() {
        for (let i = 0; i < 3; i++) {
            newSectionCardOuter.appendChild(new SkeletonCard().getElements());
        }

        for (let i = 0; i < 3; i++) {
            popularSectionCardOuter.appendChild(new SkeletonCard().getElements());
        }
    }

    // 화면 로드시 아티클 카드를 그려주는 함수
    function pageLoadEvent() {

        let path = GET_ARTICLE_CARD_PATH;
        let categoriesArr = [];

        categoriesStr.forEach(el => {
            categoriesArr.push(el.value);
        });

        // url에 배열 요소 붙여서 전송하기
        categoriesArr.forEach((el, index) => {
            path += "categories=" + el;
            if (index < categoriesArr.length - 1) {
                path += "&";
            }
        });

        getArticleInfo(path);
    }

    // init
    function init() {
        window.onload = () => {
            pageLoadEvent();
        };

        categoryTabBtn.forEach(el => {
            el.addEventListener("click", handleCategoryTabClickEvent);
            el.addEventListener("click", categoryTabBtnEvent);
        });
    }

    init();
})();