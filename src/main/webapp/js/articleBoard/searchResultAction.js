import ArticleCard from './articleCard.js';
import SkeletonCard from './skeletonCard.js';

(() => {
    const categoryTabBtn = document.querySelectorAll(".js-category-tab"),
        searchResultCardOuter = document.querySelector(".js-searchResult-section-card-outer"),
        categoriesStr = document.querySelectorAll(".js-categories-str"),
        searchKeyword = document.querySelector(".js-search-keyword").value,
        searchResultCount = document.querySelector(".js-searchResult-count"),
        currentCategoryValue = document.querySelector(".js-category-value");

    // 검색 결과를 얻기위한 컨트롤러 경로
    const SEARCH_RESULT_ARTICLE_CARD_PATH = "findArticleBySearch?";

    // 현재 위치에서 관심분야 탭에서 활성화된 관심 분야의 값을 저장하는 변수
    let activeCategoryTabBtn = "";

    // 화면 로드시 아티클 카드를 그려주 함수
    function pageLoadEvent() {
        for (let i = 0; i < 6; i++){
            searchResultCardOuter.appendChild(new SkeletonCard().getElements());
        }

        let pathToSearchResult = SEARCH_RESULT_ARTICLE_CARD_PATH;
        const categoriesArr = [];

        categoriesStr.forEach(el => {
            categoriesArr.push(el.value);
        });

        // url에 관심 분야 배열 요소 붙여서 전송하기
        categoriesArr.forEach((el, index) => {
            pathToSearchResult += "categories=" + el;
            if (index < categoriesArr.length - 1) {
                pathToSearchResult += "&";
            }
        });

        // url에 검색 키워드 붙여서 전송하기
        pathToSearchResult += "&searchKeyword=" + searchKeyword;
        getAndPaintSearchResultArticleInfo(pathToSearchResult);
    }

    // 검색한 키워드를 만족하는 아티클 정보를 받아와서 화면에 그려주는 함수
    function getAndPaintSearchResultArticleInfo(pathToSearchResult) {
        // searchResultTitle에 검색 결과가 몇 개인지 카운트하기 위한 변수
        let cardCount = 0;

        // 관심 분야 데이터를 넘겨 아티클 정보 받아오기
        axios({
            method: 'get',
            url   : pathToSearchResult
        })
            .then(function (json) {
                console.log("Receive Success!");
                console.log(json);

                // newSectionCardOuter의 모든 자식 요소 삭제
                while (searchResultCardOuter.hasChildNodes()) {
                    searchResultCardOuter.removeChild(searchResultCardOuter.firstChild);
                }

                // 받아온 데이터가 있다면,
                if (json.data.length != 0) {
                    searchResultCardOuter.style.display = "grid";

                    // 화면에 새롭게 요소 그려주기
                    for (let key of json.data) {
                        searchResultCardOuter.appendChild(new ArticleCard(
                            JSON.stringify(key.article_seq)
                            , JSON.stringify(key.url)
                            , JSON.stringify(key.category_title)
                            , JSON.stringify(key.hashtag)
                            , JSON.stringify(key.title)
                            , JSON.stringify(key.summary)
                            , JSON.stringify(key.reg_date)
                        ).getElements());
                        cardCount++;
                    }
                }

                // 받아온 데이터가 없다면,
                else {
                    const div = document.createElement("div");
                    div.className = "search__null text h4";
                    div.innerHTML = `앗, 관련 아티클이 준비되어 있지 않아 정말 죄송합니다🙇<br> 이런 키워드로 검색해보는건 어떠세요?`;
                    searchResultCardOuter.appendChild(div);
                    searchResultCardOuter.style.display = "block";
                }

                // searchResultTitle에 검색 결과가 몇 개인지 카운트하기
                searchResultCount.innerHTML = `${cardCount}개`;

                if (activeCategoryTabBtn === "") currentCategoryValue.innerHTML = `모든`;
                else currentCategoryValue.innerHTML = `${activeCategoryTabBtn} 분야`;

            });
    }

    // category tab 영역의 버튼 클릭시 상태가 바뀌도록 처리하는 함수
    function handleCategoryTabClickEvent(ev) {
        let target = ev.target;

        categoryTabBtn.forEach(el => {
            el.classList.add("inactive");
            el.classList.remove("active");
        });
        target.classList.add("active");
        target.classList.remove("inactive");
    }

    // 관심 분야 버튼을 눌렀을 때 이벤트
    function categoryTabBtnEvent(ev) {
        const target = ev.currentTarget;
        let pathToSearchResult = SEARCH_RESULT_ARTICLE_CARD_PATH;
        activeCategoryTabBtn = target.value;

        // 관심분야 탭의 ALL 버튼 클릭시 아티클 찾기 페이지에서 받아온
        // 전체 관심 분야를, axios를 통해 header에 담아 보낼 수 있도록 movePath에 담기
        if (target.innerHTML === "ALL") {
            const categoriesArr = [];

            categoriesStr.forEach(el => {
                categoriesArr.push(el.value);
            });

            // url에 배열 요소 붙이기
            categoriesArr.forEach(el => {
                pathToSearchResult += "&categories=" + el;
            });

        }

        // ALL 버튼 외의 관심분야 탭 버튼의 처리
        else {
            pathToSearchResult += "&categories=" + target.value;
        }

        // url에 검색 키워드 붙여서 전송하기
        pathToSearchResult += "&searchKeyword=" + searchKeyword;
        getAndPaintSearchResultArticleInfo(pathToSearchResult);
    }

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