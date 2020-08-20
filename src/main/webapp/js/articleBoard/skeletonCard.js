/*
카드 정보 로드시 스켈레톤 UI로 먼저 뿌려주기
*/
class SkeletonCard {
    constructor() {
        this.element = document.createElement('div');
    }

    getElements() {
        this.element.className = "skeletonCard__wrapper";
        this.element.innerHTML =
            `
            <div class="skeletonCard__bar">
                <div class="skeletonCard__indicator"></div>
            </div>
            <img class="skeletonCard__img card" src="../../images/articleBoard/ticly_thumbnail.png">
            <div class="skeletonCard__body"></div>
			`
        return this.element;
    }
}

export default SkeletonCard;