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
        categoriesChoiceElem = document.querySelectorAll('.js-categories-choice'),
        sectionNum = document.querySelector(".js-section-number").value;

    const SEARCH_RESULT_ARTICLE_CARD_PATH = "findArticleBySearch?", // 검색 결과를 얻기위한 컨트롤러 경로
        GET_HASH_TAG_PATH = "getHashTag?", // 해시태그를 얻기 위한 경로
        MAXIMUM_NUMBER_OF_CARDS = 12; // 한 번에 보여주는 카드 개수

    let activeCategoryTabBtn = ""; // 현재 관심분야 탭에서 활성화된 관심 분야를 저장하는 변수
    let articleList = []; // axios로 받아온 데이터를 담는 배열
    let scrollCount = 0; // 무한 스크롤용 스크롤 횟수

    //----------------------------------------------------------------------------------------------------

    // 무한 스크롤을 위한 함수
    function infinityScroll() {
        window.onscroll = function (ev) {
            // window height + window scrollY 값이 document height보다 클 경우,
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

                // 스크롤할 때 마다 (한 번에 보여주는 카드 개수 * 스크롤 횟수)번째 카드 부터
                // (한 번에 보여주는 카드 개수만큼)  카드 그려주기
                let startCount = MAXIMUM_NUMBER_OF_CARDS * scrollCount;
                console.log("startCount : " + startCount);
                if (startCount < articleList.length) {
                    articleCardModule(articleList, startCount);
                }
            }
        }
    }

    // 해시태그 버튼 클릭시 검색하는 이벤트
    function handleHashtagBtnClickEvent(ev) {
        let target = ev.target.closest('button');
        if (!target) return;

        searchBar.value = target.lastElementChild.innerHTML;
        for(let obj of categoryTabBtn) {
            if(obj.classList.contains('active')) {
                if(obj.innerText === 'ALL') {
                    for(let obj of categoryTabBtn) {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'hidden');
                        input.name = 'categories';
                        input.value = `${obj.innerText}`
                        searchBarForm.appendChild(input);
                    }
                    break;
                } else {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    input.name = 'categories';
                    input.value = `${obj.innerText}`
                    searchBarForm.appendChild(input);
                    break;
                }
            }
        }
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
                // searchResultCardOuter.innerHTML = ''
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
                    if (count === 14) {
                        break;
                    }
                }
                searchDefaultState.appendChild(hashTagSection);
            });
    }

    // category tab 영역의 버튼 클릭시 상태가 바뀌도록 처리하는 함수
    function handleCategoryTabClickEvent(ev) {
        scrollCount = 0;
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

    // 아티클 카드 모듈
    function articleCardModule(list, startCount) {
        let count = 0;
        scrollCount++;
        console.log("scrollCount : " + scrollCount);

        for (let i = startCount; i < list.length; i++) {
            if (count == MAXIMUM_NUMBER_OF_CARDS) {
                return;
            }

            searchResultCardOuter.appendChild(new ArticleCard(
                JSON.stringify(list[i].image_path)
                , JSON.stringify(list[i].article_seq)
                , JSON.stringify(list[i].url)
                , JSON.stringify(list[i].category_title)
                , JSON.stringify(list[i].hashtag)
                , JSON.stringify(list[i].title)
                , JSON.stringify(list[i].summary)
                , JSON.stringify(list[i].reg_date)
            ).getElements());
            count++;
        }
    }

    // 리스트 정보를 가져와 그려주는 함수
    function paintCard(list) {
        // SectionCardOuter의 모든 자식 요소 삭제
        while (searchResultCardOuter.hasChildNodes()) {
            searchResultCardOuter.removeChild(searchResultCardOuter.firstChild);
        }
        console.log(list);
        // 화면에 새롭게 요소 그려주기
        if (list.length != 0) {
            searchResultCardOuter.style.display = "grid";
            articleCardModule(list, scrollCount);
        }
        // 받아온 데이터가 없다면,
        else {
            paintHashTag();
        }

        // searchResultTitle에 검색하는 분야 표시하기
        if (activeCategoryTabBtn === "") currentCategoryValue.innerHTML = `모든`;
        else currentCategoryValue.innerHTML = `${activeCategoryTabBtn} 분야`;
    }

    // 검색 결과가 몇 개인지 카운트하기
    function countingSearchResult(list) {
        searchResultCount.innerHTML = `${list.length}개`;
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
                            countingSearchResult(articleList);
                            return;
                        } else {
                            console.log("필독 아티클");
                            articleList = articleList.filter(it => it.apply_count > 100);
                            sorting(articleList, "apply_count");
                            countingSearchResult(articleList);
                            return;
                        }
                    } else {
                        countingSearchResult(articleList);
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
        if(categoryTypeCheck()) {
            categoriesChoiceElem.forEach((el, index) => {
                path += "categories=" + el.value;
                if (index < categoriesArr.length - 1) {
                    path += "&";
                }
            });
        } else {
            categoriesArr.forEach((el, index) => {
                path += "categories=" + el.value;
                if (index < categoriesArr.length - 1) {
                    path += "&";
                }
            });
        }


        // url에 검색 키워드 붙여서 전송하기
        path += "&searchKeyword=" + searchKeyword;
        getSearchResultArticleInfo(path);
    }

    function categoryTabHandler(categoriesChoiceElem) {
        if(categoriesChoiceElem.length > 1) {
            categoryTabBtn[0].classList.add('active');
        } else {
            if(categoryTypeCheck()) {
                for(let node of categoryTabBtn) {
                    if(node.value == categoriesChoiceElem[0].value) {
                        node.classList.add('active');
                        break;
                    }
                }
            } else {
                categoryTabBtn[0].classList.add('active');
            }
        }
    }

    function categoryTypeCheck() {
        let check = false;
        if(categoriesChoiceElem.length > 1) {
            check = true;
        } else {
            for(let node of categoriesStr) {
                if(node.value == categoriesChoiceElem[0].value) {
                    check = true;
                    break;
                }
            }
        }
        return check;
    }

    function init() {

        // 다른 페이지에서 뒤로가기 했을 때 새로고침 해주는 이벤트
        let perfEntries = performance.getEntriesByType("navigation");
        if (perfEntries[0].type === "back_forward") {
            location.reload(true);
        }

        window.onload = () => {
            pageLoadEvent();
            categoryTabHandler(categoriesChoiceElem);
        };

        // 무한 스크롤
        infinityScroll();

        // tooltip
        $('[name="tooltip"]').tooltip();

        categoryTabBtn.forEach(el => {
            el.addEventListener("click", handleCategoryTabClickEvent);
            el.addEventListener("click", categoryTabBtnEvent);
        });

        searchResultCardOuter.addEventListener("click", handleHashtagBtnClickEvent);

    }

    init();
})();