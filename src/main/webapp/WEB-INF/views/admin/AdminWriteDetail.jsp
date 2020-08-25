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
제목 : ${dto.title} <br>
기사 요약 : ${param.summary} <br>
내용 :
원문 주소 : ${dto.url}  <br>
<hr>

<br><p>
    <a href="ArticleList">아티클 목록보기</a>

</body>
</html>
