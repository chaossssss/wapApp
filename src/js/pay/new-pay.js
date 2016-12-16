$(function(){
  //获取url参数
  function getvl(name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
  }
  // var markId = getvl("markid");
  // var stId = getvl("stId");
  var wxCode = getvl("code");
  var token = window.localStorage.getItem("Token");
  var needToPay = sessionStorage.getItem("needToPay");
  var needToPayNum = parseFloat(needToPay);
  var totalPriceNum = sessionStorage.getItem("totalPriceNum");




  var urlIp = "http://wapapi.zhujiash.com/";
  // var urlIp = "http://192.168.1.191:3003/";


  
  // var orderMsgPara = '{"stId":'+stId+',"markId":'+markId+'}';
  // var orderMsg = encodeURIComponent(orderMsgPara);
  /*--从url中获取参数--*/
  // var om = getvl("state");
  // var orderMsgPara = decodeURI(om);
  // var state = JSON.parse(orderMsgPara);
  // var stId = state.stId;
  // var markId = state.markId;
  /*--从url中获取参数--*/
  /*--从session中获取参数--*/
  var stId = window.sessionStorage.getItem("stId");
  var markId = window.sessionStorage.getItem("markId");
  /*--从session中获取参数--*/
  $("#needToPay").text(needToPay);
  $("#showMore").on("click",function(){
    var height = $("#payPanel").height();
    if(height == 128){
      $("#payPanel").removeClass().addClass('cl');
      $("#payPanel").css("height","188px");
    }
    if(height == 188){
      $("#payPanel").removeClass().addClass('cs');
      $("#payPanel").css("height","128px");
    }
  });
  $("#pay2").on("click",function(){
    $("#pay3").attr("checked",false);
  });
  $("#pay3").on("click",function(){
    $("#pay2").attr("checked",false);
  });
  $("#submitBtn").on("click",function(){
    var isBalance = $("#pay1").is(":checked"); 
    var isWeixin = $("#pay2").is(":checked");
    var isAli = $("#pay3").is(":checked");
    var accountBalance = $("#accountBalance").text();
    var accountBalanceNum = parseFloat(accountBalance);
    $("#shadow").show();
    if(isBalance && !isWeixin && !isAli){   //余额
      if(accountBalanceNum < needToPayNum){
        alert("余额不足");
      }
      console.log(stId);
      if(accountBalanceNum >= needToPayNum){
        var paymentMode = 8;
        var data = {
          'Token':token,
          'ServiceTypeId':stId,
          'ServicePrice':totalPriceNum,
          // 'WxPay':'0',
          // 'Alipay':'0',
          'ServiceProviderId':markId,
          'ServiceProviderType':'2',
          'PaymentMode':paymentMode
        };
        createOrderPayAtStore(data);
        $("#shadow").hide();
      }
    }
    if(isBalance && isWeixin){              //余额+微信
      // if(getvl("state")){
      //   var state = JSON.parse(getvl("state"));
      //   stId = state.stId;
      //   markId = state.markId;
      // }
      var paymentMode = 3;
      var wxPayNum = totalPriceNum - accountBalanceNum;
      var data = {
        'Token':token,
        'ServiceTypeId':stId,
        'ServicePrice':totalPriceNum,
        'BalancePay':accountBalanceNum,
        'WxPay':wxPayNum,
        'ServiceProviderId':markId,
        'ServiceProviderType':'2',
        'code':wxCode,
        'PaymentMode':paymentMode
      };
      $.ajax({
        type:'POST',
        url:urlIp+'api/v2/OrderInfo/CreateOrderPayAtStore',
        data:data,
        success:function(data){
          console.log(data);
          if (data.Meta.ErrorCode === "0") {
            //微信支付
            function onBridgeReady() {
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                  "appId": data.Body.WxPayParam.appId, //公众号名称，由商户传入     
                  "timeStamp": data.Body.WxPayParam.timeStamp, //时间戳，自1970年以来的秒数     
                  "nonceStr": data.Body.WxPayParam.nonceStr, //随机串     
                  "package": data.Body.WxPayParam.package,
                  "signType": data.Body.WxPayParam.signType, //微信签名方式     
                  "paySign": data.Body.WxPayParam.paySign //微信签名 
                },
                function(data) {
                  if (data.err_msg == "get_brand_wcpay_request：ok") {
                    window.location.href = "/template/pay/pay_success.html?orderId=" + data.Body.OrderId + "&price=" + totalPriceNum;
                  } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                }
              );
            }
            if (typeof WeixinJSBridge == "undefined") {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              }
            } else {
              onBridgeReady();
            }
          } else {
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2ftemplate%2fpay%2fnew-pay.html&response_type=code&scope=snsapi_userinfo&state=123456#wechat_redirect";
          }
        }
      })
    }
    if(isBalance && isAli){                 //余额+支付宝
      var paymentMode = 0;
      var alipayNum = totalPriceNum - accountBalanceNum;
      var data = {
        'Token':token,
        'ServiceTypeId':stId,
        'ServicePrice':totalPriceNum,
        'BalancePay':accountBalanceNum,
        'Alipay':alipayNum,
        'ServiceProviderId':markId,
        'ServiceProviderType':'2',
        'PaymentMode':paymentMode
      };
      $.ajax({
        type:'POST',
        url:urlIp+'api/v2/OrderInfo/CreateOrderPayAtStore',
        data:data,
        success:function(data){
          console.log(data);
          aplipayTradePay(data.Body.AliPaySign.GATEWAY_NEW, data.Body.AliPaySign.AlipaySign);
          if (data.Meta.ErrorCode === "0") {
            // window.location.href = "/template/pay/pay_success.html?orderId="+$rootScope.orderId;
          } else {
            alert(data.Meta.ErrorMsg);
          }
          function aplipayTradePay(GATEWAY_NEW, aplipaySign) {
            var aplipayUrl = GATEWAY_NEW + aplipaySign;
            window.sessionStorage.setItem("AlipayUrl", aplipayUrl);
            window.location.href = "/template/pay/alipay.html";
          }
        }
      })
    }
    if(!isBalance && isWeixin){             //微信
      var paymentMode = 3;
      var data = {
        'Token':token,
        'ServiceTypeId':stId,
        'ServicePrice':totalPriceNum,
        'WxPay':totalPriceNum,
        'BalancePay':'0',
        'ServiceProviderId':markId,
        'ServiceProviderType':'2',
        'code':wxCode,
        'PaymentMode':paymentMode
      };
      $.ajax({
        type:'POST',
        url:urlIp+'api/v2/OrderInfo/CreateOrderPayAtStore',
        data:data,
        success:function(data){
          console.log(data);
          if (data.Meta.ErrorCode === "0") {
            //微信支付
            function onBridgeReady() {
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                  "appId": data.Body.appId, //公众号名称，由商户传入     
                  "timeStamp": data.Body.timeStamp, //时间戳，自1970年以来的秒数     
                  "nonceStr": data.Body.nonceStr, //随机串     
                  "package": data.Body.package,
                  "signType": data.Body.signType, //微信签名方式     
                  "paySign": data.Body.paySign //微信签名 
                },
                function(data) {
                  if (data.err_msg == "get_brand_wcpay_request：ok") {
                    window.location.href = "/template/pay/pay_success.html?orderId=" + data.Body.OrderId + "&price=" + totalPriceNum;
                  } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                }
              );
            }
            if (typeof WeixinJSBridge == "undefined") {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              }
            } else {
              onBridgeReady();
            }
          } else {
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2ftemplate%2fpay%2fnew-pay.html&response_type=code&scope=snsapi_userinfo&state=123456#wechat_redirect";
          }
        } 
      })  
    }
    if(!isBalance && isAli){                //支付宝
      var paymentMode = 0;
      var data = {
        'Token':token,
        'ServiceTypeId':stId,
        'ServicePrice':totalPriceNum,
        'Alipay':totalPriceNum,
        'BalancePay':'0',
        'ServiceProviderId':markId,
        'ServiceProviderType':'2',
        'PaymentMode':paymentMode
      };
      $.ajax({
        type:'POST',
        url:urlIp+'api/v2/OrderInfo/CreateOrderPayAtStore',
        data:data,
        success:function(data){
          console.log(data);
          aplipayTradePay(data.Body.AliPaySign.GATEWAY_NEW, data.Body.AliPaySign.AlipaySign);
          if (data.Meta.ErrorCode === "0") {
            // window.location.href = "/template/pay/pay_success.html?orderId="+$rootScope.orderId;
          } else {
            alert(data.Meta.ErrorMsg);
          }
          function aplipayTradePay(GATEWAY_NEW, aplipaySign) {
            var aplipayUrl = GATEWAY_NEW + aplipaySign;
            window.sessionStorage.setItem("AlipayUrl", aplipayUrl);
            window.location.href = "/template/pay/alipay.html";
          }
        }
      })
    }
  })

  /*--账户余额--*/
  $.ajax({
    type:'POST',
    url:urlIp+'api/v1/ClientInfo/Index',
    data:{
      Token:token
    },
    success:function(data){
      console.log(data);
      var balance = data.Body.Info.Balance;
      $("#accountBalance").text(balance);
    }
  })
  /*--CreateOrderPayAtStore--*/
  function createOrderPayAtStore(msg){
    $.ajax({
      type:'POST',
      url:urlIp+'api/v2/OrderInfo/CreateOrderPayAtStore',
      data:msg,
      success:function(data){
        console.log(data);
        if(data.Meta.ErrorCode == "0"){
          window.location.href = "/template/pay/pay_success.html?orderId="+data.Body.OrderId;
        }
      }      
    })
  }

})