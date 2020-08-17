class WordContent {
    constructor(data) {
        this.data = data;
    }

    process() {
        const getElementsArray = [];
        for(let obj of this.data) {
            getElementsArray.push(this.getElements(obj))
        }
        return getElementsArray;
    }

    getContentInformation() {
        let _count = 0;
        for(let obj of this.data) {
            if(obj.checkReading === 1) {
                _count++;
            }
        }

        return `<li>공부한 단어 
                    <span class="font-point">${_count}</span>개
                </li>
                <li>전체 단어 ${this.data.length}개</li>`
    }

    getElements(_data) {
        const _element = document.createElement('li');

        if(_data != null) {
            _element.dataset.seq = _data.userVocaSeq;
            _element.classList.add(_data.vocaOrder === 1 ? 'act' : 'word-list-hide');
            _element.innerHTML = ` <div class="leaning-contents-card-front leaning-card">
                                        <div class="text leaning-contents-card-word display-4 text-weight-black front">
                                            ${_data.voca}
                                        </div>
                                        <div class="leaning-contents-card-information text alert-info body1 text-weight-medium">
                                            <span class="card-information"><i class="icon_info_circle"></i>클릭하면 단어의 뜻을 확인할 수 있습니다.</span>
                                        </div>
                                    </div>
                                    <div class="leaning-contents-card-back leaning-card">
                                        <div class="text leaning-contents-card-word display-4 text-weight-black back">
                                            ${_data.meaning}
                                        </div>
                                    </div>`;
        } else {
            _element.classList.add('act');
            _element.innerHTML = ` <div class="leaning-contents-card-front leaning-card">
                                        <div class="text leaning-contents-card-word display-4 text-weight-black front">
                                           등록 된 단어가 없습니다.
                                        </div>
                                    </div>
                                    <div class="leaning-contents-card-back leaning-card">
                                        <div class="text leaning-contents-card-word display-4 text-weight-black back">
                                            단어를 추가해 주세요
                                        </div>
                                    </div>`;
        }
        return _element;
    }
}

export default WordContent;