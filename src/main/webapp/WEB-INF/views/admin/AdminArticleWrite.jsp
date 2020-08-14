<%--
  Created by IntelliJ IDEA.
  User: Hyeseung Jang
  Date: 2020-08-07
  Time: 오후 3:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>AdminArticleWrite.jsp</title>
    <link rel="stylesheet" href="Admin_css/bootstrap.css">
<style>


</style>
</head>
<body>

<hr>
<h1> <b> 아티클 기본 정보 </b> </h1>

<form action="ArticleSave">
    <table>
        <colgroup>
        <col width="300"> <col width="300">
        </colgroup>
        <tr height="50" align="center">
            <th>
                <p> &nbsp;&nbsp; 카테고리 </p>
            </th>
            <td>
            <%--
                <select>
                    <option> 개발 </option>
                    <option> UI/UX </option>
                    <option> 브랜딩 </option>
                    <option> 마케팅 </option>
                    <option> 경제 </option>
                </select>
             --%>
                <select class="form-control" id="CategoryForm">
                    <option> === 카테고리 선택 === </option>
                    <option> 개발 </option>
                    <option> UI/UX </option>
                    <option> 브랜딩 </option>
                    <option> 마케팅 </option>
                    <option> 경제 </option>
                </select>

            </td>
        </tr>

        <tr height="50" align="center">
            <th class="col-sm-3"> <p> 제목 </p></th>
            <td>
                <%--<input type="txt" name="WriteTitletxt" size="100" placeholder="제목을 입력해주세요">--%>
                <input type="text" id="ArticleTitle" class="form-control form-control-lg" placeholder="제목을 입력해주세요">
            </td>
        </tr>

        <tr height="50">
            <th class="col-sm-3"> <p> 기사 이미지 첨부 </p></th>
            <td>
                <input type="file" name="file" class="form-control-file">
            </td>
        </tr>

        <tr height="50" align="center">
            <th class="col-sm-3"> <p> 원문 URL </p></th>
            <td>
                <%--<input type="txt" name="ArticleUrltxt" value="https://" size="100" >--%>
                    <input type="text" class="form-control" id="ArticleUrl" aria-describedby="basic-addon3"
                                        placeholder="http://">
                </div>
            </td>
        </tr>

        <tr height="130" align="center">
            <th> <p> &nbsp;&nbsp; 요약 </p></th>
            <td>
                <textarea name="Summarytxt" cols="110" rows="5"
                          placeholder="DISCLAIMER: This project was done by me and my classmates for a school project and is not made, owned, or affiliated directly to Accedo. What if Netflix knew what you want...">
                </textarea>
            </td>
        </tr>

        <tr height="50" align="center">
            <th class="col-sm-3"> <p> 태그 </p></th>
            <td>
                <input type="txt" name="HashTagtxt" size="100" placeholder="내용을 입력하세요 (#해시태그)" class="form-control" id="basic-url" aria-describedby="basic-addon3">>
            </td>
        </tr>
    </table>

    <hr>
    <h1> <b> 내용 </b></h1>

    <table>
        <col width="300"> <col width="300">

        <tr>
            <th>
                <p> 내용 </p>
            </th>
            <td>
                <textarea name="Summarytxt" cols="110" rows="30"
                          placeholder="DISCLAIMER: This project was done by me and my classmates for a school project and is not made, owned, or affiliated directly to Accedo. What if Netflix knew what you want...">
                </textarea>
            </td>
        </tr>

    </table>

    <hr>
    <hr>

    <h1> <b> 단어 정보 </b> </h1>
    <input type="text" value="account for" size="20" readonly="readonly">
    <input type="text" value="설명하다" size="40" readonly="readonly"><br>

    단어 / 뜻 순서로 추가하세요

    <table>

        <%--
        <col width="100"><col width="300"><col width="50">
        <tr>
            <th> 단어 </th>
            <th colspan="2"> 뜻 </th>
        </tr>
        --%>


        <%--
        <tr>
            <td> <input type="text" size="20"> </td>
            <td> <input type="text" size="40"> </td>
            <td> <input type="button" value="삭제" onclick="Remove_WordBox(this)">  </td>
        </tr>
        --%>


        <%--
        <tr>
            <td>
                <input type="text" size="20">
            </td>
            <td>
                <input type="text" size="40">
            </td>
            <td>
                <button type="button"> 삭제 </button>
            </td>
        </tr>
        --%>

        <div id="divTest">
            <%--
            <tr>
                <td> <input type="text" size="20"> </td>
                <td> <input type="text" size="40"> </td>
                <td> <input type="button" value="삭제" onclick="Remove_WordBox(this)">  </td>
            </tr>
            --%>
        </div>

        <tr>
            <td colspan="3">
                <button type="button" class="btn" onclick="Add_WordBox()"> + 단어 추가하기 </button>
            </td>
        </tr>
    </table>

    <hr>

    <button type="button" class="btn btn-success"> 저장하기 </button>
    <button type="button" class="btn"> 뒤로가기 </button>
    <button type="button" class="btn"> 아티클 목록 </button>

</form>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
<script type="text/javascript" src="Admin_js/bootstrap.js"></script>
<script type="text/javascript">
    var count = 1;

    <%--'단어 추가하기' Button 클릭시 textbox 생성--%>
    function Add_WordBox() {
        /*
        let ptag = document.createElement('p');
        let textNode = document.createTextNode("WordBox Test");			// 문자열

        ptag.appendChild(textNode);										// <p>새로운 태그</p>

        let element = document.getElementById("div1");					// div1 소환
        element.appendChild(ptag);
        */

        var obj = document.getElementById("divTest");
        var WordDiv = document.createElement('div');

        /*WordDiv.innerHTML = "WordBox Test";*/
        WordDiv.innerHTML = "<tr>\n" +
            "                <td> <input type=\"text\" size=\"20\"> </td>\n" +
            "                <td> <input type=\"text\" size=\"40\"> </td>\n" +
            "                <td> <input type=\"button\" value=\"삭제\"" +
            "                onclick=\"Remove_WordBox(this)\">  </td>\n" +
            "                </tr>";

        WordDiv.setAttribute("id", "myDiv");
        // WordDiv.style.backgroundColor = "yellow";

        WordDiv.onclick = function () {
            var p = this.parentElement;
        //    p.removeChild(this);
        };
        obj.appendChild(WordDiv);


    }


    function Remove_WordBox(obj) {
        let Element = document.getElementById("myDiv");
        let RemoveWord = document.getElementById(obj);
        Element.removeChild(this);
    }


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


<script src="https://unpkg.com/axios/dist/axios.min.js">

    const axios = require('axios');
    axios.get('/user?ID=12345')
        // 응답(성공)
        .then(function (response) {
            console.log(response);
        })
        // 응답(실패)
        .catch(function (error) {
            console.log(error);
        })
        // 응답(항상 실행)
        .then(function () {
            // ...
        });


</script>




</body>
</html>
