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
    <div class="container-xg">
<%--        <header class="leaning-header-wrap">--%>
<%--            <div class="leaning-header">--%>
<%--                <div class="leaning-header-left">--%>
<%--                    <button class="text btn btn-secondary btn-custom-option text-weight-medium header-btn-back">--%>
<%--                        <i class="icon_chevron-left"></i>--%>
<%--                        학습 끝내기--%>
<%--                    </button>--%>
<%--                    <ul class="learning__header-index">--%>
<%--                        <li class="text">내 학습보드</li>--%>
<%--                        <li class="text">${currentArticle.title}</li>--%>
<%--                    </ul>--%>
<%--                </div>--%>
<%--                <div class="leaning-header-right">--%>
<%--                    <div id="header-profile" class="text leaning-header-profile">코</div>--%>
<%--                    <i for="header-profile" class="drop-down"></i>--%>
<%--                </div>--%>
<%--            </div>--%>
<%--        </header>--%>
        <c:import url="learningNav.jsp"/>
        <article class="leaning-current-article-wrap" id="currentArticle"
                 data-article-seq="${currentArticle.article_seq}"
                 data-user-learning-seq="${currentArticle.user_learning_seq}"
                 data-last-learning-type="${currentArticle.last_learning_type}"
            >
            <div class="container learning__current-container">
                <div class="leaning-current-article leaning-current-article-tags mb-2">
                    <span class="leaning-current-article-category text text-weight-light badge badge-neutral">${currentArticle.category}</span>
                    <span class="leaning-current-article-hashtag text body1 text-color-gray300">${currentArticle.hashtag}</span>
                </div>
                <div class="leaning-current-article leaning-current-article-contents mb-3">
                    <div class="leaning-current-article-left">
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
                        <c:if test="${currentArticle.file_contents ne null}">
                            <img src="${currentArticle.file_contents}">
                        </c:if>
                        <c:if test="${currentArticle.file_contents eq null}">
                            <img src="/images/SoftwareDevelopment-Scanrail-adobe.jpg">
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
                    <a href="${currentArticle.url}" class="btn btn-outline-secondary btn-custom-option btn-link-button" target="_blank">
                        <i class="icon_link"></i>
                        원문보기
                    </a>
                </div>
            </div>
        </header>
        <section class="leaning-contents-wrap container" id="learnContents">

        </section>
    </div>
    <div class="cd-popup" role="alert">
        <div class="cd-popup-container">
            <p class="text h6">단어가 없는 세트는 자동으로 삭제됩니다.<br/>계속 진행 하시겠습니까?</p>
            <ul class="cd-buttons">
                <li><a href="#0" class="btn-secondary" id="answerFalse">취소</a></li>
                <li><a href="#0" class="btn-primary" id="answerTrue">삭제하기</a></li>
            </ul>
            <a href="#0" class="cd-popup-close img-replace"></a>
        </div> <!-- cd-popup-container -->
    </div> <!-- cd-popup -->
    <c:import url="/WEB-INF/views/layout/globalFooter.jsp"/>
    <script type="module" src="${pageContext.request.contextPath}/js/learn/Learn.js"></script>
<%--    <script type="module" src="${pageContext.request.contextPath}/js/learn/LearnWord.js"/>--%>
</body>
</html>
