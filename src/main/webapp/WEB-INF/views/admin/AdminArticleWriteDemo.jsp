<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.InputStreamReader" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%--
  Created by IntelliJ IDEA.
  User: Hyeseung Jang
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
    <title>AdminArticleWriteDemo.jsp</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <!-- Common -->
    <c:import url="/WEB-INF/views/layout/globalImport.jsp"></c:import>

    <style>

        .flex_container {
            display: flex;
            flex-direction: column;
            padding-left: 200px;
            padding-right: 50px;
            padding-top: 10px;
            padding-bottom: 30px;
            text-align: center;
            justify-content: space-between;
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

        .Admin-header-menu-tab {
            display: flex;
            padding-left: 200px;
            padding-right: 50px;
            padding-top: 20px;
            padding-bottom: 10px;
            text-align: justify;
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

        .admin-header{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .admin-write-btn{
            display: flex;
            padding-left: 10px;
            padding-right: 200px;
            padding-top: 20px;
            padding-bottom: 10px;
        }



        a {
            /*margin-left: 1px;*/
            padding: 6px;
        }
    </style>

</head>

<body>


<div class="ticly__basic-layout">
    <c:import url="/WEB-INF/views/layout/globalNav.jsp"></c:import>

    <div class="container-xg ticly__basic-content-layout">
        <div class="flex_container">


            <!-- 관리자 페이지 내 Tab + 저장하기 -->
            <form action="/ArticleList" id="admin-add-frm" method="post">
            <div class="item admin-header">
                <div class="Admin-header-menu-tab" align="left">
                    <a style="text-decoration:none" href="/writeForm"> <h6 class="text text-color-green text-weight-medium" > 아티클 등록하기 </h6> </a>
                    <a style="text-decoration:none" href="/ArticleList"> <h6 class="text text-color-gray300 text-weight-medium"> 아티클 목록 </h6> </a>
                    <a style="text-decoration:none" href="admin/clientmanage" > <h6 class="text text-color-gray300 text-weight-medium"> 회원 관리 </h6> </a>
                </div>

                <div class="admin-write-btn">
                    <input type="button" id="saveBtn" class="btn btn-success" value="저장하기" style="float: right;">
                    <input type="button" name="backBtn" class="btn" value="뒤로가기" style="float: right;" onclick="history.back()">
                </div>
            </div>



            <!--  아티클 기본 정보 Section -->
            <div class="item">
                <div class="ArticleInfo" align="center">
                    <hr>
                    <table>
                        <col width="200px"><col width="908px">
                        <tr>
                            <td rowspan="5" valign="top" align="left">
                                <p class="text body1 text-weight-black text-color-gray100"> 아티클 기본 정보 </p>

                            </td>
                            <td>
                                <p class="text body1 text-weight-medium text-color-gray100"> 카테고리 </p>
                                <select id="cb_category" class="form-control" name="category">
                                    <option value="카테고리X"> 카테고리를 선택하세요 </option>
                                    <option value="개발"> 개발 </option>
                                    <option value="UI/UX"> UI/UX </option>
                                    <option value="브랜딩"> 브랜딩 </option>
                                    <option value="마케팅"> 마케팅 </option>
                                    <option value="경제"> 경제 </option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <p class="ext body1 text-weight-medium text-color-gray100"> 제목 </p>
                                <input type="text" id="title" name="title" class="form-control form-control-lg" value="제목Test" placeholder="제목을 입력해주세요">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p class="ext2 body1 text-weight-medium text-color-gray100"> 원문 URL </p>
                                <input type="text" id="url" name="url" class="form-control" aria-describedby="basic-addon3" value="http://aaa.aa.a" placeholder="http://">
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <p class="ext2 body1 text-weight-medium text-color-gray100"> 아티클 이미지 파일 </p>
                                <input type="file" id="file1" name="file1">
                                <%--<input type="button" name="file-upload-btn" value="이미지 등록" onclick="window.open('/fileupload','name','resizable=no width=500 height=300');return false">--%>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <p class="ext3 body1 text-weight-medium text-color-gray100"> 요약 </p>
                                <textarea name="summary" id="summary" class="form-control " cols="110" rows="5" placeholder="DISCLAIMER: This project was done by me and my classmates for a school project and is not made, owned, or affiliated directly to Accedo. What if Netflix knew what you want..."> SUMMARY TEST </textarea>
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
                                <textarea id="contents" name="content" class="form-control" cols="110" rows="10" placeholder="DISCLAIMER: This project was done by me and my classmates for a school project and is not made, owned, or affiliated directly to Accedo. What if Netflix knew what you want..."> 내용 TEST </textarea>
                            </td>
                        </tr>

                        <tr>
                            <td valign="top" align="left">
                                <p class="text body1 text-weight-black text-color-gray100"> 태그 </p>
                            </td>
                            <td>
                                <input type="text" id="tag" name="hashtag" size="200" value="#태그1 #태그2" placeholder="내용을 입력하세요 (#해시태그)" class="form-control"  aria-describedby="basic-addon3">
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
                                            <input type="text" class="form-control" value="account for" size="10" readonly="readonly">
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" value="설명하다" size="40" readonly="readonly"><br>
                                        </td>
                                        <td>
                                            <%--<button type="button" class="btn"> 삭제 </button>--%>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="text" class="form-control" value="Null Pointer Exception" size="10" readonly="readonly">
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" value="눌 포인트 익셉션" size="40" readonly="readonly"><br>
                                        </td>
                                        <td>
                                            <%--<button type="button" class="btn"> 삭제 </button>--%>
                                        </td>
                                    </tr>


                                </table>
                                <table id="word_rows">
                                    <col width="260px"><col width="568px"><col width="100px">
                                    <tr class="word-row">
                                        <td>
                                            <input type="text"  class="form-control" size="20" name="insertword" placeholder="단어를 입력하세요">
                                        </td>
                                        <td>
                                            <input type="text"  class="form-control" size="40" name="insertmean" placeholder="뜻을 입력하세요"><br>
                                        </td>
                                        <td>
                                            <%-- <button type="button" class="btn" onclick="Remove_WordBox(this)"> 삭제 </button>--%>
                                            <button type="button" class="btn" > 삭제 </button>
                                        </td>
                                    </tr>
                                </table>
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
            </form>
        </div>
    </div>
    <c:import url="/WEB-INF/views/layout/globalFooter.jsp"></c:import>
</div>




<script type="text/javascript">
    $(function(){
        $('#saveBtn').click(function(){
            var formData = new FormData();
            var data = new Object();
            data.category = $("#cb_category").val();
            data.title = $("#title").val();
            data.url = $("#url").val();
            data.file = $("#file").val();
            data.summary = $("#summary").val();
            data.contents = $("#contents").val();
            data.hashtag = $("#tag").val();
            data.vocaDTOS = [];

            $.each($("tr[class='word-row']"), function(index, item){
                var row = $(item).find("td");
                console.log(row);
                var word = new Object();
                word.voca = $($(row[0]).find("input[type='text']")).val();
                word.meaning = $($(row[1]).find("input[type='text']")).val();
                data.vocaDTOS.push(word);
            });


            formData.append('file', $('input[type=file]')[0].files[0]);
            formData.append('data',JSON.stringify(data));

            console.log(formData);


            axios("/ArticleList", {
                method: 'POST',
                data: formData,
                header: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            $(location).attr('href','/ArticleList');
        });
    });
    var count = 1;

    function Add_WordBox() {

       /* var obj = $("#divTest");*/
        var html = '<tr class="word-row">';
        html += '<td><input type="text" name="insertword" class="form-control" size="20" name="insertword" placeholder="단어를 입력하세요"></td>'
        html += '<td> <input type="text" name="insertmean" class="form-control" size="40" name="insertmean" placeholder="뜻을 입력하세요"></td>'
        html += ' <td><button type="button" class="btn" > 삭제 </button></td>'
        html += '</tr>'
        $("#word_rows").append(html);


        /*var WordDiv = document.createElement('div');

        WordDiv.innerHTML = "<table>\n" +
            "                  <col width=\"260px\"><col width=\"568px\"><col width=\"100px\">\n" +
            "                     <tr>\n" +
            "                        <td>\n" +
            "                            <input type=\"text\" class=\"form-control\" size=\"20\" name=\"insertword\" placeholder=\"단어를 입력하세요\">" +
            "                        </td>\n" +
            "                        <td>\n" +
            "                            <input type=\"text\" class=\"form-control\" size=\"40\" name=\"insertmean\" placeholder=\"뜻을 입력하세요\"><br>\n" +
            "                        </td>\n" +
            "                        <td>\n" +
            "                            <button type=\"button\" class=\"btn\">삭제</button>\n" +
            "                        </td>\n" +
            "                      </tr>" +
            "                  </table> \n";


        WordDiv.setAttribute("id", "myDiv");

        WordDiv.onclick = function () {
            var p = this.parentElement;
            //    p.removeChild(this);
        };
        obj.appendChild(WordDiv);*/

    }


    /* 단어 입력 삭제 */
    $(document).on('click', "button.btn", function (){
        //    alert('click');
        $(this).parent().parent().remove();
    });


    function WriteConfirm() {

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