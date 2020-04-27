$(document).ready(
    function () {
        // var condition = $("condition").text;
        $("button").click(function () {
            ajaxObj = $.ajax({
                type:"get",
                contentType: "application/json;charset=UTF-8",
                url:"service",
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
                },
                success:function () {
                    $("#result").html(ajaxObj.responseText);
                    $("input[type='text']").val("");
                },
                error:function () {
                    alert("error");
                }
            });
        });
    }
);