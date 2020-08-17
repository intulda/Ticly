class WordSetCard {
    constructor(setNum, startCount=0,endCount=0, group =1) {
        this.num = setNum;
        this.startCount = startCount;
        this.endCount = endCount;
        this.element = document.createElement('li');
        this.group = group;
    }

    getElements() {
        this.element.dataset.group = this.group;
        this.element.innerHTML= ` <span>단어 세트 ${this.num}</span>
            <div class="leaning-contents-word-count-wrap">
            <span class="leaning-contents-word-count"><span id="word${this.group}" class="font-point">${this.startCount}</span>/${this.endCount}</span>
        </div>`
        return this.element;
    }
}

export default WordSetCard;