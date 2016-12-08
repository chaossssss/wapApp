$(function(){
  //获取url参数
  function getvl(name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
  }
  var orderId = getvl("state");
  var token = window.localStorage.getItem("Token");
  var needToPay = sessionStorage.getItem("needToPay");
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
    console.log(accountBalance);
    if(isBalance && !isWeixin && !isAli){   //余额
      if(accountBalance < needToPay){
        alert("余额不足");
      }
      var paymentMode = 8;
      var data = {
        Token:token,
        OrderId:orderId,
        couponId:'',
        BalancePay:balancePay
      }
    }
    if(isBalance && isWeixin){              //余额+微信
      var paymentMode = 2;
      var data = {
        Token:token,
        OrderId:orderId,
        RedEnvelopeIds:'',
        IsBalancePay:'1',
        NeedPay:needPay,
        TotalMoney:totalMoney
      }
    }
    if(isBalance && isAli){                 //余额+支付宝
      var paymentMode = 1;
      var data = {
        Token:token,
        OrderId:orderId,
        RedEnvelopeIds:'',
        IsBalancePay:'1',
        NeedPay:needPay,
        TotalMoney:totalMoney        
      }
    }
    if(!isBalance && isWeixin){             //微信
      var paymentMode = 3;
      var data = {
        Token:token,
        OrderId:orderId,
        RedEnvelopeIds:'',
        IsBalancePay:'0',
        NeedPay:needPay,
        TotalMoney:totalMoney        
      }      
    }
    if(!isBalance && isAli){                //支付宝
      var paymentMode = 0;
      var data = {
        Token:token,
        OrderId:orderId,
        RedEnvelopeIds:'',
        IsBalancePay:'0',
        NeedPay:needPay,
        TotalMoney:totalMoney        
      }      
    }
  })

  /*--账户余额--*/
  $.ajax({
    type:'POST',
    url:'http://wapapi.zhujiash.com/api/v1/ClientInfo/Index',
    data:{
      Token:token
    },
    success:function(data){
      console.log(data);
      var balance = data.Body.Info.Balance;
      $("#accountBalance").text(balance);
    }
  })
  /*--支付宝+余额--*/
  function aliWithBalance(msg){
    $.ajax({
      type:'POST',
      url:'',
      data:msg,
      success:function(data){

      }
    })
  }
  /*--微信+余额--*/
  function weixinWithBalance(msg){
    $.ajax({
      type:'POST',
      url:'',
      data:msg,
      success:function(data){

      }
    })
  }
  /*--支付宝--*/
  function aliPay(msg){
    $.ajax({
      type:'POST',
      url:'',
      data:msg,
      success:function(data){

      }
    })
  }
  /*--微信--*/
  function weixinPay(msg){
    $.ajax({
      type:'POST',
      url:'',
      data:msg,
      success:function(data){

      }
    })
  }
  /*--余额--*/
  function balancePay(msg){
    $.ajax({
      type:'POST',
      url:'',
      data:msg,
      success:function(data){

      }
    })
  }
})