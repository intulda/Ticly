import WordSetCard from './WordSet.js';
import ArticleTable from "./ArticleTable.js";
import WordContent from './WordContent.js';

(() => {
    //단어 데이터
    function getVocaList() {
        const options = {
            method: 'POST',
            data: JSON.stringify({
                article_seq: 43
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return axios('/learn/getVocaList', options).then(response => response.data);
    }

    //단어셋 추가
    const wordSetElem = document.querySelector('#wordSet');
    const wordSetBtnElem = document.querySelector('#wordSetAdd');

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

    //학습하기 페이지 class
    class Learn {
        constructor() {
            this.data = [];
            this.sortData = [];
            this.groupMaxCount = 1;
            this.wordSetElem = wordSetElem;
            this.wordSetCurrentNumber = 0;
            this.group = 1;
            this.currentCount = 0;
            this.maxCount = 10;
            this.triggerNumber = 0;
            //wordTable
            this.articleWordTableElem = document.querySelector("#articleWordTable");

            //wordContents
            this.wordContentsElem = document.querySelector("#wordList");
        }

        async setData(check) {
            const vocaList = await getVocaList();
            this.data = vocaList;
            console.log(this.data);
            this.wordSetCurrentNumber = 0;
            this.totalCount = this.data.length;
            this.wordSetCurrentNumber = this.wordSetElem.children.length;
            this.groupMaxCount = Math.ceil(this.totalCount/this.maxCount);
            if(check) {
                this.init();
            } else {
                this.currentCount = 0;
                this.circleProgressInit();
                for(let i=0; i<this.wordSetElem.children.length; i++) {
                    if(this.wordSetElem.children[i].classList.contains('active')) {
                        const groupNumber = this.wordSetElem.children[i].getAttribute('data-group');
                        this.tableDataFilter(groupNumber);
                        this.wordCountUpdate(groupNumber);
                        break;
                    }
                }

            }
        }

        init() {
            this.circleProgressInit();
            this.wordSetProcess();
            if(this.wordSetElem.children.length > 0) {
                this.wordSetElem.children[this.triggerNumber].click();
            }
        }

        wordSetProcess() {
            this.wordSetElem.innerHTML = "";
            for(let i=1; i<=this.groupMaxCount; i++) {
                if(this.currentCount == this.groupDataFilter(i).length) {
                    this.triggerNumber = i-1;
                    break;
                }
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
                this.group = this.groupMaxCount + 1;
                this.currentCount = 0;
            }
        }

        wordSetAdd(maxCount) {
            this.wordSetCurrentNumber++;
            this.wordSetElem.appendChild(new WordSetCard(this.wordSetCurrentNumber, this.currentCount, maxCount, this.group).getElements());
        }

        wordCountUpdate(groupNumber) {
            const _target = document.querySelector(`#word${groupNumber}`);
            let number = Number(_target.innerText);
            _target.innerText = number+1;
        }

        groupDataFilter(groupNum) {
            const data = this.data.filter((obj) => {
                return obj.voca_group == groupNum;
            })
            return data;
        }

        tableDataFilter(groupNum) {
            this.currentCount = 0;
            const tableInformationElem = document.querySelector('#tableInformation');
            const _data = this.groupDataFilter(groupNum);
            const _elements = new ArticleTable(_data);
            this.articleWordTableElem.innerHTML = '';
            for(let obj of _elements.process()) {
                this.articleWordTableElem.appendChild(obj);
            }
            tableInformationElem.innerHTML = _elements.getTableInformation(groupNum);
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
            } else {
                this.wordContentsElem.appendChild(_elements.getElements(null, 'act'));
            }
        }

        circleProgressInit() {
            setTimeout(circleProgress, 300);
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
        console.log("pie",pie);
        console.log("max",max);
        if (pie >= max) {
            cancelAnimationFrame(restart);
        }
    }

    function onWordSetBtnHandler(e) {
        learn.wordSetAdd(0);
    }

    function onWordSetHandler(e) {
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
    function onTableSortHandler(e) {
        let targetElem = e.target;

        if(targetElem.nodeName === 'TD' || targetElem.nodeName === 'I') {
            return;
        }
        if(targetElem.classList.contains('icon_info_circle')){
            targetElem = targetElem.parentNode;
        }
        const childElem = targetElem.children[0];
        if(childElem.classList.contains('icon_sort')) {
            childElem.classList.remove('icon_sort');
            childElem.classList.add('icon_sort_upper')
        } else if (childElem.classList.contains('icon_sort_upper')) {
            childElem.classList.remove('icon_sort_upper');
            childElem.classList.add('icon_sort_lower');
        } else if(childElem.classList.contains('icon_sort_lower')) {
            childElem.classList.remove('icon_sort_lower');
            childElem.classList.add('icon_sort');
        }
    }

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

    function readingCheckHandler(target) {
        if(target != null) {
            const _target = target;
            const vocaSeq = _target.dataset.user_voca_seq;
            const userLearningSeq = _target.dataset.user_learning_seq;
            const checkReading = _target.dataset.check_reading;

            if(checkReading != 1) {
                axios('/learn/saveWordReading',{
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
                    } else {
                        alert("오류났어용");
                    }
                })
            }
        }
    }

    tabClickElem.addEventListener('click', onTabMoveHandler);
    wordCardElem.addEventListener('click', onCardToggleHandler);
    tableElem.addEventListener('click', onTableSortHandler);
    wordSetBtnElem.addEventListener('click', onWordSetBtnHandler);
    wordSetElem.addEventListener('click', onWordSetHandler)
    wordSwipeElem.addEventListener('click', onSwipeHandler);
})()