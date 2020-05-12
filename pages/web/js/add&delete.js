$(document).ready(
    function () {

        var body=window.document.getElementById("n_r");
        body.innerHTML = $.cookie('u_name');

        // var condition = $("condition").text;
        $("#buttonAdd").click(function () {
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
            var pattern = /^((19[2-9]\d{1})|(20((0[0-4]))))\-((0?[1-9])|(1[0-2]))\-((0?[1-9])|([1-2][0-9])|30|31)$/;
            if (engineer_name == ""){
                alert("姓名不能为空");
                return;
            } else if(engineer_sex == ""){
                alert("性别不能为空");
                return;
            } else if(birthday == ""){
                alert("生日不能为空");
                return;
            } else if(mobile == ""){
                alert("电话不能为空");
                return;
            }else if(address == ""){
                alert("地址不能为空");
                return;
            }else if(nativeplace == ""){
                alert("籍贯不能为空");
                return;
            }else if(workingYears == ""){
                alert("工龄不能为空");
                return;
            } else if ( workingYears<0 || workingYears>50 ){
                alert("工龄范围需在0-50");
                return;
            } else if(salary == ""){
                alert("薪水不能为空");
                return;
            }else if(salary == "0"){
                alert("薪水不能为0");
                return;
            }
            else if( birthdayMsg.innerText != "") {
                alert("生日不在限定范围内");
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
                    "user_id":$.cookie('u_id'),
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
                    else if (ajaxObj.responseText.indexOf("birthday")>-1)
                    {
                        alert("生日输入错误");
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
        $("#buttondelete").click(function () {
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
            if (engineer_id == ""){
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
                    "user_id":$.cookie('u_id'),
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
                    else if (ajaxObj.responseText.indexOf("birthday")>-1)
                    {
                        alert("生日输入错误");
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