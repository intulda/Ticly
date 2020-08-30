
<%--
  Created by IntelliJ IDEA.
  User: Hyeseung
  Date: 2020-08-18
  Time: 오후 3:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"/>
    <script type="text/javascript" src="js/bootstrap.js"></script>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!-- Common -->
    <c:import url="/WEB-INF/views/layout/globalImport.jsp"></c:import>

    <style>
        .flex_container {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-top: 30px;
        }

        .clearfix:after {
            content: "";
            clear: both;
            display: block;
        }


        .item {
            float: left;
            margin-left: 30px;
            margin-right: 50px;
            justify-content: space-between;
        }

        .admin-header{
            position: sticky;
            top: 80px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: white;
            border: solid 1px #E1E1E8;
            z-index: 12;
        }

        .admin-header-container{
            display: flex;
            justify-content: space-between;
            padding-top: 16px;
            padding-bottom: 16px;
        }

        .Admin-header-menu-tab {
            display: flex;
            text-align: justify;
            align-items: center;
            height: 40px;
        }

        .Admin-header-menu-tab a{
            margin-right: 17px;
        }




    </style>
</head>
<body>
<c:import url="/WEB-INF/views/layout/globalNav.jsp"></c:import>
<div class="ticly__basic-layout">
    <div class="admin-header">
        <div class="container admin-header-container">
            <div class="Admin-header-menu-tab" align="left">
                <a href="/writeForm"> <h6 class="text text-color-gray300 text-weight-medium" > 아티클 등록하기 </h6> </a>
                <a href="/ArticleList"> <h6 class="text text-color-green text-weight-medium"> 아티클 목록 </h6> </a>
                <a href="/admin/clientmanage"> <h6 class="text text-color-gray300 text-weight-medium"> 회원 관리 </h6> </a>
            </div>
        </div>
    </div>

    <div class="container flex_container ticly__basic-content-layout">

        <%--<p> 아티클 상세 페이지 </p>--%>
        <article>
            <div class="container" role="main">
                <h2>아티클 간략하게 보기</h2>
                <div class="bg-white rounded shadow-sm">
                    <div class="board_title">
                        <br><br><br>
                        <p> <b> 제목 </b></p>
                        <h2><c:out value="${article.title }"/></h2></div>
                    <div class="board_info_box">
                        <br><br>
                        <p> <b> 요약 </b> </p>
                        <span class="board_author"><c:out value="${article.summary}"/>



                        </span><span class="board_date"><c:out value="${dto.reg_date}"/></span>
                    </div>

                    <div class="board_image_path">
                        <br><br><br>
                        <p> <b> 이미지 경로 </b></p>
                        <span class="board_author"><c:out value="${article.image_path }"/>
                    </div>



                    <div class="board_content">${article.contents}</div>
                    <br>
                    <div class="board_tag"> <b> 관련 TAG </b> <br>
                        <c:out value="${article.hashtag}"/></div>
                </div>
                <br><br>

                <div style="margin-top : 20px">
                    <button type="button" class="btn btn-sm btn-primary" id="btnToUrl" href="${article.url}">자세히 보러가기</button>
                    <button type="button" class="btn btn-sm btn-primary" id="btnDelete">삭제</button>
                    <button type="button" class="btn btn-sm btn-primary" id="btnList" href="/admin/AdminArticleCatalog">목록
                </div>
            </div>
        </article>
    </div>
    <c:import url="/WEB-INF/views/layout/globalFooter.jsp"></c:import>
</div>

<script>

    $(document).on('click', '#btnList', function(){
        location.href = "${pageContext.request.contextPath}/ArticleList";
    });

    $(document).on('click', '#btnToUrl', function(){
        location.href = "${article.url}";
    });

    $(document).on('click', '#btnDelete', function(){
        var confirmMsg = confirm('해당 아티클을 삭제 하시겠습니까?');

        if(confirmMsg) {
            location.href = "delete?article_seq=${article.article_seq}";
        } else {
            // 변화 없음
        }

    });


</script>

</body>
</html>
