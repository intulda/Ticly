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

    getElements(obj) {
        const element = document.createElement('li');
        element.dataset.seq = obj.userVocaSeq;
        element.classList.add(obj.vocaOrder === 1 ? 'act' : 'word-list-hide');
        element.innerHTML = ` <div class="leaning-contents-card-front leaning-card">
                                        <div class="text leaning-contents-card-word display-4 text-weight-black front">
                                            ${obj.voca}
                                        </div>
                                        <div class="leaning-contents-card-information text alert-info body1 text-weight-medium">
                                            <span class="card-information"><i class="icon_info_circle"></i>클릭하시면 두더지 입니다.</span>
                                        </div>
                                    </div>
                                    <div class="leaning-contents-card-back leaning-card">
                                        <div class="text leaning-contents-card-word display-4 text-weight-black back">
                                            ${obj.meaning}
                                        </div>
                                    </div>`;
        return element;
    }
}

export default WordContent;