export function init() {
    const URL = {
        GET_PROGRESS_ALL: '/learn/getProgressPercent',
        GET_ARTILCE_SENTENCE: '/learn/getArticleSentence',
        UPDATE_USER_SENTENCE: '/learn/updateUserSentence',
        UPDATE_ARTICLE_DONE: '/learn/updateArticleDone'
    }

    const percentElem = document.querySelector('.leaning-progress-percent span:first-child');
    const learningSentenceElem = document.querySelector('#learningSentence');
    let restart = null;
    let currentCount = 0;
    let pie = 0;
    let _allProgressPercent = 0;
    let triggerNumber=0;

    function getProgress() {
        const options = {
            method: 'POST',
            data: JSON.stringify({
                user_learning_seq: document.querySelector('#currentArticle').getAttribute("data-user-learning-seq")
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return axios(URL.GET_PROGRESS_ALL, options).then(response => response.data);
    }

    function getArticleSentence() {
        const options = {
            method: 'POST',
            data: JSON.stringify({
                article_seq: document.querySelector('#currentArticle').getAttribute("data-article-seq"),
                user_learning_seq: document.querySelector('#currentArticle').getAttribute("data-user-learning-seq"),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return axios(URL.GET_ARTILCE_SENTENCE, options).then(response => response.data);
    }

    async function setData() {
        const sentenceList = await getArticleSentence();
        getList(sentenceList);
        await progressUpdate();
    }

    async function progressUpdate() {
        _allProgressPercent = _allProgressPercent = await getProgress();
        updateAllProgress(_allProgressPercent.percent);
        await circleProgress();
    }

    function updateAllProgress(percent) {
        const percentBarElem = document.querySelector('.leaning-current-progress-bar-success');
        const progressInfoElem = document.querySelector('#progressInfo');
        const _percent = `${percent}%`;
        progressInfoElem.innerText = _percent;
        percentBarElem.style.width = _percent;
        const done = document.querySelector('#currentArticle').getAttribute("data-learning-done");
        console.log(done);
        if(percent === 100 && done != 1) {
            document.getElementById('signinup-modal').style.display = "flex";
            document.getElementById('main-login-form').classList.remove('hidden');
            updateArticleDone();
        }
    }

    function updateArticleDone() {
        const options = {
            method: 'POST',
            data: JSON.stringify({
                article_seq: document.querySelector('#currentArticle').getAttribute("data-article-seq"),
                user_learning_seq: document.querySelector('#currentArticle').getAttribute("data-user-learning-seq"),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios(URL.UPDATE_ARTICLE_DONE, options).then(response => {
            console.log(response.data);
        });
    }


    function onSentenceClickHandler(event) {
        const liElems = document.querySelectorAll('#learningSentence>li');
        let targetElem = event.target;
        if(targetElem.nodeName == 'UL' || targetElem.classList.contains('sentence__translate')) {
            return false;
        }
        const liElem = targetElem.closest('li');

        if(targetElem.nodeName === 'I' && targetElem.classList.contains('icon_translate')) {
            papago(liElem.childNodes[0].innerText, liElem.childNodes[4]);
            return;
        }


        for(let obj of liElems) {
            obj.classList.remove('active');
            obj.lastElementChild.classList.add('n-none');
            obj.dataset.state = 'read'
            changeInputMode(obj);
        }
        if(!liElem.classList.contains('active')) {
            liElem.classList.add('active');
            liElem.lastElementChild.classList.remove('n-none');
            liElem.dataset.state = 'update'
            changeInputMode(liElem);
        }

        if(targetElem.nodeName === 'BUTTON') {
            if(targetElem.classList.contains('btn-secondary')) {
                if(liElem.previousElementSibling != null) {
                    liElem.previousElementSibling.click();
                }
            } else {
                if(liElem.nextElementSibling != null) {
                    liElem.nextElementSibling.click();
                }
            }
        }
    };

    function getList(list) {
        learningSentenceElem.innerHTML = '';
        console.log(list);
        let check = 0;
        for(let obj of list) {
            learningSentenceElem.appendChild(getSentence(obj));
            if(Number(obj.last_sentence) === 1) {
                triggerNumber = check;
            }
            check++;
        }

        document.querySelectorAll('.learning__sentence-item-options-right')[0].childNodes[1].style.display = 'none';
        document.querySelectorAll('.learning__sentence-item-options-right')[document.querySelectorAll('.learning__sentence-item-options-right').length-1].childNodes[3].style.display = 'none';
        if(list.length > 0) {
            learningSentenceElem.children[triggerNumber].click();
        }
    }

    function changeInputMode(target) {
        if(target.dataset.state === 'update') {
            target.childNodes[2].firstElementChild.classList.add('n-none');
            target.childNodes[2].lastElementChild.classList.remove('n-none');
            console.log(target.childNodes[2]);
            // target.childNodes[2].lastElementChild.classList.remove('n-none');
            target.childNodes[4].classList.remove('n-none');
            target.childNodes[2].lastElementChild.focus();
            target.childNodes[2].lastElementChild.removeEventListener('change', inputLabel);
            target.childNodes[2].lastElementChild.addEventListener('change', inputLabel);
            target.childNodes[2].lastElementChild.removeEventListener('keyup', onSentenceSaveHandler);
            target.childNodes[2].lastElementChild.addEventListener('keyup', onSentenceSaveHandler);
        } else {
            target.childNodes[2].firstElementChild.classList.remove('n-none');
            target.childNodes[2].lastElementChild.classList.add('n-none');
            target.childNodes[2].lastElementChild.removeEventListener('focusout', onSentenceSaveHandler);
            target.childNodes[2].lastElementChild.addEventListener('focusout', onSentenceSaveHandler);
        }
    }
    function inputLabel(e) {
        this.previousElementSibling.innerText = this.value;
    }

    function onSentenceSaveHandler(e) {
        console.log(e.code);
        if(e.code !== 'Enter') {
            const targetElem = this.closest('li');
            const obj = {
                user_sentence_seq: targetElem.getAttribute('data-user-sentence-seq'),
                kor_sentence: this.value
            }
            userSentenceSave(obj);
        } else if(e.code === 'Enter') {
            const targetElem = this.closest('li');
            if(targetElem.nextElementSibling != null) {
                targetElem.nextElementSibling.click();
                e.stopPropagation();
            } else {
                document.querySelector('#learnContents').click();
            }
        }
    }

    function getSentence(obj) {
        const liElem = document.createElement('li');
        liElem.classList.add('learning__sentence-item')
        liElem.dataset.state = 'read'
        liElem.dataset.userSentenceSeq = obj.user_sentence_seq;
        liElem.innerHTML = `<div class="learning__sentence-item-eng">
                                <p>${obj.eng_sentence}</p>
                            </div>
                            <div class="learning__sentence-item-kor">
                                <p class="text h6 text-color-gray300">${obj.kor_sentence != null ? obj.kor_sentence : ''}</p>
                                <input type="text" class="text h6 n-none" value="${obj.kor_sentence != null ? obj.kor_sentence : ''}" placeholder="해석을 입력하세요.">
                            </div>
                            <p class="text body2 n-none sentence__translate"></p>
                            <div class="learning__sentence-item-options n-none">
                                <div class="learning__sentence-item-options-left">
                                    <span>
                                        <i class="icon_speaker text text-color-gray300"></i>
                                    </span>
                                    <span>
                                        <i class="icon_translate text text-color-gray300"></i>
                                    </span>
                                </div>
                                <div class="learning__sentence-item-options-right">
                                    <button class="btn btn-secondary">
                                        <i class="icon_chevron-left"></i>
                                        <span class="text body1">이전 문장</span>
                                    </button>
                                    <button class="btn btn-outline-primary nextWord">
                                        <span class="text body1">다음 문장</span>
                                        <i class="icon_chevron-right"></i>
                                    </button>
                                </div>
                            </diV>`
        return liElem;
    }

    async function circleProgress() {
        let sentenceList = await getArticleSentence();
        currentCount = 0;
        for (let obj of sentenceList) {
            if (obj.kor_sentence != '' && obj.kor_sentence != null) {
                currentCount++;
            }
        }
        const max = (currentCount / sentenceList.length) * 2;
        document.querySelector('#leaning-progress').children[0].setAttribute('stroke-dasharray', `${(max / 2) * 100}, 100`);
        percentElem.innerHTML = Math.round((max / 2) * 100) + '%';

        // const canvasElem = document.querySelector('.leaning-progress-canvas');
        // const context = canvasElem.getContext('2d');
        // const centerX = canvasElem.width / 2;
        // const centerY = canvasElem.height / 2;
        // const radius = 73;
        //
        //
        // context.beginPath();
        // context.arc(centerX, centerY, radius, 0, ((pie / 2) * Math.PI) * 2, false);
        // context.lineWidth = 16;
        // context.lineCap = 'round';
        // context.strokeStyle = '#257FF9';
        // context.stroke();
        // pie += 0.035;
        // restart = requestAnimationFrame(circleProgress);
        // if (pie >= max) {
        //     cancelAnimationFrame(restart);
        // }
    }

    function userSentenceSave(obj) {

        const data = {
            article_seq: document.querySelector('#currentArticle').getAttribute("data-article-seq"),
            user_learning_seq: document.querySelector('#currentArticle').getAttribute("data-user-learning-seq"),
            ...obj
        }

        const options = {
            method: 'POST',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios(URL.UPDATE_USER_SENTENCE, options).then(response => {
            if(response.data) {
                progressUpdate();
            }
        });
    }

    function papago(text, pTagElem) {
        const data = {
            "source": "en",
            "target": "ko",
            "text": text
        }
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        axios(proxyurl+'https://openapi.naver.com/v1/papago/n2mt', {
            method: 'POST',
            data: JSON.stringify(data),
            headers: {
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'X-Naver-Client-Id': '3rwP_CWXBIQkyjfnJG6x',
                'X-Naver-Client-Secret': 'ZeLqe4Ki5L'
            }
        }).then(response => {
            pTagElem.innerText = response.data.message.result.translatedText;
        })
    }

    window.addEventListener("click", function (event) {
        const li = event.target.closest('li');
        if(li == null) {
            const liElems = document.querySelectorAll('#learningSentence>li');
            for(let obj of liElems) {
                obj.classList.remove('active');
                obj.lastElementChild.classList.add('n-none');
                obj.dataset.state = 'read'
                changeInputMode(obj);
            }
            event.stopPropagation();
        }
    })

    learningSentenceElem.addEventListener('click', onSentenceClickHandler);
    setData();
}
