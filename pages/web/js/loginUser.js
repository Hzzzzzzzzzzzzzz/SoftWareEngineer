$(document).ready(
    function () {
        $("#_button").click(function () {
            
                 if ($("#password").val() == "" || $("#username").val() == ""){
                        alert("账号密码不得为空！");
                        return;
                    }

                 if ($("#password").val().indexOf(" ") == -1 && $("#username").val().indexOf(" ") == -1){
                 }else {
                     alert("账号与密码不得包含空格！");
                     return;
                 }

                ajaxObj = $.ajax({
                type:"get",
                contentType: "application/json;charset=UTF-8",
                url:"http://193.112.176.224:8080/Web_war/service",
                async:true,
                data:{
                    "condition":"213",
                    "insert_type":"1",
                    "userName":$("#username").val(),
                },
                success:function () {
                    if((ajaxObj.responseText).substring(0,5) == "error"){
                        alert("该用户名不存在！");
                        return;
                    }

                    var json = eval("("+ajaxObj.responseText+")");
                    if($("#password").val()==json.password){
                        $.cookie('u_id', json.user_id);
                        $.cookie('u_name', json.userName);
                        alert("登录成功！");
                        window.location.href="addEngineer.html";
                    }
                    else {
                        alert("密码错误！请重新输入！");
                    }
                },
                error:function () {
                    alert("error");
                }
            });
        });
    }
);