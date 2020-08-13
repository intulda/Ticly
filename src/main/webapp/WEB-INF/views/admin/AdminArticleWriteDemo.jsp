<%--
  Created by IntelliJ IDEA.
  User: UserK
  Date: 2020-08-12
  Time: 오후 4:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>

        .flex_container {
            display: flex;
            flex-direction: column;
            vertical-align: middle;
            text-align: center;
        }

        .clearfix:after {
            content: "";
            clear: both;
            display: block;
        }

        .item {
            float: left;
        }

        .word-info {
            display: inline-block;
            vertical-align: middle;
            margin: 0;
            padding: 0;

        }

        .myboardBtnGroup {
            margin: 30px;
            /*padding: 30px;*/
        }

        .Admin-header-menu-btn {
            margin: 30px;
        }

        .main-logo {
            margin: 17px;
        }

        .article-find-tab {
            margin-left: 50px;
            padding: 10px;
        }

        .Admin-header-menu-tab {
            margin: 1px 300px;
            padding: 12px;
        }

        .word-info {
            align-content: center;
        }

        .button {
            border-radius: 0;
            border: 0;
            outline: 0;
        }

        .table {
            border-collapse: collapse;
            border-spacing: 0;
        }

        .table td {
            padding: 0px;
            line-height: 0;
        }

        h1,h2,h3,h4,h5,h6 {
            display:inline
        }

        a {
            /*margin-left: 1px;*/
            padding: 6px;
        }



    </style>
    <title>AdminArticleWriteDemo.jsp</title>

    <link rel="stylesheet" href="./css/bootstrap.css">
</head>
<body>

<form action="ArticleSave">

    <div class="flex_container">

        <!--  Ticly 로고 라인 탭 -->
        <div class="item">
            <div class="main-logo">
                <img src="./images/logo_color.svg" align="left">
                    <%--<div class="header-menu" align="center">--%>
                        <a href="ArticleFindTab.jsp" style="text-decoration:none" align="center" class="article-find-tab" > 아티클 찾기 </a>
                        <a href="IntroService.jsp" style="text-decoration:none" align="center" class="article-find-tab"> 서비스 소개 </a>
                        <a href="AdminArticleWrite.jsp" style="text-decoration:none" align="center" class="article-find-tab"> 관리자 페이지 </a>
                    <%--</div>--%>

                     <%--   <img src="./css/Admin/images/츄.png" href="MYINFORMATION.jsp">
                        <input type="button" class="btn" value="츄" style="float: right;">--%>
                      <%--  <button class="btn" id="btn" type="submit"><img src="./css/Admin/images/츄.png"></button>--%>
                        <input type="image" src="./css/Admin/images/츄.png" border="0" style="float: right;">
                        <input type="button" class="btn btn-success" value="내 학습 보드" style="float: right;">
            </div>
        </div>



        <!-- 관리자 페이지 내 Tab + 저장하기 -->
        <div class="item">
            <hr>
            <div class="Admin-header-menu-tab" align="left">
                <a class="text text-color-green text-weight-medium" style="text-decoration:none" href="AdminArticleWrite.jsp"> <h6> 아티클 등록하기 </h6> </a>
                <a class="text text-color-gray300 text-weight-medium" style="text-decoration:none" href="AdminArticleList.jsp"> <h6> 아티클 목록 </h6> </a>
                <a class="text text-color-gray300 text-weight-medium" style="text-decoration:none" href="AdminMemberList.jsp" > <h6> 회원 관리 </h6> </a>
                <a class="text text-color-gray300 text-weight-medium" style="text-decoration:none" href="AdminAnalysis.jsp" > <h6> 통계 </h6> </a>

                <input type="button" class="btn btn-success" value="저장하기" style="float: right;">
                <input type="button" class="btn" value="뒤로가기" style="float: right;">

            </div>
            <hr>
        </div>

        <hr>

        <!--  아티클 기본 정보 Section -->
        <div class="item">
            <div class="ArticleInfo" align="center">
                <table>
                    <col width="200px"><col width="908px">
                    <tr>
                        <td rowspan="5" valign="top" align="left">
                            <%--<p class="text text-weight-bold"> 아티클 기본 정보 </p>--%>
                            <p class="text body1 text-weight-black text-color-gray100"> 아티클 기본 정보 </p>

                        </td>
                        <td>
                            <p class="text body1 text-weight-medium text-color-gray100"> 카테고리 </p>
                            <select class="form-control" id="CategoryForm">
                                <option> 카테고리를 선택하세요 </option>
                                <option> 개발 </option>
                                <option> UI/UX </option>
                                <option> 브랜딩 </option>
                                <option> 마케팅 </option>
                                <option> 경제 </option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <p class="ext body1 text-weight-medium text-color-gray100"> 제목 </p>
                            <input type="text" id="ArticleTitle" class="form-control form-control-lg" placeholder="제목을 입력해주세요">
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <p class="ext2 body1 text-weight-medium text-color-gray100"> 원문 URL </p>
                            <input type="text" class="form-control" id="ArticleUrl" aria-describedby="basic-addon3" placeholder="http://">
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <p class="ext3 body1 text-weight-medium text-color-gray100"> 요약 </p>
                            <textarea name="Summarytxt" class="form-control" cols="110" rows="5" placeholder="DISCLAIMER: This project was done by me and my classmates for a school project and is not made, owned, or affiliated directly to Accedo. What if Netflix knew what you want..."></textarea>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <p class="ext4 body1 text-weight-medium text-color-gray100"> 태그 </p>
                            <input type="text" name="HashTagtxt" size="100" placeholder="내용을 입력하세요 (#해시태그)" class="form-control" id="basic-url" aria-describedby="basic-addon3">
                           <%-- <input type="text" title="태그" size="70" name="tagText" id="tagText" placeholder="태그입력" class="form-control" value style="box-sizing: content-box; ">--%>
                        </td>
                    </tr>
                </table>
            </div>

            <hr width="65%">

            <!--  아티클 내용 Section -->
            <div class="content" align="center">
                <table>
                    <col width="200px"><col width="908px">
                    <tr>
                        <td valign="top" align="left">
                            <p class="text body1 text-weight-black text-color-gray100"> 내용 </p>
                        </td>
                        <td>
						<textarea name="Summarytxt" class="form-control" cols="110" rows="10" placeholder="DISCLAIMER: This project was done by me and my classmates for a school project and is not made, owned, or affiliated directly to Accedo. What if Netflix knew what you want..."></textarea>
                        </td>
                    </tr>

                </table>
            </div>

            <br><br>

            <!--  단어 정보 Section  -->
            <div class="word-info" align="center">
                <table class="table">
                    <col width="200px"><col width="908px">
                    <tr>
                        <td rowspan="5" valign="top" align="left">
                            <p class="text body1 text-weight-black text-color-gray100"> 단어 정보 </p>
                        </td>
                        <td>
                            <!-- td 태그 안에 table을 또 만드는 것 같은뎅........ 일단 ㄱ -->
                            <div id="divTest" class="table">

                            <table>
                                <col width="260px"><col width="568px"><col width="100px">
                                <tr>
                                    <td>
                                        <p class="ext body1 text-weight-medium text-color-gray100"> 단어 </p>
                                    </td>
                                    <td>
                                        <p class="ext body1 text-weight-medium text-color-gray100"> 뜻 </p>
                                    </td>
                                    <td>  </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" name="word-insert" class="form-control" value="account for" size="10" readonly="readonly">
                                    </td>
                                    <td>
                                        <input type="text" name="mean-insert" class="form-control" value="설명하다" size="40" readonly="readonly"><br>
                                    </td>
                                    <td>
                                        <%--<button type="button" class="btn"> 삭제 </button>--%>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" name="word-insert" class="form-control" value="Null Pointer Exception" size="10" readonly="readonly">
                                    </td>
                                    <td>
                                        <input type="text" name="mean-insert" class="form-control" value="눌 포인트 익셉션" size="40" readonly="readonly"><br>
                                    </td>
                                    <td>
                                        <%--<button type="button" class="btn"> 삭제 </button>--%>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" class="form-control" size="20" placeholder="단어를 입력하세요">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" size="40" placeholder="뜻을 입력하세요"><br>
                                    </td>
                                    <td>
                                       <%-- <button type="button" class="btn" onclick="Remove_WordBox(this)"> 삭제 </button>--%>
                                           <button type="button" class="btn" > 삭제 </button>
                                </tr>

                            </table>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="2">
                            <input type="button" class="btn" onclick="Add_WordBox()" value=" + 단어 추가하기">
                        </td>
                    </tr>

                </table>

            </div>
        <!-- 가장 바깥 div -->
        </div>





    </div>
</form>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="Admin_js/bootstrap.js"></script>
<script type="text/javascript">
    var count = 1;

    <%--'단어 추가하기' Button 클릭시 textbox 생성--%>
    /*
    $("input.btn").click(function (){
        alert('input btn');

        $(document).ready(function() {
           let obj = $(".divTest").val();
           let WordDiv = $("")
        });

    });
    */


    function Add_WordBox() {

        var obj = document.getElementById("divTest");
        var WordDiv = document.createElement('div');

        WordDiv.innerHTML = "<table>\n" +
            "                  <col width=\"260px\"><col width=\"568px\"><col width=\"100px\">\n" +
            "                     <tr>\n" +
            "                        <td>\n" +
            "                            <input type=\"text\" class=\"form-control\" size=\"20\" placeholder=\"단어를 입력하세요\">" +
            "                        </td>\n" +
            "                        <td>\n" +
            "                            <input type=\"text\" class=\"form-control\" size=\"40\" placeholder=\"뜻을 입력하세요\"><br>\n" +
            "                        </td>\n" +
            "                        <td>\n" +
        //    "                            <button type=\"button\" class=\"btn\" onclick=\"Remove_WordBox(this)\"> 삭제 </button>\n" +
            "                            <button type=\"button\" class=\"btn\">삭제</button>\n" +
            "                        </td>\n" +
            "                      </tr>" +
            "                  </table> \n";


        WordDiv.setAttribute("id", "myDiv");

        WordDiv.onclick = function () {
            var p = this.parentElement;
            //    p.removeChild(this);
        };
        obj.appendChild(WordDiv);

    }


    /* 단어 입력 삭제 */
    $(document).on('click', "button.btn", function (){
    //    alert('click');
        $(this).parent().parent().remove();
    });

/*
    function Remove_WordBox(obj) {

        //let Element = document.getElementById("myDiv");
        //let RemoveWord = document.getElementById(obj);
        //Element.removeChild(this);

        alert('Remove_WordBox');

        var WordDiv = document.createElement('div');
        var removedObj = WordDiv.parentElement;
        alert(removedObj);
        removedObj = removedObj.parentElement;
        removedObj.removeChild(WordDiv);

       //var myDiv = document.getElementById("myDiv");       // 부모 객체 알아내기
       // parent.removeChild(myDiv);                          // 부모로부터 myDiv 객체 떼어내기


    }*/


    function WriteConfirm(ArticleSave) {
        var title = ArticleSave.title.value;
        var content = ArticleSave.content.value;
        var url = ArticleSave.url.value;

        if (title.trim() == ''){
            alert("제목을 입력해주세요");
            return false;
        }
        if (content.trim() == ''){
            alert("작성자를 입력해주세요");
            return false;
        }
        if (url.trim() == ''){
            alert("내용을 입력해주세요");
            return false;
        }
        ArticleSave.submit();
    }
</script>




</body>
</html>