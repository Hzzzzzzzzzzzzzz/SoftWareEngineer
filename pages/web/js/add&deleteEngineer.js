$(document).ready(
    function () {

        var body=window.document.getElementById("n_r");
        body.innerHTML = $.cookie('u_name');

        // var condition = $("condition").text;
        $("button").click(function () {
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
            /*if (engineer_id == "" || engineer_name == ""){
                alert("输入格式有误");
                return;
            }*/
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
                    if (ajaxObj.responseText == "error: this row not exist")
                    {
                        alert("此用户不存在，请重新输入");
                        return;
                    }
                    else if (ajaxObj.responseText == "error : insert error")
                    {
                        alert("输入信息有误，请重新输入");
                        return;
                    }
                    else{
                        alert("成功");
                        $("input[type='text']").val("");
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