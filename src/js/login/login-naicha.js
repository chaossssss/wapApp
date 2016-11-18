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
            url:"http://192.168.1.191:3003/api/v1/ClientInfo/CheckPhone",
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
      url:"http://192.168.1.191:3003/api/v1/ClientInfo/GetBenifit",
      data:{
        Phone:phone,
        Captcha:vercode,
        Code:code
      },
      success:function(data){
        var token = data.Body.Token;
        window.sessionStorage.setItem("Token",token);

        if(data.Meta.ErrorCode == 0){               
          window.location.href = "/template/point-order/point-order.html?channel=0&type="+Type+"&markid="+Id;
        }else{
          $("#errorMess").show();
          $("#errorMess").text(data.Meta.ErrorMsg);
        }

        if(data.Meta.ErrorCode == 2019){
          $("#errorMess").show();
          $("#errorMess").text(data.Meta.ErrorMsg);
          window.location.href = "/template/point-order/point-order.html?channel=0&type="+Type+"&markid="+Id;
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
      url:"http://192.168.1.191:3003/api/v1/ClientInfo/NewUserGetBenifit",
      data:{
        LoginName:phone,
        Password:password,
        Captcha:vercode,
        Code:code
      },
      success:function(data){
        var token = data.Body.Token;
        window.sessionStorage.setItem("Token",token);

        if(data.Meta.ErrorCode == 0){         
          window.location.href = "/template/point-order/point-order.html?channel=0&type="+Type+"&markid="+Id;
        }else{
          $("#errorMess").show();
          $("#errorMess").text(data.Meta.ErrorMsg);
        }
        if(data.Meta.ErrorCode == 2019){
          $("#errorMess").show();
          $("#errorMess").text(data.Meta.ErrorMsg);
          window.location.href = "/template/point-order/point-order.html?channel=0&type="+Type+"&markid="+Id;
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



  // 微信分享
  // var url = location.href.split('#')[0];
  // var wxbody={};
  // $.ajax({
  //     type: "POST",
  //     url: "http://wapapi.zhujiash.com/api/v2/WxEvent/UserOauth",
  //     data: {
  //         "code": sharecode
  //     },
  //     success: function(a){
  //         var urlKey=a.Body.openid;
  //         $.ajax({
  //             type: "POST",
  //             url: "http://wapapi.zhujiash.com/api/v2/WxEvent/GetWeiXinTicket",
  //             data: {
  //                 "openid": urlKey,
  //                 "url": url
  //             },
  //             success: function(b){
  //                 wxbody=b.Body;wx.config({
  //                     debug: false,
  //                     appId: wxbody.appid,
  //                     timestamp: wxbody.timestamp,
  //                     nonceStr: wxbody.noncestr,
  //                     signature: wxbody.sign,
  //                     jsApiList: [
  //                         "onMenuShareTimeline",
  //                         "onMenuShareAppMessage"
  //                     ]
  //                 });wx.ready(function(){
  //                     wx.onMenuShareTimeline({
  //                         title: "Hi，朋友，邀请你一起来免费体验上门家庭服务",
  //                         link: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2fhtml%2flogin.html&response_type=code&scope=snsapi_base&state="+code+"#wechat_redirect",
  //                         imgUrl: "http://wap.zhujiash.com/html/images/bg.png",
  //                         success: function(){
  //                             $.ajax({
  //                                 type: "POST",
  //                                 url: "http://wapapi.zhujiash.com/api/v2/WxEvent/ShareStatistics",
  //                                 data: {
  //                                     "openid": urlKey
  //                                 },
  //                             })
  //                         },
  //                         cancel: function(){
                              
  //                         }
  //                     });wx.onMenuShareAppMessage({
  //                         title: "Hi，朋友，邀请你一起来免费体验上门家庭服务",
  //                         desc: "生活服务我一直用助家生活，寄快递、送水、保洁、维修。既经济又方便。首次服务有优惠！",
  //                         link: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2fhtml%2flogin.html&response_type=code&scope=snsapi_base&state="+code+"#wechat_redirect",
  //                         imgUrl: "http://wap.zhujiash.com/html/images/bg.png",
  //                         type: "link",
  //                         success: function(){
  //                             $.ajax({
  //                                 type: "POST",
  //                                 url: "http://wapapi.zhujiash.com/api/v2/WxEvent/ShareStatistics",
  //                                 data: {
  //                                     "openid": urlKey
  //                                 },
                                  
  //                             })
  //                         }
  //                     });wx.onMenuShareQQ({
  //                         title: "Hi，朋友，邀请你一起来免费体验上门家庭服务",
  //                         desc: "生活服务我一直用助家生活，寄快递、送水、保洁、维修。既经济又方便。首次服务有优惠！",
  //                         link: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2fhtml%2flogin.html&response_type=code&scope=snsapi_base&state="+code+"#wechat_redirect",
  //                         imgUrl: "http://wap.zhujiash.com/html/images/bg.png",
  //                         success: function(){
                              
  //                         },
  //                         cancel: function(){
                              
  //                         }
  //                     });wx.onMenuShareWeibo({
  //                         title: "Hi，朋友，邀请你一起来免费体验上门家庭服务",
  //                         desc: "生活服务我一直用助家生活，寄快递、送水、保洁、维修。既经济又方便。首次服务有优惠！",
  //                         link: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2fhtml%2flogin.html&response_type=code&scope=snsapi_base&state="+code+"#wechat_redirect",
  //                         imgUrl: "http://wap.zhujiash.com/html/images/bg.png",
  //                         success: function(){
                              
  //                         },
  //                         cancel: function(){
                              
  //                         }
  //                     });wx.onMenuShareQZone({
  //                         title: "Hi，朋友，邀请你一起来免费体验上门家庭服务",
  //                         desc: "生活服务我一直用助家生活，寄快递、送水、保洁、维修。既经济又方便。首次服务有优惠！",
  //                         link: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2fhtml%2flogin.html&response_type=code&scope=snsapi_base&state="+code+"#wechat_redirect",
  //                         imgUrl: "http://wap.zhujiash.com/html/images/bg.png",
  //                         success: function(){
                              
  //                         },
  //                         cancel: function(){
                              
  //                         }
  //                     })
  //                 });wx.error(function(c){
  //                     // alert("wx.error: "+JSON.stringify(c))
  //                 })
  //             },
  //             error: function(b){
  //                 // alert("错误")
  //             }
  //         })
  //     },
  //     error: function(a){
  //         alert("服务器连接失败，请检查您的网络设置")
  //     }
  // })
})
//# sourceMappingURL=login.min.js.map
