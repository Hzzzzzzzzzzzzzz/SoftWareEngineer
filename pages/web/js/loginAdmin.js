$(document).ready(
    function () {
        // var condition = $("condition").text;

        $("#_button").click(function () {

            if ($("#password").val() == "" || $("#username").val() == ""){
                alert("账号密码不得为空！");
                return;
            }

            if($("#username").val()=="root"){
                if($("#password").val()=="123456"){
                    alert("登录成功！");
                    window.location.href="AccountAdd.html";
                }
                else{
                    alert("密码错误！请重新输入！");
                }
            }
            else {
                alert("该用户名不存在！");
            }
        });
    }
);