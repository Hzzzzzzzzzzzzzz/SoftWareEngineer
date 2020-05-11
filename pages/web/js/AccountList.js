$(document).ready(
    function () {
        $("#btn_showAllUser").click(function () {
            var tbody=window.document.getElementById("tbody-result");
            ajaxObj = $.ajax({
                type:"get",
                contentType: "application/json;charset=UTF-8",
                url:"http://193.112.176.224:8080/Web_war/service",
                async:true,
                data:{
                    "condition":"666",
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
                    var str = "";
                    var json = eval("("+ajaxObj.responseText+")");
                    for(i in json){
                        str += "<tr>" +
                            "<td>" + json[i].user_id + "</td>" +
                            "<td>" + json[i].userName + "</td>" +
                            "<td>" + json[i].password + "</td>" +
                            "<td>" + json[i].name + "</td>" +
                            "<td>" + json[i].sex + "</td>" +
                            "</tr>";
                        tbody.innerHTML = str;
                    }
                },
                error:function () {
                    alert("显示失败！");
                }
            });
        });
    }
);