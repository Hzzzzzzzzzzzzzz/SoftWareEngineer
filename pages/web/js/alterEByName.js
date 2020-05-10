$(document).ready(
    function () {

        var body=window.document.getElementById("n_r");
        body.innerHTML = $.cookie('u_name');

        var tbody=window.document.getElementById("tbody-result");
        var alter=window.document.getElementById("alter_r");
        var committ=window.document.getElementById("committ");

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
                                    "<td>" + "<button id=" + i + " value=" + json[i].engineer_id + " class='al'>修改</button>" + "</td>"
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
            var i = $(this).attr("id");

            if(_json!="") {
                str = ["                        <form id=\"tab\" action=\"\" method=\"post\" >",
                    "                            <div class=\"form-group\">",
                    "                                <label>编号</label>",
                    "                                <input disabled='disabled' type=\"text\" value=" + _json[i].engineer_id + " class=\"form-control\" id=\"nengineer_id\"/>",
                    "                                <a color=\"red\" id=\"engineer_engineer_idMsg\"></a>",
                    "                            </div>",
                    "                            <div class=\"form-group\">",
                    "                                <label>姓名</label>",
                    "                                <input type=\"text\" value=" + _json[i].name + " class=\"form-control\" id=\"nengineer_name\" onblur=\"checkengineer_name(this)\"",
                    "                                       oninput = \"value=value.replace(/[^\/\/u4e00-\/\/u9fa5_a-zA-Z0-9]/g,\'\')\" maxlength=\"20\"/>",
                    "                                <a color=\"red\" id=\"engineer_nameMsg\"></a>",
                    "                            </div>",
                    "                            <div class=\"form-group\">",
                    "                                <label>性别</label>",
                    "                                <input type=\"text\" value=" + _json[i].sex + " class=\"form-control\" id=\"engineer_sex\" onblur=\"checkengineer_sex(this)\"",
                    "                                       oninput = \"value=value.replace(/[^[0,1]/g,\'\')\" maxlength=\"1\"  placeholder=\"格式：0或1\" />",
                    "                                <a color=\"red\" id=\"engineer_sexMsg\"></a>",
                    "                            </div>",
                    "                            <div class=\"form-group\">",
                    "                                <label>生日</label>",
                    "                                <input type=\"text\" value=" + _json[i].birthday + " class=\"form-control\" id=\"birthday\" onblur=\"checkbirthday(this)\"",
                    "                                       oninput = \"value=value.replace(/[^\\d_-]/g,\'\')\" placeholder=\"格式：1998-01-01\" maxlength=\"10\"/>",
                    "                                <a color=\"red\" id=\"birthdayMsg\"></a>",
                    "                            </div>",
                    "                            <div class=\"form-group\">",
                    "                                <label>电话</label>",
                    "                                <input type=\"text\" value=" + _json[i].mobile + " class=\"form-control\" id=\"mobile\" onblur=\"checkmobile(this)\"",
                    "                                       oninput = \"value=value.replace(/[^\\d]/g,\'\')\" maxlength=\"15\"/>",
                    "                                <a color=\"red\" id=\"mobileMsg\"></a>",
                    "                            </div>",
                    "                            <div class=\"form-group\">",
                    "                                <label>地址</label>",
                    "                                <input type=\"text\" value=" + _json[i].address + " class=\"form-control\" id=\"address\" onblur=\"checkaddress(this)\"",
                    "                                       oninput = \"value=value.replace(/[^\/\/u4e00-\/\/u9fa5_a-zA-Z0-9]/g,\'\')\" maxlength=\"30\"/>",
                    "                                <a color=\"red\" id=\"addressMsg\"></a>",
                    "                            </div>",
                    "                            <div class=\"form-group\">",
                    "                                <label>籍贯</label>",
                    "                                <input type=\"text\" value=" + _json[i].nativeplace + " class=\"form-control\" id=\"nativeplace\" onblur=\"checknativeplace(this)\"",
                    "                                       oninput = \"value=value.replace(/[^\/\/u4e00-\/\/u9fa5_a-zA-Z]/g,\'\')\" maxlength=\"10\"/>",
                    "                                <a color=\"red\" id=\"nativeplaceMsg\"></a>",
                    "                            </div>",
                    "                            <div class=\"form-group\">",
                    "                                <label>工龄</label>",
                    "                                <input type=\"text\" value=" + _json[i].workingYears + " class=\"form-control\" id=\"workingYears\" onblur=\"checkworkingYears(this)\"",
                    "                                       oninput = \"value=value.replace(/[^\\d]/g,\'\')\" maxlength=\"2\"/>",
                    "                                <a color=\"red\" id=\"workingYearsMsg\"></a>",
                    "                            </div>",
                    "                            <div class=\"form-group\">",
                    "                                <label>薪水</label>",
                    "                                <input type=\"text\" value=" + _json[i].salary + " class=\"form-control\"  id=\"salary\" onblur=\"checksalary(this)\"",
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

                str1 = "<button class='_commit'>提交修改</button>";

                alter.innerHTML = str;
                committ.innerHTML = str1;

                $("#education").val([_json[i].education]);
                $("#education").selectpicker('refresh');
            }
        });


        $('span').on('click', '._commit',function () {
            if ($("#nengineer_name").val() == "" || $("#engineer_sex").val() == "" || $("#mobile").val() == "" || $("#birthday").val() == "" ||
                $("#address").val() == "" || $("#nativeplace").val() == "" || $("#workingYears").val() == "" || $("#salary").val() == "" ||
                $("#nengineer_id").val() == "" || $("#user_id").val() == "") {
                alert("不允许有字段为空");
                return;
            }

            if ($("#workingYears").val() < 0 || $("#workingYears").val() > 50){
                alert("工龄范围需在0-50");
                return;
            }

            if ($("#salary").val() == "0"){
                alert("薪水不能为0");
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
                    "engineer_name":$("#nengineer_name").val(),
                    "engineer_sex":$("#engineer_sex").val(),
                    "mobile":$("#mobile").val(),
                    "birthday":$("#birthday").val(),
                    "address":$("#address").val(),
                    "nativeplace":$("#nativeplace").val(),
                    "workingYears":$("#workingYears").val(),
                    "salary":$("#salary").val(),
                    "education":$("#education").val(),
                    "engineer_id":$("#nengineer_id").val(),
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