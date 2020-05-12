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

                var str="";
                str += "<form id=\"tab\" action=\"\" method=\"post\" >";
                str += "							<div class=\"form-group\">";
                str += "                                <label>编号<\/label>";
                str += "                                <input disabled=\"disabled\" type=\"text\" value=" + _json[i].engineer_id + " class=\"form-control\" id=\"nengineer_id\"\/>";
                str += "                            <\/div>";
                str += "                            <div class=\"form-group\">";
                str += "                                <label>姓名<\/label>";
                str += "                                <input type=\"text\" value=" + _json[i].name + " class=\"form-control\" id=\"nengineer_name\" onblur=\"checkengineer_name(this)\"";
                str += "                                       oninput = \"value=value.replace(\/[^\u4e00-\u9fa5_a-zA-Z0-9]\/g,'')\" maxlength=\"20\"\/>";
                str += "                                <a color=\"red\" id=\"engineer_nameMsg\"><\/a>";
                str += "                            <\/div>";
                str += "                            <div class=\"form-group\">";
                str += "                                <label>性别<\/label>";
                str += "                                <input type=\"text\" value=" + _json[i].sex + " class=\"form-control\" id=\"engineer_sex\" onblur=\"checkengineer_sex(this)\"";
                str += "                                       oninput = \"value=value.replace(\/[^0,1]\/g,'')\" maxlength=\"1\"  placeholder=\"格式：0或1\" \/>";
                str += "                                <a color=\"red\" id=\"engineer_sexMsg\"><\/a>";
                str += "                            <\/div>";
                str += "                            <div class=\"form-group\">";
                str += "                                <label>生日<\/label>";
                str += "                                <input type=\"text\" value=" + _json[i].birthday + " class=\"form-control\" id=\"birthday\" onblur=\"checkbirthday(this)\"";
                str += "                                       oninput = \"value=value.replace(\/[^\\d_-]\/g,'')\" placeholder=\"格式：1998-01-01\" maxlength=\"10\"\/>";
                str += "                                <a color=\"red\" id=\"birthdayMsg\"><\/a>";
                str += "                            <\/div>";
                str += "                            <div class=\"form-group\">";
                str += "                                <label>电话<\/label>";
                str += "                                <input type=\"text\" value=" + _json[i].mobile + " class=\"form-control\" id=\"mobile\" onblur=\"checkmobile(this)\"";
                str += "                                       oninput = \"value=value.replace(\/[^\\d]\/g,'')\" maxlength=\"15\"\/>";
                str += "                                <a color=\"red\" id=\"mobileMsg\"><\/a>";
                str += "                            <\/div>";
                str += "                            <div class=\"form-group\">";
                str += "                                <label>地址<\/label>";
                str += "                                <input type=\"text\" value=" + _json[i].address + " class=\"form-control\" id=\"address\" onblur=\"checkaddress(this)\"";
                str += "                                       oninput = \"value=value.replace(\/[^\u4e00-\u9fa5_a-zA-Z0-9]\/g,'')\" maxlength=\"30\"\/>";
                str += "                                <a color=\"red\" id=\"addressMsg\"><\/a>";
                str += "                            <\/div>";
                str += "                            <div class=\"form-group\">";
                str += "                                <label>籍贯<\/label>";
                str += "                                <input type=\"text\" value=" + _json[i].nativeplace + " maxlength=\"10\" class=\"form-control\" id=\"nativeplace\" onblur=\"checknativeplace(this)\"";
                str += "                                       oninput = \"value=value.replace(\/[^\u4e00-\u9fa5_a-zA-Z]\/g,'')\"\/>";
                str += "                                <a color=\"red\" id=\"nativeplaceMsg\"><\/a>";
                str += "                            <\/div>";
                str += "                            <div class=\"form-group\">";
                str += "                                <label>工龄<\/label>";
                str += "                                <input type=\"text\" value=" + _json[i].workingYears + " class=\"form-control\" id=\"workingYears\" onblur=\"checkworkingYears(this)\"";
                str += "                                       oninput = \"value=value.replace(\/[^\\d]\/g,'')\" maxlength=\"2\"\/>";
                str += "                                <a color=\"red\" id=\"workingYearsMsg\"><\/a>";
                str += "                            <\/div>";
                str += "                            <div class=\"form-group\">";
                str += "                                <label>薪水<\/label>";
                str += "                                <input type=\"text\" value=" + _json[i].salary + " class=\"form-control\"  id=\"salary\" onblur=\"checksalary(this)\"";
                str += "                                       oninput = \"value=value.replace(\/[^\\d]\/g,'')\" maxlength=\"10\"\/>";
                str += "                                <a color=\"red\" id=\"salaryMsg\"><\/a>";
                str += "                            <\/div>";
                str += "                            <div class=\"form-group\">";
                str += "                                <label>学历<\/label>";
                str += "                                <br>";
                str += "                                <select class=\"selectpicker\" id=\"education\" data-style=\"btn-primary\" data-width=\"20\">";
                str += "                                    <option>小学<\/option>";
                str += "                                    <option>初中<\/option>";
                str += "                                    <option>中专<\/option>";
                str += "                                    <option>高中<\/option>";
                str += "                                    <option>专科<\/option>";
                str += "                                    <option>本科<\/option>";
                str += "                                    <option>硕士研究生<\/option>";
                str += "                                    <option>博士研究生<\/option>";
                str += "                                <\/select>";
                str += "                            <\/div>";
                str += "                        <\/form>";

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

            if( birthdayMsg.innerText != "") {
                alert("生日不在限定范围内");
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