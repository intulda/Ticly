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
</head>
<body>
    <h1>들어왔니</h1>
    <button>getMember</button>
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
