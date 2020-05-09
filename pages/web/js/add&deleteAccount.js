$(document).ready(
    function () {
        // var condition = $("condition").text;
        $("#buttonaddA").click(function () {
            var condition = $("#condition").val();
            var tableName = $("#tableName").val();
            var PrimaryKey=$("#PrimaryKey").val();
            var userName=$("#username").val();
            var id= $("#id").val();
            var password =$("#password").val();
            var user_name=$("#user_name").val();
            var user_sex=$("#user_sex").val();
            var engineer_name=$("#engineer_name").val();
            var engineer_sex=$("#engineer_sex").val();
            var mobile=$("#mobile").val();
            var birthday=$("#birthday").val();
            var address=$("#address").val();
            var nativeplace=$("#nativeplace").val();
            var workingYears=$("#workingYears").val();
            var salary=$("#salary").val();
            var education=$("#education").val();
            var engineer_id=$("#engineer_id").val();
            var user_id=$("#user_id").val();
            var insert_type=$("#insert_type").val();
            var update_user_id=$("#update_user_id").val();
            var update_engineer_id=$("#update_engineer_id").val();
            if (userName == ""){
                alert("用户名不能为空");
                return;
            } else if(password == ""){
                alert("密码不能为空");
                return;
            } else if(user_name == ""){
                alert("姓名不能为空");
                return;
            } else if(user_sex == ""){
                alert("性别不能为空");
                return;
            }
            ajaxObj = $.ajax({
                type:"get",
                contentType: "application/json;charset=UTF-8",
                // url:"service",
                url:"http://193.112.176.224:8080/Web_war/service",
                async:true,
                data:{
                    "condition":$("#condition").val(),
                    "tableName":$("#tableName").val(),
                    "PrimaryKey":$("#PrimaryKey").val(),
                    "userName":$("#username").val(),
                    "id":$("#id").val(),
                    "password":$("#password").val(),
                    "user_name":$("#user_name").val(),
                    "user_sex":$("#user_sex").val(),
                    "engineer_name":$("#engineer_name").val(),
                    "engineer_sex":$("#engineer_sex").val(),
                    "mobile":$("#mobile").val(),
                    "birthday":$("#birthday").val(),
                    "address":$("#address").val(),
                    "nativeplace":$("#nativeplace").val(),
                    "workingYears":$("#workingYears").val(),
                    "salary":$("#salary").val(),
                    "education":$("#education").val(),
                    "engineer_id":$("#engineer_id").val(),
                    "user_id":$("#user_id").val(),
                    "insert_type":$("#insert_type").val(),
                    "update_user_id":$("#update_user_id").val(),
                    "update_engineer_id":$("#update_engineer_id").val(),
                },
                success:function () {
                    //alert(ajaxObj.responseText);
                    if (ajaxObj.responseText == "delete ok")
                    {
                        alert("操作成功！");
                        $("input[type='text']").val("");
                    }
                    else if (ajaxObj.responseText == "error: this row not exist")
                    {
                        alert("此用户不存在，请重新输入");
                        return;
                    }
                    else if (ajaxObj.responseText.indexOf("Duplicate")>-1)
                    {
                        alert("用户名重复，请重新插入");
                        return;
                    }
                    else if (ajaxObj.responseText == "error : insert error")
                    {
                        alert("请输入全部正确信息");
                        return;
                    }
                    else if (ajaxObj.responseText == "error: java.lang.NumberFormatException: For input string: \"\"")
                    {
                        alert("输入信息不能为空！");
                        return;
                    }
                    else
                    {
                        alert(ajaxObj.responseText);
                        return;
                    }
                },
                error:function () {
                    alert(ajaxObj.responseText);
                    $("input[type='text']").val("");
                }
            });
        });
        $("#buttondeleteA").click(function () {
            var condition = $("#condition").val();
            var tableName = $("#tableName").val();
            var PrimaryKey=$("#PrimaryKey").val();
            var userName=$("#username").val();
            var id= $("#id").val();
            var password =$("#password").val();
            var user_name=$("#user_name").val();
            var user_sex=$("#user_sex").val();
            var engineer_name=$("#engineer_name").val();
            var engineer_sex=$("#engineer_sex").val();
            var mobile=$("#mobile").val();
            var birthday=$("#birthday").val();
            var address=$("#address").val();
            var nativeplace=$("#nativeplace").val();
            var workingYears=$("#workingYears").val();
            var salary=$("#salary").val();
            var education=$("#education").val();
            var engineer_id=$("#engineer_id").val();
            var user_id=$("#user_id").val();
            var insert_type=$("#insert_type").val();
            var update_user_id=$("#update_user_id").val();
            var update_engineer_id=$("#update_engineer_id").val();
            if (user_id == ""){
                alert("ID不能为空");
                return;
            }
            ajaxObj = $.ajax({
                type:"get",
                contentType: "application/json;charset=UTF-8",
                // url:"service",
                url:"http://193.112.176.224:8080/Web_war/service",
                async:true,
                data:{
                    "condition":$("#condition").val(),
                    "tableName":$("#tableName").val(),
                    "PrimaryKey":$("#PrimaryKey").val(),
                    "userName":$("#username").val(),
                    "id":$("#id").val(),
                    "password":$("#password").val(),
                    "user_name":$("#user_name").val(),
                    "user_sex":$("#user_sex").val(),
                    "engineer_name":$("#engineer_name").val(),
                    "engineer_sex":$("#engineer_sex").val(),
                    "mobile":$("#mobile").val(),
                    "birthday":$("#birthday").val(),
                    "address":$("#address").val(),
                    "nativeplace":$("#nativeplace").val(),
                    "workingYears":$("#workingYears").val(),
                    "salary":$("#salary").val(),
                    "education":$("#education").val(),
                    "engineer_id":$("#engineer_id").val(),
                    "user_id":$("#user_id").val(),
                    "insert_type":$("#insert_type").val(),
                    "update_user_id":$("#update_user_id").val(),
                    "update_engineer_id":$("#update_engineer_id").val(),
                },
                success:function () {
                    //alert(ajaxObj.responseText);
                    if (ajaxObj.responseText == "delete ok")
                    {
                        alert("操作成功！");
                        $("input[type='text']").val("");
                    }
                    else if (ajaxObj.responseText == "error: this row not exist")
                    {
                        alert("此用户不存在，请重新输入");
                        return;
                    }
                    else if (ajaxObj.responseText.indexOf("Duplicate")>-1)
                    {
                        alert("用户名重复，请重新插入");
                        return;
                    }
                    else if (ajaxObj.responseText == "error : insert error")
                    {
                        alert("请输入全部正确信息");
                        return;
                    }
                    else if (ajaxObj.responseText == "error: java.lang.NumberFormatException: For input string: \"\"")
                    {
                        alert("输入信息不能为空！");
                        return;
                    }
                    else
                    {
                        alert(ajaxObj.responseText);
                        return;
                    }
                },
                error:function () {
                    alert(ajaxObj.responseText);
                    $("input[type='text']").val("");
                }
            });
        });
        $("#buttondeleteAN").click(function () {
            var condition = $("#condition").val();
            var tableName = $("#tableName").val();
            var PrimaryKey=$("#PrimaryKey").val();
            var userName=$("#username").val();
            var id= $("#id").val();
            var password =$("#password").val();
            var user_name=$("#user_name").val();
            var user_sex=$("#user_sex").val();
            var engineer_name=$("#engineer_name").val();
            var engineer_sex=$("#engineer_sex").val();
            var mobile=$("#mobile").val();
            var birthday=$("#birthday").val();
            var address=$("#address").val();
            var nativeplace=$("#nativeplace").val();
            var workingYears=$("#workingYears").val();
            var salary=$("#salary").val();
            var education=$("#education").val();
            var engineer_id=$("#engineer_id").val();
            var user_id=$("#user_id").val();
            var insert_type=$("#insert_type").val();
            var update_user_id=$("#update_user_id").val();
            var update_engineer_id=$("#update_engineer_id").val();
            if (userName == ""){
                alert("用户名不能为空");
                return;
            }
            ajaxObj = $.ajax({
                type:"get",
                contentType: "application/json;charset=UTF-8",
                // url:"service",
                url:"http://193.112.176.224:8080/Web_war/service",
                async:true,
                data:{
                    "condition":$("#condition").val(),
                    "tableName":$("#tableName").val(),
                    "PrimaryKey":$("#PrimaryKey").val(),
                    "userName":$("#username").val(),
                    "id":$("#id").val(),
                    "password":$("#password").val(),
                    "user_name":$("#user_name").val(),
                    "user_sex":$("#user_sex").val(),
                    "engineer_name":$("#engineer_name").val(),
                    "engineer_sex":$("#engineer_sex").val(),
                    "mobile":$("#mobile").val(),
                    "birthday":$("#birthday").val(),
                    "address":$("#address").val(),
                    "nativeplace":$("#nativeplace").val(),
                    "workingYears":$("#workingYears").val(),
                    "salary":$("#salary").val(),
                    "education":$("#education").val(),
                    "engineer_id":$("#engineer_id").val(),
                    "user_id":$("#user_id").val(),
                    "insert_type":$("#insert_type").val(),
                    "update_user_id":$("#update_user_id").val(),
                    "update_engineer_id":$("#update_engineer_id").val(),
                },
                success:function () {
                    //alert(ajaxObj.responseText);
                    if (ajaxObj.responseText == "delete ok")
                    {
                        alert("操作成功！");
                        $("input[type='text']").val("");
                    }
                    else if (ajaxObj.responseText == "error: this row not exist")
                    {
                        alert("此用户不存在，请重新输入");
                        return;
                    }
                    else if (ajaxObj.responseText.indexOf("Duplicate")>-1)
                    {
                        alert("用户名重复，请重新插入");
                        return;
                    }
                    else if (ajaxObj.responseText == "error : insert error")
                    {
                        alert("请输入全部正确信息");
                        return;
                    }
                    else if (ajaxObj.responseText == "error: java.lang.NumberFormatException: For input string: \"\"")
                    {
                        alert("输入信息不能为空！");
                        return;
                    }
                    else
                    {
                        alert(ajaxObj.responseText);
                        return;
                    }
                },
                error:function () {
                    alert(ajaxObj.responseText);
                    $("input[type='text']").val("");
                }
            });
        });
    }
);