/*
아티클 정보를 카드에 담아 화면에 그려주기 위한 모듈
*/
// <img class="card__img card" src="${(this.imgFilePath === "")? '../../../images/articleBoard/ticly_thumbnail.png' : this.imgFilePath }">
class ArticleCard {
    constructor(articleSeq, url, categoryTitle, hashtag, title, summary, regDate) {
        // this.imgFilePath = imgFilePath;
        this.articleSeq = articleSeq.replace(/\"/g, "");
        this.url = url.replace(/\"/g, "");
        this.categoryTitle = categoryTitle.replace(/\"/g, "");
        this.hashtag = hashtag.replace(/\"/g, "");
        this.title = title.replace(/\"/g, "");
        this.summary = summary.replace(/\"/g, "");
        this.regDate = ((regDate.replace(/\"/g, "")).substr(0,10)).replace(/-/g, ".");
        this.element = document.createElement('div');
    }

    getElements() {
        this.element.className = "card__wrapper";
        this.element.innerHTML =
            `
            <img class="card__img card" src="../../../images/articleBoard/ticly_thumbnail.png">
            <div class="card__hover-after">
                <button class="btn btn-primary btn-lg" onclick="location.href='../learn/workBook?seq=${this.articleSeq}'">학습하기</button>
                <button class="btn btn-outline-white btn-lg" onclick="location.href='${this.url}'">원문보기</button>
            </div>
            <div class="card__body">
                <div class="card__body-tag">
                     <span class="badge badge-neutral">${this.categoryTitle}</span>
                    <span class="text body2 text-color-gray300 text-weight-regular">${this.hashtag}</span>
                </div>
                <h4 class="card__body-title text text-color-gray100 text-weight-medium">${this.title}</h4>
                <p class="text body1 text-color-gray200">${this.summary}</p>
            </div>
            <div class="card__footer">
                <p class="text body1 text-color-gray300">${this.regDate}</p>
            </div>
			`
        return this.element;
    }
}

export default ArticleCard;