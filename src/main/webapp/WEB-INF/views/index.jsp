<%--
  Created by IntelliJ IDEA.
  User: kimbogeun
  Date: 2020/08/05
  Time: 4:02 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="/css/default.css">
    <link rel="stylesheet" href="/css/bootstrap.css">
    <link rel="stylesheet" href="/css/fonticon.css">
</head>
<body>
    <%--부트스트랩 테스트--%>
    <h1 class="text text-color-green text-weight-bold">들어왔니</h1>
    <h1 class="text text-color-gray100 text-weight-light">들어왔니</h1>

    <button class="btn btn-primary btn-lg">getMember</button>
    <br>
    <br>
    <input type="text" class="form-control " placeholder="안녕하세요!">
    <i class="icon_close"></i>
    <i class="icon_translate"></i>
    <i class="icon_check_circle"></i>
<script>
    (()=>{
        const getMemberBtn = document.querySelector('button');
        getMemberBtn.addEventListener('click', ()=>{
            fetch('login/getMember', {
                method: 'POST',
                body : {},
            }).then(response => {
                console.log(response);
                return response.json()
            })
                .then(response => console.log(response));
        });
    })();
</script>
</body>
</html>
