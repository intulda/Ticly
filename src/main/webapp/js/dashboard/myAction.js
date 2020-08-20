import LearningListCard from './learningListCard.js';
import LastLearningCard from './lastLearningCard.js';

(() => {
    const lastLearningSection = document.querySelector(".js-lastLearning-section"),
        learningListSection = document.querySelector(".js-learningList-section"),
        userEmail = document.querySelector("input[name=userEmail]").value,
        listTabBtn = document.querySelectorAll(".js-list-tab-btn");

    const LAST_LEARNING_ARTICLE_CARD_PATH = "getLastLearningArticleInfo?",
        LEARNING_ARTICLE_LIST_PATH = "getLearningListInfo?";

    let count = 0;
    let learningList = [];

    //---------------------------------------------------------------------------------------

    function paintDefault(section, state) {
        // section의 모든 자식 요소 삭제
        while (section.hasChildNodes()) {
            section.removeChild(section.firstChild);
        }

        // default message
        const defaultStateWrapper = document.createElement("div");
        defaultStateWrapper.className = "default__null text h4";

        const defaultText = document.createElement("div");
        defaultText.className = "text h4 mb-3";
        if (state == 0) {
            defaultText.innerHTML = `학습중인 아티클이 없네요🙈<br> 공부하고 싶은 아티클을 찾으러 가볼까요?`;
            const goToFindArticleBtn = document.createElement("button");
            goToFindArticleBtn.className = "btn btn-primary btn-right-icon m-auto"
            goToFindArticleBtn.innerHTML = "아티클 찾기<i class='icon_chevron-right'></i>"
            defaultStateWrapper.appendChild(defaultText);
            defaultStateWrapper.appendChild(goToFindArticleBtn);
        } else {
            defaultText.innerHTML = `아직 완료한 아티클이 없네요🙈<br> 열심히 공부해서 이곳을 꽉 채워주세요!`;
            defaultStateWrapper.appendChild(defaultText);
        }
        learningListSection.appendChild(defaultStateWrapper);
        learningListSection.style.display = "block";
    }

    function handleListTabBtnEvent(ev) {
        if (!ev.target.classList.contains("active")) {
            // 눌려진 아티클 목록 탭의 버튼의 value 받아오기
            // 0 : 학습중 / 1 : 학습 완료
            let state = ev.target.value;

            listTabBtn.forEach(el => {
                el.classList.remove("active");
            });
            ev.target.classList.add("active");

            // 상태에 따라 아티클 목록에 학습 카드 그려주기
            learningListCardModule(learningListSection, learningList, state);
            paintDefault

            counting(state, count);
        }
    }

    // axios를 통해 담아 보낼 수 있도록 email을 movePath에 담기
    function createPath(startSpot) {
        let path = startSpot;
        path += "email=" + userEmail;

        return path;
    }

    // json 파일을 입력받아 학습중인 아티클 카드를 그려주는 모듈
    function learningListCardModule(section, list, state) {
        // section의 모든 자식 요소 삭제
        while (section.hasChildNodes()) {
            section.removeChild(section.firstChild);
        }

        learningListSection.style.display = "grid";

        let result = list.filter(it => JSON.stringify(it.learning_done).includes(state));

        for (let key of result) {
            learningListSection.appendChild(new LearningListCard(
                JSON.stringify(key.article_seq)
                , JSON.stringify(key.url)
                , JSON.stringify(key.category_title)
                , JSON.stringify(key.hashtag)
                , JSON.stringify(key.title)
                , JSON.stringify(key.summary)
                , JSON.stringify(key.last_learning_date)
                , JSON.stringify(key.achievement_rate)
                , JSON.stringify(key.learning_done)
            ).getElements());
            count++;
        }
    }


    // json 파일을 입력받아 마지막으로 학습한 아티클 카드 그려주는 비동기 처리
    function paintLastLearningCard(path, section) {
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
                    learningListSection.style.display = "grid";

                    lastLearningSection.appendChild(new LastLearningCard(
                        JSON.stringify(json.data.article_seq)
                        , JSON.stringify(json.data.url)
                        , JSON.stringify(json.data.title)
                        , JSON.stringify(json.data.last_learning_type)
                        , JSON.stringify(json.data.last_learning_content)
                        , JSON.stringify(json.data.last_learning_date)
                    ).getElements());
                } else {
                    paintDefault(0);
                }
            });
    }

    // 화면 로드시 json 객체를 리스트에 담아주는 함수 모듈
    function paintArticleListCard(path, section, module) {
        axios({
            method: 'get',
            url   : path
        })
            .then(function (json) {
                console.log("Receive Success!");
                console.log(json.data);

                if (json.data.length != 0) {
                    learningList = json.data;
                    module(learningList, 0);
                } else {
                    paintDefault(0);
                }
            });
    }

    // 화면 로드시 아티클 카드를 그려주는 함수
    function pageLoadEvent() {
        // 마지막 학습 카드 그려주기
        let path = createPath(LAST_LEARNING_ARTICLE_CARD_PATH);
        let section = lastLearningSection;
        paintLastLearningCard(path, section);

        // 학습중인 카드 목록 그려주기
        path = createPath(LEARNING_ARTICLE_LIST_PATH);
        section = learningListSection;
        let module = learningListCardModule;
        paintArticleListCard(path, section, module);
    }

    function counting(state = 0, _count) {
        listTabBtn.forEach(el => {
            if (el.classList.contains("active")) {
                el.firstElementChild.innerHTML = (_count == 0) ? "" : "(" + _count + ")";
            }
            if (!el.classList.contains("active")) {
                el.firstElementChild.innerHTML = "";
            }
        });
        count = 0;
    }

    function init() {
        window.onload = () => {
            pageLoadEvent();
        };

        listTabBtn.forEach(el => {
            el.addEventListener("click", handleListTabBtnEvent);
        });
    }

    init();
})();