import LearningListCard from './learningListCard.js';

(() => {
    const learningListSection = document.querySelector(".js-learningList-section"),
        listTabBtn = document.querySelectorAll(".js-list-tab-btn"),
        selectBox = document.querySelector(".js-my-select-box"),
        userEmail = document.querySelector("input[name=userEmail]").value;

    const LEARNING_ARTICLE_LIST_PATH = "getLearningListInfo?";

    let count = 0;
    let learningList = [];

    //---------------------------------------------------------------------------------------

    // 정렬 옵션에 변동사항이 있을 때 마다 카드의 정렬을 바꾸는 함수
    function changeSortOption() {
        let selectedValue = selectBox.options[selectBox.selectedIndex].value;
        let state = null;

        listTabBtn.forEach(el => {
            if (el.classList.contains("active")) {
                state = el.value;
            }
        });

        // 선택한 옵션에 따라 배열 정렬하기
        let newSortedList = learningList;
        if (newSortedList.length > 1) {
            switch (selectedValue) {

                // 최근 학습순 정렬
                case "1" :
                    newSortedList.sort((a, b) => {
                        return a.last_learning_date > b.last_learning_date ? -1 : a.last_learning_date < b.last_learning_date ? 1 : 0;
                    });
                    break;

                // 최신 등록순
                case "2" :
                    newSortedList.sort((a, b) => {
                        return a.reg_date > b.reg_date ? -1 : a.reg_date < b.reg_date ? 1 : 0;
                    });
                    break;

                // 제목순
                case "3" :
                    newSortedList.sort((a, b) => {
                        return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
                    });
                    break;
            }
            paintLearningListCardModule(newSortedList, state)
        }
    }

    // 리스트 탭 버튼 클릭시 이벤트
    function handleListTabBtnEvent(ev) {
        let targetElem = ev.target;
        if(ev.target.nodeName  === 'SPAN') {
            targetElem = targetElem.parentElement;
        }
        if (!targetElem.classList.contains("active")) {
            // 눌려진 아티클 목록 탭의 버튼의 value 받아오기
            // 0 : 학습중 / 1 : 학습 완료
            let state = targetElem.value;

            // 탭 활상화 상태 바꿔주기
            targetElem.classList.add("active");
            let inactiveNum = (state == 0 ) ? 1 : 0;
            listTabBtn[inactiveNum].classList.remove("active")

            // 상태에 따라 아티클 목록에 학습 카드 그려주기
            paintLearningListCardModule(learningList, state);
        }
    }

    // null인지 확인하는 함수
    function isNull(v) {
        return (v === undefined || v === null) ? true : false;
    }

    // json 파일을 입력받아 학습중인 아티클 카드를 그려주는 모듈
    function paintLearningListCardModule(list, state) {
        // section의 모든 자식 요소 삭제
        while (learningListSection.hasChildNodes()) {
            learningListSection.removeChild(learningListSection.firstChild);
        }

        learningListSection.style.display = "grid";

        if (!isNull(list)) {
            let result = list.filter(it => JSON.stringify(it.learning_done).includes(state));
            if (result.length > 0) {
                for (let key of result) {
                    learningListSection.appendChild(new LearningListCard(
                        JSON.stringify(key.article_seq)
                        , JSON.stringify(key.url)
                        , JSON.stringify(key.category_title)
                        , JSON.stringify(key.hashtag)
                        , JSON.stringify(key.title)
                        , JSON.stringify(key.summary)
                        , JSON.stringify(key.reg_date)
                        , JSON.stringify(key.last_learning_date)
                        , JSON.stringify(key.achievement_rate)
                        , JSON.stringify(key.learning_done)
                    ).getElements());
                    count++;
                }
            } else {
                paintDefault(state);
            }
        } else {
            paintDefault(state);
        }
    }

    // 디폴트 페이지 그려주기
    function paintDefault(state) {

        // default message
        const defaultStateWrapper = document.createElement("div");
        defaultStateWrapper.className = "default__null text h4";

        const defaultText = document.createElement("div");
        defaultText.className = "text h4";
        if (state == 0) {
            defaultText.innerHTML = `학습중인 아티클이 없네요🙈<br> 공부하고 싶은 아티클을 찾으러 가볼까요?`;
            const goToFindArticleBtn = document.createElement("button");
            goToFindArticleBtn.className = "btn btn-primary btn-right-icon"
            goToFindArticleBtn.innerHTML = "아티클 찾기<i class='icon_chevron-right'></i>"
            goToFindArticleBtn.setAttribute("onclick", "location.href='../articleBoard/findArticle'");
            defaultStateWrapper.appendChild(defaultText);
            defaultStateWrapper.appendChild(goToFindArticleBtn);
        } else {
            defaultText.innerHTML = `아직 완료한 아티클이 없네요🙈<br> 열심히 공부해서 이곳을 꽉 채워주세요!`;
            defaultStateWrapper.appendChild(defaultText);
        }
        learningListSection.appendChild(defaultStateWrapper);
        learningListSection.style.display = "block";
    }

/*    // json 파일을 입력받아 마지막으로 학습한 아티클 카드 그려주는 비동기 처리
    function getAndPaintLastLearningCard(path, section) {
        axios({
            method: 'get',
            url   : path
        })
            .then(function (json) {
                console.log("Receive Success!");
                console.log(json.data);

                // sectionr의 모든 자식 요소 삭제
                while (section.hasChildNodes()) {
                    section.removeChild(section.firstChild);
                }

                if (json.data.length != 0) {
                    lastLearningSection.appendChild(new LastLearningCard(
                        JSON.stringify(json.data.article_seq)
                        , JSON.stringify(json.data.url)
                        , JSON.stringify(json.data.title)
                        , JSON.stringify(json.data.last_learning_type)
                        , JSON.stringify(json.data.last_learning_content)
                        , JSON.stringify(json.data.last_learning_date)
                    ).getElements());
                }
            });
    }*/

    // json 객체를 리스트에 담아주는 비동기 처리
    function getArticleList(path, section) {
        axios({
            method: 'get',
            url   : path
        })
            .then(function (json) {
                console.log("Receive Success!");
                console.log(json.data);

                if (json.data.length != 0) {
                    learningList = json.data;
                    paintLearningListCardModule(learningList, 0);
                    counting(learningList);
                } else {
                    paintDefault(0);
                }
            });
    }

    // axios를 통해 담아 보낼 수 있도록 email을 movePath에 담기
    function createPath(startSpot) {
        let path = startSpot;
        path += "email=" + userEmail;
        return path;
    }

    // 화면 로드시 아티클 카드를 그려주는 함수
    function pageLoadEvent() {
        const path = createPath(LEARNING_ARTICLE_LIST_PATH);
        const section = learningListSection;
        getArticleList(path, section);
    }

    // 아티클 목록에서 완료 유무를 파악해 각각 몇개의 목록을 가지고 있는지 연산하는 함수
    function counting(list) {
        let result = list.filter(it => JSON.stringify(it.learning_done).includes(0));

        listTabBtn[0].firstElementChild.innerHTML = "(" + result.length + ")";

        result = list.filter(it => JSON.stringify(it.learning_done).includes(1));
        listTabBtn[1].firstElementChild.innerHTML = "(" + result.length + ")";
    }

    function init() {
        window.onload = () => {
            pageLoadEvent();
        };

        listTabBtn.forEach(el => {
            el.addEventListener("click", handleListTabBtnEvent);
        });

        selectBox.addEventListener("change", changeSortOption);
    }

    init();
})();