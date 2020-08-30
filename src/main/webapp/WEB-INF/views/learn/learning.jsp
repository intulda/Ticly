<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: kimbogeun
  Date: 2020/08/08
  Time: 5:53 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>학습하기</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <c:import url="/WEB-INF/views/layout/globalImport.jsp"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/learn/learn.css">
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body>
    <div class="ticly__basic-layout">
        <c:import url="learningNav.jsp"/>
        <div class="ticly__basic-content-layout">
        <article class="leaning-current-article-wrap" id="currentArticle"
                 data-article-seq="${currentArticle.article_seq}"
                 data-user-learning-seq="${currentArticle.user_learning_seq}"
                 data-last-learning-type="${currentArticle.last_learning_type}"
                 data-learning-done="${currentArticle.learning_done}"
            >
            <div class="container learning__current-container">
                <div class="leaning-current-article leaning-current-article-tags mb-2">
                    <span class="leaning-current-article-category text text-weight-light badge badge-neutral">${currentArticle.category}</span>
                    <span class="leaning-current-article-hashtag text body1 text-color-gray300">${currentArticle.hashtag}</span>
                </div>
                <div class="leaning-current-article leaning-current-article-contents mb-3">
                    <div class="leaning-current-article-left mr-7">
                        <div class="leaning-current-article-title text h2">
                            ${currentArticle.title}
                        </div>
                        <div class="leaning-current-article-content text h6 text-weight-light text-color-gray200">
                            ${currentArticle.summary}
                        </div>
                        <div class="leaning-current-article-date text body1 text-weight-light text-color-gray300">
                            발행일 : <span>${currentArticle.reg_date}</span>
                        </div>
                    </div>
                    <div class="leaning-current-article-right">
                        <c:if test="${currentArticle.image_path ne null}">
                            <img src="${currentArticle.image_path}">
                        </c:if>
                        <c:if test="${currentArticle.image_path eq null}">
                            <img src="${pageContext.request.contextPath}/images/articleBoard/ticly_thumbnail.png">
                        </c:if>
                    </div>
                </div>
                <div class="leaning-current-progress-wrap mb-4">
                    <div class="leaning-current-progress-status mb-2">
                        <div class="leaning-current-progress-status-title text h6 text-weight-medium">전체 학습 진도</div>
                        <div class="leaning-current-progress-status-percent text h3 text-weight-bold" id="progressInfo">0%</div>
                    </div>
                    <div class="leaning-current-progress-bar">
                        <div class="leaning-current-progress-bar"></div>
                        <div class="leaning-current-progress-bar-success"></div>
                    </div>
                </div>
            </div>
        </article>
        <header class="leaning-sub-header">
            <div class="leaning-sub-header container">
                <div class="leaning-sub-header-tab-wrap">
                    <ul class="leaning-sub-header-tab" id="learnTab">
                        <li class="text active" data-type="0">단어 학습하기</li>
                        <li class="text" data-type="1">문장 학습하기</li>
                    </ul>
                </div>
                <div class="leaning-sub-header-sticky-title">
                    <span class="text h6">${currentArticle.title}</span>
                </div>
                <div class="leaning-sub-header-original">
                    <a href="${currentArticle.url}" id="articleLink" class="btn btn-outline-secondary btn-custom-option btn-link-button" target="_blank">
                        <i class="icon_link"></i>
                        원문보기
                    </a>
                </div>
            </div>
        </header>
        <div>
            <section class="leaning-contents-wrap container" id="learnContents">

            </section>
        </div>

        <div id="activeModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">다른 작업을 하시겠습니까?</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <p>단어가 없는 세트는 저장되지 않습니다.<br> 다른 작업을 하시려면 <span class="text text-color-red">[이동하기]</span>, 단어를 추가하시려면 [취소]를 선택하세요.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" id="answerFalse" data-dismiss="modal">취소</button>
                        <button type="button" class="btn btn-danger" id="answerTrue" data-dismiss="modal">이동하기</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
            <c:import url="./learningComplete.jsp"/>
        </div>
        <c:import url="/WEB-INF/views/layout/globalFooter.jsp"/>
    </div>

    <script type="module" src="${pageContext.request.contextPath}/js/learn/Learn.js"></script>
<%--    <script type="module" src="${pageContext.request.contextPath}/js/learn/LearnWord.js"/>--%>
</body>
</html>
