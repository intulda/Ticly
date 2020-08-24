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
    <style>
        .cd-popup {
            position: fixed;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            background-color: rgba(94, 110, 141, 0.9);
            opacity: 0;
            visibility: hidden;
            -webkit-transition: opacity 0.3s 0s, visibility 0s 0.3s;
            -moz-transition: opacity 0.3s 0s, visibility 0s 0.3s;
            transition: opacity 0.3s 0s, visibility 0s 0.3s;
        }
        .cd-popup.is-visible {
            opacity: 1;
            visibility: visible;
            -webkit-transition: opacity 0.3s 0s, visibility 0s 0s;
            -moz-transition: opacity 0.3s 0s, visibility 0s 0s;
            transition: opacity 0.3s 0s, visibility 0s 0s;
            z-index: 20;
        }

        .cd-popup-container {
            position: relative;
            width: 90%;
            max-width: 400px;
            margin: 4em auto;
            background: #FFF;
            border-radius: .25em .25em .4em .4em;
            text-align: center;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            -webkit-transform: translateY(-40px);
            -moz-transform: translateY(-40px);
            -ms-transform: translateY(-40px);
            -o-transform: translateY(-40px);
            transform: translateY(-40px);
            /* Force Hardware Acceleration in WebKit */
            -webkit-backface-visibility: hidden;
            -webkit-transition-property: -webkit-transform;
            -moz-transition-property: -moz-transform;
            transition-property: transform;
            -webkit-transition-duration: 0.3s;
            -moz-transition-duration: 0.3s;
            transition-duration: 0.3s;
        }
        .cd-popup-container p {
            padding: 3em 1em;
        }
        .cd-popup-container .cd-buttons:after {
            content: "";
            display: table;
            clear: both;
        }
        .cd-popup-container .cd-buttons li {
            float: left;
            width: 50%;
            list-style: none;
        }
        .cd-popup-container .cd-buttons a {
            display: block;
            height: 60px;
            line-height: 60px;
            text-transform: uppercase;
            -webkit-transition: background-color 0.2s;
            -moz-transition: background-color 0.2s;
            transition: background-color 0.2s;
        }
        .cd-popup-container .cd-buttons li:first-child a {
            border-radius: 0 0 0 .25em;
        }
        .no-touch .cd-popup-container .cd-buttons li:first-child a:hover {
            background-color: #fc8982;
        }
        .cd-popup-container .cd-buttons li:last-child a {
            border-radius: 0 0 .25em 0;
        }
        .no-touch .cd-popup-container .cd-buttons li:last-child a:hover {
            background-color: #c5ccd8;
        }
        .cd-popup-container .cd-popup-close {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 30px;
            height: 30px;
        }
        .cd-popup-container .cd-popup-close::before, .cd-popup-container .cd-popup-close::after {
            content: '';
            position: absolute;
            top: 12px;
            width: 14px;
            height: 3px;
            background-color: #8f9cb5;
        }
        .cd-popup-container .cd-popup-close::before {
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
            left: 8px;
        }
        .cd-popup-container .cd-popup-close::after {
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
            right: 8px;
        }
        .is-visible .cd-popup-container {
            -webkit-transform: translateY(0);
            -moz-transform: translateY(0);
            -ms-transform: translateY(0);
            -o-transform: translateY(0);
            transform: translateY(0);
        }
        @media only screen and (min-width: 1170px) {
            .cd-popup-container {
                margin: 8em auto;
            }
        }
    </style>
</head>
<body>
    <div class="container-xg">
        <header class="leaning-header-wrap">
            <div class="leaning-header">
                <div class="leaning-header-left">
                    <button class="text btn btn-secondary btn-custom-option text-weight-medium header-btn-back">
                        <i class="icon_chevron-left"></i>
                        학습 끝내기
                    </button>
                    <ul class="learning__header-index">
                        <li class="text">내 학습보드</li>
                        <li class="text">${currentArticle.title}</li>
                    </ul>
                </div>
                <div class="leaning-header-right">
                    <div id="header-profile" class="text leaning-header-profile">코</div>
                    <i for="header-profile" class="drop-down"></i>
                </div>
            </div>
        </header>
        <article class="leaning-current-article-wrap" id="currentArticle" data-article-seq="${currentArticle.article_seq}" data-user-learning-seq="${currentArticle.user_learning_seq}">
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
                        <li class="text active">단어 학습하기</li>
                        <li class="text">문장 학습하기</li>
                    </ul>
                </div>
                <div class="leaning-sub-header-sticky-title">
                    <span class="text h6">${currentArticle.title}</span>
                </div>
                <div class="leaning-sub-header-original">
                    <button class="btn btn-outline-secondary btn-custom-option btn-link-button">
                        <i class="icon_link"></i>
                        원문보기
                    </button>
                </div>
            </div>
        </header>
        <section class="leaning-contents-wrap container">
            <div class="leaning-contents-left">
                <div class="leaning-contents-left-top">
                    <div class="leaning-progress">
                        <div class="leaning-circle-bg">
                            <span class="leaning-progress-percent">
                                <span>0</span>
                                <span class="leaning-progress-span">단어 학습 진도</span>
                            </span>
                        </div>
                        <canvas class="leaning-progress-canvas" width="210" height="210"/>
                    </div>
                </div>
                <div class="leaning-contents-left-down">
                    <ul class="leaning-contents-word-set" id="wordSet">

                    </ul>
                    <button class="btn btn-secondary btn-custom-option" id="wordSetAdd">
                        <i class="icon_plus"></i>
                        세트 추가하기
                    </button>
                </div>
            </div>
            <div class="leaning-contents-right">
                <div class="leaning-contents-right-top">
                    <div class="leaning-contents-right-title">
                        <h1 id="contentTitle">단어 세트 1</h1>
                    </div>
                    <div class="leaning-contents-right-word">
                        <div class="leaning-contents-card-prev" id="wordSwipeLeft">
                            <i class="icon_chevron-left"></i>
                        </div>
                        <div class="leaning-contents-card-wrap">
                            <ul class="word-list" id="wordList">
                                <li class="act">
                                    <div class="leaning-contents-card-front leaning-card">
                                        <div class="text leaning-contents-card-word display-4 text-weight-black front">
                                            Null Pointer Exception
                                        </div>
                                        <div class="leaning-contents-card-information text alert-info body1 text-weight-medium">
                                            <span class="card-information"><i class="icon_info_circle"></i>클릭하시면 두더지 입니다.</span>
                                        </div>
                                    </div>
                                    <div class="leaning-contents-card-back leaning-card">
                                        <div class="text leaning-contents-card-word display-4 text-weight-black back">
                                            <%-- 카드 뒷면이 될곳 --%>
                                            눌 포인트 익셉션
                                        </div>
                                    </div>
                                </li>
                                <li class="word-list-hide">
                                    <div class="leaning-contents-card-front leaning-card">
                                        <div class="text leaning-contents-card-word display-4 text-weight-black front">
                                            author
                                        </div>
                                        <div class="leaning-contents-card-information text alert-info body1 text-weight-medium">
                                            <span class="card-information"><i class="icon_info_circle"></i>클릭하시면 두더지 입니다.</span>
                                        </div>
                                    </div>
                                    <div class="leaning-contents-card-back leaning-card">
                                        <div class="text leaning-contents-card-word display-4 text-weight-black back">
                                            <%-- 카드 뒷면이 될곳 --%>
                                            오쓰도 잡아주시구요
                                        </div>
                                    </div>
                                </li>
                                <li class="word-list-hide">
                                    <div class="leaning-contents-card-front leaning-card">
                                        <div class="text leaning-contents-card-word display-4 text-weight-black front">
                                            apply
                                        </div>
                                        <div class="leaning-contents-card-information text alert-info body1 text-weight-medium">
                                            <span class="card-information"><i class="icon_info_circle"></i>클릭하시면 두더지 입니다.</span>
                                        </div>
                                    </div>
                                    <div class="leaning-contents-card-back leaning-card">
                                        <div class="text leaning-contents-card-word display-4 text-weight-black back">
                                            <%-- 카드 뒷면이 될곳 --%>
                                            애플리 잡아주시구요
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="leaning-contents-card-next" id="wordSwipeRight">
                            <i class="icon_chevron-right"></i>
                        </div>
                    </div>
                    <div class="leaning-contents-card-status">
                        <ul id="contentInformation">
                            <li>공부한 단어 <span class="font-point">1</span>개</li>
                            <li>전체 단어 10개</li>
                        </ul>
                    </div>
                </div>
                <div class="leaning-contents-right-down">
                    <div class="leaning-contents-right-top-info mb-3">
                        <div class="leaning-contents-table-info" id="tableInformation">
                            <span>[단어세트3]의 목록</span>
                            <span class="table-word-set-count">(10)</span>
                        </div>
                        <div class="leaning-contents-table-add-word">
                            <button class="btn btn-outline-danger table-word-delet-btn" id="tableWordRemove">
                                삭제하기
                            </button>
                        </div>
                    </div>
                    <div class="leaning-contents-table-contents">
                        <table class="leaning-table" data-state="read">
                            <thead>
                                <tr>
                                    <th>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" id="tableAllCheck" class="custom-control-input learning-table-checkbox">
                                            <label class="custom-control-label" for="tableAllCheck"></label>
                                        </div>
                                    </th>
                                    <th>
                                        <span class="text">단어</span>
                                        <span>
                                            <img src="${pageContext.request.contextPath}/images/learn/con_sort.svg">
                                        </span>
                                    </th>
                                    <th>
                                        <span class="text">뜻</span>
                                        <span>
                                            <img src="${pageContext.request.contextPath}/images/learn/con_sort.svg">
                                        </span>
                                    </th>
                                    <th>
                                        <span class="text">상태</span>
                                        <span>
                                            <img src="${pageContext.request.contextPath}/images/learn/con_sort.svg">
                                        </span>
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>
                            <tbody id="articleWordTable">

                            </tbody>
                        </table>
                        <div class="leaning-contents-table-down">
                            <button class="btn btn-outline-primary table-word-delet-btn" id="tableWordAdd">
                                단어 추가하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div class="cd-popup" role="alert">
        <div class="cd-popup-container">
            <p>단어가 없는 세트는 자동으로 삭제됩니다.<br/>계속 진행 하시겠습니까?</p>
            <ul class="cd-buttons">
                <li><a href="#0" class="btn-primary" id="answerTrue">확인</a></li>
                <li><a href="#0" class="btn-secondary" id="answerFalse">취소</a></li>
            </ul>
            <a href="#0" class="cd-popup-close img-replace"></a>
        </div> <!-- cd-popup-container -->
    </div> <!-- cd-popup -->
    <c:import url="/WEB-INF/views/layout/globalFooter.jsp"/>
    <script type="module" src="${pageContext.request.contextPath}/js/learn/Learn.js"></script>
</body>
</html>
