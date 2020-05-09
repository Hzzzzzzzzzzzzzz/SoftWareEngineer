$(document).ready(
    function () {
        $("#btn_SearchByName").click(function () {
            var userName = $("#username").val();
            var tbody=window.document.getElementById("tbody-result");
            ajaxObj = $.ajax({
                type:"get",
                contentType: "application/json;charset=UTF-8",
                url:"http://193.112.176.224:8080/Web_war/service",
                async:true,
                data:{
                    "condition":"213",
                    "insert_type":"1",
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
                    "update_user_id":$("#update_user_id").val(),
                    "update_engineer_id":$("#update_engineer_id").val(),
                },
                success:function () {
                    if (userName==""){
                        alert("输入不得为空！")
                    }
                    else if (!$.trim(userName)){
                        alert("输入不得为空格！")
                    }
                    else if (ajaxObj.responseText == "error : NullPointerException"){
                        alert("未查询到该用户！");
                    }
                    else{
                        var str = "";
                        var json = eval("("+ajaxObj.responseText+")");
                        if ($("#username").val() == json.userName){
                            str += "<tr>" +
                                "<td>" + json.user_id + "</td>" +
                                "<td>" + json.userName + "</td>" +
                                "<td>" + json.password + "</td>" +
                                "<td>" + json.name + "</td>" +
                                "<td>" + json.sex + "</td>" +
                                "</tr>";
                            tbody.innerHTML = str;
                        }
                    }
                },
                error:function () {
                    alert("查询失败！");
                }
            });
        });
    }
);