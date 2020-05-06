$(document).ready(
    function () {
        // var condition = $("condition").text;
        $("button").click(function () {
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
                    var json = eval("("+ajaxObj.responseText+")");
                    if($("#password").val()!=json.password){
                        //alert("login error");

                    }else{
                        alert("login ok");
                        window.location.href='AccountAdd.html';
                    }

                },
                error:function () {
                    // alert("error");
                    $("#result").html(ajaxObj.responseText);

                    $("input[type='text']").val("");
                }
            });
        });
    }
);