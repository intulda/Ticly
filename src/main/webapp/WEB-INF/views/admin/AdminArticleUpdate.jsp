<%--
  Created by IntelliJ IDEA.
  User: Hyeseung
  Date: 2020-08-19
  Time: 오후 7:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<h2> 아티클 수정 </h2>

<div class="container">
    <form action="/updateArticle" method="post">
        <div class="form-group">
            <label for="subject">제목</label>
            <input type="text" class="form-control" id="subject" name="subject" value="${detail.subject}">
        </div>
        <div class="form-group">
            <label for="content">내용</label>
            <textarea class="form-control" id="content" name="content" rows="3">${detail.content}</textarea>
        </div>
        <input type="hidden" name="bno" value="${bno}"/>
        <button type="submit" class="btn btn-primary">수정</button>
    </form>
</div>
</body>
</html>
