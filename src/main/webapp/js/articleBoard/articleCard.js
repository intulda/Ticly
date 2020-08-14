/*

아티클 정보를 카드에 담아 화면에 그려주기 위한 모듈  

*/ 
class ArticleCard {
    constructor(articleSeq, categoryTitle, hashtag, title, summery, regDate) {
        this.articleSeq = articleSeq.replace(/\"/g, "");
        //this.imgFilePath = imgFilePath;
        this.categoryTitle = categoryTitle.replace(/\"/g, "");
        this.hashtag = hashtag.replace(/\"/g, "");
        this.title = title.replace(/\"/g, "");
        this.summery = summery.replace(/\"/g, "");
        this.regDate = regDate.replace(/\"/g, "");
        this.element = document.createElement('div');
    }

    getElements() {
		this.element.className = "card__wrapper";
        this.element.innerHTML =
            `
            <a href="learn/workBook?seq=${this.articleSeq}" class="card__aTag">
			<img class="card__img card" src="../../images/articleBoard/ticly_thumbnail.png">
			<div class="card__body">
				<span class="badge badge-neutral">${this.categoryTitle}</span>
				<span>${this.hashtag}</span>
				<h4>${this.title}</h4>
				<p>${this.summery}</p>
			</div>
			<div class="card__footer">
				<p>${this.regDate}</p>
			</div>
			</a>
			`
        return this.element;
    }
}

export default ArticleCard;