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
  var thisOrderId = getQueryString("orderId");
  var token = $.cookie("Token");
  $cancelBtn.on('click',function(){
    $workerPhone.hide();
  });
  $("#cancelBtn2").click(function(){
    $("#cancelOrder2").hide();
  })
  $("#cancelBtn1").click(function(){
    $("#cancelOrder1").hide();
  })
  $("#deleteCancel").click(function(){
    $("#deleteOrder").hide();
  })
  $("#orderCancel").on("click",function(){
    $("#cancelOrder1").css("display","block");
    $("#cancelOrderBtn").click(function(){
      cancelOrder(token,orderId);
      $("#cancelOrder1").hide();
      location.reload();
    })
  })
  $("#orderDelete").on("click",function(){
    $("#deleteOrder").css("display","block");
    $("#deleteBtn").click(function(){
      deleteOrder(token,orderId);
      $("#deleteOrder").hide();
      location.reload();
    })
  })
  $("#contactWorkerBtn").on("click",function(){
    $("#cancelOrder2").css("display","block");
    $("#contactWorkerBtn").click(function(){
      $("#cancelOrder2").hide();
    })
  })
/*--订单详情--*/
  $.ajax({
    method:"POST",
    url:"http://192.168.1.191:3003/api/v2/OrderInfo/GetOrderInfoEx",
    async:false,
    data:{
    Token:'865077b7deb3082261d22bfc2765c5e0',
    OrderId:"2433d1cf-d665-e611-a80e-14dda950621b"
    },
    success:function(data){
      console.log(data);
      orderState = data.Body.OrderStatus;
      serviceId = data.Body.ServiceId;
      serviceProviderType = data.Body.ServiceProviderType;

      // picData = data.Body.OrderService.Pictures;
      // picLength = data.Body.OrderService.Pictures.length;
      // var gender = data.body[0].ServiceProviderGender;
      orderIsGeted = data.Body.ServiceProviderId;

      var orderId = data.Body.OrderId;
      isEvaluated = data.Body.IsEvaluated;

      $("#orderCode").text(data.Body.OrderCode);
      $("#createTime").text(data.Body.CreateTime);
      $("#acceptAt").text(data.Body.AcceptTime);
      $("#serviceAt").text(data.Body.ServiceStartAt);
      $("#finishAt").text(data.Body.FinishTime);
      $("#confirmAt").text(data.Body.ConfirmTime);
      $("#cancalAt").text(data.Body.CancelTime);
      // $("#clientName").text(data.Body.AddressInfo.Contact);
      
      console.log(data.Body.Service.ServiceName);
      $("#serviceName").text(data.Body.Service.ServiceName);
      $("#clientName").text(data.Body.Service.ServiceProviderName);
      $("#serviceAddress").text(data.Body.Service.AddressInfo.Address1);
      $("#payOffTime").text(data.Body.PayOffTime);
      $("#clinetPhone").text(data.Body.AddressInfo.PhoneNumber);
      $("#quantity").text(data.Service.Total);

      isPayOff = data.Body.IsPayOff;
      payLock = data.Body.PayLock;
      $("#price").text(data.Body.Price);
      $("#discountInfo").text(data.Body.DiscountAmount);
      var unitName = "/" + data.Body.UnitName;
      $("#unit").text(unitName);
      $("#single").text(data.Body.Price);
      $("#refundAt").text(data.Body.Refunds.RefundTime);
      $("#lostIncome").text(data.Body.Refunds.LostIncome);
      $("#refundAmount").text(data.Body.TotalPrice);
      $("#hourly").text(data.Body.Activity);
      var toBePaid = data.Body.TotalPrice - data.Body.Refunds.LostIncome - data.Body.Activity;
      $("#toBePaid").text(toBePaid);
      if(data.Body.Activity == ""){
        $("#specialPrice").hide();
      }
      // if(data.Body.Price == "面议"){
      //   $("ifNegotiable").text("面议");
      //   $("#multiple").hide();
      // }
      if(data.Body.AddressInfo.Gender == "0"){
        $("#clientGender").text("先生");
      }else if(data.Body.AddressInfo.Gender == "1"){
        $("#clientGender").text("女士");
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
      $("#actualMoney").text(data.Body.TotalPrice);

      if(data.Body.ServiceProviderType == "2"){
        console.log("工人");
        var workHeadPic = data.Body.ServiceProviderPic;
        var workName = data.Body.ServiceProviderName;
        var gender = data.Body.ServiceProviderGender;
        $("#serviceProviderName").text(workName);
        $("#providerHead").attr("src",workHeadPic);
        if(gender == "1"){
          $("#workerGender").text('阿姨');
        }else if(gender == "0"){
          $("#workerGender").text("师傅");
        }
      }
      if(data.Body.ServiceProviderType == "3"){
        console.log("商户");
        var busHeadPic = data.Body.Business.Photo;
        $("#providerHead").attr("src",busHeadPic);
      }

      var notesNum = data.Notes.length;
      for(i = 0; i < noteNum; i++){
        var noteList = "<li>" + data.Notes[i].content + "</li>";
        $("#remarkLists").append(noteList);
      }
      var picNum = data.Body.Service.Pictures.length;
      console.log(picNum);
      if(picNum == "0"){
        $("#pictureLine").hide();
      }else{
        for(i = 0; i < picLength; i++ ){
          console.log(picData[i].SmallPic);
          var html = "<li class=" + "'zj-show-pic'" + "style=" + "'background-image:url(" + picData[i].SmallPic + ")'>"
          + "</li>";
          $("#showPics").append(html);
        }
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

    $("#zjWorker").hide();
    $("#orderPrice").hide();
    $("#orderDiscount").hide();
    $("#orderActual").hide();
    $("#unitPrice").hide();
    $("#multiple").hide();
    $("#refundRecord").hide();
    $("#filling2").hide();
    $("#acceptTime").hide();
    $("#payTime").hide();
    $("#btnLeft").hide();
    $("#cancelTime").hide();
    $("#specialPrice").hide();
    $("#waitOrder").hide();

    $("#orderTime").css("marginBottom","4px");
    $("#servicePrice").css("marginBottom","4px");

    $("#btnRight").click(function(){
      $("#cancelOrder1").css("display","block");
      $("#cancelOrderBtn").click(function(){
        cancelOrder(token,orderId);
        $("#cancelOrder1").hide();
        location.reload();
      })
    });
    break;
    case "10":
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

    $("#zjWorker").hide();
    $("#orderPrice").hide();
    $("#orderDiscount").hide();
    $("#orderActual").hide();
    $("#unitPrice").hide();
    $("#multiple").hide();
    $("#refundRecord").hide();
    $("#filling2").hide();
    $("#acceptTime").hide();
    $("#payTime").hide();
    $("#btnLeft").hide();
    $("#cancelTime").hide();
    $("#specialPrice").hide();
    $("#waitOrder").hide();

    $("#orderTime").css("marginBottom","4px");
    $("#servicePrice").css("marginBottom","4px");

    $("#btnRight").click(function(){
      $("#cancelOrder1").css("display","block");
      $("#cancelOrderBtn").click(function(){
        cancelOrder(token,orderId);
        $("#cancelOrder1").hide();
        location.reload();
      })
    });

    if(orderIsGeted == ""){
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

     $(".round").css("left","89px");

     $("#proThird").hide();
     $("#proFourth").hide();
     $("#zjWorker").hide();
     $("#addRemark").hide();
     $("#refundRecord").hide();
     $("#filling2").hide();
     $("#unitPrice").hide();
     $("#multiple").hide();
     $("#orderPrice").hide();
     $("#orderDiscount").hide();
     $("#orderActual").hide();
     $("#acceptTime").hide();
     $("#payTime").hide();
     $("#finishTime").hide();
     $("#btnLeft").hide();
     $("#cancelTime").hide();

     $("#status").css("paddingTop","90px");
     $("#orderTime").css("marginBottom","4px");
     $("#servicePrice").css("marginBottom","4px"); 

    $("#btnRight").click(function(token,orderId){
      $("#deleteOrder").css("display","block");
      $("#deleteBtn").click(function(){
        $("#deleteOrder").hide();
        removeOrder(token,orderId);
        location.reload();
      })
    })
    }
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
      $("#explanation").text('请支付服务费用并等待工人上门服务您也可以在工人服务完成后再付款哦');
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
      // $("#specialPrice").hide();

      $("#orderPrice").css("marginBottom","0px");
      // $("#btnRight").css("left","181px");

      $("#btnLeft").click(function(){
        $("#cancelOrder1").css("display","block");
        $("#cancelOrderBtn").click(function(){
          cancelOrder(Token,OrderId);
          $("#cancelOrder1").hide();
          // UpdataOrder(Token,OrderId);
          location.reload();
        })
      })
      $("#btnRight").click(function(){
        window.location.href="http://localhost:8080/template/pay/pay.html?orderId" + orderId;
      })
    }
    // if(hasPaied == "1"){
    //   console.log("订单状态：付清");
    // }
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
      $("#payTime").hide();
      $("#finishTime").hide();
      $("#cancelTime").hide();
      $("#specialPrice").hide();

      $("#acceptTime").css("marginBottom","4px");

    }
    

    $("#orderStatus").css("background-image","url(../../images/order-detail/get-order.png)");

    $("#status").text('工人已接单');
    $("#explanation").text('请支付服务费用并等待工人上门服务您也可以在工人服务完成后再付款哦');
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
    // $("#total").addClass("actual");
    $("#wait").addClass("actual");
    $("#btnLeft").addClass("delete-btn")
    $("#btnRight").addClass("pay-btn");

    $("#orderDiscount").hide();
    $("#orderActual").hide();
    $("#refundRecord").hide();
    $("#filling2").hide();
    $("#negotiable").hide();
    $("#cancelTime").hide();
    $("#specialPrice").hide();

    $("#waitOrder").css("marginBottom","0px");
    // $("#btnRight").css("left","181px");

    $("#btnLeft").click(function(){
      $("#cancelOrder1").css("display","block");
      $("#cancelOrderBtn").click(function(){
        cancelOrder(Token,OrderId);
        $("#cancelOrder1").hide();
        // UpdataOrder(Token,OrderId);
        location.reload();
      })
    })
    $("#btnRight").click(function(){
      window.location.href="http://localhost:8080/template/pay/pay.html?orderId" + orderId;
    })
    break;

    case "30":
    console.log("已完成");
    $("#orderStatus").css("background-image","url(../../images/order-detail/awaiting-assessment.png)");

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

    var now = new Date().Format("yyyy-MM-dd hh:mm:ss");
    var confirmTime = (new Date(2016,8,13,14,09,58)).Format("yyyy-MM-dd hh:mm:ss");
    // var time = "2016/09/12 11:16:30";
    // var ftime = new Date(time).Format("yyyy-MM-dd hh:mm:ss");

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
    console.log(dataDiffText);
    console.log(now);
    console.log(confirmTime);
    // console.log(ftime);

    $("#status").text('工人已完成服务');
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

    $("#refundRecord").hide();
    $("#filling2").hide();
    $("#negotiable").hide();
    $("#btnLeft").hide();
    $("#cancelTime").hide();
    $("#specialPrice").hide();
    $("#waitOrder").hide();
    $("#btnRight").click(function(){
      confirmOrder(Token,OrderId,Memo);
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

      $(".round").css("left","58px");  

      $("#proFourth").hide();
      $("#refundRecord").hide();
      $("#filling2").hide();
      $("#negotiable").hide();
      $("#btnLeft").hide();
      $("#cancelTime").hide();
      $("#specialPrice").hide();
      $("#waitOrder").hide();

      $("#btnRight").click(function(){
        window.location.href="";
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

      $(".round").css("left","58px");  

      $("#proFourth").hide();
      $("#refundRecord").hide();
      $("#filling2").hide();
      $("#negotiable").hide();
      $("#btnLeft").hide();
      $("#cancelTime").hide();
      $("#specialPrice").hide();
      $("#waitOrder").hide();

      $("#btnRight").click(function(){
        $("#deleteOrder").css("display","block");
        $("#deleteBtn").click(function(){
          $("#deleteOrder").hide();
          removeOrder(token,orderId);
          location.reload();
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
    if(orderIsGeted!=""){
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

      $(".round").css("left","60px");

      // $("#proThird").hide();
      $("#proFourth").hide();
      $("#zjWorker").hide();
      $("#addRemark").hide();
      $("#refundRecord").hide();
      $("#filling2").hide();
      $("#unitPrice").hide();
      $("#multiple").hide();
      $("#orderPrice").hide();
      $("#orderDiscount").hide();
      $("#orderActual").hide();
      $("#acceptTime").hide();
      $("#payTime").hide();
      $("#finishTime").hide();
      $("#btnLeft").hide();
      $("#specialPrice").hide();

      $("#status").css("paddingTop","90px");
      // $("#orderTime").css("marginBottom","4px");
      $("#servicePrice").css("marginBottom","4px"); 

      $("#btnRight").click(function(){
        $("#deleteOrder").css("display","block");
        $("#deleteBtn").click(function(){
          removeOrder(token,orderId);
          location.reload();
          $("#deleteOrder").hide();
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
      $("#btnRight").click(function(){
        $("#deleteOrder").css("display","block");
        $("#deleteBtn").click(function(){
          removeOrder(token,orderId);
          location.reload();
          $("#deleteOrder").hide();
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
        console.log("删除订单成功");
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
        type:"POST",
        url:"http://192.168.1.191:3003/api/v2/OrderInfo/CancelOrderEx",
        data:{
          Token:token,
          OrderId:orderId
        },
        success:function(data){
          console.log("取消订单成功");
        }     
    })
  }
  function confirmOrder(token,orderId,memo){
    console.log("确认订单");
    $.ajax({
      type:"POST",
      url:"http://192.168.1.191:3003/api/v2/OrderInfo/CompleteOrderEx",
      data:{
        Token:token,
        OrderId:orderId,
        Memo:memo
      },
      success:function(data){
        console.log("确认订单成功");
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
        console.log("完成订单成功");
      }
    })
  }
  $("#toProviderDetail").on("click",function(){
    console.log('跳转到对应页面');
    window.location.href="";
  });

});