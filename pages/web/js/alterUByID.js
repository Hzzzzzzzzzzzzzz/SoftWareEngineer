$(document).ready(
    function () {

        var alter=window.document.getElementById("alter_r");

        // var condition = $("condition").text;
        $("#alterU").click(function () {

            if ($("#user_id").val() == "") {
                alert("输入不能为空");
                return;
            }

            ajaxObj = $.ajax({
                type:"get",
                contentType: "application/json;charset=UTF-8",
                url:"http://193.112.176.224:8080/Web_war/service",
                async:true,
                data:{
                    "condition":"213",
                    "user_id":$("#user_id").val(),
                    "userName":"",
                },
                success:function () {
                    if ((ajaxObj.responseText).substring(0,5) == "error"){
                        alert("此用户不存在，请重新输入！");
                        return;
                    }

                    var json = eval("("+ajaxObj.responseText+")");

                    var strVar="";
                    strVar += "<form id=\"tab\" action=\"\" method=\"post\" >";
                    strVar += "                            <div class=\"form-group\">";
                    strVar += "                                <label>编号<\/label>";
                    strVar += "                                <input id=\"nuser_id\" disabled=\"disabled\" value=" + json.user_id + " class=\"form-control\" \/>";
                    strVar += "                                <a color=\"red\" id=\"useridMsg\"><\/a>";
                    strVar += "                            <\/div>";
                    strVar += "                            <div class=\"form-group\">";
                    strVar += "                                <label>用户名<\/label>";
                    strVar += "                                <input type=\"text\" value=" + json.userName + " class=\"form-control\" id=\"username\" onblur=\"checkusername(this)\"";
                    strVar += "                                       oninput = \"value=value.replace(\/[^\u4e00-\u9fa5_a-zA-Z0-9]\/g,'')\" maxlength=\"10\"\/>";
                    strVar += "                                <a color=\"red\" id=\"usernameMsg\"><\/a>";
                    strVar += "                            <\/div>";
                    strVar += "                            <div class=\"form-group\">";
                    strVar += "                                <label>密码<\/label>";
                    strVar += "                                <input type=\"text\" value=" + json.password + " class=\"form-control\" id=\"password\" onblur=\"checkpassword(this)\"";
                    strVar += "                                       oninput = \"value=value.replace(\/[^a-zA-Z0-9]\/g,'')\" maxlength=\"10\"\/>";
                    strVar += "                                <a color=\"red\" id=\"passwordMsg\"><\/a>";
                    strVar += "                            <\/div>";
                    strVar += "                            <div class=\"form-group\">";
                    strVar += "                                <label>姓名<\/label>";
                    strVar += "                                <input type=\"text\" value=" + json.name + " class=\"form-control\" id=\"user_name\" onblur=\"checkuser_name(this)\"";
                    strVar += "                                       oninput = \"value=value.replace(\/[^\u4e00-\u9fa5_a-zA-Z0-9]\/g,'')\" maxlength=\"10\"\/>";
                    strVar += "                                <a color=\"red\" id=\"user_nameMsg\"><\/a>";
                    strVar += "                            <\/div>";
                    strVar += "                            <div class=\"form-group\">";
                    strVar += "                                <label>性别<\/label>";
                    strVar += "                                <input type=\"text\" value=" + json.sex + " class=\"form-control\"  id=\"user_sex\" onblur=\"checkuser_sex(this)\"";
                    strVar += "                                       oninput = \"value=value.replace(\/[^[0,1]\/g,'')\" maxlength=\"1\"  placeholder=\"格式：0或1\"\/>";
                    strVar += "                                <a color=\"red\" id=\"user_sexMsg\"><\/a>";
                    strVar += "                            <\/div>";
                    strVar += "                        <\/form>";
                    strVar += "<button class='_commit'>提交修改<\/button>";

                    alter.innerHTML = strVar;
                },
                error:function () {
                    alert("error");
                }
            });
        });


        $('span').on('click', '._commit',function () {
            if ($("#username").val() == "" || $("#password").val() == "" || $("#user_name").val() == "" || $("#user_sex").val() == "") {
                alert("不允许有字段为空");
                return;
            }

            ajaxObj = $.ajax({
                type:"get",
                contentType: "application/json;charset=UTF-8",
                url:"http://193.112.176.224:8080/Web_war/service",
                async:true,
                data:{
                    "condition":"444",
                    "insert_type":"1",
                    "user_id":$("#nuser_id").val(),
                    "userName":$("#username").val(),
                    "password":$("#password").val(),
                    "user_name":$("#user_name").val(),
                    "user_sex":$("#user_sex").val(),
                },
                success:function () {
                    if ((ajaxObj.responseText).substring(0,5) == "error"){
                        alert("修改失败，请重试！");
                    } else {
                        alert("修改成功！");
                    }
                },
                error:function () {
                    alert("error");
                }
            });
        });
    }
);