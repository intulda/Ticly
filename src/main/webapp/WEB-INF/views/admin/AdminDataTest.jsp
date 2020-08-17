<%@ page import="java.util.Arrays" %>
<%@ page import="java.util.Enumeration" %>
<%@ page import="java.io.DataInputStream" %>
<%@ page import="java.nio.charset.StandardCharsets" %>
<%--
  Created by IntelliJ IDEA.
  User: Hyeseung
  Date: 2020-08-14
  Time: 오후 4:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>AdminDataCheck.jsp</title>
</head>
<body>

    <p> Admin 페이지 Axios Data Test </p>

    파일 : <br>

    <%-- 이미지 jsp 파일에 보여주기 : 경로는 맞는데 엑박 문제 해결해야함 --%>
    <h1>Upload completed</h1>
    <div class="result-images">
        <img src="${pageContext.request.contextPath }${fileUrl }" style="width:200px">
    </div>

    <p> <a href='/WriteTest'> 다시 업로드 하기 </a>

    <br><br>

    <%
        String[] category = request.getParameterValues("category");
        if(category != null) {
            for(int i=0; i< category.length; i++){
            %>
                <% System.out.println(Arrays.toString(category)); %>
                카테고리: <%=category[i] %>
            <%
            }
        }
    %>

    <p> title: <%=request.getParameter("title") %></p>
    <p> 원문 URL: <%=request.getParameter("url") %> </p>
    <p> Summary: <%=request.getParameter("summary") %></p>
    <p> Hash-tag: <%=request.getParameter("hashtag") %></p>
    <p> content: <%=request.getParameter("content") %></p>


        <%
        String[] insert_word = request.getParameterValues("insertword");
        String[] insert_mean = request.getParameterValues("insertmean");
        %>

        <% System.out.println("단어: " + Arrays.toString(insert_word) + "\n" + "뜻: " + Arrays.toString(insert_mean)); %>
        단어: <%=Arrays.toString(insert_word) %>  <br>
        뜻:   <%=Arrays.toString(insert_mean) %>

</body>
</html>
