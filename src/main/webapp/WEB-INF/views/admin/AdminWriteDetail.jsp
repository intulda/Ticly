<%--
  Created by IntelliJ IDEA.
  User: UserK
  Date: 2020-08-19
  Time: 오전 8:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

아티클 내용보기 <br>
<hr>
<%--작성자 : 작성자1 <br>--%>
제목 :  ${article.title } <br>
기사 요약 : ${article.summary} <br>
해시태그 : ${article.hashtag} <br>
원문 주소 : ${article.url}  <br>
<hr>

단어 모음


<br><p>
    <a href="ArticleList">아티클 목록보기</a>

</body>
</html>
