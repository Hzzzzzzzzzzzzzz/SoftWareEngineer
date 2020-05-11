$(document).ready(
    function () {
        $("#btn_showAllEngineer").click(function () {
            var tbody=window.document.getElementById("tbody-result");
            ajaxObj = $.ajax({
                type:"get",
                contentType: "application/json;charset=UTF-8",
                url:"http://193.112.176.224:8080/Web_war/service",
                async:true,
                data:{
                    "condition":"666",
                    "insert_type":"2",
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
                    "user_id":"",
                    "update_user_id":$("#update_user_id").val(),
                    "update_engineer_id":$("#update_engineer_id").val(),
                },
                success:function () {
                    var str = "";
                    var json = eval("("+ajaxObj.responseText+")");
                    function sortIdAsc(a,b){
                        return a.engineer_id-b.engineer_id;
                    }
                    json.sort(sortIdAsc);

                    for(i in json) {
                        str += "<tr>" +
                            "<td>" + json[i].engineer_id + "</td>" +
                            "<td>" + json[i].name + "</td>" +
                            "<td>" + json[i].sex + "</td>" +
                            "<td>" + json[i].mobile + "</td>" +
                            "<td>" + json[i].nativeplace + "</td>" +
                            "<td>" + json[i].birthday + "</td>" +
                            "<td>" + json[i].education + "</td>" +
                            "<td>" + json[i].address + "</td>" +
                            "<td>" + json[i].salary + "</td>" +
                            "<td>" + json[i].workingYears + "</td>" +
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