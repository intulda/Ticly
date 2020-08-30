(()=>{
    const URL = {
        UPDATE_LAST_TYPE: '/learn/updateLastLearningType',
        WORD_TEMPLATE: '/learn/learnWordTemplate',
        GET_PROGRESS_ALL: '/learn/getProgressPercent',
        SENTENCE_TEMPLATE: '/learn/learnSentenceTemplate'
    }
    //tab event
    const tabClickElem = document.querySelector('#learnTab');
    const contentElem = document.querySelector('#learnContents');
    const currentArticleElem = document.querySelector('#currentArticle');
    const articleLocateElem = document.querySelector('#move-original-article');
    const moreArticleElem = document.querySelector('#move-another-article');

    function init() {
        const lastType = currentArticleElem.getAttribute("data-last-learning-type");
        tabClickElem.children[lastType].click();
    }

    function onLastTypeUpdateHandler(e) {
        const targetElem = e.target;
        const typeNumber = Number(targetElem.getAttribute("data-type"));

        axios(URL.UPDATE_LAST_TYPE, {
            method: 'POST',
            data: JSON.stringify({
                user_learning_seq: currentArticleElem.getAttribute("data-user-learning-seq"),
                article_seq: currentArticleElem.getAttribute("data-article-seq"),
                last_learning_type: typeNumber
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(typeNumber === 1) {
            sentenceTemplate();
        } else {
            wordTemplate();
        }
    }

    function wordTemplate() {
        axios(URL.WORD_TEMPLATE, {
            method: 'POST',
            data: {},
        }).then(respones => {
            console.log(respones);
            contentElem.innerHTML = respones.data;
            importReload('./LearnWord.js');
        })
    }

    function sentenceTemplate() {
        axios(URL.SENTENCE_TEMPLATE, {
            method: 'POST',
            data: {},
        }).then(respones => {
            contentElem.innerHTML = respones.data;
            importReload('./LearnSentence.js');
        })
    }

    function importReload(module) {
        const importJs = import(module);
        importJs.then((module) => {
            module.init();
        })
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

    function onPageMoveHandler(e) {
        let linkValue = '';
        let target = '';
        if(this === moreArticleElem) {
            linkValue = '/'
            target = '_self'
        } else {
            linkValue = document.querySelector('#articleLink').getAttribute('href');
            target = '_blank';
        }
        window.open(linkValue,target)
    }
    document.getElementById('signinup-modal').addEventListener('click', (e) =>{
        if(e.target == document.getElementById('signinup-modal')) {
            document.getElementById('signinup-modal').style.display = "none";
            document.getElementById('main-login-form').classList.add('hidden');
            e.stopPropagation();
        }
    })

    document.getElementById('modal-close').addEventListener('click', (e) => {
        document.getElementById('signinup-modal').style.display = "none";
        document.getElementById('main-login-form').classList.add('hidden');
        e.stopPropagation();
    })
    tabClickElem.addEventListener('click', onTabMoveHandler);
    articleLocateElem.addEventListener('click', onPageMoveHandler)
    moreArticleElem.addEventListener('click', onPageMoveHandler)

    init();
})();