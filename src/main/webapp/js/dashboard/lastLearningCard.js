/*
내 학습보드에 사용자가 최근 학습한 카드를 화면에 그려주기 위한 모듈
*/
class LastLearningCard {
    constructor(articleSeq, url, title, lastLearningType, lastLearningContent, lastLearningDate) {
        //this.imgFilePath = imgFilePath;
        this.article_seq = articleSeq.replace(/\"/g, "");
        this.url = url.replace(/\"/g, "");
        this.title = title.replace(/\"/g, "");
        this.lastLearningType = lastLearningType.replace(/\"/g, "");
        this.lastLearningContent = lastLearningContent.replace(/\"/g, "");
        this.lastLearningDate = lastLearningDate.replace(/\"/g, "");
        this.element = document.createElement('div');
    }

    getElements() {
        this.element.className = "my__card-outer card";
        this.element.innerHTML =
            `
                <div class="my__card-content-wrapper">
                    <img class="lastLearning__card-img" src="../../images/articleBoard/ticly_thumbnail.png" alt="thumbnail">
                    <div class="my__card-body lastLearning__card-body">
                        <div class="my__card-title">
                            <h4 class="text text-weight-bold" onclick="location.href='workBook?seq=${this.article_seq}'">${this.title}</h4>
                            <h6 class="lastLearning__card-position text text-weight-medium">마지막 학습 위치 : <span class="text text-color-blue">${(this.lastLearningType === 0)? "단어" : "문장"} - ${this.lastLearningContent}</span></h6>
                        </div>
                        <div class="my__card-subInfo">
                            <p class="my__card-date text body1 text-color-gray300">마지막 학습 날짜 : ${this.lastLearningDate}</p>
                            <button class="lastLearning__card-continue-btn btn btn-primary btn-right-icon" onclick="location.href='workBook?seq=${this.article_seq}'">이어하기<i class="icons icon_chevron-right"></i></button>
                        </div>
                    </div>
                </div>
			`
        return this.element;
    }
}

export default LastLearningCard;