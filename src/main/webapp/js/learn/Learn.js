import WordSetCard from './WordSet.js';
import ArticleTable from "./ArticleTable.js";
import WordContent from './WordContent.js';

(() => {
    //단어 데이터
    function getVocaList() {
        const options = {
            method: 'POST',
            data: JSON.stringify({
                articleSeq: 43
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
            //wordSetElem
            this.wordSetElem = wordSetElem;
            this.wordSetCurrentNumber = 0;
            this.group = 1;
            this.currentCount = 0;
            this.maxCount = 10;
            //wordTable
            this.articleWordTableElem = document.querySelector("#articleWordTable");

            //wordContents
            this.wordContentsElem = document.querySelector("#wordList");
        }

        async setData() {
            const vocaList = await getVocaList();
            this.data = vocaList;
            console.log(this.data);

            this.totalCount = this.data.length;
            this.wordSetCurrentNumber = this.wordSetElem.children.length;
            this.groupMaxCount = Math.ceil(this.totalCount/this.maxCount);

            this.init();
        }

        init() {
            this.circleProgressInit();
            this.wordSetProcess();
            if(this.wordSetElem.children.length > 0) {
                this.wordSetElem.children[0].click();
            }
        }

        wordSetProcess() {
            for(let i=1; i<=this.groupMaxCount; i++) {
                this.group = i;
                for(let j=0; j<this.data.length; j++) {
                    if(i == this.data[j].vocaGroup) {
                        if(this.data[j].checkReading === 1) {
                            this.currentCount++;
                        }
                    }
                }
                this.wordSetAdd();
                this.group = this.groupMaxCount + 1;
                this.currentCount = 0;
            }
        }

        wordSetAdd() {
            this.wordSetCurrentNumber++;
            this.wordSetElem.appendChild(new WordSetCard(this.wordSetCurrentNumber, this.currentCount, this.maxCount, this.group).getElements());
        }

        groupDataFilter(groupNum) {
            const data = this.data.filter((obj) => {
                return obj.vocaGroup == groupNum;
            })
            return data;
        }

        tableDataFilter(groupNum) {
            this.currentCount = 0;
            const data = this.groupDataFilter(groupNum);
            const elements = new ArticleTable(data).process()
            this.articleWordTableElem.innerHTML = '';
            for(let obj of elements) {
                this.articleWordTableElem.appendChild(obj);
            }
        }

        wordContentFilter(groupNum) {
            const data = this.groupDataFilter(groupNum);
            this.wordContentsElem.innerHTML = '';
            const elements = new WordContent(data).process();
            for(let obj of elements) {
                this.wordContentsElem.appendChild(obj);
            }
        }

        //
        circleProgressInit() {
            setTimeout(circleProgress, 400);
        }

    }

    const learn = new Learn();
    learn.setData();

    async function circleProgress() {
        let vocaData = await getVocaList();
        currentCount = 0;
        for (let obj of vocaData) {
            if (obj.checkReading === 1) {
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
        context.arc(centerX, centerY, radius, 0, (pie / 2) * Math.PI, false);
        context.lineWidth = 16;
        context.lineCap = 'round';
        context.strokeStyle = '#257FF9';
        context.stroke();
        pie += 0.045;
        restart = requestAnimationFrame(circleProgress);
        if (pie > max) {
            cancelAnimationFrame(restart);
        }
    }

    function onWordSetBtnHandler(e) {
        learn.wordSetAdd();
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

        if(targetElem.nodeName === 'TD') {
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
        const _target = target;
        const seqNumber = _target.dataset.seq;
    }

    tabClickElem.addEventListener('click', onTabMoveHandler);
    wordCardElem.addEventListener('click', onCardToggleHandler);
    tableElem.addEventListener('click', onTableSortHandler);
    wordSetBtnElem.addEventListener('click', onWordSetBtnHandler);
    wordSetElem.addEventListener('click', onWordSetHandler)
    wordSwipeElem.addEventListener('click', onSwipeHandler);
})()