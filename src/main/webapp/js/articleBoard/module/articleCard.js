/*
아티클 정보를 카드에 담아 화면에 그려주기 위한 모듈
*/
// <img class="card__img card" src="${(this.imgFilePath === "")? '../../../images/articleBoard/ticly_thumbnail.png' : this.imgFilePath }">
class ArticleCard {
    constructor(imagePath, articleSeq, url, categoryTitle, hashtag, title, summary, regDate) {
        this.imagePath = imagePath.replace(/\"/g, "");
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
        // this.element.onclick = () => {location.href=`../learningApply/goToLeaningApply?seq=${this.articleSeq}`;}
        this.element.innerHTML =
            `
            <div class="card__img_wrapper card" onclick="location.href='../learningApply/goToLeaningApply?seq=${this.articleSeq}'" >
                <img class="card__img" src="${(this.imagePath != 0)? this.imagePath : '../../../images/articleBoard/ticly_thumbnail.png'}" alt="thumbnail">
            </div>
            <div class="card__body" onclick="location.href='../learningApply/goToLeaningApply?seq=${this.articleSeq}'">
                <div class="card__body-tag-wrapper">
                    <span class="badge badge-neutral">${this.categoryTitle}</span>
                    <span class="card__body-tag text body2 text-color-gray300 text-weight-regular">${this.hashtag}</span>
                </div>
                <div class="card__body-content">
                    <h4 class="card__body-title text text-color-gray100 text-weight-medium">${this.title}</h4>
                    <p class="text body1">${this.summary}</p>
                </div>
            </div>
            <div class="card__footer">
                <p class="text body2 text-color-gray300">${this.regDate}</p>
            </div>
			`
        return this.element;
    }
}

export default ArticleCard;