import LearningListCard from './learningListCard.js';
import LastLearningCard from './lastLearningCard.js';

(() => {
    const lastLearningSection = document.querySelector(".js-lastLearning-section"),
        learningListSection = document.querySelector(".js-learningList-section"),
        userEmail = document.querySelector("input[name=userEmail]").value;

    const LAST_LEARNING_ARTICLE_CARD_PATH = "getLastLearningArticleInfo?",
        LEARNING_ARTICLE_LIST_PATH = "getLearningListInfo?";

    // axios를 통해 담아 보낼 수 있도록 email을 movePath에 담기
    function createPath(startSpot){
        let path = startSpot;
        path += "email=" + userEmail;

        return path;
    }

    // json 파일을 입력받아 마지막으로 학습한 아티클 카드 그려주는 모듈
    function lastLearningCardModule(key) {
        lastLearningSection.appendChild(new LastLearningCard(
            JSON.stringify(key.data.article_seq)
            , JSON.stringify(key.data.url)
            , JSON.stringify(key.data.title)
            , JSON.stringify(key.data.last_learning_type)
            , JSON.stringify(key.data.last_learning_content)
            , JSON.stringify(key.data.last_learning_date)
        ).getElements());
    }

    // json 파일을 입력받아 학습중인 아티클 카드를 그려주는 모듈
    function learningListCardModule(key) {
            learningListSection.appendChild(new LearningListCard(
                JSON.stringify(key.article_seq)
                , JSON.stringify(key.url)
                , JSON.stringify(key.categoryTitle)
                , JSON.stringify(key.hashtag)
                , JSON.stringify(key.title)
                , JSON.stringify(key.summary)
                , JSON.stringify(key.last_learning_date)
                , JSON.stringify(key.achievement_rate)
            ).getElements());
    }

    // 카드 그려주는 비동기 틀
    function paintCard(path, section){
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
                lastLearningCardModule(json);

            });
    }

    // 화면 로드시 아티클 카드를 그려주는 함수
    function pageLoadEvent() {
        const path = createPath(LAST_LEARNING_ARTICLE_CARD_PATH);
        const section = lastLearningSection;
        // const module = lastLearningCardModule;
        paintCard(path, section);
    }

    function init(){
        window.onload = () => {
            pageLoadEvent();
        };

    };

    init();
})();