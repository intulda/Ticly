/*
내 학습보드에 사용자가 학습중인 아티클 정보를 카드에 담아 화면에 그려주기 위한 모듈
*/
class LearningListCard {
    constructor(imagePath, articleSeq, url, categoryTitle, hashtag, title, summary, regDate, lastLearningDate, achievementRate, learningDone, userArticleShow) {
        this.imagePath = imagePath.replace(/\"/g, "");
        this.articleSeq = articleSeq.replace(/\"/g, "");
        this.url = url.replace(/\"/g, "");
        this.categoryTitle = categoryTitle.replace(/\"/g, "");
        this.hashtag = hashtag.replace(/\"/g, "");
        this.title = title.replace(/\"/g, "");
        this.summary = summary.replace(/\"/g, "");
        this.regDate = regDate.replace(/\"/g, "");
        this.lastLearningDate = ((lastLearningDate.replace(/\"/g, "")).substr(0,10)).replace(/-/g, ".");
        this.achievementRate = achievementRate.replace(/\"/g, "");
        this.learningDone = learningDone.replace(/\"/g, "");
        this.userArticleShow = userArticleShow.replace(/\"/g, "");
        this.element = document.createElement('div');
    }

    getElements() {
        this.element.className = "learningList__card-outer card";
        this.element.innerHTML =
            `
            <div class="learningList__card-content-wrapper">
                <!-- Done Badge & Thumbnail -->
                <div class="learningList__card-${(this.learningDone == 1) ? "done" : ""}-badge"></div>
                <div class="learningList__card-img-wrapper">
                    <img class="learningList__card-img" src="${(this.imagePath != 0)? this.imagePath : '../../../images/articleBoard/ticly_thumbnail.png'}" alt="thumbnail">
                </div>
                
                <!-- Card Title & Description -->
                <div class="learningList__card-body learningList__card-body">
                    <div class="learningList__card-title" onclick="location.href='../learn/workBook?seq=${this.articleSeq}'">
                        <div class="learningList__card-tag">
                            <div class="badge badge-neutral">${this.categoryTitle}</div>
                            <span class="text body1 text-color-gray300 text-weight-regular">${this.hashtag}</span>
                        </div>
                        <h4 class="text text-weight-medium" onclick="location.href='workBook?seq=${this.articleSeq}'">${this.title}</h4>
                        <p class="learningList__card-desc text body1">${this.summary}</p>
                    </div>
                    
                    <!-- Button trigger modal -->
                    ${(this.learningDone == '1')? "" : `
                     <button class="learningList__card-delete-btn btn btn-neutral btn-sm" 
                        ${(this.userArticleShow == 'TRUE')? 
                            `data-toggle="modal" data-target="#hideUserArticleCard" name="tooltip" data-placement="left" title="숨기기"` 
                            : `name="tooltip" data-toggle="tooltip" data-placement="left" title="보이기" onclick="location.href ='updateUserArticleShow?seq=${this.articleSeq}&showState=TRUE'"` }> 
                        <i class="${(this.userArticleShow == 'TRUE')? 'icon_show' : 'icon_hide' }"></i>
                     </button>`}
                     
                     <!-- Modal -->
                     <div class="modal fade" id="hideUserArticleCard" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="modalTitle">아티클 숨기기</h5>
                            <button type="button" class="close btn btn-secondary" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true"><i class="icon_close"></i></span>
                            </button>
                          </div>
                          <div class="modal-body">
                            해당 아티클을 숨김 처리하시겠습니까?<br>
                            숨겨진 아티클은 <span class="text text-color-green text-weight-medium">'숨긴 아티클'</span> 탭에서 언제든지 활성화 시킬 수 있습니다.
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                            <button type="button" class="btn btn-primary js-hide-btn" value="updateUserArticleShow?seq=${this.articleSeq}&showState=FALSE">숨기기</button>
                          </div>
                        </div>
                      </div>
                    </div>
                     
                    <!-- Card Footer -->
                    <div>
                        <div class="learningList__card-footer">
                            <div class="learningList__card-subInfo">
                                <p class="text body2 text-color-gray300">마지막 학습 날짜 : ${this.lastLearningDate}</p>
                                <div class="learningList__card-progress progress">
                                    <div class="progress-bar" role="progressbar" style="width: ${this.achievementRate}%" aria-valuenow="${this.achievementRate}" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                             <div class="learningList__card-btns">
                           
                                <button class="learningList__card-orignLink-btn btn btn-tab btn-left-icon" onclick="location.href='${this.url}'"><i class="icons icon_link"></i>원문보기</button>
                                <button class="learningList__card-continue-btn btn btn-outline-primary btn-right-icon" onclick="location.href='../learn/workBook?seq=${this.articleSeq}'">
                                    <p>학습하기</p><i class="icons icon_chevron-right"></i>
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
			`
        return this.element;
    }
}

export default LearningListCard;