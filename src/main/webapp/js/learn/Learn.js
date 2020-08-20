import WordSetCard from './WordSet.js';
import ArticleTable from "./ArticleTable.js";
import WordContent from './WordContent.js';

(() => {
    const URL = {
        GET_VOCA_LIST: '/learn/getVocaList',
        GET_VOCA_GROUP: '/learn/getVocaGroupList',
        GET_PROGRESS_ALL: '/learn/getProgressPercent',
        UPDATE_CHECK_READING: '/learn/saveWordReading',
        UPDATE_LAST_VOCA: '/learn/updateLastVoca',
        SAVE_USER_VOCA: '/learn/saveUserVoca',
        DELETE_USER_VOCA: '/learn/deleteUserVoca',
        UPDATE_USER_VOCA: '/learn/updateUserWord',
        SAVE_VOCA_GROUP: '/learn/saveVocaGroup'
    }

    //단어 데이터
    function getVocaList() {
        const options = {
            method: 'POST',
            data: JSON.stringify({
                article_seq: document.querySelector('#currentArticle').getAttribute("data-article-seq"),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return axios(URL.GET_VOCA_LIST, options).then(response => response.data);
    }

    //단어 그룹 데이터
    function getVocaGroup(userLearningSeq) {
        const options = {
            method: 'POST',
            data: JSON.stringify({
                user_learning_seq: userLearningSeq
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return axios(URL.GET_VOCA_GROUP, options).then(response => response.data);
    }

    function getProgress(userLearningSeq) {
        const options = {
            method: 'POST',
            data: JSON.stringify({
                user_learning_seq: userLearningSeq
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return axios(URL.GET_PROGRESS_ALL, options).then(response => response.data);
    }

    /**
     * 테이블 유저단어 추가
     * @param _data
     */
    function saveUserVoca(_data) {
        axios(URL.SAVE_USER_VOCA,{
            method: 'POST',
            data: JSON.stringify(_data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.data) {
                learn.setData(false, 'update');
            } else {
                alert("오류났어용");
            }
        }).catch(error => {
            console.log(error);
        })
    }

    /**
     * 테이블 단어삭제 비동기 통신
     * @param _data
     */
    function wordRemove(_data) {
        axios(URL.DELETE_USER_VOCA,{
            method: 'POST',
            data: JSON.stringify(_data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.data) {
                learn.setData(false, 'update');
            } else {
                alert("오류났어용");
            }
        }).catch(error => {
            console.log(error);
        })
    }

    function updateUserVoca(_obj) {
        axios(URL.UPDATE_USER_VOCA, {
            method: 'POST',
            data: JSON.stringify(_obj),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.data) {
                learn.setData(false, 'update');
            } else {
                alert("오류났어용");
            }
        }).catch(error => {
            console.log(error);
        })
    }

    function lastVocaUpdate(nextElem) {
        const _target = nextElem;
        const vocaSeq = _target.dataset.user_voca_seq;

        axios(URL.UPDATE_LAST_VOCA, {
            method: 'POST',
            data: JSON.stringify({
                user_voca_seq: vocaSeq
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    /**
     * check_reading update
     * @param target
     */
    function readingCheckHandler(target) {
        if(target != null) {
            const _target = target;
            const vocaSeq = _target.dataset.user_voca_seq;
            const userLearningSeq = _target.dataset.user_learning_seq;
            const checkReading = _target.dataset.check_reading;

            if(checkReading != 1) {
                axios(URL.UPDATE_CHECK_READING, {
                    method: 'POST',
                    data: JSON.stringify({
                        user_voca_seq: vocaSeq,
                        user_learning_seq: userLearningSeq,
                        check_reading: checkReading
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if(response.data) {
                        learn.setData(false);
                    }
                })
            }
        }
    }

    /**
     * 단어 그룹 추가
     * @param _obj
     */
    function saveVocaGroup(_obj) {
        const options = {
            method: 'POST',
            data: JSON.stringify(_obj),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios(URL.SAVE_VOCA_GROUP, options)
            .then(response => {
                if(response.data) {
                    learn.setData(false);
                }
            }).catch(error => console.log(error));
    }

    //단어셋 추가
    const wordSetElem = document.querySelector('#wordSet');
    const wordSetBtnAddElem = document.querySelector('#wordSetAdd');

    //Circle Progress bar
    const percentElem = document.querySelector('.leaning-progress-percent span:first-child');
    let restart = null;
    let currentCount = 0;
    let pie = 0;
    let vocaData = [];

    //tab event
    const tabClickElem = document.querySelector('#learnTab');
    //카드회전
    const wordCardElem = document.querySelector('.leaning-contents-card-wrap');
    //테이블 th클릭
    const tableElem = document.querySelector('.leaning-table');

    //테이블 엘리먼트
    const allDel = document.querySelector('#tableAllCheck');
    const delBox = document.querySelector('#articleWordTable');

    //단어추가, 삭제
    const tableWordAddElem = document.querySelector('#tableWordAdd');
    const tableWordRemoveElem = document.querySelector('#tableWordRemove');
    //학습하기 페이지 class
    class Learn {
        constructor() {
            this.data = [];
            this.groupMaxCount = 1;
            this.wordSetElem = wordSetElem;
            this.group = 1;
            this.currentCount = 0;
            this.triggerNumber = 0;
            this.allProgressPercent = 0;
            this.userLearningSeq = 0;
            //wordTable
            this.articleWordTableElem = document.querySelector("#articleWordTable");
            //wordContents
            this.wordContentsElem = document.querySelector("#wordList");
            this.inputElem = null;
        }

        async setData(check, type) {
            const vocaList = await getVocaList();
            this.userLearningSeq = vocaList.length > 0 ? vocaList[0].user_learning_seq : 0;
            const vocaGroupList = await getVocaGroup(this.userLearningSeq);
            const _allProgressPercent = await getProgress(this.userLearningSeq);

            this.data = vocaList;
            this.allProgressPercent = _allProgressPercent.percent;
            this.groupMaxCount = vocaGroupList.length;
            if(check) {
                this.init();
            } else {
                this.updateContents(type);
            }
        }

        init() {
            this.updateAllProgress();
            this.circleProgressInit();
            this.wordSetProcess();
            if(this.wordSetElem.children.length > 0) {
                this.wordSetElem.children[this.triggerNumber].click();
            }
        }

        updateContents(type) {
            this.currentCount = 0;
            this.updateAllProgress();
            this.circleProgressInit();
            for(let i=0; i<this.wordSetElem.children.length; i++) {
                if(this.wordSetElem.children[i].classList.contains('active')) {
                    const groupNumber = this.wordSetElem.children[i].getAttribute('data-group');
                    this.tableDataFilter(groupNumber);
                    this.wordCountUpdate(groupNumber);
                    this.wordContentInformationUpdate(groupNumber);
                    if(type == 'update') {
                        this.wordContentFilter(groupNumber);
                    }
                    break;
                }
            }
        }

        updateAllProgress() {
            const percentBarElem = document.querySelector('.leaning-current-progress-bar-success');
            const progressInfoElem = document.querySelector('#progressInfo');
            const _percent = `${this.allProgressPercent}%`;
            progressInfoElem.innerText = _percent;
            percentBarElem.style.width = _percent;
        }

        wordSetProcess() {
            this.wordSetElem.innerHTML = "";
            const lastVoca = this.data.filter((obj) => {
                return obj.last_voca == 1;
            })
            if(lastVoca.length > 0) {
                this.triggerNumber = lastVoca[0].voca_group-1
            } else {
                this.triggerNumber = 0;
            }

            for(let i=1; i<=this.groupMaxCount; i++) {
                this.group = i;
                for(let j=0; j<this.data.length; j++) {
                    if(i == this.data[j].voca_group) {
                        if(this.data[j].check_reading === 1) {
                            this.currentCount++;
                        }
                    }
                }
                this.wordSetAdd(this.groupDataFilter(i).length);
                this.group = this.groupMaxCount+1;
                this.currentCount = 0;
            }
        }

        wordSetAdd(maxCount) {
            this.wordSetElem.appendChild(new WordSetCard(this.currentCount, maxCount, this.group).getElements());
        }

        wordCountUpdate(groupNumber) {
            let _currentCount = 0;
            const _target = document.querySelector(`#word${groupNumber}`);
            const _nextTarget = _target.nextElementSibling;
            const _data = this.groupDataFilter(groupNumber);
            for(let obj of _data) {
                if(obj.check_reading === 1) {
                    _currentCount++;
                }
            }
            _target.innerText = _currentCount;
            _nextTarget.innerText = _data.length;
        }

        vocaSeqDataFilter(vocaSeq) {
            const data = this.data.filter((obj) => {
                return obj.user_voca_seq == vocaSeq;
            })
            return data;
        }

        groupDataFilter(groupNum) {
            const data = this.data.filter((obj) => {
                return obj.voca_group == groupNum;
            })
            return data;
        }

        groupCheckReadingFilter(groupNum) {
            const data = this.data.filter((obj) => {
                return obj.voca_group == groupNum && obj.check_reading === 1;
            })
            return data;
        }

        tableDataFilter(groupNum) {
            allDel.checked = false;
            tableElem.dataset.state = 'read';
            this.currentCount = 0;
            const tableInformationElem = document.querySelector('#tableInformation');
            const _data = this.groupDataFilter(groupNum);
            const _elements = new ArticleTable(_data);
            this.articleWordTableElem.innerHTML = '';
            for(let obj of _elements.process()) {
                this.articleWordTableElem.appendChild(obj);
            }
            tableInformationElem.innerHTML = _elements.getTableInformation(groupNum);
            resetTableEvent();

            tableElem.dataset.group = groupNum;

        }

        wordContentFilter(groupNum) {
            const _title = document.querySelector("#contentTitle");
            const _information = document.querySelector("#contentInformation");

            const _data = this.groupDataFilter(groupNum);
            this.wordContentsElem.innerHTML = '';
            const _elements = new WordContent(_data);
            _title.innerHTML = `단어 세트 ${groupNum}`;
            _information.innerHTML = _elements.getContentInformation();

            if(_elements.process().length > 0) {
                for(let obj of _elements.process()) {
                    this.wordContentsElem.appendChild(obj);
                }
                this.wordContentsElem.appendChild(_elements.getLastCardElement(groupNum, this.groupMaxCount));
            } else {
                this.wordContentsElem.appendChild(_elements.getElements(null, 'act'));
            }
        }

        wordContentInformationUpdate(groupNum) {
            const _title = document.querySelector("#contentTitle");
            const _information = document.querySelector("#contentInformation");

            const _data = this.groupDataFilter(groupNum);
            const _elements = new WordContent(_data);
            _title.innerHTML = `단어 세트 ${groupNum}`;
            _information.innerHTML = _elements.getContentInformation();
        }

        circleProgressInit() {
            setTimeout(circleProgress, 300);
        }

        getInputElement() {
            const _groupNumber = tableElem.getAttribute("data-group");
            const _data = this.groupDataFilter(_groupNumber);
            const _elements = new ArticleTable(_data.length > 0 ? _data : this.data).getInputElement(_groupNumber);
            this.articleWordTableElem.appendChild(_elements);
            this.inputElem = _elements;
            this.inputElem.addEventListener('click', onAddElementHandler);
        }
    }

    const learn = new Learn();
    learn.setData(true);

    async function circleProgress() {
        let vocaData = learn.data;
        currentCount = 0;
        for (let obj of vocaData) {
            if (obj.check_reading === 1) {
                currentCount++;
            }
        }
        const canvasElem = document.querySelector('.leaning-progress-canvas');
        const context = canvasElem.getContext('2d');
        const centerX = canvasElem.width / 2;
        const centerY = canvasElem.height / 2;
        const radius = 73;
        const max = (currentCount / vocaData.length) * 2;
        percentElem.innerHTML = Math.round((max / 2) * 100) + '%';
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, ((pie / 2) * Math.PI) * 2, false);
        context.lineWidth = 16;
        context.lineCap = 'round';
        context.strokeStyle = '#257FF9';
        context.stroke();
        pie += 0.035;
        restart = requestAnimationFrame(circleProgress);
        if (pie >= max) {
            cancelAnimationFrame(restart);
        }
    }

    function onWordSetBtnHandler(e) {
        const _obj = {
            user_learning_seq: learn.userLearningSeq,
            article_seq: document.querySelector('#currentArticle').getAttribute("data-article-seq"),
            voca_group: Number(learn.groupMaxCount)+1
        }
        saveVocaGroup(_obj);
        learn.wordSetAdd(0);
    }

    function onWordSetClickHandler(e) {
        let targetElem = e.target;

        if(targetElem.nodeName === "UL") {
            return;
        }

        if(targetElem.nodeName !== "LI") {
            targetElem = e.target.closest('li');
        }

        if(targetElem.nodeName === "LI") {
            for(let i=0; i<targetElem.parentElement.children.length; i++) {
                targetElem.parentElement.children[i].classList.remove("active");
            }
            targetElem.classList.add('active');
            const groupNumber = targetElem.getAttribute("data-group");
            learn.tableDataFilter(groupNumber);
            learn.wordContentFilter(groupNumber);

            const actElem = document.querySelector(".act");
            if(actElem != null) {
                if(actElem.getAttribute("data-user_voca_seq") != null) {
                    lastVocaUpdate(actElem);
                }
            }
        }
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
        }
    }

    function onCardToggleHandler(e) {
        e.stopPropagation();
        let targetElem = e.target

        if(targetElem.classList.contains('leaning-contents-card-front')) {
            frontToBack(targetElem);
        } else if(targetElem.classList.contains('leaning-contents-card-back')) {
            backToFront(targetElem);
        }
    }

    function frontToBack(targetElem) {
        targetElem.classList.remove('active');
        targetElem.style.transform = 'rotateX(180deg)';
        targetElem.nextElementSibling.classList.add('active');
        targetElem.nextElementSibling.style.transform = 'rotateX(360deg)';
    }

    function backToFront(targetElem) {
        targetElem.classList.remove('active');
        targetElem.style.transform = 'rotateX(180deg)';
        targetElem.previousElementSibling.classList.add('active');
        targetElem.previousElementSibling.style.transform = 'rotateX(0deg)';
    }

    /**
     * table sort icon change
     * @param e
     */
    // function onTableSortHandler(e) {
    //     let targetElem = e.target;
    //
    //     if(targetElem.nodeName === 'TD' || targetElem.nodeName === 'I') {
    //         return;
    //     }
    //     if(targetElem.classList.contains('icon_info_circle')){
    //         targetElem = targetElem.parentNode;
    //     }
    //     const childElem = targetElem.children[0];
    //     if(childElem.classList.contains('icon_sort')) {
    //         childElem.classList.remove('icon_sort');
    //         childElem.classList.add('icon_sort_upper')
    //     } else if (childElem.classList.contains('icon_sort_upper')) {
    //         childElem.classList.remove('icon_sort_upper');
    //         childElem.classList.add('icon_sort_lower');
    //     } else if(childElem.classList.contains('icon_sort_lower')) {
    //         childElem.classList.remove('icon_sort_lower');
    //         childElem.classList.add('icon_sort');
    //     }
    // }

    const wordSwipeElem = document.querySelector(".leaning-contents-right-word");

    function onSwipeHandler(e) {
        const targetElem = e.target;
        if(targetElem.id === 'wordSwipeLeft') {
            swipeLeft();
        } else if(targetElem.id === 'wordSwipeRight') {
            swipeRight();
        }
    }

    function swipeLeft () {
        const actElem = document.querySelector(".act");
        if(actElem.previousElementSibling != null) {
            const prevTarget = actElem.previousElementSibling;
            actElem.classList.remove('act');
            actElem.classList.add('word-list-hide');
            prevTarget.classList.remove('word-list-end');
            prevTarget.classList.add('act');
            reset(actElem);
            lastVocaUpdate(prevTarget);
        } else {
            lastVocaUpdate(actElem);
        }
    }

    function swipeRight () {
        const actElem = document.querySelector(".act");
        if(actElem.nextElementSibling != null) {
            const nextTarget = actElem.nextElementSibling;
            actElem.classList.remove('act');
            actElem.classList.add('word-list-end');
            nextTarget.classList.remove('word-list-hide');
            nextTarget.classList.add('act');
            reset(actElem);
            readingCheckHandler(actElem);
            if(nextTarget.dataset.user_voca_seq != null) {
                lastVocaUpdate(nextTarget);
            }
        }
    }

    function reset(actElem) {
        for(let obj of actElem.children) {
            if(obj.classList.contains("active")) {
                if(!obj.classList.contains('leaning-contents-card-front')) {
                    backToFront(obj);
                    break;
                }
            }
        };
    }






    /**
     * 테이블 전체 삭제 체크박스 선택/해제
     */
    function allDeleteCheck() {
        inputAllChecked(this.checked);
    }

    function inputAllChecked(checked) {
        const _delCheckBox = document.querySelectorAll('tbody input[name=tableDel]');
        for (let node of _delCheckBox) {
            node.checked = checked;
        }
    }

    function selectCheck(e) {
        if(e.target.nodeName === 'INPUT') {
            allDel.checked = inputChecked();
        }
    }

    /**
     * 체크박스 함수
     * @returns {boolean}
     */
    function inputChecked() {
        const _delCheckBox = document.querySelectorAll('tbody input[name=tableDel]');
        let check = false;
        for(let node of _delCheckBox) {
            if(node.checked) {
                check = true;
            } else {
                check = false;
                break;
            }
        }
        return check;
    }


    /**
     * 테이블에 insert폼 넣는 함수
     * @param e
     */
    function onTableWordAddHandler(e) {
        if(tableElem.dataset.state !== 'insert') {
            tableElem.dataset.state = 'insert';
            learn.getInputElement(tableElem.getAttribute("data-group"));
        }
    }

    /**
     * 테이블 add element remove
     * @param event
     */
    function onAddElementHandler(e) {
        let _targetElem = e.target;
        _targetElem.dataset.state = 'read';

        if(_targetElem.nodeName !== 'I' && _targetElem.nodeName !== 'BUTTON') {
            return;
        }

        if(_targetElem.nodeName === 'I') {
            _targetElem = e.target.parentNode;
        }

        if(_targetElem.id === 'wordSave') {
            const _groupNumber = _targetElem.closest("tr").getAttribute("data-group");
            const _userLearningSeq = _targetElem.closest("tr").getAttribute("data-user-learning");
            const _articleSeq = _targetElem.closest("tr").getAttribute("data-article-seq");
            const _voca = document.querySelector('#tableAddVoca');
            const _meaning = document.querySelector('#tableAddMeaning');

            const _data = {
                user_learning_seq: _userLearningSeq,
                article_seq: _articleSeq,
                voca_group: _groupNumber,
                voca: _voca.value,
                meaning: _meaning.value
            };
            saveUserVoca(_data);

        } else {
            _targetElem.closest("tr").remove();
        }
    }

    /**
     * 테이블 단어삭제 핸들러
     * @param event : e
     */
    function onTableWordRemoveHandler(e) {
        const _delCheckBox = document.querySelectorAll('tbody input[name=tableDel]:checked');
        let _data = [];
        for(let obj of _delCheckBox) {
            _data.push({user_voca_seq:obj.closest('tr').getAttribute('data-voca-seq')});
        }
        wordRemove(_data);
    }



    /**
     * 테이블 수정 삭제 이벤트
     * @param e
     */
    function onWordStateHandler(e) {
        if(e.target.nodeName !== 'I') {
            return;
        }
        const trElem = e.target.closest('tr');
        const trElemSeq = trElem.getAttribute('data-voca-seq');
        if(e.target.className === 'icon_trash') {
            let _data = [{
                user_voca_seq: trElemSeq
            }];
            wordRemove(_data);
        } else {
            // tableElem.dataset.state = 'update';
            trElem.innerHTML = new ArticleTable().getElements(learn.vocaSeqDataFilter(trElemSeq), 'update');
            const wordUpdateElems = document.querySelectorAll('.tableWordUpdate');
            for(let node of wordUpdateElems) {
                node.addEventListener('click', onUpdateElementHandler)
            }
        }
    }

    /**
     * 단어 수정시 저장과 취소 함수
     * @param e
     */
    function onUpdateElementHandler(e) {
        let targetElem = e.target;
        if (targetElem.nodeName !== 'BUTTON' && targetElem.nodeName !== 'I') {
            return;
        }
        const trElem = targetElem.closest('tr');
        const trElemSeq = trElem.getAttribute('data-voca-seq');
        if(targetElem.nodeName === 'I') {
            targetElem = targetElem.parentElement;
        }
        if(targetElem.id === 'updateWord') {
            const _voca = trElem.children.item(1).children[0].value;
            const _meaning = trElem.children.item(2).children[0].value;
            let _obj = {
                user_voca_seq: trElemSeq,
                voca : _voca,
                meaning: _meaning
            }
            updateUserVoca(_obj);

        } else {
            trElem.innerHTML = '';
            const obj = learn.vocaSeqDataFilter(trElemSeq);
            trElem.innerHTML = new ArticleTable().getElements(obj[0], 'remove');
            resetTableEvent();

        }
    }

    /**
     * 동적인 테이블 이벤트를 다시 주기위한 함수
     */
    function resetTableEvent() {
        const tableState = document.querySelectorAll('.learn__wordOne');
        for(let node of tableState) {
            node.addEventListener('click', onWordStateHandler);
        }
    }

    function nextLevel(e) {
        const targetElem = e.target;
        if(targetElem.nodeName != 'BUTTON') {
            return;
        }
        if(targetElem.dataset.status != 'sentence') {
            learn.wordSetElem.children[targetElem.dataset.status-1].click();
        } else {
            const learnTabElem = document.querySelector('#learnTab');
            learnTabElem.children[1].click();
        }
    }

    const wordListElem = document.querySelector('#wordList');
    wordListElem.addEventListener('click', nextLevel);

    tabClickElem.addEventListener('click', onTabMoveHandler);
    wordCardElem.addEventListener('click', onCardToggleHandler);
    // tableElem.addEventListener('click', onTableSortHandler);
    wordSetBtnAddElem.addEventListener('click', onWordSetBtnHandler);
    wordSetElem.addEventListener('click', onWordSetClickHandler)
    wordSwipeElem.addEventListener('click', onSwipeHandler);
    allDel.addEventListener('click', allDeleteCheck);
    delBox.addEventListener('click', selectCheck);
    tableWordAddElem.addEventListener('click', onTableWordAddHandler)
    tableWordRemoveElem.addEventListener('click', onTableWordRemoveHandler)
})()