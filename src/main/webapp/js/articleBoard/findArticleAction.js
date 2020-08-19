import ArticleCard from './articleCard.js';
import SkeletonCard from './skeletonCard.js';

(() => {
    const categoryTabBtn = document.querySelectorAll(".js-category-tab"),
        newSectionCardOuter = document.querySelector(".js-new-section-card-outer"),
        popularSectionCardOuter = document.querySelector(".js-popular-section-card-outer"),
        categoriesStr = document.querySelectorAll(".js-categories-str");

    const NEW_ARTICLE_CARD_PATH = "getNewArticleInfo?",
        POPULAR_ARTICLE_CARD_PATH = "getPopularArticleInfo?";

    //----------------------------------------------------------------------------------------------------

    // category tab 영역의 버튼 클릭시 상태가 바뀌도록 처리하는 함수
    function handleCategoryTabClickEvent(ev) {
        let target = ev.target;

        categoryTabBtn.forEach(el => {
            // el.classList.add("inactive");
            el.classList.remove("active");
        });
        target.classList.add("active");
        // target.classList.remove("inactive");
    }

    // 관심 분야 버튼을 눌렀을 때 이벤트
    function categoryTabBtnEvent(ev) {
        const target = ev.currentTarget;
        let pathToNewArticle = NEW_ARTICLE_CARD_PATH;
        let pathToPopularArticle = POPULAR_ARTICLE_CARD_PATH;

        // 관심분야 탭의 ALL 버튼 클릭시 아티클 찾기 페이지에서 받아온
        // 전체 관심 분야를, axios를 통해 header에 담아 보낼 수 있도록 movePath에 담기
        if (target.innerHTML === "ALL") {
            const categoriesArr = [];

            categoriesStr.forEach(el => {
                categoriesArr.push(el.value);
            });

            // url에 배열 요소 붙이기
            categoriesArr.forEach(el => {
                pathToNewArticle += "&categories=" + el;
                pathToPopularArticle += "&categories=" + el;
            });
        }

        // ALL 버튼 외의 관심분야 탭 버튼의 처리
        else {
            pathToNewArticle += "&categories=" + target.value;
            pathToPopularArticle += "&categories=" + target.value;
        }

        getAndPaintArticleInfo(pathToNewArticle, newSectionCardOuter);
        getAndPaintArticleInfo(pathToPopularArticle, popularSectionCardOuter);
    }

    // 아티클 정보 받아와서 화면에 그려주는 함수
    function getAndPaintArticleInfo(path, section) {
        paintSkeletonCard();

        // 관심 분야 데이터를 넘겨 아티클 정보 받아오기
        axios({
            method: 'get',
            url   : path
        })
            .then(function (json) {
                console.log("Receive Success!");

                // newSectionCardOuter의 모든 자식 요소 삭제
                while (section.hasChildNodes()) {
                    section.removeChild(section.firstChild);
                }

                // 화면에 새롭게 요소 그려주기
                let count = 0;
                for (let key of json.data) {
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

                    if (count === 3){
                        break;
                    }
                }
            });
    }

    // 스켈레톤 UI 그려주는 함수
    function paintSkeletonCard() {
        for (let i = 0; i < 3; i++){
            newSectionCardOuter.appendChild(new SkeletonCard().getElements());
        }

        for (let i = 0; i < 3; i++){
            popularSectionCardOuter.appendChild(new SkeletonCard().getElements());
        }
    }

    // 화면 로드시 아티클 카드를 그려주는 함수
    function pageLoadEvent() {
        paintSkeletonCard();

        let pathToNewArticle = NEW_ARTICLE_CARD_PATH;
        let pathToPopularArticle = POPULAR_ARTICLE_CARD_PATH;
        let categoriesArr = [];

        categoriesStr.forEach(el => {
            categoriesArr.push(el.value);
        });

        // url에 배열 요소 붙여서 전송하기
        categoriesArr.forEach((el, index) => {
            pathToNewArticle += "categories=" + el;
            pathToPopularArticle += "categories=" + el;
            if (index < categoriesArr.length - 1) {
                pathToNewArticle += "&";
                pathToPopularArticle += "&";
            }
        });

        getAndPaintArticleInfo(pathToNewArticle, newSectionCardOuter);
        getAndPaintArticleInfo(pathToPopularArticle, popularSectionCardOuter);
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