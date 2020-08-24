class WordContent {
    constructor(data) {
        this.data = data;
    }

    process() {
        const getElementsArray = [];
        let voca_order = 0;
        const lastVoca = this.data.filter((obj) => {
            return obj.last_voca == 1;
        })

        if(this.data.length > 0) {
            voca_order = lastVoca.length > 0 ? lastVoca[0].voca_order : this.data[0].voca_order;
            for(let i=0; i<this.data.length; i++) {
                let className = 'word-list-end';

                if(this.data[i].voca_order > voca_order) {
                    className = 'word-list-hide';
                } else if(this.data[i].voca_order == voca_order) {
                    className = 'act';
                } else {
                    className = 'word-list-end';
                }
                getElementsArray.push(this.getElements(this.data[i], className));
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

    getLastCardElement(groupNumber, maxGroupNumber, maxDataLength) {
        const _element = document.createElement('li');
        _element.dataset.group = groupNumber;
        _element.classList.add("word-list-hide");
        if(groupNumber == maxGroupNumber) {
            _element.innerHTML = `<div class="learning__last-card">
                                   <div class="text h6 learning__content-wrod-mb">잘했어요! 단어세트를 모두 학습하셨습니다!</div>
                                   <div class="text">
                                       <button type="button" class="btn btn-primary" data-status="sentence">문장 학습하기</button>                                    
                                   </div>
                                </div>`;
        } else {
            const nextGroup = Number(groupNumber)+1;
            _element.innerHTML = `<div class="learning__last-card">
                                   <div class="text h6 learning__content-wrod-mb">잘했어요! <span class="text text-color-green">${groupNumber}번째</span> 세트를 모두 학습하셨습니다!</div>
                                   <div class="text">
                                       <button type="button" class="btn btn-primary" data-status="${nextGroup}">다음 세트 학습하기</button>                                    
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
                                       <div class="text h6 learning__content-wrod-mb">
                                            단어를 추가해주세요
                                        </div>
                                </div>`;
        }
        return _element;
    }
}

export default WordContent;