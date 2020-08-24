/*
내 학습보드에 사용자가 최근 학습한 카드를 화면에 그려주기 위한 모듈
*/
class LastLearningCard {
    constructor(articleSeq, url, title, lastLearningType, lastLearningContent, lastLearningDate) {
        //this.imgFilePath = imgFilePath;
        this.articleSeq = articleSeq.replace(/\"/g, "");
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
                        <div class="my__card-title" onclick="location.href='../learn/workBook?seq=${this.articleSeq}'">
                            <h4 class="text text-weight-medium">${this.title}</h4>
                            <p class="lastLearning__card-position text body1 text-weight-medium">마지막 학습 위치 : <span class="text body1 text-color-blue text-weight-regular">${(this.lastLearningType == 0)? "단어" : "문장"} - ${this.lastLearningContent}</span></p>
                        </div>
                        <div class="my__card-subInfo">
                            <p class="my__card-date text body1 text-color-gray300">마지막 학습 날짜 : ${this.lastLearningDate}</p>
                            <button class="lastLearning__card-continue-btn btn btn-primary btn-right-icon" onclick="location.href='../learn/workBook?seq=${this.articleSeq}'">이어하기<i class="icons icon_chevron-right"></i></button>
                        </div>
                    </div>
                </div>
			`
        return this.element;
    }
}

export default LastLearningCard;