$(function(){
  //获取url参数
  function getvl(name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
  }
  var markId = getvl("markid");
  var stId = getvl("stId");
  var token = window.localStorage.getItem("Token");
  var needToPay = sessionStorage.getItem("needToPay");
  var needToPayNum = parseFloat(needToPay);
  var totalPriceNum = sessionStorage.getItem("totalPriceNum");
  $("#needToPay").text(needToPay);
  $("#showMore").on("click",function(){
    var height = $("#payPanel").height();
    if(height == 128){
      $("#payPanel").removeClass().addClass('cl');
      $("#payPanel").css("height","188px");
    }
    if(height == 188){
      $("#payPanel").removeClass().addClass('cs');
      $("#payPanel").css("height","128");
    }
  })
  $("#pay2").on("click",function(){
    $("#pay3").attr("checked",false);
  })
  $("#pay3").on("click",function(){
    $("#pay2").attr("checked",false);
  })
  $("#submitBtn").on("click",function(){
    var isBalance = $("#pay1").is(":checked"); 
    var isWeixin = $("#pay2").is(":checked");
    var isAli = $("#pay3").is(":checked");
    var accountBalance = $("#accountBalance").text();
    var accountBalanceNum = parseFloat(accountBalance);
    console.log(accountBalance);
    if(isBalance && !isWeixin && !isAli){   //余额
      if(accountBalanceNum < needToPayNum){
        alert("余额不足");
      }
      var paymentMode = 8;
      var data = {
        'Token':token,
        'ServiceTypeId':stId,
        'ServicePrice':totalPriceNum,
        'ServiceProviderId':markId,
        'ServiceProviderType':'2',
        'PaymentMode':paymentMode
      }
      createOrderPayAtStore(data);
    }
    if(isBalance && isWeixin){              //余额+微信
      var paymentMode = 3;
      var wxPayNum = totalPriceNum - accountBalanceNum;
      var data = {
        'Token':token,
        'ServiceTypeId':stId,
        'ServicePrice':totalPriceNum,
        'BalancePay':balancePay,
        'WxPay':wxPayNum,
        'ServiceProviderId':markId,
        'ServiceProviderType':'2',
        'PaymentMode':paymentMode
      }
      createOrderPayAtStore(data);
    }
    if(isBalance && isAli){                 //余额+支付宝
      var paymentMode = 0;
      var alipayNum = totalPriceNum - accountBalanceNum;
      var data = {
        'Token':token,
        'ServiceTypeId':stId,
        'ServicePrice':totalPriceNum,
        'BalancePay':accountBalance,
        'Alipay':alipayNum,
        'ServiceProviderId':markId,
        'ServiceProviderType':'2',
        'PaymentMode':paymentMode
      }
      createOrderPayAtStore(data); 
    }
    if(!isBalance && isWeixin){             //微信
      var paymentMode = 3;
      var data = {
        'Token':token,
        'ServiceTypeId':stId,
        'ServicePrice':totalPriceNum,
        'ServiceProviderId':markId,
        'ServiceProviderType':'2',
        'PaymentMode':paymentMode
      }
      createOrderPayAtStore(data);     
    }
    if(!isBalance && isAli){                //支付宝
      var paymentMode = 0;
      var data = {
        'Token':token,
        'ServiceTypeId':stId,
        'ServicePrice':totalPriceNum,
        'ServiceProviderId':markId,
        'ServiceProviderType':'2',
        'PaymentMode':paymentMode
      }
      createOrderPayAtStore(data);      
    }
  })

  /*--账户余额--*/
  $.ajax({
    type:'POST',
    url:'http://192.168.1.191:3003/api/v1/ClientInfo/Index',
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
      url:'http://192.168.1.78:8006/api/v2/OrderInfo/CreateOrderPayAtStore',
      data:msg,
      success:function(data){
        console.log(data);
      }      
    })
  }

})