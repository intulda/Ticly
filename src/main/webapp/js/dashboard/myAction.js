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
    function lastLearningCardModule(json) {
        lastLearningSection.appendChild(new LastLearningCard(
            JSON.stringify(json.data.article_seq)
            , JSON.stringify(json.data.url)
            , JSON.stringify(json.data.title)
            , JSON.stringify(json.data.last_learning_type)
            , JSON.stringify(json.data.last_learning_content)
            , JSON.stringify(json.data.last_learning_date)
        ).getElements());
    }

    // json 파일을 입력받아 학습중인 아티클 카드를 그려주는 모듈
    function learningListCardModule(json) {
        for (let key of json.data){
            learningListSection.appendChild(new LearningListCard(
                JSON.stringify(key.article_seq)
                , JSON.stringify(key.url)
                , JSON.stringify(key.category_title)
                , JSON.stringify(key.hashtag)
                , JSON.stringify(key.title)
                , JSON.stringify(key.summary)
                , JSON.stringify(key.last_learning_date)
                , JSON.stringify(key.achievement_rate)
            ).getElements());
        }
    }

    // 카드 그려주는 비동기 틀
    function paintCard(path, section, module){
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
                module(json);

            });
    }

    // 화면 로드시 아티클 카드를 그려주는 함수
    function pageLoadEvent() {
        // 마지막 학습 카드 그려주기
        let path = createPath(LAST_LEARNING_ARTICLE_CARD_PATH);
        let section = lastLearningSection;
        let module = lastLearningCardModule;
        paintCard(path, section, module);

        // 학습중인 카드 목록 그려주기
        path = createPath(LEARNING_ARTICLE_LIST_PATH);
        section = learningListSection;
        module = learningListCardModule;
        paintCard(path, section, module);
    }

    function init(){
        window.onload = () => {
            pageLoadEvent();
        };
    }

    init();
})();