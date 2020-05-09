$(document).ready(
    function () {

        $("#check").attr("disabled",true);

        var body=window.document.getElementById("n_r");
        body.innerHTML = $.cookie('u_name');

        var alter=window.document.getElementById("alter_r");

        // var condition = $("condition").text;
        $("#commit_id").click(function () {

            ajaxObj = $.ajax({
                type:"get",
                contentType: "application/json;charset=UTF-8",
                // url:"service",
                url:"http://193.112.176.224:8080/Web_war/service",
                async:true,
                data:{
                    "condition":"555",
                    "insert_type":"2",
                    "engineer_id":$("#engineer_id").val(),
                    "user_id":$.cookie('u_id'),
                },
                success:function () {
                    //alert(ajaxObj.responseText);
                    if ((ajaxObj.responseText).substring(0,5) == "error"){
                        alert((ajaxObj.responseText).substring(8,));
                        return;
                    }

                    var str = "";
                    var json = eval("("+ajaxObj.responseText+")");

                    if(json!="") {
                        str = ["                        <form id=\"tab\" action=\"\" method=\"post\" >",
                            "                            <div class=\"form-group\">",
                            "                                <label>姓名</label>",
                            "                                <input type=\"text\" value=" + json[0].name + " class=\"form-control\" id=\"engineer_name\" onblur=\"checkengineer_name(this)\"",
                            "                                       oninput = \"value=value.replace(/[^\/\/u4e00-\/\/u9fa5_a-zA-Z0-9]/g,\'\')\" maxlength=\"20\"/>",
                            "                                <a color=\"red\" id=\"engineer_nameMsg\"></a>",
                            "                            </div>",
                            "                            <div class=\"form-group\">",
                            "                                <label>性别</label>",
                            "                                <input type=\"text\" value=" + json[0].sex + " class=\"form-control\" id=\"engineer_sex\" onblur=\"checkengineer_sex(this)\"",
                            "                                       oninput = \"value=value.replace(/[^[0,1]/g,\'\')\" maxlength=\"1\"  placeholder=\"格式：0或1\" />",
                            "                                <a color=\"red\" id=\"engineer_sexMsg\"></a>",
                            "                            </div>",
                            "                            <div class=\"form-group\">",
                            "                                <label>生日</label>",
                            "                                <input type=\"text\" value=" + json[0].birthday + " class=\"form-control\" id=\"birthday\" onblur=\"checkbirthday(this)\"",
                            "                                       oninput = \"value=value.replace(/[^\\d_-]/g,\'\')\" placeholder=\"格式：1998-01-01\" maxlength=\"10\"/>",
                            "                                <a color=\"red\" id=\"birthdayMsg\"></a>",
                            "                            </div>",
                            "                            <div class=\"form-group\">",
                            "                                <label>电话</label>",
                            "                                <input type=\"text\" value=" + json[0].mobile + " class=\"form-control\" id=\"mobile\" onblur=\"checkmobile(this)\"",
                            "                                       oninput = \"value=value.replace(/[^\\d]/g,\'\')\" maxlength=\"11\"/>",
                            "                                <a color=\"red\" id=\"mobileMsg\"></a>",
                            "                            </div>",
                            "                            <div class=\"form-group\">",
                            "                                <label>地址</label>",
                            "                                <input type=\"text\" value=" + json[0].address + " class=\"form-control\" id=\"address\" onblur=\"checkaddress(this)\"",
                            "                                       oninput = \"value=value.replace(/[^\/\/u4e00-\/\/u9fa5_a-zA-Z0-9]/g,\'\')\" maxlength=\"40\"/>",
                            "                                <a color=\"red\" id=\"addressMsg\"></a>",
                            "                            </div>",
                            "                            <div class=\"form-group\">",
                            "                                <label>籍贯</label>",
                            "                                <input type=\"text\" value=" + json[0].nativeplace + " class=\"form-control\" id=\"nativeplace\" onblur=\"checknativeplace(this)\"",
                            "                                       oninput = \"value=value.replace(/[^\/\/u4e00-\/\/u9fa5_a-zA-Z]/g,\'\')\" maxlength=\"10\"/>",
                            "                                <a color=\"red\" id=\"nativeplaceMsg\"></a>",
                            "                            </div>",
                            "                            <div class=\"form-group\">",
                            "                                <label>工龄</label>",
                            "                                <input type=\"text\" value=" + json[0].workingYears + " class=\"form-control\" id=\"workingYears\" onblur=\"checkworkingYears(this)\"",
                            "                                       oninput = \"value=value.replace(/[^\\d]/g,\'\')\" maxlength=\"2\"/>",
                            "                                <a color=\"red\" id=\"workingYearsMsg\"></a>",
                            "                            </div>",
                            "                            <div class=\"form-group\">",
                            "                                <label>薪水</label>",
                            "                                <input type=\"text\" value=" + json[0].salary + " class=\"form-control\"  id=\"salary\" onblur=\"checksalary(this)\"",
                            "                                       oninput = \"value=value.replace(/[^\\d]/g,\'\')\" maxlength=\"10\"/>",
                            "                                <a color=\"red\" id=\"salaryMsg\"></a>",
                            "                            </div>",
                            "                            <div class=\"form-group\">",
                            "                                <label>学历</label>",
                            "                                <br>",
                            "                                <select class=\"selectpicker\" id=\"education\" data-style=\"btn-primary\" data-width=\"20\">",
                            "                                    <option>小学</option>",
                            "                                    <option>初中</option>",
                            "                                    <option>中专</option>",
                            "                                    <option>高中</option>",
                            "                                    <option>专科</option>",
                            "                                    <option>本科</option>",
                            "                                    <option>硕士研究生</option>",
                            "                                    <option>博士研究生</option>",
                            "                                </select>",
                            "                            </div>",
                            "                        </form>"].join("");

                        $("#check").attr("disabled",false);

                        alter.innerHTML = str;

                        $("#education").val([json[0].education]);
                        $("#education").selectpicker('refresh');
                    }

                },
                error:function () {
                    alert(ajaxObj.responseText);
                }
            });
        });

        $("#check").click(function () {

            if ($("#engineer_name").val() == "" || $("#engineer_sex").val() == "" || $("#mobile").val() == "" || $("#birthday").val() == "" ||
                $("#address").val() == "" || $("#nativeplace").val() == "" || $("#workingYears").val() == "" || $("#salary").val() == "" ||
                $("#engineer_id").val() == "" || $("#user_id").val() == "") {
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
                    "insert_type":"2",
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
                },
                success:function () {
                    if ((ajaxObj.responseText).substring(0,5) == "error"){
                        alert("格式不正确，请重新输入！");
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