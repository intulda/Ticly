<%--
  Created by IntelliJ IDEA.
  User: kkh
  Date: 2020/08/17
  Time: 6:41 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html>
<head>
    <meta charset="UTF-8">
    <title>내 학습 보드</title>

    <!-- Common -->
    <c:import url="/WEB-INF/views/layout/globalImport.jsp"></c:import>

    <!-- CSS -->
    <link rel="stylesheet" href="${ pageContext.request.contextPath }/css/dashboard/myStyle.css">

</head>
<body>
<div class="ticly__basic-layout">
    <!-- header -->
    <c:import url="/WEB-INF/views/layout/globalNav.jsp"></c:import>

    <!-- content -->
    <div class="container ticly__basic-content-layout">

        <!-- My Article List Section-->
        <div class="learningList__header">
            <h3 class="text text-color-gray100 text-weight-medium">아티클 목록</h3>
            <div>
                <button class="learningList__btn btn active js-list-tab-btn" value="0">학습중
                    <span class="badge badge-neutral ml-1"></span>
                </button>
                <button class="learningList__btn btn js-list-tab-btn" value="1">학습 완료
                    <span class="badge badge-neutral ml-1"></span>
                </button>
                <button class="learningList__btn btn js-list-tab-btn" value="2">숨긴 아티클
                    <span class="badge badge-neutral ml-1"></span>
                </button>
                <select class="learningList__selectBox custom-select js-my-select-box" name="sorting">
                    <option selected value="1">최근 학습순</option>
                    <option value="2">최신 발행순</option>
                    <option value="3">제목순</option>
                </select>
            </div>
        </div>

        <!-- learning Article Card-->
        <div class="learningList__card-section js-learningList-section">
            <div class="my__card-outer card">
            </div>
        </div>
    </div>

    <!-- footer -->
    <c:import url="/WEB-INF/views/layout/globalFooter.jsp"></c:import>
</div>

<!-- Get User Email-->
<input type="hidden" name="userEmail" value="${userInfo.email}">


<!-- script -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script bufer type="module" src="${ pageContext.request.contextPath }/js/dashboard/myAction.js"></script>

</body>
</html>
