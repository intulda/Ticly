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
</head>
<body>

<table width="800" cellpadding="0" cellspacing="0" border="1">
    <colgroup>
        <col width="10"><col width="200"><col width="100"><col width="10">
    </colgroup>
    <tr>
        <td>번호</td>
        <td>아티클 제목</td>
        <td>작성일</td>
        <td>삭제</td>
    <tr>
    <c:forEach items="${list}" var="dto">
        <tr>
            <td>${dto.article_seq}</td>
            <%--<td><a href="${pageContext.request.contextPath}/AdminWriteDetail?title=${dto.title}">${dto.title}</td>--%>
            <td><a href="${pageContext.request.contextPath}/AdminWriteDetail?articleseq=${dto.article_seq}">${dto.title}</td>
            <td>${dto.reg_date}</a></td>
            <td><a href="delete?seq=${dto.article_seq}">X</a></td>
        <tr>
    </c:forEach>
</table>

<p><a href="/writeForm">아티클 등록하기</a></p>

</body>
</html>
