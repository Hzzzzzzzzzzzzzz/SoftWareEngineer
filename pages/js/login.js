$(document).ready(
    function () {
        // var condition = $("condition").text;
        $("button").click(function () {
	
            var username = $("#username").val();
            var password = $("#password").val();
            if (username == "" || password == ""){
                alert("输入格式有误");
                return;
            }            

                ajaxObj = $.ajax({
                type:"get",
                contentType: "application/json;charset=UTF-8",
                url:"http://193.112.176.224:8080/Web_war/service",
                async:true,
                data:{
                    "condition":"111",
                    "insert_type":"1",
                    "userName":$("#username").val(),
                    "password":$("#password").val(),
                },
                success:function () { 
	  if (ajaxObj.responseText == "error : dont get pwd or user_id")
                    {
                        alert("用户名或密码错误");
                        return;
                    }

                    var json = eval("("+ajaxObj.responseText+")");
                    if($("#password").val()!=json.password){
                        alert("用户名或密码错误");
                    }
                    else {
                        window.location="addEngineer.html";
                    }
                },
                error:function () {
                    alert("error");
                }
            });
        });
    }
);