<%--
  Created by IntelliJ IDEA.
  User: chen
  Date: 2020/3/27
  Time: 16:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>test</title>
    <script type="text/javascript" src="./js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="./js/test.js"></script>
  </head>
  <body>
  <table border="1">
    <tr><th>GetUserPwd</th><th>INSERT</th><th>GetUserData</th><th>DELETE</th><th>ALTER</th><th>GetEngineerData</th></tr>
    <tr><th>111</th><th>222</th><th>213</th><th>333</th><th>444</th><th>555</th></tr>
  </table>
  <br>
  <form action="" method="post">
    <label>condition:<input type="text" id="condition"></label>
    <div>
      <br><label><b>DELETE:</b></label>
      <div style="margin-inline-start: 20px">
        <div>
          <br>
          <label>tableName:<input type="text" id="tableName"></label>
          <label>PrimaryKey:<input type="text" id="PrimaryKey"></label>
        </div>
      </div>
    </div>
    <div>
      <br><label><b>INSERT:</b></label>
      <div style="margin-inline-start: 20px">
        <table border="1" style="margin-top: 20px">
          <tr><th>用户</th><th>工程师</th><th>mapping</th></tr>
          <tr><th>1</th><th>2</th><th>3</th></tr>
        </table>
        <br><label>选择插入的类型: <input type="text" id="insert_type"></label>
        <div>
          <br>
          <label><b>用户:</b></label>
          <div style="margin-left: 20px">
            <label>用户名:<input type="text" id="username"></label>
            <label>密码:<input type="text" id="password"></label>
            <label>姓名:<input type="text" id="user_name"></label>
            <label>性别:<input type="text" id="user_sex"></label>
          </div>
        </div>
        <div>
          <br>
          <label><b>工程师:</b></label>
          <div style="margin-left: 20px">
            <label>姓名:<input type="text" id="engineer_name"></label>
            <label>性别:<input type="text" id="engineer_sex"></label>
            <label>生日:<input type="text" id="birthday"></label>
            <label>手机号码:<input type="text" id="mobile"></label><br><br>
            <label>地址:<input type="text" id="address"></label>
            <label>籍贯:<input type="text" id="nativeplace"></label>
            <label>工作年龄:<input type="text" id="workingYears"></label>
            <label>薪水:<input type="text" id="salary"></label>
            <label>学历:<input type="text" id="education"></label>
          </div>
        </div>
        <div>
          <br>
          <label><b>mapping</b></label>
          <div style="margin-left: 20px">
            <label>engineer_id:<input type="text" id="engineer_id"></label>
            <label>user_id:<input type="text" id="user_id"></label>
          </div>
        </div>
      </div>
    </div>
  </form>
  <button  id="_button" >确定</button>
  <p id="result">输出</p>
  </body>
</html>
