 $(document).ready(
    function () {

        var body=window.document.getElementById("n_r");
        body.innerHTML = $.cookie('u_name');

        var tbody=window.document.getElementById("tbody-result");
        var alter=window.document.getElementById("alter_r");

        var _json;

        // var condition = $("condition").text;
        $("#alter1").click(function () {

            if ($("#engineer_name").val() == ""){
                alert("输入不能为空！");
                return;
            }

            ajaxObj = $.ajax({
                type:"get",
                contentType: "application/json;charset=UTF-8",
                // url:"service",
                url:"http://193.112.176.224:8080/Web_war/service",
                async:true,
                data:{
                    "condition":"555",
                    "user_id":$.cookie('u_id'),
                    "insert_type":"2",
                    "engineer_name":$("#engineer_name").val(),
                    "engineer_id":"",
                },
                success:function () {
                    if ((ajaxObj.responseText).substring(0,5) == "error"){
                        alert((ajaxObj.responseText).substring(8,));
                        return;
                    }else {
                        var str = "";
                        var json = eval("("+ajaxObj.responseText+")");
                        _json = json;
                        for(i in json) {
                            //alert(ajaxObj.responseText);
                            if ($("#engineer_name").val() == json[i].name) {
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
                                    "<td>" + "<button id=" + i + " value=" + json[i].engineer_id +" class='al'>删除</button>" + "</td>"
                                    + "</tr>"
                                ;
                                tbody.innerHTML = str;
                            }
                        }
                    }
                },
                error:function () {
                    alert(ajaxObj.responseText);
                }
            });
        });
        
        $('tbody').on('click', '.al',function () {
            //$(this).attr("value")
            //alert($(this).attr("id"));
            var i = $(this).attr("id");
            ajaxObj = $.ajax({
                type: "get",
                contentType: "application/json;charset=UTF-8",
                // url:"service",
                url: "http://193.112.176.224:8080/Web_war/service",
                async: true,
                data: {
                    "condition": "777",
                    "tableName": $("#tableName").val(),
                    "PrimaryKey": $("#PrimaryKey").val(),
                    "userName": $("#username").val(),
                    "id": $("#id").val(),
                    "password": $("#password").val(),
                    "user_name": $("#user_name").val(),
                    "user_sex": $("#user_sex").val(),
                    "engineer_name": $("#engineer_name").val(),
                    "engineer_sex": $("#engineer_sex").val(),
                    "mobile": $("#mobile").val(),
                    "birthday": $("#birthday").val(),
                    "address": $("#address").val(),
                    "nativeplace": $("#nativeplace").val(),
                    "workingYears": $("#workingYears").val(),
                    "salary": $("#salary").val(),
                    "education": $("#education").val(),
                    "engineer_id": _json[i].engineer_id,
                    "user_id":$.cookie('u_id'),
                    "insert_type": "2",
                    "update_user_id": $("#update_user_id").val(),
                    "update_engineer_id": $("#update_engineer_id").val(),
                },
                success: function () {
                    //alert(ajaxObj.responseText);
                    if (ajaxObj.responseText == "delete ok") {
                        alert("操作成功！");
                       //.remove();//移除当前行alert($(this).val());
                        $("input[type='text']").val("");
                    } else {

                        alert(ajaxObj.responseText);
                        return;
                    }
                },
                error: function () {
                    alert(ajaxObj.responseText);
                    $("input[type='text']").val("");
                }
            });
            $(this).parent().parent().remove();
        });
    }
);