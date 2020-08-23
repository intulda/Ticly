(()=>{
    const URL = {
        UPDATE_LAST_TYPE: '/learn/updateLastLearningType',
        WORD_TEMPLATE: '/learn/learnWordTemplate'
    }
    //tab event
    const tabClickElem = document.querySelector('#learnTab');
    function onLastTypeUpdateHandler(e) {
        const targetElem = e.target;
        const typeNumber = Number(targetElem.getAttribute("data-type"));
        const currentArticleElem = document.querySelector('#currentArticle')
        axios(URL.UPDATE_LAST_TYPE, {
            method: 'POST',
            data: JSON.stringify({
                user_learning_seq: currentArticleElem.getAttribute("data-user_learning_seq"),
                article_seq: currentArticleElem.getAttribute("data-article-seq"),
                last_learning_type: typeNumber
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(typeNumber === 1) {

        } else {
            import('./LearnWord.js');
        }
    }

    function wordTemplate() {

    }


    function onTabMoveHandler(e) {
        const targetElem = e.target;
        if(targetElem.nodeName === 'LI') {
            if(targetElem.previousElementSibling === null) {
                targetElem.nextElementSibling.classList.remove('active');
            } else {
                targetElem.previousElementSibling.classList.remove('active');
            }
            targetElem.classList.add('active');
            onLastTypeUpdateHandler(e);
        }
    }
    tabClickElem.addEventListener('click', onTabMoveHandler);
})();