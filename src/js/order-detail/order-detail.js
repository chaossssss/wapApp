$(function(){
  var $contactWorker = $("#contactWorker");
  var $workerPhone = $("#workerPhone");
  var $cancelBtn = $("#cancelBtn");

  function getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
          return unescape(r[2]);
      }
      return null;
  }
  // function getLocalTime(nS) {     
  //   var time = new Date(parseInt(nS) * 1000);
  //   return time;
  // }
  function getDatetime(tm){
    var timestamp = tm;
    var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds()
    if(month <= 9){
      month = "0" + month;
    }
    if(date <= 9){
      date = "0" + date;
    }
    if(hours <= 9){
      hours = "0" + hours;
    }
    if(minutes<= 9){
      minutes = "0" + minutes;
    }
    var date = (d.getFullYear()) + "-" + 
               month + "-" +
               date + " " + 
               hours + ":" + 
               minutes;
    return date;
  }
  function string_to_date(strDate){
    var dateString = strDate.replace(/年|月/g, "/").replace(/日/g, " ");
    var t = new Date(new Date(dateString).valueOf() + 7*24*60*60*1000);
    var tm = new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds());
    return tm;
  }
  function replaceTime(t){
    var a = t.replace(/\//g,'-');
    return a;
  }
  Date.prototype.Format = function (fmt) { //格式化时间
    var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  function clientGenderChange(g){
    if(g == "女"){
      var gn = "女士";
    }else if(g == "男"){
      var gn = "先生";
    }
    return gn;
  }
  function moneySymbol(m){
    if(m == '面议'){
      var ml = m;
    }else{
      var ml = "￥" + m;
    }
    return ml;
  }
  function unitSymbole(u){
    if(u == ''){
      var us = u;
    }else{
      var us = "/" + u;
    }
    return us;
  }
  function multipleSymbol(t){
    if(t == ''){
      var tl = t;
    }else{
      var tl = "×" + t;
    }
    return tl;
  }
  function minus(minus){
    if(minus == ''){
      var mn = '';
    }else{
      var mn = "-￥" + minus;
    }
    return mn;
  }
  var orderId = getQueryString("orderId");
  console.log(orderId);
  var token = localStorage.getItem("Token");
  console.log(token);
  $cancelBtn.on('click',function(){
    $workerPhone.hide();
  });
  $("#cancelBtn2").on("click",function(){
    $("#cancelOrder2").hide();
  })
  $("#cancelBtn1").on("click",function(){
    $("#cancelOrder1").hide();
  })
  $("#deleteCancel").on("click",function(){
    $("#deleteOrder").hide();
  })
  $("#orderCancel").on("click",function(){
    $("#cancelOrder1").css("display","block");
    $("#cancelOrderBtn").on("click",function(){
      cancelOrder(token,orderId);
      $("#cancelOrder1").hide();
      location.reload();
    })
  })
  $("#orderDelete").on("click",function(){
    $("#deleteOrder").css("display","block");
    $("#deleteBtn").on("click",function(){
      deleteOrder(token,orderId);
      $("#deleteOrder").hide();
      location.reload();
    })
  })
  $("#contactWorkerBtn").on("click",function(){
    $("#cancelOrder2").css("display","block");
    $("#contactWorkerBtn").on("click",function(){
      $("#cancelOrder2").hide();
    })
  })

/*--订单详情--*/
  $.ajax({
    method:"POST",
    url:"http://192.168.1.191:3003/api/v2/OrderInfo/GetOrderInfoEx",
    async:false,
    data:{
    Token:token,
    OrderId:orderId
    },
    success:function(data){
      console.log(data);
      orderState = data.Body.OrderStatus;
      serviceId = data.Body.Service.ServiceId;
      serviceProviderType = data.Body.ServiceProviderType;
      serviceProviderId = data.Body.ServiceProviderId;
      isPayOff = data.Body.IsPayOff;
      console.log(isPayOff);

      orderIsGeted = data.Body.ServiceProviderId;

      var orderId = data.Body.OrderId;
      isEvaluated = data.Body.IsEvaluated;
      var workHeadPic = data.Body.ServiceProviderPic;
      minPrice = data.Body.MinPrice;
      maxPrice = data.Body.MaxPrice;
      $("#providerHead").attr("src",workHeadPic);
      $("#orderCode").text(data.Body.OrderCode);
      if(data.Body.CreateTime != null){
        var createTime = new Date(data.Body.CreateTime);
      $("#createTime").text(createTime.Format("yyyy-MM-dd hh:mm"));
      }
      if(data.Body.AcceptTime != null){
        var acceptAt = new Date(data.Body.AcceptTime);
        $("#acceptAt").text(acceptAt.Format("yyyy-MM-dd hh:mm"));
      }
      var serviceStartAt = getDatetime(data.Body.Service.ServiceStartAt);
      $("#serviceAt").text(serviceStartAt);
      if(data.Body.FinishTime != null){
        var finishTime = new Date(data.Body.FinishTime)
        $("#finishAt").text(finishTime.Format("yyyy-MM-dd hh:mm"));
      }
      $("#confirmAt").text(data.Body.ConfirmTime);
      if(data.Body.CancelTime != null){
        var cancelAt = new Date(data.Body.CancelTime);
        $("#cancelAt").text(cancelAt.Format("yyyy-MM-dd hh:mm"));
      }
      // $("#cancelAt").text(data.Body.CancelTime);
      $("#clientName").text(data.Body.Service.AddressInfo.Contact);
      var clientGender = clientGenderChange(data.Body.Service.AddressInfo.Gender);
      $("#clientGender").text(clientGender);
      var workName = data.Body.ServiceProviderName;
      $("#serviceProviderName").text(workName);
      totalPrice = moneySymbol(data.Body.TotalPrice);
      $("#actualMoney").text(totalPrice);
      if(data.Body.TotalPrice){
        $("#price").text(totalPrice);
      }
      var gender = data.Body.ServiceProviderGender;
      if(gender == "1"){
        $("#workerGender").text('阿姨');
      }else if(gender == "0"){
        $("#workerGender").text("师傅");
      }

      var picNum = data.Body.Service.Pictures.length;
      var picData = data.Body.Service.Pictures;
      console.log(picNum);
      if(picNum == "0"){
        $("#pictureLine").hide();
      }else{
        for(i = 0; i < picNum; i++ ){
          var html = "<li class=" + "'zj-show-pic'" + "style=" + "'background-image:url(" + picData[i].SmallPIc + ")'>"
          + "</li>";
          $("#showPics").append(html);
        }
      }
      var notesNum = data.Body.Service.Content;
      var noteList = "<li>" + notesNum + "</li>";
      $("#remarkLists").append(noteList);
      var unitName = unitSymbole(data.Body.UnitName);
      $("#unit").text(unitName);
      noSinglePrice = data.Body.Price;
      singlePrice = moneySymbol(data.Body.Price);
      $("#single").text(singlePrice);
      var q = multipleSymbol(data.Body.Total);
      $("#quantity").text(q);

      $("#serviceName").text(data.Body.Service.ServiceName);
      $("#clientName").text(data.Body.Service.ServiceProviderName);
      $("#serviceAddress").text(data.Body.Service.AddressInfo.Address1);
      if(data.Body.PayOffTime != null){
        var payOffTime = getDatetime(data.Body.PayOffTime);
        $("#payOffTime").text(payOffTime);
      }
      $("#clinetPhone").text(data.Body.Service.AddressInfo.PhoneNumber);

      finishedTime = data.Body.FinishTime;
      payLock = data.Body.PayLock;
      // $("#price").text(data.Body.Service.Price);

      var discountAmount = data.Body.DiscountAmount;
      $("#discountInfo").text("-￥" + discountAmount);
      $("#refundDiscount").text(discountAmount);
      if(data.Body.DiscountAmount == null){
        $("#orderDiscount").hide();
      }
      if(data.Body.Refunds){
        var refundsNum = data.Body.Refunds.length;
        for(var i = 0; i < refundsNum; i++){      
          $("#refundAt").text(data.Body.Refunds[i].RefundTime);
          $("#lostIncome").text(data.Body.Refunds[i].LostIncome);
          $("#refundAmount").text(data.Body.Service[i].TotalPrice);
        }
      }
      var activity = data.Body.Activity;
      $("#hourly").text("-￥" + activity);
      $("#toBePaid").text(totalPrice);
      if( data.Body.DiscountAmount != null || data.Body.Activity != null){
        var toBePaid = data.Body.TotalPrice - data.Body.DiscountAmount - data.Body.Activity;
        $("#toBePaid").text(toBePaid);
      }
      if(totalPrice == null){
        $("toBePaid").hide();
      }
      if(data.Body.Activity == null){
        $("#specialPrice").hide();
      }

      if(data.Body.DiscountAmount == ""){
        $("#orderDiscount").hide();
      }
      var serviceProviderPhone = "tel:" + data.Body.ServiceProviderPhone;
      $("#serviceProviderPhone").attr("href",serviceProviderPhone);
      if(data.Body.ServiceProviderPhone == ""){
        $contactWorker.on('click',function(){
          $workerPhone.css('display','block');
        });
      }
      

      if(data.Body.ServiceProviderType == "2"){
        console.log("工人");
        href="../worker/worker-info.html?type=1&markid=" + serviceProviderId;
        $("#goToProvider").attr("href",href);
      }
      if(data.Body.ServiceProviderType == "3"){
        console.log("商户");
        href="../business-detail/business-detail.html?type=2&markid=" + serviceProviderId;
        $("#goToProvider").attr("href",href);
      }

     }
   });

console.log(orderState);
  switch(orderState){
    case "1":
    console.log("待接单");
    $("#orderStatus").css("background-image","url(../../images/order-detail/order-success.png)");

    $("#status").text('订单提交成功');
    $("#explanation").text('请耐心等待客服为您安排工人，并确定服务价格');
    $("#tabFirst").text('订单已提交');
    $("#tabSecond").text('待工人接单');
    $("#tabThird").text('待付款');
    $("#tabFourth").text('待服务');
    $("#btnRight").text('取消订单');

    $("#explanation").css("width","256px");

    $("#tabSecond").addClass("processing");
    $("#roundFirst").addClass("round-complete");
    $("#roundSecond").addClass("round-processing");
    $("#roundThird").addClass("round-undone");
    $("#roundFourth").addClass("round-undone");
    $("#btnRight").addClass("delete-btn");

    if(singlePrice == '面议'){
      $("#unit").hide();
      $("#multiple").hide();
    }
    if(noSinglePrice == null){
      var single = "￥" + minPrice + "-" + maxPrice;
      $("#single").text(single);
    }
    $("#zjWorker").hide();
    $("#orderPrice").hide();
    $("#orderDiscount").hide();
    $("#orderActual").hide();
    // $("#unitPrice").hide();
    // $("#multiple").hide();
    $("#refundRecord").hide();
    $("#filling2").hide();
    $("#acceptTime").hide();
    $("#payTime").hide();
    $("#btnLeft").hide();
    $("#cancelTime").hide();
    $("#specialPrice").hide();
    $("#waitOrder").hide();
    $("#finishTime").hide();

    $("#orderTime").css("marginBottom","0px");
    $("#servicePrice").css("marginBottom","4px");

    $("#btnRight").on("click",function(){
      $("#cancelOrder1").css("display","block");
      $("#cancelOrderBtn").on("click",function(){
        cancelOrder(token,orderId);
        $("#cancelOrder1").hide();
        location.reload();
      })
    });
    break;
    case "10":
    console.log("待接单");
    $("#pay-box").css("display","block");
    $("#know").on("click",function(){
      $("#pay-box").hide();
    })
    $("#orderStatus").css("background-image","url(../../images/order-detail/order-success.png)");

    $("#status").text('订单提交成功');
    $("#explanation").html('请耐心等待工人确认价格并接单<br>注意查收付款通知，您可以在服务开始前完成付款');
    $("#tabFirst").text('订单已提交');
    $("#tabSecond").text('待工人接单');
    $("#tabThird").text('待付款');
    $("#tabFourth").text('待服务');
    $("#btnLeft").text('取消订单');
    $("#btnRight").text('支付');

    $("#explanation").css("width","266px");
    $("#orderStatus").css("height","169px");
    $("#waitOrder").css("marginBottom","0px");

    $("#tabSecond").addClass("processing");
    $("#roundFirst").addClass("round-complete");
    $("#roundSecond").addClass("round-processing");
    $("#roundThird").addClass("round-undone");
    $("#roundFourth").addClass("round-undone");
    $("#btnLeft").addClass("delete-btn");
    $("#btnRight").addClass("pay-btn");
    $("#wait").addClass("actual");

    // $("#orderPrice").hide();
    $("#orderDiscount").hide();
    $("#orderActual").hide();
    $("#refundRecord").hide();
    $("#filling2").hide();
    $("#acceptTime").hide();
    $("#payTime").hide();
    $("#cancelTime").hide();
    $("#specialPrice").hide();
    // $("#waitOrder").hide();
    $("#finishTime").hide();
    if(serviceProviderId == null){
      $("#zjWorker").hide();
    }
    if(singlePrice == '面议'){
      $("#servicePrice").css("marginBottom","4px");
      $("#multiple").hide();
      $("#unit").hide();
      $("#orderPrice").hide();
      $("#waitOrder").hide();
    }
    // $("#waitOrder").css("marginBottom","4px");
    $("#orderTime").css("marginBottom","0px");
    // $("#servicePrice").css("marginBottom","4px");
    if(totalPrice == '面议'){
      $("#servicePrice").css("marginBottom","4px");
    }
    $(".pay-btn").on("click",function(){

    })
    $("#btnLeft").on("click",function(){
      $("#cancelOrder1").css("display","block");
      $("#cancelOrderBtn").on("click",function(){
        cancelOrder(token,orderId);
        $("#cancelOrder1").hide();
        location.reload();
      })
    });
    $("#btnRight").on("click",function(){
      // $("#prompt").css("display","block");
      $("#prompt").addClass("prompt-animation");
      setTimeout(function(){
      $("#prompt").removeClass("prompt-animation");
      },2500);
    })


    break;
    
    // case "11":
    // console.log("待付款");
    // $("#orderStatus").css("background-image","url(../../images/order-detail/get-order.png)");

    // $("#status").text('工人已接单');
    // $("#explanation").text('请支付服务费用并等待工人上门服务您也可以在工人服务完成后再付款哦');
    // $("#tabFirst").text('订单已提交');
    // $("#tabSecond").text('待工人接单');
    // $("#tabThird").text('待付款');
    // $("#tabFourth").text('待服务');
    // $("#btnLeft").text('取消订单');
    // $("#btnRight").text('支付');

    // $("#tabThird").addClass("processing");
    // $("#roundFirst").addClass("round-complete");
    // $("#roundSecond").addClass("round-complete");
    // $("#roundThird").addClass("round-processing");
    // $("#roundFourth").addClass("round-undone");
    // $("#total").addClass("actual");
    // $("#btnLeft").addClass("delete-btn")
    // $("#btnRight").addClass("pay-btn");

    // $("#orderDiscount").hide();
    // $("#orderActual").hide();
    // $("#refundRecord").hide();
    // $("#filling2").hide();
    // $("#negotiable").hide();
    // $("#cancelTime").hide();
    // $("#specialPrice").hide();

    // $("#orderPrice").css("marginBottom","0px");
    // $("#btnRight").css("left","181px");

    // $("#btnLeft").click(function(){
    //   $.ajax({

    //   })
    // })

    // $("#btnRight").click(function(){
    //   $.ajax({

    //   })
    // })

    // break;

    // case "12":
    // console.log("付款中");
    // $("#orderStatus").css("background-image","url(../../images/order-detail/paying.png)");

    // $("#status").text('付款中');
    // $("#explanation").text('等待支付结果');
    // $("#tabFirst").text('订单已提交');
    // $("#tabSecond").text('工人已接单');
    // $("#tabThird").text('付款中');
    // $("#tabFourth").text('待服务');

    // $("#tabThird").addClass("processing");
    // $("#roundFirst").addClass("round-complete");
    // $("#roundSecond").addClass("round-complete");
    // $("#roundThird").addClass("round-processing");
    // $("#roundFourth").addClass("round-undone");
    // $("#btnRight").addClass("confirm-btn"); 

    // $("#refundRecord").hide();
    // $("#filling2").hide();
    // $("#negotiable").hide();
    // $("#optionFooter").hide();
    // $("#payTime").hide();
    // $("#finishTime").hide();
    // $("#cancelTime").hide();
    // $("#specialPrice").hide();

    // $("#acceptTime").css("marginBottom","4px");

    // break;

    // case "13":
    // console.log("待确认");
    // $("#orderStatus").css("background-image","url(../../images/order-detail/worker-uncomfirm.png)");

    // $("#status").text('上门服务');
    // $("#explanation").text('请耐心等待工人在约定时间上门服务哦');
    // $("#tabFirst").text('订单已提交');
    // $("#tabSecond").text('工人已接单');
    // $("#tabThird").text('待付款');
    // $("#tabFourth").text('待服务');
    // $("#btnRight").text('取消订单');

    // $("#explanation").css("width","205px");

    // $("#tabFourth").addClass("processing");
    // $("#roundFirst").addClass("round-complete");
    // $("#roundSecond").addClass("round-complete");
    // $("#roundThird").addClass("round-complete");
    // $("#roundFourth").addClass("round-processing");
    // $("#btnRight").addClass("delete-btn");

    // $("#refundRecord").hide();
    // $("#filling2").hide();
    // $("#negotiable").hide();
    // $("#btnLeft").hide();
    // $("#cancelTime").hide();
    // $("#specialPrice").hide();

    // break;

    // case "15":
    // console.log("退款中");
    // $("#orderStatus").css("background-image","url(../../images/order-detail/refund.png)");

    // $("#status").text('退款中');
    // $("#explanation").text('系统将于72小时内退款');
    // $("#tabFirst").text('订单已提交');
    // $("#tabSecond").text('工人已接单');
    // $("#tabThird").text('退款中');
    // $("#tabFourth").text('退款成功');

    // $("#tabThird").addClass("processing");
    // $("#roundFirst").addClass("round-complete");
    // $("#roundSecond").addClass("round-complete");
    // $("#roundThird").addClass("round-processing");
    // $("#roundFourth").addClass("round-undone");

    // $("#optionFooter").hide();
    // $("#negotiable").hide();
    // $("#cancelTime").hide();

    // break;

    case "20":
    console.log("已接单");
    console.log(isPayOff);
    if(isPayOff == "0"){
      console.log("订单状态：待付款");
      $("#orderStatus").css("background-image","url(../../images/order-detail/get-order.png)");

      $("#status").text('工人已接单');
      $("#explanation").text('请支付服务费用并等待工人上门服务');
      $("#tabFirst").text('订单已提交');
      $("#tabSecond").text('待工人接单');
      $("#tabThird").text('待付款');
      $("#tabFourth").text('待服务');
      $("#btnLeft").text('取消订单');
      $("#btnRight").text('支付');

      $("#tabThird").addClass("processing");
      $("#roundFirst").addClass("round-complete");
      $("#roundSecond").addClass("round-complete");
      $("#roundThird").addClass("round-processing");
      $("#roundFourth").addClass("round-undone");
      $("#total").addClass("actual");
      $("#btnLeft").addClass("delete-btn")
      $("#btnRight").addClass("pay-btn");

      $("#orderDiscount").hide();
      $("#orderActual").hide();
      $("#refundRecord").hide();
      $("#filling2").hide();
      $("#negotiable").hide();
      $("#cancelTime").hide();
      $("#finishTime").hide();
      $("#payTime").hide();
      $("#specialPrice").hide();
      $("#waitOrder").hide();
      $("#orderPrice").css("marginBottom","4px");
      $("#acceptTime").css("marginBottom","0px");
      // $("#btnRight").css("left","181px");

      $("#btnLeft").on("click",function(){
        $("#cancelOrder2").css("display","block");
        $("#contactWorkerBtn").on("click",function(){
          cancelOrder(token,orderId);
          $("#cancelOrder2").hide();
          // UpdataOrder(Token,OrderId);
          // location.reload();
        })
      })
      $(".pay-btn").on("click",function(){
        window.location.href="../pay/pay.html?orderId" + orderId;
      })
    }

    if(isPayOff == "1"){
      $("#orderStatus").css("background-image","url(../../images/order-detail/worker-uncomfirm.png)");

      $("#status").text('上门服务');
      $("#explanation").text('请耐心等待工人在约定时间上门服务哦');
      $("#tabFirst").text('订单已提交');
      $("#tabSecond").text('工人已接单');
      $("#tabThird").text('待付款');
      $("#tabFourth").text('待服务');
      $("#btnRight").text('取消订单');

      $("#explanation").css("width","205px");

      $("#tabFourth").addClass("processing");
      $("#roundFirst").addClass("round-complete");
      $("#roundSecond").addClass("round-complete");
      $("#roundThird").addClass("round-complete");
      $("#roundFourth").addClass("round-processing");
      $("#btnRight").addClass("delete-btn");

      $("#refundRecord").hide();
      $("#filling2").hide();
      $("#negotiable").hide();
      $("#btnLeft").hide();
      $("#cancelTime").hide();

      $("#btnRight").on("click",function(){
        $("#cancelOrder1").css("display","block");
        $("#cancelOrderBtn").on("click",function(){
          cancelOrder(token,orderId);
          $("#cancelOrder1").hide();
          location.reload();
        })
      })
    }

    if(payLock == "1"){
      console.log("付款中");
      $("#orderStatus").css("background-image","url(../../images/order-detail/paying.png)");

      $("#status").text('付款中');
      $("#explanation").text('等待支付结果');
      $("#tabFirst").text('订单已提交');
      $("#tabSecond").text('工人已接单');
      $("#tabThird").text('付款中');
      $("#tabFourth").text('待服务');

      $("#tabThird").addClass("processing");
      $("#roundFirst").addClass("round-complete");
      $("#roundSecond").addClass("round-complete");
      $("#roundThird").addClass("round-processing");
      $("#roundFourth").addClass("round-undone");

      $("#btnLeft").hdie();
      $("#btnRight").hide(); 
      $("#refundRecord").hide();
      $("#filling2").hide();
      $("#negotiable").hide();
      $("#optionFooter").hide();
      $("#filling3").hide();
      $("#payTime").hide();
      $("#finishTime").hide();
      $("#cancelTime").hide();
      $("#specialPrice").hide();

      $("#acceptTime").css("marginBottom","0px");
    }    

    // $("#orderStatus").css("background-image","url(../../images/order-detail/get-order.png)");

    // $("#status").text('工人已接单');
    // $("#explanation").text('请支付服务费用并等待工人上门服务您也可以在工人服务完成后再付款哦');
    // $("#tabFirst").text('订单已提交');
    // $("#tabSecond").text('待工人接单');
    // $("#tabThird").text('待付款');
    // $("#tabFourth").text('待服务');
    // $("#btnLeft").text('取消订单');
    // $("#btnRight").text('支付');

    // $("#tabThird").addClass("processing");
    // $("#roundFirst").addClass("round-complete");
    // $("#roundSecond").addClass("round-complete");
    // $("#roundThird").addClass("round-processing");
    // $("#roundFourth").addClass("round-undone");
    // $("#wait").addClass("actual");
    // $("#btnLeft").addClass("delete-btn")
    // $("#btnRight").addClass("pay-btn");

    // $("#orderDiscount").hide();
    // $("#orderActual").hide();
    // $("#refundRecord").hide();
    // $("#filling2").hide();
    // $("#negotiable").hide();
    // $("#cancelTime").hide();

    // $("#waitOrder").css("marginBottom","0px");

    // $("#btnLeft").on("click",function(){
    //   $("#cancelOrder1").css("display","block");
    //   $("#cancelOrderBtn").on("click",function(){
    //     cancelOrder(Token,OrderId);
    //     $("#cancelOrder1").hide();
    //     location.reload();
    //   })
    // })
    // $("#btnRight").on("click",function(){
    //   window.location.href="../pay/pay.html?orderId" + orderId;
    // })
    break;

    case "30":
    console.log("已完成");
    $("#orderStatus").css("background-image","url(../../images/order-detail/awaiting-assessment.png)");
    $("#status").text('工人已完成服务');
    Date.prototype.Format = function (fmt) { //格式化时间
      var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
    var ft = finishedTime;
    var ct = string_to_date(ft);
    var now = new Date().Format("yyyy-MM-dd hh:mm:ss");
    var confirmTime = ct.Format("yyyy-MM-dd hh:mm:ss");

    function DateDiff(sDate1, sDate2){//sDate1和sDate2是yyyy-MM-dd格式  
      var aDate, oDate1, oDate2, iDays, iHours, diffText;
      aDate = sDate1.split("-");
      oDate1 = new  Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); 
      aDate = sDate2.split("-"); 
      oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); 
      iDays = parseInt(Math.abs(oDate1 - oDate2)/1000/60/60/24);   //把相差的毫秒数转换为天数 
      iHours = parseInt(Math.abs(oDate1 - oDate2)/1000/60/60%24);//计算相差的小时数
      diffText = iDays + "天" + iHours + "时";
      return  diffText; 
    }
    if(confirmTime > now){
    var dateDiff = DateDiff(confirmTime,now);
    var dataDiffText = "请确认服务完成，还剩" + dateDiff + "自动确认";
    }
    if(screen.width < 375){
      $(".process-status").css("fontSize","13px");
    }
    console.log(dataDiffText);
    console.log(now);
    console.log(confirmTime);
    
    $("#explanation").text(dataDiffText);
    $("#tabFirst").text('订单已提交');
    $("#tabSecond").text('待工人接单');
    $("#tabThird").text('已付款');
    $("#tabFourth").text('确认服务完成');
    $("#btnRight").text('确认服务完成');

    $("#explanation").css("width","237px");

    $("#tabThird").addClass("processing");
    $("#roundFirst").addClass("round-complete");
    $("#roundSecond").addClass("round-complete");
    $("#roundThird").addClass("round-processing");
    $("#roundFourth").addClass("round-undone");
    $("#btnRight").addClass("confirm-btn");

    // $(".round").css("left","58px");  
    $("#orderActual").css("marginBottom","0px");
    $("#refundRecord").hide();
    $("#filling2").hide();
    $("#negotiable").hide();
    $("#btnLeft").hide();
    $("#cancelTime").hide();
    $("#specialPrice").hide();
    $("#waitOrder").hide();
    $("#btnRight").on("click",function(){
      confirmOrder(token,orderId);
      location.reload();
    })

    break;

    case "40":
    console.log("客户确认完成，待评价");

    if(isEvaluated == null){

      $("#orderStatus").css("background-image","url(../../images/order-detail/awaiting-assessment.png)");

      $("#status").text('服务已完成');
      $("#explanation").text('评价一下这次服务吧~');
      $("#tabFirst").text('订单已提交');
      $("#tabSecond").text('工人已接单');
      $("#tabThird").text('服务完成');
      $("#btnRight").text('评价');

      $("#tabThird").addClass("processing");
      $("#roundFirst").addClass("round-complete");
      $("#roundSecond").addClass("round-complete");
      $("#roundThird").addClass("round-processing");
      $("#btnRight").addClass("confirm-btn");
      $("#orderActual").css("marginBottom","0px");
      // $(".round").css("left","58px");  

      $("#proFourth").hide();
      $("#refundRecord").hide();
      $("#filling2").hide();
      $("#negotiable").hide();
      $("#btnLeft").hide();
      $("#cancelTime").hide();
      $("#specialPrice").hide();
      $("#waitOrder").hide();

      $("#btnRight").on("click",function(){
        window.location.href="order-evaluate.html?orderId=" + orderId + "&type=" + (serviceProviderType-1) + "&markid=" + serviceProviderId;
      })
    }

    if(isEvaluated != null){
      $("#orderStatus").css("background-image","url(../../images/order-detail/awaiting-assessment.png)");

      $("#status").text('服务已完成');
      $("#explanation").text('');
      $("#tabFirst").text('订单已提交');
      $("#tabSecond").text('工人已接单');
      $("#tabThird").text('服务完成');
      $("#btnRight").text('删除订单');

      $("#tabThird").addClass("processing");
      $("#roundFirst").addClass("round-complete");
      $("#roundSecond").addClass("round-complete");
      $("#roundThird").addClass("round-processing");
      $("#btnRight").addClass("confirm-btn");

      // $(".round").css("left","58px");  

      $("#proFourth").hide();
      $("#refundRecord").hide();
      $("#filling2").hide();
      $("#negotiable").hide();
      $("#btnLeft").hide();
      $("#cancelTime").hide();
      $("#specialPrice").hide();
      $("#waitOrder").hide();

      $("#btnRight").on("click",function(){
        $("#deleteOrder").css("display","block");
        $("#deleteBtn").on("click",function(){
          $("#deleteOrder").hide();
          removeOrder(token,orderId);
          location.reload();
          window.location.href="../my-order/my-order-new.html?flag=1";
        })
      })
    }

    break;
    // case "21":
    // console.log("待评价");
    // $("#orderStatus").css("background-image","url(../../images/order-detail/awaiting-assessment.png)");

    // $("#status").text('服务已完成');
    // $("#explanation").text('评价一下这次服务吧~');
    // $("#tabFirst").text('订单已提交');
    // $("#tabSecond").text('工人已接单');
    // $("#tabThird").text('服务完成');
    // $("#btnRight").text('评价');

    // $("#tabThird").addClass("processing");
    // $("#roundFirst").addClass("round-complete");
    // $("#roundSecond").addClass("round-complete");
    // $("#roundThird").addClass("round-processing");
    // $("#btnRight").addClass("confirm-btn");

    // $(".round").css("left","58px");  

    // $("#proFourth").hide();
    // $("#refundRecord").hide();
    // $("#filling2").hide();
    // $("#negotiable").hide();
    // $("#btnLeft").hide();
    // $("#cancelTime").hide();

    // break;
    case "50":
    console.log("已取消");
    if(orderIsGeted == null){
      console.log("取消订单，工人没接单");
     $("#orderStatus").css("background-image","url(../../images/order-detail/canceled.png)");

     $("#status").text('订单已取消');
     $("#explanation").text('');
     $("#tabFirst").text('订单已提交');
     $("#tabSecond").text('订单已取消');
     $("#btnRight").text('删除订单');

     $("#roundFirst").addClass("round-undone");
     $("#roundSecond").addClass("round-undone");
     $("#btnRight").addClass("delete-btn");

     // $(".round").css("left","89px");

     $("#proThird").hide();
     $("#proFourth").hide();
     $("#zjWorker").hide();
     $("#addRemark").hide();
     $("#refundRecord").hide();
     $("#filling2").hide();
     // $("#unitPrice").hide();
     $("#waitOrder").hide();
     $("#multiple").hide();
     $("#orderPrice").hide();
     $("#orderDiscount").hide();
     $("#orderActual").hide();
     $("#acceptTime").hide();
     $("#payTime").hide();
     $("#finishTime").hide();
     $("#btnLeft").hide();
     $("#cancelTime").hide();

     $("#servicePrice").css("marginBottom","4px");
     $("#status").css("paddingTop","90px");
     $("#orderTime").css("marginBottom","0px");
     // $("#servicePrice").css("marginBottom","4px"); 

    $("#btnRight").on("click",function(){
      $("#deleteOrder").css("display","block");
      $("#deleteBtn").on("click",function(){
        $("#deleteOrder").hide();
        removeOrder(token,orderId);
        window.location.href="../my-order/my-order-new.html?flag=1";
      })
    })
    }
    if(orderIsGeted != null){
      console.log('取消订单，工人已经接单');
      $("#orderStatus").css("background-image","url(../../images/order-detail/canceled.png)");

      $("#status").text('订单已取消');
      $("#explanation").text('工人已经接单啦，下次体谅下工人哦');
      $("#tabFirst").text('订单已提交');
      $("#tabSecond").text('工人已接单');
      $("#tabThird").text('订单已取消');
      $("#btnRight").text('删除订单');

      $("#roundFirst").addClass("round-undone");
      $("#roundSecond").addClass("round-undone");
      $("#roundThird").addClass("round-undone");
      $("#btnRight").addClass("delete-btn");
      $("#toBePaid").addClass("actual");

      // $(".round").css("left","60px");

      // $("#proThird").hide();
      $("#proFourth").hide();
      $("#zjWorker").hide();
      $("#addRemark").hide();
      $("#refundRecord").hide();
      $("#filling2").hide();
      // $("#unitPrice").hide();
      // $("#multiple").hide();
      $("#orderPrice").hide();
      $("#orderDiscount").hide();
      $("#orderActual").hide();
      $("#acceptTime").hide();
      $("#payTime").hide();
      $("#finishTime").hide();
      $("#btnLeft").hide();
      $("#specialPrice").hide();

      $("#status").css("paddingTop","90px");
      $("#cancelTime").css("marginBottom","0px");
      // $("#orderTime").css("marginBottom","4px");
      $("#waitOrder").css("marginBottom","0px"); 

      $("#btnRight").on("click",function(){
        $("#deleteOrder").css("display","block");
        $("#deleteBtn").on("click",function(){
          removeOrder(token,orderId);
          // location.reload();
          $("#deleteOrder").hide();
          window.location.href="../my-order/my-order-new.html?flag=1";
        })
      })
    };

    break;

    /*--退款状态--*/
    if(refundIsFinshed == "1"){
      console.log("退款中");
      $("#orderStatus").css("background-image","url(../../images/order-detail/refund.png)");
      $("#status").text('退款中');
      $("#explanation").text('系统将于72小时内退款');
      $("#tabFirst").text('订单已提交');
      $("#tabSecond").text('工人已接单');
      $("#tabThird").text('退款中');
      $("#tabFourth").text('退款成功');
      $("#refundStatus").text('退款中');

      $("#tabThird").addClass("processing");
      $("#roundFirst").addClass("round-complete");
      $("#roundSecond").addClass("round-complete");
      $("#roundThird").addClass("round-processing");
      $("#roundFourth").addClass("round-undone");

      $("#optionFooter").hide();
      $("#filling3").hide();
      $("#negotiable").hide();
      $("#cancelTime").hide();


    }
    if(refundIsFinshed == "2"){
      console.log("退款完成");

      $("#status").text('订单已取消');
      $("#explanation").text('');
      $("#tabFirst").text('订单已提交');
      $("#tabSecond").text('工人已接单');
      $("#tabThird").text('退款成功');
      $("#tabFourth").text('订单已取消');
      $("#refundStatus").text('退款完成');
      $("#btnRight").text('删除订单');

      // $("#tabThird").addClass("processing");
      $("#roundFirst").addClass("round-undone");
      $("#roundSecond").addClass("round-undone");
      $("#roundThird").addClass("round-undone");
      $("#roundFourth").addClass("round-undone");
      $("#btnRight").addClass("delete-btn");
      $("#btnRight").on("click",function(){
        $("#deleteOrder").css("display","block");
        $("#deleteBtn").on("click",function(){
          removeOrder(token,orderId);
          location.reload();
          $("#deleteOrder").hide();
          window.location.href="../my-order/my-order-new.html?flag=1";
        })
      })
    }
  }

  function removeOrder(token,orderId){
    console.log("删除订单");
    $.ajax({
      type:"POST",
      url:"http://192.168.1.191:3003/api/v2/OrderInfo/RemoveOrderEx",
      data:{
        Token:token,
        OrderId:orderId
      },
      success:function(data){
        console.log(data);
      }
    })
  }

      /*--添加备注--*/
/*--
  $("#addRemark").click(function(){
    console.log("显示弹窗");
    $("#userMemo").show();
  });
  $("#confirmBtn").click(function(){
    var memoText = $("#memoText").val();
    console.log(memoText);
    if(memoText != ""){
      memo();
    }else{
      console.log("不提交");
    }
  })
  $("#cancelBtn,#confirmBtn").click(function(){
    $("#userMemo").hide();
  });
  // $("#addRemark").on("click",function(){
  //   console.log("显示弹窗");
  //   $("#userMemo").show();
  // })
  function memo(){
    console.log("补充备注");
    $.ajax({

    })
  }
  --*/
  function updateOrder(token,orderId){
    console.log("更新订单");
    $.ajax({
        type:"POST",
        url:"http://192.168.1.191:3003/api/v2/OrderInfo/CancelOrderEx",
        data:{
          Token:token,
          OrderId:orderId
        },
        success:function(data){
          console.log("更新订单成功");
        }     
    })
  }
  function cancelOrder(token,orderId){
    console.log("取消订单");
    $.ajax({
        method:"POST",
        url:"http://192.168.1.191:3003/api/v2/OrderInfo/CancelOrderEx",
        data:{
          Token:token,
          OrderId:orderId
        },
        success:function(data){
          console.log(data);
        }     
    })
  }
  function confirmOrder(token,orderId){
    console.log("确认订单");
    $.ajax({
      type:"POST",
      url:"http://192.168.1.191:3003/api/v2/OrderInfo/CompleteOrderEx",
      data:{
        Token:token,
        OrderId:orderId
      },
      success:function(data){
        console.log(data);
      }
    })
  } 
  function completeOrder(token,orderId){
    console.log("完成订单");
    $.ajax({
      type:"POST",
      url:"http://192.168.1.191:3003/api/v2/OrderInfo/CompleteOrderEx",
      data:{
        Token:token,
        OrderId:orderId
      },
      success:function(data){
        console.log(data);
      }
    })
  }
  $("#toProviderDetail").on("click",function(){
    console.log('跳转到对应页面');
    window.location.href="";
  });

});