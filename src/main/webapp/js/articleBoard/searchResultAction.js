'use static';

import ArticleCard from './module/articleCard.js';
import SkeletonCard from './module/skeletonCard.js';

(() => {
    const categoryTabBtn = document.querySelectorAll(".js-category-tab"),
        searchResultCardOuter = document.querySelector(".js-searchResult-section-card-outer"),
        categoriesStr = document.querySelectorAll(".js-categories-str"),
        searchKeyword = document.querySelector(".js-search-keyword").value,
        searchResultCount = document.querySelector(".js-searchResult-count"),
        currentCategoryValue = document.querySelector(".js-category-value"),
        searchBar = document.querySelector(".js-submit-hashtag-input"),
        searchBarForm = document.querySelector(".js-submit-hashtag-form"),
        sectionNum = document.querySelector(".js-section-number").value;


    // 검색 결과를 얻기위한 컨트롤러 경로
    const SEARCH_RESULT_ARTICLE_CARD_PATH = "findArticleBySearch?",
        GET_HASH_TAG_PATH = "getHashTag?";

    // 현재 위치에서 관심분야 탭에서 활성화된 관심 분야의 값을 저장하는 변수
    let activeCategoryTabBtn = "";
    let articleList = [];

    //----------------------------------------------------------------------------------------------------

    // 해시태그 버튼 클릭시 검색하는 이벤트
    function handleHashtagBtnClickEvent(ev) {
        let target = ev.target.closest('button');
        if (!target) return;

        searchBar.value = target.lastElementChild.innerHTML;
        searchBarForm.submit();
    }

    // 선택한 관심분야에 맞게 해시태그를 찾을 수 있도록 경로를 만들어줄 함수
    function createPathOfToGetHashTag() {
        let pathToGetHashtag = GET_HASH_TAG_PATH;
        let findActiveCategoryTabBtn = "";

        categoryTabBtn.forEach(el => {
            if (el.classList.contains("active")) {
                findActiveCategoryTabBtn = el.innerHTML;
                console.log(findActiveCategoryTabBtn);
            }
        });

        if (findActiveCategoryTabBtn === "ALL") {
            const categoriesArr = [];

            categoriesStr.forEach(el => {
                categoriesArr.push(el.value);
            });

            // url에 배열 요소 붙이기
            categoriesArr.forEach(el => {
                pathToGetHashtag += "&categories=" + el;
            });
        } else {
            pathToGetHashtag += "&categories=" + findActiveCategoryTabBtn;
        }

        return pathToGetHashtag;
    }

    // 검색 결과가 0개일 경우, 선택한 관심분야에 맞게 해시태그를 가져와 화면에 그려주는 함수
    function paintHashTag() {
        const pathToGetHashtag = createPathOfToGetHashTag();

        // 관심 분야 데이터를 넘겨 아티클 정보 받아오기
        axios({
            method: 'get',
            url   : pathToGetHashtag
        })
            .then(function (data) {
                console.log("Receive Success!");
                console.log(data);

                // default message
                const searchDefaultState = document.createElement("div");
                searchDefaultState.className = "search__null text h4";
                searchDefaultState.innerHTML = `앗, 관련 아티클이 준비되어 있지 않아 정말 죄송합니다🙇<br> 이런 키워드로 검색해보는건 어떠세요?`;
                searchResultCardOuter.appendChild(searchDefaultState);
                searchResultCardOuter.style.display = "block";

                // 화면에 해시태그 요소 그려주기
                const hashTagSection = document.createElement("div");
                hashTagSection.className = "search__hashtag-section";

                let count = 0;
                for (let key of data.data) {
                    const btn = document.createElement("button");
                    btn.className = "btn btn-tag";
                    let tagStr = (JSON.stringify(key.hashtag)).replace(/"/gi, "");
                    btn.innerHTML = "<b class='search__hashtag-icon text text-weight-bold'># </b>" + "<span>" + tagStr + "</span>";
                    hashTagSection.appendChild(btn);

                    count++;
                    if (count === 20) {
                        break;
                    }
                }
                searchDefaultState.appendChild(hashTagSection);
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
        let path = SEARCH_RESULT_ARTICLE_CARD_PATH;
        activeCategoryTabBtn = target.value;

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

        // url에 검색 키워드 붙여서 전송하기
        path += "&searchKeyword=" + searchKeyword;
        getSearchResultArticleInfo(path);
    }

    // 리스트 정보를 가져와 그려주는 함수
    function paintCard(list) {
        // searchResultTitle에 검색 결과가 몇 개인지 카운트하기 위한 변수
        let cardCount = 0;

        // SectionCardOuter의 모든 자식 요소 삭제
        while (searchResultCardOuter.hasChildNodes()) {
            searchResultCardOuter.removeChild(searchResultCardOuter.firstChild);
        }

        // 화면에 새롭게 요소 그려주기
        if (list.length != 0) {
            searchResultCardOuter.style.display = "grid";

            for (let key of list) {
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
            paintHashTag();
        }
        // searchResultTitle에 검색 결과가 몇 개인지 카운트하기
        searchResultCount.innerHTML = `${cardCount}개`;

        // searchResultTitle에 검색하는 분야 표시하기
        if (activeCategoryTabBtn === "") currentCategoryValue.innerHTML = `모든`;
        else currentCategoryValue.innerHTML = `${activeCategoryTabBtn} 분야`;
    }

    // 정렬한 카드를 그려주는 함수
    function sorting(list, basedType) {
        let newArticleList = list;
        if (newArticleList.length > 1) {
            newArticleList.sort((a, b) => {
                return a.basedType > b.basedType ? -1 : a.basedType < b.basedType ? 1 : 0;
            });
        }
        paintCard(newArticleList);
    }

    // 검색한 키워드를 만족하는 아티클 정보를 리스트에 넣어주는 함수
    function getSearchResultArticleInfo(path) {

        // 관심 분야 데이터를 넘겨 아티클 정보 받아오기
        axios({
            method: 'get',
            url   : path
        })
            .then(function (json) {
                    console.log("Receive Success!");
                    console.log(json);

                    articleList = json.data;

                    if (sectionNum != "") {
                        if (sectionNum == 0) {
                            console.log("새로운 아티클");
                            sorting(articleList, "reg_date");
                            return;
                        } else {
                            console.log("필독 아티클");
                            let newSortedList = articleList.filter(it => it.apply_count > 100);
                            sorting(newSortedList, "apply_count");
                            return;
                        }
                    } else {
                        paintCard(articleList);
                    }
                }
            );
    }

    // 스켈레톤 UI 그려주기
    function paintSkeletonCard() {
        // SectionCardOuter의 모든 자식 요소 삭제
        while (searchResultCardOuter.hasChildNodes()) {
            searchResultCardOuter.removeChild(searchResultCardOuter.firstChild);
        }

        searchResultCardOuter.style.display = "grid";

        for (let i = 0; i < 6; i++) {
            searchResultCardOuter.appendChild(new SkeletonCard().getElements());
        }
    }

    // 화면 로드시 아티클 카드를 그려주 함수
    function pageLoadEvent() {
        paintSkeletonCard();

        let path = SEARCH_RESULT_ARTICLE_CARD_PATH;
        const categoriesArr = [];

        categoriesStr.forEach(el => {
            categoriesArr.push(el.value);
        });

        // url에 관심 분야 배열 요소 붙여서 전송하기
        categoriesArr.forEach((el, index) => {
            path += "categories=" + el;
            if (index < categoriesArr.length - 1) {
                path += "&";
            }
        });

        // url에 검색 키워드 붙여서 전송하기
        path += "&searchKeyword=" + searchKeyword;
        getSearchResultArticleInfo(path);
    }

    function init() {
        window.onload = () => {
            pageLoadEvent();
        };

        categoryTabBtn.forEach(el => {
            el.addEventListener("click", handleCategoryTabClickEvent);
            el.addEventListener("click", categoryTabBtnEvent);
        });

        searchResultCardOuter.addEventListener("click", handleHashtagBtnClickEvent);
    }

    init();
})();