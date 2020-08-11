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
    <title>Title</title>
</head>
<body>

<hr>
<h1> 아티클 기본 정보 </h1>

<form action="ArticleSave">
    <table>
        <col width="300"> <col width="300">
        <tr>
            <th>
                <p> 카테고리 </p>
            </th>
            <td>
                <select>
                    <option> 개발 </option>
                    <option> UI/UX </option>
                    <option> 브랜딩 </option>
                    <option> 마케팅 </option>
                    <option> 경제 </option>
                </select>
            </td>
        </tr>

        <tr>
            <th> <p> 제목 </p></th>
            <td>
                <input type="txt" name="WriteTitletxt" size="100" placeholder="제목을 입력해주세요">
            </td>
        </tr>

        <tr>
            <th> <p> 원문 URL </p></th>
            <td>
                <input type="txt" name="ArticleUrltxt" value="https://" size="100" >
            </td>
        </tr>

        <tr>
            <th> <p> 요약 </p></th>
            <td>
                <textarea name="Summarytxt" cols="102" rows="5" placeholder="DISCLAIMER: This project was done by me and my classmates for a school project and is not made, owned, or affiliated directly to Accedo. What if Netflix knew what you want...">
                </textarea>
            </td>
        </tr>

        <tr>
            <th> <p> 태그 </p></th>
            <td>
                <input type="txt" name="HashTagtxt" value="https://" size="100" >
            </td>
        </tr>
    </table>

    <hr>
    <h1> 내용 </h1>

    <table>
        <col width="300"> <col width="300">

        <tr>
            <th>
                <p> 내용 </p>
            </th>
            <td>
                <textarea name="Summarytxt" cols="105" rows="5" placeholder="DISCLAIMER: This project was done by me and my classmates for a school project and is not made, owned, or affiliated directly to Accedo. What if Netflix knew what you want...">
                </textarea>
            </td>
        </tr>

    </table>

    <hr>
    <hr>

    <h1> 단어 정보 </h1>

    <table>
        <col width="100"><col width="300"><col width="50">
        <tr>
            <th> 단어 </th>
            <th colspan="2"> 뜻 </th>
        </tr>

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

        <tr>
            <td colspan="3">
                <button type="button"> + 단어 추가하기 </button>
            </td>
        </tr>
    </table>

    <hr>

    <input type="submit" value="저장하기">
    <button type="button"> 뒤로가기 </button>

</form>


<%--'단어 추가하기' Button 클릭시 textbox 생성--%>
<script type="text/javascript">

    function add_textbox() {
    }


</script>

</body>
</html>
