/*
내 학습보드에 사용자가 학습중인 아티클 정보를 카드에 담아 화면에 그려주기 위한 모듈
*/
class LearningListCard {
    constructor(articleSeq, url, categoryTitle, hashtag, title, summary, regDate, latestDate, achievementRate, learningDone) {
        //this.imgFilePath = imgFilePath;
        this.articleSeq = articleSeq.replace(/\"/g, "");
        this.url = url.replace(/\"/g, "");
        this.categoryTitle = categoryTitle.replace(/\"/g, "");
        this.hashtag = hashtag.replace(/\"/g, "");
        this.title = title.replace(/\"/g, "");
        this.summary = summary.replace(/\"/g, "");
        this.regDate = regDate.replace(/\"/g, "");
        this.lastLearningDate = latestDate.replace(/\"/g, "");
        this.achievementRate = achievementRate.replace(/\"/g, "");
        this.learningDone = learningDone.replace(/\"/g, "");
        this.element = document.createElement('div');
    }

    getElements() {
        this.element.className = "learningList__card-outer card";
        this.element.innerHTML =
            `
            <div class="learningList__card-content-wrapper">
                <div class="learningList__card-${(this.learningDone == 1) ? "done" : ""}-badge"></div>
                <img class="learningList__card-img" src="../../../images/articleBoard/ticly_thumbnail.png" alt="thumbnail">
                <div class="learningList__card-body learningList__card-body">
                    <div class="learningList__card-title" onclick="location.href='../learn/workBook?seq=${this.articleSeq}'">
                        <div class="learningList__card-tag">
                            <div class="badge badge-neutral">${this.categoryTitle}</div>
                            <span class="text body1 text-color-gray300 text-weight-regular">${this.hashtag}</span>
                        </div>
                        <h4 class="text text-weight-medium" onclick="location.href='workBook?seq=${this.articleSeq}'">${this.title}</h4>
                        <p class="learningList__card-desc text body1 text-color-gray200">${this.summary}</p>
                    </div>
                    <div>
                        <div class="learningList__card-subInfo">
                            <p class="learningList__card-date text body1 text-color-gray300">마지막 학습 날짜 : ${this.lastLearningDate}</p>
                            <div class="learningList__card-btns">
                                <button class="learningList__card-orignLink-btn btn btn-tab btn-left-icon" onclick="location.href='${this.url}'"><i class="icons icon_link"></i>원문보기</button>
                                <button class="learningList__card-continue-btn btn btn-outline-primary btn-right-icon" onclick="location.href='../learn/workBook?seq=${this.articleSeq}'">
                                    <p>학습하기</p><i class="icons icon_chevron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div class="learningList__card-progress progress">
                            <div class="progress-bar" role="progressbar" style="width: ${this.achievementRate}%" aria-valuenow="${this.achievementRate}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
			`
        return this.element;
    }
}

export default LearningListCard;