class WordContent {
    constructor(data) {
        this.data = data;
    }

    process() {
        const getElementsArray = [];
        let checkPoint = -1;

        const readingCount = this.data.filter((obj) => {
            return obj.check_reading == 0
        })

        if(readingCount.length == 0) {
            for(let i=0; i<this.data.length; i++) {
                let className = 'word-list-hide';
                if(i == 0) {
                    className = 'act';
                }
                getElementsArray.push(this.getElements(this.data[i], className));
            }
        } else {
            for(let i=0; i<this.data.length; i++) {
                if(this.data[i].check_reading === 0) {
                    let className = 'word-list-hide';
                    if(checkPoint == -1) {
                        checkPoint = this.data[i].voca_order;
                        className = 'act';
                    }
                    getElementsArray.push(this.getElements(this.data[i], className));
                } else if(this.data[i].check_reading === 1) {
                    let className = 'word-list-end'
                    if(checkPoint != -1) {
                        if (checkPoint < this.data[i].voca_order) {
                            className = 'word-list-hide'
                        } else if (checkPoint > this.data[i].voca_order) {
                            className = 'word-list-end'
                        }
                    }

                    if(this.data[this.data.length-1] === this.data[i]) {
                        className = 'act';
                    }

                    getElementsArray.push(this.getElements(this.data[i], className));
                }
            }
        }
        return getElementsArray;
    }

    getContentInformation() {
        let _count = 0;
        for(let obj of this.data) {
            if(obj.check_reading === 1) {
                _count++;
            }
        }

        return `<li>공부한 단어 
                    <span class="font-point">${_count}</span>개
                </li>
                <li>전체 단어 ${this.data.length}개</li>`
    }

    getLastCardElement(groupNumber, maxGroupNumber) {
        const _element = document.createElement('li');
        _element.dataset.group = groupNumber;
        _element.classList.add("word-list-hide");
        console.log(groupNumber, maxGroupNumber);
        if(groupNumber == maxGroupNumber) {
            _element.innerHTML = `<div class="learning__last-card">
                                   <div class="text h6 mb-2">잘했어요! 단어세트를 모두 학습하셨습니다!</div>
                                   <div class="text h4 text-weight-black mb-2">다음 단계</div>     
                                   <div class="text">
                                       <button type="button" class="btn btn-primary" data-status="sentence">문장 학습하기</button>                                    
                                   </div>
                                </div>`;
        } else {
            const nextGroup = Number(groupNumber)+1;
            _element.innerHTML = `<div class="learning__last-card">
                                   <div class="text h6 mb-2">잘했어요! <span class="text text-color-green">${groupNumber}번째</span> 세트를 모두 학습하셨습니다!</div>
                                   <div class="text h4 text-weight-black mb-2">다음 단계</div>     
                                   <div class="text">
                                       <button type="button" class="btn btn-primary" data-status="${nextGroup}">다음 단어 학습하기</button>                                    
                                   </div>
                                </div>`;
        }

        return _element;
    }

    getElements(_data, className) {
        const _element = document.createElement('li');

        if(_data != null) {
            _element.dataset.user_voca_seq = _data.user_voca_seq;
            _element.dataset.user_learning_seq = _data.user_learning_seq;
            _element.dataset.check_reading = _data.check_reading;
            _element.classList.add(className);
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
            _element.innerHTML = `<div class="learning__none-word">
                                       <div class="text display-4 text-weight-black">
                                            단어를 추가해주세요
                                        </div>
                                </div>`;
        }
        return _element;
    }
}

export default WordContent;