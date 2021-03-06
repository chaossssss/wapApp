$(function(){
  var $contactWorker = $("#contactWorker");
  var $workerPhone = $("#workerPhone");
  var $cancelBtn = $("#cancelBtn");
  $("#addRemark").on("click",function(){
    window.location.href="order-remarks.html?orderId=" + orderId;
  })
  $("#refreshBtn").on("click",function(){
    location.reload();
  })
  $("#backhomeBtn").on("click",function(){
    window.location.href="../my-order/my-order-new.html?flag=1";
  })
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
  function ShowDiv(show_div,bg_div){
    document.getElementById(show_div).style.display='block';
    document.getElementById(bg_div).style.display='block' ;
    var bgdiv = document.getElementById(bg_div);
    bgdiv.style.width = document.body.scrollWidth; 
    // bgdiv.style.height = $(document).height();
    $("#"+bg_div).height($(document).height());
  };

  //关闭弹出层
  function CloseDiv(show_div,bg_div)
  {
    $('#'+show_div).hide();
    $('#'+bg_div).hide();
  };
  var orderId = getQueryString("orderId");
  console.log(orderId);
  var token = window.localStorage.getItem("Token");
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
    url: CONFIG.IP+"api/v2/OrderInfo/GetOrderInfoEx",
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

      orderIsGeted = data.Body.AcceptTime;

      var orderId = data.Body.OrderId;
      isEvaluated = data.Body.IsEvaluation;
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
      tp = data.Body.TotalPrice;
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
          var imgs_res='<div class="swiper-slide"><img src="'+picData[i].SmallPIc+'" class="swiper-img" alt=""></div>';
          $("#showPics").append(html);
        }
      }
      /*--图片弹出滑动开始--*/
      var swiper = new Swiper('.swiper-container', {
        //pagination: '.swiper-pagination',
        initialSlide :0,
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 0,
        touchRatio:1,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true//修改swiper的父元素时，自动初始化swiper
      });
      $(".zj-show-pic").click(function(){
        ShowDiv('MyDiv','fade');
      });
      $(".black_overlay").click(function(){
        CloseDiv('MyDiv','fade');
      });
      /*--图片弹出滑动结束--*/
      var notesNum = data.Body.Service.Content;
      var noteList = "<li>" + notesNum + "</li>";
      $("#remarkLists").append(noteList);
      var unitName = unitSymbole(data.Body.UnitName);
      $("#unit").text(unitName);
      noSinglePrice = data.Body.Price;
      singlePrice = moneySymbol(data.Body.Price);
      $("#single").text(singlePrice);
      total = data.Body.Total;
      var q = multipleSymbol(data.Body.Total);
      $("#quantity").text(q);

      $("#serviceName").text(data.Body.Service.ServiceName);
      $("#clientName").text(data.Body.Service.ServiceProviderName);
      $("#serviceAddress").text(data.Body.Service.AddressInfo.Address1);
      if(data.Body.PayOffTime != null){
        var payOffTime = getDatetime(data.Body.PayOffTime);
        $("#payOffTime").text(payOffTime);
        payOffTimeElement = '<p class="weui_media_desc zj-fontsize order-time">付款时间:<span>' + payOffTime + '</span></p>';
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
          var refundAt = getDatetime(data.Body.Refunds[i].RefundTime);
          $("#refundAt").text(refundAt);
          $("#lostIncome").text(data.Body.Refunds[i].LostIncome);
          $("#refundAmount").text("￥" + data.Body.Refunds[i].RefundAmount);
          refundIsFinshed = data.Body.Refunds[i].Status;
          if(data.Body.Refunds[i].CouponAmount){
            $("#refundDiscount").text(data.Body.Refunds[i].CouponAmount);
          }else{
            $("#refundDisc").hide();
          }
        }
      }
      if(data.Body.Refunds.RefundAt != null){
        var refundAt = new Date(data.Body.Refunds.RefundAt);
        $("#refundAt").text(refundAt.Format("yyyy-MM-dd hh:mm"));
      }
      refundAmount = data.Body.Refunds.RefundAmount;
      $("#refundAmount").text(refundAmount);
      refundAmountToBePaid = data.Body.Refunds.RefundAmountToBePaid;
      $("#actualRefundMoney").text("￥" + refundAmountToBePaid);
      couponAmount = data.Body.Refunds.CouponAmount;
      $("#refundDiscount").text(couponAmount);
      
      lostIncome = data.Body.Refunds.LostIncome;
      isNegotiable = data.Body.IsNegotiable;
      startingPrice = data.Body.StartingPrice;
      $("#toBePaid").text(totalPrice);
      // if( data.Body.DiscountAmount != null || data.Body.Activity.SpecialRule != null){
      //   var toBePaid = data.Body.TotalPrice - data.Body.DiscountAmount - data.Body.Activity;
      //   $("#toBePaid").text(toBePaid);
      // }
      if(totalPrice == null){
        $("toBePaid").hide();
      }


      if(data.Body.DiscountAmount == ""){
        $("#orderDiscount").hide();
      }
      var serviceProviderPhone = "tel:" + data.Body.ServiceProviderPhone;
      // $("#serviceProviderPhone").attr("href",serviceProviderPhone);
      if(data.Body.ServiceProviderPhone == ""){
        $contactWorker.on('click',function(){
          $workerPhone.css('display','block');
        });
      }else{
        $("#contactWorker").on("click",function(){
          $("#callWorkerPhone").show();
          $("#workerPhoneNum").text(data.Body.ServiceProviderPhone);
          $("#callWorker").attr("href",serviceProviderPhone);
        })
        $("#cancelCallBtn").on("click",function(){
          $("#callWorkerPhone").hide();
        })
        $("#callWorker").on("click",function(){
          $("#callWorkerPhone").hide();
        })
      }
      if(data.Body.Service.Content == ""){
        $("#zjRemarks").hide();
        $("#remarkLists").hide();
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
      activity = data.Body.Activity;
      // activitySpecial = data.Body.Activity.SpecialTitle;
      if(data.Body.Activity){
        specialTitle = data.Body.Activity.SpecialTitle;
        $("#specialTitle").text(specialTitle);
        // $("#hourly").text("-￥" + activity);
        rules = data.Body.Activity.SpecialRule;
        if(rules){
          rulesNum = data.Body.Activity.SpecialRule.length;
          if(rulesNum == 0){
            $("#specialPrice").hide();
            $("#waitOrder").hide();
          }
        }
        if(rules == null){
          $("#specialPrice").hide();
          $("#waitOrder").hide();
        }
        if(data.Body.Activity.SpecialRule == null){
          $("#specialPrice").hide();
        }
        for(var i =0; i < rulesNum; i++){
          if(minPrice*total >= rules[i].Upper){
            var hourly = rules[i].Minus;
            $("#hourly").text("-￥" + hourly);
            minPriceNum = parseFloat(minPrice);
            maxPriceNum = parseFloat(maxPrice);
            totalNum = parseFloat(total);
            hourlyNum = parseFloat(hourly);
            minTotal = minPriceNum*totalNum-hourlyNum;
            maxTotal = maxPriceNum*totalNum-hourlyNum;
            var toBePaid = "￥" + minTotal + "-" + maxTotal;
            $("#toBePaid").text(toBePaid);
            $("#toBePaid").addClass("actual");
          }
          tpParse = parseFloat(tp);
          upperParse = parseFloat(rules[i].Upper);
          if(tpParse >= upperParse){
            var hourly = rules[i].Minus;
            $("#hourly").text("-￥" + hourly);
            var toBePaid = parseFloat(tp) - hourly;
            $("#toBePaid").text("￥" + toBePaid);
            $("#toBePaid").addClass("actual");
            tpNum = parseFloat(tp);
            hourlyNum = parseFloat(hourly);
            actualMoney = tpNum - hourlyNum;
            $("#actualMoney").text("￥" + actualMoney);
          }
        }
      }
      if(activity == null){
        $("#specialPrice").hide();
      }
     }
   });

console.log(orderState);
  switch(orderState){
    case "1":
    console.log("待接单");
    $("#orderStatus").css("background-image","url(../../images/order-detail/order-success.png)");
    $("#statusBg").css("background-image","url(../../images/order-detail/ordernew-commit.png)");
    $("#status").text('订单提交成功');
    $("#explanation").text('请耐心等待客服为您安排工人，并确定服务价格');
    $("#tabFirst").text('订单已提交');
    $("#tabSecond").text('待工人接单');
    $("#tabThird").text('待付款');
    $("#tabFourth").text('待服务');
    $("#btnLeft").text('取消订单');
    $("#btnRight").text('支付');

    $("#explanation").css("width","256px");

    $("#tabSecond").addClass("processing");
    $("#roundFirst").addClass("round-complete");
    $("#roundSecond").addClass("round-processing");
    $("#roundThird").addClass("round-undone");
    $("#roundFourth").addClass("round-undone");
    $("#btnLeft").addClass("delete-btn");
    $("#btnRight").addClass("pay-btn");
    
    $("#zjWorker").hide();
    $("#orderPrice").hide();
    // $("#orderDiscount").hide();
    $("#orderActual").hide();
    // $("#unitPrice").hide();
    // $("#multiple").hide();
    $("#refundRecord").hide();
    $("#filling2").hide();
    $("#acceptTime").hide();
    $("#payTime").hide();
    $("#cancelTime").hide();
    // $("#specialPrice").hide();
    $("#finishTime").hide();
    // $("#orderTime").css("marginBottom","0px");
    // $("#servicePrice").css("marginBottom","4px");
    // if(singlePrice == '面议'){
    //   $("#unit").hide();
    //   $("#multiple").hide();
    //   $("#waitOrder").hide();
    //   $("#servicePrice").css("marginBottom","4px");
    //   $("#specialPrice").hide();
    // }
    
    if(noSinglePrice == null){
      var single = "￥" + minPrice + "-" + maxPrice;
      $("#single").text(single);
      var price = "￥" + minPrice*total + "-" + maxPrice*total; 
      $("#orderPrice").show();
      $("#price").text(price);
      $("#price").addClass("actual");
      $("#servicePrice").css("marginBottom","12px");
      // $("#orderPrice").css("marginBottom","4px");
      $("#waitOrder").hide();
      $("#finishTime").hide();
      // if(activity != null){
      //   $("#orderPrice").css("marginBottom","12px");
      // }
    }
    if(activity != null){
      $("#orderPrice").css("marginBottom","12px");
    }
    if(activity == null){
      $("#specialPrice").hide();
    }

    // $("#btnLeft").on("click",function(){
    //   $("#cancelOrder1").css("display","block");
    //   $("#cancelOrderBtn").on("click",function(){
    //     cancelOrder(token,orderId);
    //     $("#cancelOrder1").hide();
    //     // location.reload();
    //   })
    // });

    if(isNegotiable == "0"){
      $("#orderPrice").show();
      $("#statusBg").css("background-image","url(../../images/order-detail/newpay-check.png)");
      $("#btnRight").on("click",function(){
        // window.location.href="../pay/pay.html?orderId=" + orderId;
        //判断是不是微信浏览器
        if(/(micromessenger)/i.test(navigator.userAgent)){
          window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2ftemplate%2fpay%2fpay.html&response_type=code&scope=snsapi_base&state="+orderId+"#wechat_redirect";
        }else{
          window.location.href="../pay/pay.html?state=" + orderId;
        }
       
      })
    }
    if(isNegotiable == '1'){
      $("#statusBg").css("background-image","url(../../images/order-detail/ordernew-success.png)");
      $("#single").text("￥" + startingPrice);
      $("#single").addClass("actual");
      $("#orderPrice").hide();
      $("#unit").text("起");
      $("#multiple").hide();
      $("#waitOrder").hide();
      $("#specialPrice").hide();
      $("#btnRight").on("click",function(){
        $("#pay-box").css("display","block");
      });
      $("#know").on("click",function(){
        $("#pay-box").hide();
      })
    }
    if(isPayOff == "0"){
      $("#btnLeft").on("click",function(){
        $("#cancelOrder1").css("display","block");
        $("#cancelOrderBtn").on("click",function(){
          cancelOrder(token,orderId);
          $("#cancelOrder1").hide();
        })
      });
    }
    if(isPayOff == "1"){
      $("#btnRight").hide();
      $("#waitOrder").hide();
      $("#orderActual").show();
      $("#payTime").show();
      $("#statusBg").css("background-image","url(../../images/order-detail/newpay-success.png)");
      $("#btnLeft").on("click",function(){
        $("#cancelOrder1").css("display","block");
        $("#cancelOrderBtn").on("click",function(){
          cancelOrder(token,orderId);
          $("#cancelOrder1").hide();
        })
      })
    }
    break;
    case "10":
    console.log("待接单");
    $("#orderStatus").css("background-image","url(../../images/order-detail/order-success.png)");
    
    $("#status").text('订单提交成功');
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
    // $("#waitOrder").css("marginBottom","4px");

    $("#tabSecond").addClass("processing");
    $("#roundFirst").addClass("round-complete");
    $("#roundSecond").addClass("round-processing");
    $("#roundThird").addClass("round-undone");
    $("#roundFourth").addClass("round-undone");
    $("#btnLeft").addClass("delete-btn");
    $("#btnRight").addClass("pay-btn");
    // $("#price").addClass("actual");

    // $("#orderPrice").hide();
    // $("#orderDiscount").hide();
    $("#orderActual").hide();
    $("#refundRecord").hide();
    $("#filling2").hide();
    $("#acceptTime").hide();
    $("#payTime").hide();
    $("#cancelTime").hide();
    // $("#specialPrice").hide();
    // $("#waitOrder").hide();
    $("#finishTime").hide();
    if(serviceProviderId == null){
      $("#zjWorker").hide();
    }
    // if(singlePrice == '面议'){
    //   $("#servicePrice").css("marginBottom","0px");
    //   $("#multiple").hide();
    //   $("#unit").hide();
    //   $("#orderPrice").hide();
    //   $("#waitOrder").hide();
    //   $("#specialPrice").hide();
    // }

    if(noSinglePrice == null){
      $("#orderPrice").hide();
      $("#waitOrder").hide();
      var single = "￥" + minPrice + "-" + maxPrice;
      $("#single").text(single);
      var price = "￥" + minPrice*total + "-" + maxPrice*total; 
      $("#orderPrice").show();
      $("#price").text(price);
      // $("#price").addClass("actual");
      $("#specialPrice").hide();
      $("#waitOrder").hide();
    }
    // $("#waitOrder").css("marginBottom","4px");
    // $("#orderPrice").css("marginBottom","0px");
    $("#orderTime").css("marginBottom","0px");
    // $("#servicePrice").css("marginBottom","4px");
    if(totalPrice == '面议'){
      $("#servicePrice").css("marginBottom","0px");
      $("#specialPrice").hide();
    }
    if(isNegotiable == "0"){
      $("#price").removeClass("actual");
      $("#toBePaid").addClass("actual");
      $("#statusBg").css("background-image","url(../../images/order-detail/newpay-check.png)");
      $("#btnRight").on("click",function(){
        // window.location.href="../pay/pay.html?orderId=" + orderId;
        //判断是不是微信浏览器
        if(/(micromessenger)/i.test(navigator.userAgent)){
          window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2ftemplate%2fpay%2fpay.html&response_type=code&scope=snsapi_base&state="+orderId+"#wechat_redirect";
        }else{
          window.location.href="../pay/pay.html?state=" + orderId;
        }
      })
    }
    if(isNegotiable == "1"){
      if(tp == null){
        $("#statusBg").css("background-image","url(../../images/order-detail/ordernew-success2.png)");
        $("#single").text("￥" + startingPrice);
        $("#single").addClass("actual");
        $("#price").hide();
        $("#multiple").hide();
        $("#orderPrice").hide();
        $("#unit").text("起");
        $("#waitOrder").hide();
        $("#specialPrice").hide();
        $("#btnRight").on("click",function(){
          $("#pay-box").show();
          $("#know").on("click",function(){
            $("#pay-box").hide();
          })
        })
      }
      if(startingPrice == null){
        $("#statusBg").css("background-image","url(../../images/order-detail/neworders_added.png)");
        // $("#servicePrice").hide();
        $("#toBePaid").addClass("actual");
        $("#btnRight").on("click",function(){
          // window.location.href="../pay/pay.html?orderId=" + orderId;
          
            //判断是不是微信浏览器
          if(/(micromessenger)/i.test(navigator.userAgent)){
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2ftemplate%2fpay%2fpay.html&response_type=code&scope=snsapi_base&state="+orderId+"#wechat_redirect";
          }else{
            window.location.href="../pay/pay.html?state=" + orderId;
          }
        })
      }
    }
    if(isPayOff == "0"){
      $("#btnLeft").on("click",function(){
        $("#cancelOrder1").css("display","block");
        $("#cancelOrderBtn").on("click",function(){
          cancelOrder(token,orderId);
          $("#cancelOrder1").hide();
          location.reload();
        })
      });
    }
    if(isPayOff == "1"){
      $("#statusBg").css("background-image","url(../../images/order-detail/newpay-success.png)");
      $("#btnRight").hide();
      $("#price").removeClass("actual");
      $("#waitOrder").hide();
      $("#payTime").show();
      $("#orderActual").show();
      $("#btnLeft").on("click",function(){
        $("#cancelOrder1").css("display","block");
        $("#cancelOrderBtn").on("click",function(){
          cancelOrder(token,orderId);
          $("#cancelOrder1").hide();
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
      $("#statusBg").css("background-image","url(../../images/order-detail/neworders_added.png)");
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
      // $("#total").addClass("actual");
      $("#btnLeft").addClass("delete-btn")
      $("#btnRight").addClass("pay-btn");

      // $("#orderDiscount").hide();
      $("#orderActual").hide();
      $("#refundRecord").hide();
      $("#filling2").hide();
      $("#negotiable").hide();
      $("#cancelTime").hide();
      $("#finishTime").hide();
      $("#payTime").hide();
      if(activity == null){
        $("#waitOrder").hide();
        $("#price").addClass("actual");
      }
      if(specialTitle == null){
        $("#waitOrder").hide();
        $("#price").addClass("actual");
      }
      // $("#specialPrice").hide();
      // $("#waitOrder").hide();
      // $("#orderPrice").css("marginBottom","4px");
      $("#acceptTime").css("marginBottom","0px");
      // $("#btnRight").css("left","181px");
      // if(rulesNum == 0){
      //   $("#price").addClass("actual");
      // }
      $("#btnLeft").on("click",function(){
        $("#cancelOrder2").css("display","block");
        $("#contactWorkerBtn").on("click",function(){
          cancelOrder(token,orderId);
          $("#cancelOrder2").hide();
        })
      })
      if(isNegotiable == '0'){
        $("#price").removeClass("actual");
        $("#toBePaid").addClass("actual");

        $("#waitOrder").show();
        $("#btnRight").on("click",function(){
          // window.location.href="../pay/pay.html?orderId=" + orderId;
         //判断是不是微信浏览器
        if(/(micromessenger)/i.test(navigator.userAgent)){
          window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2ftemplate%2fpay%2fpay.html&response_type=code&scope=snsapi_base&state="+orderId+"#wechat_redirect";
        }else{
          window.location.href="../pay/pay.html?state=" + orderId;
        }
        })
      }
      if(isNegotiable == '1'){
        if(tp == null){
          $("#statusBg").css("background-image","url(../../images/order-detail/get-ordernew.png)");
          $("#single").text("￥" + startingPrice);
          $("#single").addClass("actual");
          $("#price").removeClass("actual");
          $("#toBePaid").addClass("actual");
          $("#price").text("请与工人协商，并确定价格");
          $("#unit").text("起");
          $("#multiple").hide();
          $("#waitOrder").hide();
          $("#specialPrice").hide();
          $("#btnRight").on("click",function(){
            $("#pay-box").show();
            $("#know").on("click",function(){
              $("#pay-box").hide();
            })
          })
        }
        if(startingPrice == null){
          $("#waitOrder").show();
          $("#price").removeClass("actual");
          $("#statusBg").css("background-image","url(../../images/order-detail/neworders_added.png)");
          $("#servicePrice").hide();
          $("#toBePaid").addClass("actual");
          $("#btnRight").on("click",function(){
            // window.location.href="../pay/pay.html?orderId=" + orderId;
            //判断是不是微信浏览器
        //判断是不是微信浏览器
        if(/(micromessenger)/i.test(navigator.userAgent)){
          window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2ftemplate%2fpay%2fpay.html&response_type=code&scope=snsapi_base&state="+orderId+"#wechat_redirect";
        }else{
          window.location.href="../pay/pay.html?state=" + orderId;
        }
          })
        }
      }
    }

    if(isPayOff == "1"){
      $("#orderStatus").css("background-image","url(../../images/order-detail/worker-uncomfirm.png)");
      $("#statusBg").css("background-image","url(../../images/order-detail/newworker-uncomfirm.png)");
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

      $("#waitOrder").hide();
      $("#orderActual").show();
      $("#refundRecord").hide();
      $("#filling2").hide();
      $("#negotiable").hide();
      $("#btnLeft").hide();
      $("#cancelTime").hide();
      $("#finishTime").hide();
      $("#waitOrder").hide();
      if(isNegotiable == "0"){
        $("#payTime").hide();
        $("#acceptTime").before(payOffTimeElement);
      }
      if(isNegotiable == "1"){
        $("#statusBg").css("background-image","url(../../images/order-detail/newworker-uncomfirms.png)");
      }
      if(activity == null){
        $("#waitOrder").hide();
        // $("#orderPrice").css("marginBottom","4px");
      }
      $("#btnRight").on("click",function(){
        $("#cancelOrder1").css("display","block");
        $("#cancelOrderBtn").on("click",function(){
          cancelOrder(token,orderId);
          $("#cancelOrder1").hide();
        })
      })
    }

    if(payLock == "1"){
      console.log("付款中");
      $("#orderStatus").css("background-image","url(../../images/order-detail/paying.png)");
      $("#statusBg").css("background-image","url(../../images/order-detail/newpaying.png)");
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
      // $("#specialPrice").hide();

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
    $("#statusBg").css("background-image","url(../../images/order-detail/newawaiting-assessment.png)");
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
    // $("#orderActual").css("marginBottom","0px");
    $("#refundRecord").hide();
    $("#filling2").hide();
    $("#negotiable").hide();
    $("#btnLeft").hide();
    $("#cancelTime").hide();
    // $("#specialPrice").hide();
    $("#waitOrder").hide();
    if(isNegotiable == "0"){
      $("#payTime").hide();
      $("#acceptTime").before(payOffTimeElement);
    }
    $("#btnRight").on("click",function(){
      completeOrder(token,orderId);
      // location.reload();
    })

    break;

    case "40":
    console.log("客户确认完成，待评价");

    if(isEvaluated == "0"){

      $("#orderStatus").css("background-image","url(../../images/order-detail/awaiting-assessment.png)");
      $("#statusBg").css("background-image","url(../../images/order-detail/neworders_evaluate.png)");
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
      // $("#orderActual").css("marginBottom","0px");
      // $(".round").css("left","58px");  

      $("#proFourth").hide();
      $("#refundRecord").hide();
      $("#filling2").hide();
      $("#negotiable").hide();
      $("#btnLeft").hide();
      $("#cancelTime").hide();
      // $("#specialPrice").hide();
      $("#waitOrder").hide();

      $("#btnRight").on("click",function(){
        window.location.href="order-evaluate.html?orderId=" + orderId + "&type=" + (serviceProviderType-1) + "&markid=" + serviceProviderId;
      })
    }

    if(isEvaluated == "1"){
      $("#orderStatus").css("background-image","url(../../images/order-detail/awaiting-assessment.png)");
      $("#statusBg").css("background-image","url(../../images/order-detail/neworders_over.png)");
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
      // $("#orderActual").css("marginBottom","0px");

      $("#proFourth").hide();
      $("#refundRecord").hide();
      $("#filling2").hide();
      $("#negotiable").hide();
      $("#btnLeft").hide();
      $("#cancelTime").hide();
      // $("#specialPrice").hide();
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
     $("#statusBg").css("background-image","url(../../images/order-detail/orders_cancel1.png)");
     $("#status").text('订单已取消');
     $("#explanation").text('');
     $("#tabFirst").text('订单已提交');
     $("#tabSecond").text('订单已取消');
     $("#btnRight").text('删除订单');

     $("#roundFirst").addClass("round-undone");
     $("#roundSecond").addClass("round-undone");
     $("#btnRight").addClass("delete-btn");
     $("#price").addClass("actual");
     // $(".round").css("left","89px");

     $("#proThird").hide();
     $("#proFourth").hide();
     // $("#zjWorker").hide();
     $("#addRemark").hide();
     $("#refundRecord").hide();
     $("#filling2").hide();
     $("#waitOrder").hide();
     // $("#orderDiscount").hide();
     $("#orderActual").hide();
     $("#acceptTime").hide();
     $("#payTime").hide();
     $("#finishTime").hide();
     $("#btnLeft").hide();
     $("#specialPrice").hide();
     // $("#cancelTime").hide();
     if(noSinglePrice == null){
       var single = "￥" + minPrice + "-" + maxPrice;
       $("#single").text(single);
       var price = "￥" + minPrice*total + "-" + maxPrice*total; 
       $("#orderPrice").show();
       $("#price").text(price);
       
       $("#servicePrice").css("marginBottom","12px");
       $("#orderPrice").css("marginBottom","4px");
     }
     if(isNegotiable == '1'){
      if(tp == null){
        $("#single").text("￥" + startingPrice);
        $("#single").addClass("actual");
        $("#price").hide();
        $("#unit").text("起");
        $("#multiple").hide();
        $("#waitOrder").hide();
        $("#orderPrice").hide();
        $("#specialPrice").hide();
      }
       if(startingPrice == null){
        $("#servicePrice").hide();
        $("#orderPrice").show();
       }
     }
     $("#status").css("paddingTop","90px");
     $("#cancelTime").css("marginBottom","0px");
    $("#btnRight").on("click",function(){
      $("#deleteOrder").show();
      $("#deleteBtn").on("click",function(){
        $("#deleteOrder").hide();
        removeOrder(token,orderId);
        window.location.href="../my-order/my-order-new.html?flag=1";
      })
    })
    if(refundIsFinshed == "1"){
      $("#refundRecord").show();
      $("#filling2").show();
      $("#refundStatus").text('退款中');
      if(isNegotiable == '0'){
        $("#payTime").hide();
        $("#acceptTime").before(payOffTimeElement);
        $("#statusBg").css("background-image","url(../../images/order-detail/orders_cancel6.png)");
     }
    }
    if(refundIsFinshed == "2"){
      $("#refundStatus").text('退款完成');
      $("#statusBg").css("background-image","url(../../images/order-detail/orders_cancel5.png)");
    }

    }
    if(orderIsGeted != null){
      console.log('取消订单，工人已经接单');
      $("#orderStatus").css("background-image","url(../../images/order-detail/canceled.png)");
      $("#statusBg").css("background-image","url(../../images/order-detail/orders_cancel2.png)");
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
      // $("#toBePaid").addClass("actual");

      // $(".round").css("left","60px");

      // $("#proThird").hide();
      $("#proFourth").hide();

      // $("#zjWorker").hide();
      $("#addRemark").hide();
      $("#filling2").hide();
      $("#servicePrice").hide();
      $("#waitOrder").hide();
      $("#orderActual").hide();
      $("#payTime").hide();
      $("#finishTime").hide();
      $("#btnLeft").hide();
      if(activity != null){
        $("#specialPrice").hide();
        $("#orderPrice").css("marginBottom","12px");
      }
      if(singlePrice == '面议'){
        $("#unit").hide();
        $("#multiple").hide();
        $("#waitOrder").hide();
        $("#servicePrice").css("marginBottom","4px");
      }
      if(isNegotiable == '0'){
        $("#refundRecord").show();
        $("#filling2").show();
        $("#servicePrice").show();
        $("#orderActual").show();
        $("#statusBg").css("background-image","url(../../images/order-detail/orders_cancel4.png)");
      }
      if(isNegotiable == '1'){
        if(startingPrice == null){
          $("#statusBg").css("background-image","url(../../images/order-detail/orders_cancel3.png)");
          $("#servicePrice").hide();
          $("#orderPrice").show();
          $("#price").addClass("actual");
        }
        if(tp == null){
          $("#statusBg").css("background-image","url(../../images/order-detail/orders_cancel3.png)");
          $("#single").text("￥" + startingPrice);
          $("#single").addClass("actual");
          $("#price").hide();
          $("#unit").text("起");
        }
        $("#zjWorker").show();
        $("#refundRecord").show();
        $("#filling2").show();
        $("#waitOrder").hide();
        $("#servicePrice").hide();
        $("#unit").hide();
        $("#multiple").hide();
        $("#waitOrder").hide();
        $("#price").addClass("actual");
      }
      $("#btnRight").on("click",function(){
        $("#deleteOrder").show();
        $("#deleteBtn").on("click",function(){
          removeOrder(token,orderId);
          // location.reload();
          $("#deleteOrder").hide();
          window.location.href="../my-order/my-order-new.html?flag=1";
        })
      })
      if(refundIsFinshed == "1"){
        $("#refundRecord").show();
        $("#filling2").show();
        $("#refundStatus").text('退款中');
        if(isNegotiable == '0'){
          $("#statusBg").css("background-image","url(../../images/order-detail/orders_cancel6.png)");
       }
      }
      if(refundIsFinshed == "2"){
        $("#refundStatus").text('退款完成');
        $("#statusBg").css("background-image","url(../../images/order-detail/orders_cancel5.png)");
      }
      $("#status").css("paddingTop","90px");
      $("#cancelTime").css("marginBottom","0px");
      // $("#orderTime").css("marginBottom","4px");
      // $("#waitOrder").css("marginBottom","0px"); 
    };

    break;

    /*--退款状态--*/
    // if(refundIsFinshed == "1"){
    //   if(orderIsGeted != null){
    //     console.log("退款中");
    //     $("#orderStatus").css("background-image","url(../../images/order-detail/refund.png)");
    //     $("#statusBg").css("background-image","url(../../images/order-detail/orders_cancel4.png)");
    //     $("#status").text('退款中');
    //     $("#explanation").text('系统将于72小时内退款');
    //     $("#tabFirst").text('订单已提交');
    //     $("#tabSecond").text('工人已接单');
    //     $("#tabThird").text('退款中');
    //     $("#tabFourth").text('退款成功');
    //     $("#refundStatus").text('退款中');

    //     $("#tabThird").addClass("processing");
    //     $("#roundFirst").addClass("round-complete");
    //     $("#roundSecond").addClass("round-complete");
    //     $("#roundThird").addClass("round-processing");
    //     $("#roundFourth").addClass("round-undone");

    //     $("#addRemark").hide();
    //     $("#optionFooter").hide();
    //     $("#filling3").hide();
    //     $("#negotiable").hide();
    //     $("#cancelTime").hide();
    //   }
    //   if(orderIsGeted == null){
    //     $("#statusBg").css("background-image","url(../../images/order-detail/orders_cancel6.png)");
    //   }
    // }
    // if(refundIsFinshed == "2"){
    //   console.log("退款完成");
    //   $("#statusBg").css("background-image","url(../../images/order-detail/orders_cancel5.png)");
    //   $("#status").text('订单已取消');
    //   $("#explanation").text('');
    //   $("#tabFirst").text('订单已提交');
    //   $("#tabSecond").text('工人已接单');
    //   $("#tabThird").text('退款成功');
    //   $("#tabFourth").text('订单已取消');
    //   $("#refundStatus").text('退款完成');
    //   $("#btnRight").text('删除订单');

    //   $("#roundFirst").addClass("round-undone");
    //   $("#roundSecond").addClass("round-undone");
    //   $("#roundThird").addClass("round-undone");
    //   $("#roundFourth").addClass("round-undone");
    //   $("#btnRight").addClass("delete-btn");

    //   $("#addRemark").hide();
    //   $("#btnRight").on("click",function(){
    //     $("#deleteOrder").css("display","block");
    //     $("#deleteBtn").on("click",function(){
    //       removeOrder(token,orderId);
    //       location.reload();
    //       $("#deleteOrder").hide();
    //       window.location.href="../my-order/my-order-new.html?flag=1";
    //     })
    //   })
    // }
  }

  function removeOrder(token,orderId){
    console.log("删除订单");
    $.ajax({
      type:"POST",
      url: CONFIG.IP+"api/v2/OrderInfo/RemoveOrderEx",
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

  // $("#addRemark").click(function(){
  //   $("#userMemo").show();
  // });
  // $("#confirmBtn").click(function(){
  //   var memoText = $("#memoText").val();
  //   console.log(memoText);
  //   if(memoText != ""){
      
  //   }else{
  //     console.log("不提交");
  //   }
  // })
  // $("#cancelBtn,#confirmBtn").click(function(){
  //   $("#userMemo").hide();
  // });

  function updateOrder(token,orderId){
    console.log("更新订单");
    $.ajax({
        type:"POST",
        url: CONFIG.IP+"api/v2/OrderInfo/UpdateOrderEx",
        data:{
          Token:token,
          OrderId:orderId,
          Memo:""
        },
        success:function(data){
          console.log("更新订单成功");
          location.reload();
        }     
    })
  }
  function cancelOrder(token,orderId){
    console.log("取消订单");
    $.ajax({
        method:"POST",
        async:"flase",
        url: CONFIG.IP+"api/v2/OrderInfo/CancelOrderEx",
        data:{
          Token:token,
          OrderId:orderId
        },
        success:function(data){
          console.log(data);
          alert(data.Meta.ErrorMsg);
          // location.reload();
        }     
    })
  }
  function confirmOrder(token,orderId){
    console.log("确认订单");
    $.ajax({
      type:"POST",
      url: CONFIG.IP+"api/v2/OrderInfo/ConfirmOrderEx",
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
      async:"false",
      url: CONFIG.IP+"api/v2/OrderInfo/CompleteOrderEx",
      data:{
        Token:token,
        OrderId:orderId
      },
      success:function(data){
        console.log(data);
        location.reload();
      }
    })
  }
  $("#toProviderDetail").on("click",function(){
    console.log('跳转到对应页面');
    window.location.href="";
  });

});