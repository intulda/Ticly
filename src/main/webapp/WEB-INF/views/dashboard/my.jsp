<%@ page import="java.util.List" %>
<%@ page import="io.ticly.mint.articleBoard.model.dto.MemberDTO" %>
<%@ page import="java.util.ArrayList" %><%--
  Created by IntelliJ IDEA.
  User: kkh
  Date: 2020/08/17
  Time: 6:41 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!-- CSS -->
<link rel="stylesheet" href="${ pageContext.request.contextPath }/css/bootstrap.css">
<link rel="stylesheet" href="${ pageContext.request.contextPath }/css/fonticon.css">
<link rel="stylesheet" href="${ pageContext.request.contextPath }/css/dashboard/myStyle.css">

<!-- script -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script buffer type="module" src="${ pageContext.request.contextPath }/js/dashboard/myAction.js"></script>

<html>
<head>
    <title>MY LEARNING BOARD</title>
</head>
<body>
    <div class="container">
        <!-- Recently learned Article Section-->
        <div class="lastLearning__header">
            <h3 class="text text-color-gray100 text-weight-bold">최근 학습한 아티클</h3>
        </div>

        <!-- Recently learned Article Card-->
        <div class="lastLearning__card-section js-lastLearning-section">

        </div>

        <!-- My Article List Section-->
        <div class="learningList__header">
           <h3 class="text text-color-gray100 text-weight-bold">아티클 목록</h3>
            <div>
                <button class="learningList__doing-btn btn btn-tab active">학습중<span>(6)</span></button>
                <button class="learningList__done-btn btn btn-tab">학습 완료<span>(3)</span></button>
            </div>
            <select class="learningList__selectBox custom-select" name="sorting">
                <option selected value="">최근학습순</option>
                <option value="">최신발행순</option>
                <option value="">제목순</option>
            </select>
        </div>

        <!-- learning Article Card-->
        <div class="learningList__card-section js-learningList-section">
            <div class="my__card-outer card">
                <div class="my__card-content-wrapper">
                    <img class="learningList__card-img" src="../../images/articleBoard/ticly_thumbnail.png" alt="thumbnail">
                    <div class="my__card-body learningList__card-body">
                        <div class="my__card-title">
                            <div class="learningList__card-tag">
                                <div class="badge badge-neutral">UX/UI</div>
                                <span class="text body1 text-color-gray300 text-weight-regular">#Netflix #experience #case study</span>
                            </div>
                            <h4 class="text text-weight-bold">Have you heard that coding is an exciting skill to learn, but you aren’t sure where to start?</h4>
                            <p class="learningList__card-desc text body1 text-color-gray200">DISCLAIMER: This project was done by me and my classmates for a school project and is not made, owned, or affiliated directly to Accedo. What if Netflix knew what you want...</p>
                        </div>
                        <div>
                            <div class="my__card-subInfo">
                                <p class="my__card-date text body1 text-color-gray300">마지막 학습 날짜 : 2020.08.05</p>
                                <div class="learningList__card-btns">
                                    <button class="learningList__card-orignLink-btn btn btn-tab btn-left-icon"><i class="icons icon_link"></i>원문보기</button>
                                    <button class="learningList__card-continue-btn btn btn-outline-primary btn-right-icon"><p>학습하기</p><i class="icons icon_chevron-right"></i></button>
                                </div>
                            </div>
                            <div class="learningList__card-progress progress">
                                <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuelast="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <input type="hidden" name="userEmail" value="${userInfo.email}">
</body>
</html>
