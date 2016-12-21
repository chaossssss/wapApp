$(function(){
  //获取url参数
  function getvl(name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
  }
  //分享码
  var code = getvl('state');

  // type和markid
  var Type=getvl('type');
  var Id=getvl('markid');

  // 判断是否有token.session
  var n_token=getvl('token');
  if(n_token){
    window.location.href = "/template/point-order/payment-store.html"+location.search+"&channel=0&token="+n_token;
  }
  var n_session=getvl('Session');

  $("#getCode").removeAttr("disabled");

  var InterValObj; //timer变量，控制时间
  var count = 60; //间隔函数，1秒执行
  var curCount;//当前剩余秒数
  function SetRemainTime() {
    if(curCount == 1){                
      window.clearInterval(InterValObj);//停止计时器
      $("#getCode").removeAttr("disabled");//启用按钮
      $("#getCode").val("获取验证码");
    }
    else{
      curCount--;
      $("#getCode").val(curCount);
    }
  }

  // 获取验证码
  $("#getCode").on("click",function(){
    // window.clearInterval(InterValObj);
    $("#codeNum").hide();
    $("#pwdNum").hide();
    $("#loginBtn").hide();
    $("#regisBtn").hide();
    $("#register").hide();
    
    var phone = $("#phoneNum").val();
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
      $("#errorMess").show();
      $("#errorMess").text("请输入正确的手机号码");
    }
    else{
          curCount = count;
      　　//设置button效果，开始计时
           $("#getCode").attr("disabled","true");
           $("#getCode").val(curCount);
           InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
          $.ajax({
            method:"POST",
            url: CONFIG.IP+"api/v1/ClientInfo/CheckPhone",
            data:{
              Phone:phone
            },
            success:function(data){
              console.log(data);
              if(data.Body.Code || data.Body.Code !=""){
                $("#reference").text(data.Body.Code);
              }
              $("#errorMess").show();
              $("#errorMess").text(data.Meta.ErrorMsg);
              var isExited = data.Body.IsExists;
              if(isExited == 1){
                $("#errorMess").text("您的手机号已经注册过了，请输入验证码直接登录");
                $("#codeNum").show();
                $("#loginBtn").show();
                $("#newUser").show();
              }
              if(isExited == 0){
                $("#newUser").hide();
                $("#pwdNum").show();
                $("#codeNum").show();
                $("#regisBtn").show();
                $("#newLogin").show();
                $("#pwdNum").attr("placeholder","请设置密码");
              }
            }
          })
    } 
  })
  
  $("#phoneNum").on("keyup",function(){
    var sphone = $("#phoneNum").val();
  })

  //登录按钮
  $("#loginBtn").on("click",function(){
    $("#pwdNum").hide();
    $("#regisBtn").hide();
    var phone = $("#phoneNum").val();
    var vercode = $("#codeNum").val();
    console.log(vercode);
    $.ajax({
      method:"POST",
      url: CONFIG.IP+"api/v1/ClientInfo/GetBenifitAtStore",
      data:{
        Phone:phone,
        Captcha:vercode,
        Code:code,
        Session:n_session
      },
      success:function(data){
        var token = data.Body.Token;
        window.localStorage.setItem("Token",token);

        if(data.Meta.ErrorCode == 0){               
          window.location.href = "/template/point-order/payment-store.html"+location.search+"&channel=0";
        }else{
          $("#errorMess").show();
          $("#errorMess").text(data.Meta.ErrorMsg);
        }

        if(data.Meta.ErrorCode == 2019){
          $("#errorMess").show();
          $("#errorMess").text(data.Meta.ErrorMsg);
          window.location.href = "/template/point-order/payment-store.html"+location.search+"&channel=0";
        }
      }
    })
  })
  //注册按钮
  $("#regisBtn").on("click",function(){
    var phone = $("#phoneNum").val();
    var vercode = $("#codeNum").val();
    var password = $("#pwdNum").val();
    $.ajax({
      method:"POST",
      url: CONFIG.IP+"api/v1/ClientInfo/NewUserGetBenifitAtStore",
      data:{
        LoginName:phone,
        Password:password,
        Captcha:vercode,
        Code:code,
        Session:n_session
      },
      success:function(data){
        var token = data.Body.Token;
        window.localStorage.setItem("Token",token);

        if(data.Meta.ErrorCode == 0){         
          window.location.href = "/template/point-order/point-order.html"+location.search+"&channel=0";
        }else{
          $("#errorMess").show();
          $("#errorMess").text(data.Meta.ErrorMsg);
        }
        if(data.Meta.ErrorCode == 2019){
          $("#errorMess").show();
          $("#errorMess").text(data.Meta.ErrorMsg);
          window.location.href = "/template/point-order/point-order.html"+location.search+"&channel=0";
        }
      }
    })
  })
  // 活动规则弹框
  $("#knowDetail").click(function(){
    $("#ac-rule").show();
    $(".btn_acdetail").click(function(){
      $("#ac-rule").show();
    });
    $(".close").click(function(){
      $("#ac-rule").hide();
    });
  });
})
