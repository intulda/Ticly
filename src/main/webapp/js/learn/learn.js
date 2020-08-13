import WordSetCard from './wordSet.js';

(() => {
    //단어 데이터
    const vocaList = async function getVocaList() {
        const options = {
            method: 'POST',
            data: JSON.stringify({
                articleSeq: 43
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const resData = await axios('/learn/getVocaList', options);
        return resData;
    }
    vocaList().then(response => {
        response.data
    }).catch(error => console.log(error));

    //tab event
    const tabClickElem = document.querySelector('#learnTab');

    //단어셋 추가
    const wordSetBtnElem = document.querySelector('#wordSetAdd');
    const wordSetElem = document.querySelector('#wordSet');

    const onWordSetHandler = (e) => {
        const wordCount = 6;
        wordSetElem.appendChild(new WordSetCard(wordCount).getElements());
    }







    //카드회전
    const wordCardElem = document.querySelector('.leaning-contents-card-wrap');
    const frontCard = document.querySelector('.leaning-contents-card-front');
    const backCard = document.querySelector('.leaning-contents-card-back');

    //progressBar Circle
    const canvas = document.querySelector('.leaning-progress-canvas');

    //th클릭
    const tableElem = document.querySelector('.leaning-table');

    function progress() {
        const context = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 73;
        const per = (3.1/5)*2;

        document.querySelector('.leaning-progress-percent span:first-child').innerHTML = Math.round((per/2)*100)+'%';
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, per* Math.PI, false);
        context.lineWidth = 16;
        context.lineCap = 'round';
        context.strokeStyle = '#257FF9';
        context.stroke();
    };

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
        const targetElem = e.target
        if(targetElem.classList.contains('leaning-contents-card-front')) {
            targetElem.style.transform = 'rotateX(180deg)';
            backCard.style.transform = 'rotateX(360deg)';
        } else if(targetElem.classList.contains('leaning-contents-card-back')) {
            targetElem.style.transform = 'rotateX(180deg)';
            frontCard.style.transform = 'rotateX(0deg)';
        } else if(targetElem.classList.contains('card-information')
            || targetElem.classList.contains('leaning-contents-card-information')
            || targetElem.classList.contains('front')) {
            frontCard.style.transform = 'rotateX(180deg)';
            backCard.style.transform = 'rotateX(360deg)';
        } else if(targetElem.classList.contains('back')) {
            frontCard.style.transform = 'rotateX(0deg)';
            backCard.style.transform = 'rotateX(180deg)';
        }
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
    progress();
    tabClickElem.addEventListener('click', onTabMoveHandler);
    wordCardElem.addEventListener('click', onCardToggleHandler);
    tableElem.addEventListener('click', onTableSortHandler);
    wordSetBtnElem.addEventListener('click', onWordSetHandler);
})();