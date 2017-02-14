$(function(){
  //获取url参数
  function getvl(name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
  }
  var token = window.localStorage.getItem("Token");
  var urlIp = "http://wapapi.zhujiash.com/";
  // var urlIp = "http://192.168.1.191:3003/";
  var Type = getvl("type");
  var markId = getvl("markid");
  var tokenUrl = getvl("token");
  var couponId = '';
  var actualMoney = 0;
  var actualMoneyNum = '';
  var ServiceTypeId = getvl("ServiceTypeId");
  window.sessionStorage.setItem("couponId",couponId);
  // console.log(typeof(tokenUrl));

  window.sessionStorage.setItem("markId",markId);
  if(tokenUrl != ''){
    window.localStorage.setItem("Token",tokenUrl);
  }
  Array.prototype.min = function(){
    return Math.min.apply({},this);
  }
  Array.prototype.max = function(){
    return Math.max.apply({},this);
  }
  /*--   自己定义数据   --*/
  // var omp = {"type":1,"markId":1413};
  // var ompstr = JSON.stringify(omp);
  // var oMsg = encodeURI(ompstr);
  // var os = decodeURI(oMsg);
  // var ss = JSON.parse(os);
  // var stype = ss.type;
  // var smarkId = ss.markId;
  // console.log('s参数：{"type":'+stype+',"markId":'+smarkId+"}");
  // console.log("s编码:"+oMsg);
  /*--   自己定义数据   --*/
  /*--   弄成json格式的参数   --*/
  // var om = getvl("state");
  // var orderMsgPara = decodeURI(om);
  // var state = JSON.parse(orderMsgPara);
  // var type = state.type;
  // var markId = state.markId;
  // var stId = $("#serviceType option:selected").val();
  /*--   弄成json格式的参数   --*/
  /*--   就拿一个markId参数   --*/
  // var markId = getvl("state");
  /*最新查找活动信息方法*/
  $.ajax({
    type:"POST",
    url:urlIp+'api/v2/OrderInfo/GetActivityAtStoreNgs',
    async:false,
    data:{
      UserId:markId
    },
    success:function(data){
      console.log("活动",data);
      $("#serviceName").text(data.Body.Title);
      list = data.Body.List;
      if(list == null){
        $("#activity").hide();
      }
    }
  })
  $("#activity").hide();
  /*最新满返红包信息方法*/
    $.ajax({
      type: 'POST',
      url: urlIp+'api/v2/Coupon/CouponList',
      dataType: 'json',
      async: false,
      data: {
        Token: token
      },
      success: function(data) {
        console.log("红包",data);
        redList = data.Body.CouponList;
      }
    });

    // 专属按摩项目
    $.ajax({
      type:"POST",
      url:urlIp+'api/v2/OrderInfo/GetMasajiActivityAtStoreNgs',
      async:false,
      data:{
        Token:token,
        UserId:markId,
        ServiceTypeId:ServiceTypeId
      },
      success:function(data){
        console.log("活动",data);
        $("#serviceName").text(data.Body.Title);
        list = data.Body.List;
        if(list == null){
          $("#activity").hide();
        }
      }
    })
  
  $("#redWindow").on("click",function(){
    $("#redWindow").hide();
    // couponId = '';
    // $("#redTip").text("不使用红包");
  })
  /*--   就拿一个markId参数   --*/
  
  $("#totalPrice").bind("keydown keyup",function(){
    $("#submitBtn").removeClass().addClass('submit-btn');
    $("#moneySymbol").show();
    $("#promotionTitle").text('');
    $("#promotion").hide();
    window.sessionStorage.setItem("couponId",'');
    totalPrice = $("#totalPrice").val();
    totalPriceNum = parseFloat($("#totalPrice").val());
    tpLength = totalPrice.length;
    $("#actualMoney").text('');
    if(list == null && redList.length == 0){
      $("#activity").hide();
      $("#actualMoney").text("￥" + totalPriceNum);
    }
    if(list){
      var arr1 = new Array();//减价最大值
      var arr2 = new Array();//n的值
      var arr3 = new Array();//满的最小值
      for(var i = 0; i < list.length; i++){
        var totalPriceCondition = parseFloat(list[i].TotalPriceCondition);
        var returnMoney = parseFloat(list[i].ReturnMoney);
        var ads = list[i].Ads;
        // $("#activity").hide();
        if(totalPriceNum >= list[i].TotalPriceCondition){
        // while(totalPriceNum >= list[i].TotalPriceCondition){
            var n = i;
            $("#activity").show();
            $("#specialTitle").text(list[n].Ads); 
            actualMoney = totalPriceNum - list[n].ReturnMoney;
          // }
          $("#activity").show();
          // $("#specialTitle").text(list[i].Ads);
          // console.log("实际价格"+actualMoney);
          $("#specialChoose").attr("str","../../images/quick-order/new-choose.png");
          $("#specialMoney").text("-￥" + returnMoney);
          $("#actualMoney").text("￥" + actualMoney);
        }
        if(totalPriceNum < list[0].TotalPriceCondition){
          // console.log("输入总价"+totalPriceNum);
          // console.log("最低活动价格"+list[0].TotalPriceCondition);
          actualMoney = parseFloat(totalPriceNum);
          $("#activity").hide();
          $("#actualMoney").text("￥" + totalPriceNum);
        }
      }
    }
    if (redList.length>0) {
      res_0 = "";
      res_1 = "";
      res_2 = "";
      var ServiceNames = ""; //品类名称
      for (var i = 0; i < redList.length; i++) {
        if (redList[i].ServiceTypes.length == 0) {
          ServiceNames = "全品类使用";
        } else {
          for (var j = 0; j < redList[i].ServiceTypes.length; j++) {
            ServiceNames += redList[i].ServiceTypes[j].ServiceName;
          }
        }
        var IsUsed = redList[i].IsUsed; //是否可用
        var Id = redList[i].Id;
        var DiscountAmount = parseFloat(redList[i].CouponDetails[0].DiscountAmount); // 红包金额
        var Amount = parseFloat(redList[i].CouponDetails[0].Amount); //满减金额
        var StartTime = redList[i].StartTime.substr(0, 10); //起始时间
        var EndTime = redList[i].EndTime.substr(0, 10); //结束时间
        var CreateTime = redList[i].CreateTime.substr(0,10);
        var now_time = Date.parse(new Date()); //当前时间的时间戳
        var end_time = Date.parse(EndTime); //结束时间时间戳
        var create_time = Date.parse(CreateTime);
        var start_time = Date.parse(StartTime);
        var flag = (now_time < end_time && start_time < now_time) ? true: false; //true是未使用  false是已过期
        // 未使用
        if (IsUsed == 0 && flag) {
          // $("#promotion").hide();
          // var z = i;
          arr3.push(redList[i].CouponDetails[0].Amount);
          // console.log(arr3);
          var amount_max = arr3.max();
          // console.log(amount_min);
          // res_0 += '<div class="red-item" Id=' + Id + ' DiscountAmount=' + DiscountAmount + ' Amount=' + Amount + '><div class="item-left"><div class="price"><span class="rmb">￥</span><span class="DiscountAmount">' + DiscountAmount + '</span></div><div class="Amount">满' + Amount + '可用</div></div><div class="item-right"><div class="red-name">闪付红包</div><ul class="red-rule"><li class="ServiceTypes">' + ServiceNames + '</li><li><span class="StartTime">' + StartTime + '</span>至<span class="EndTime">' + EndTime + '</span></li></ul></div></div>';
          // $(".red-list").html(res_0);
          if(actualMoney>=redList[i].CouponDetails[0].Amount){
            console.log(actualMoney);
            $("#promotion").show();
            var n = i;
            

            arr1.push(redList[n].CouponDetails[0].DiscountAmount);
            arr2.push(n);
            var max = arr1.max();
            // var max = arr1[0];
            // var arr1_index = 0;
            // console.log("减少最大值"+max);
            for(var a = 0; a < arr1.length; a++){
              if(max == arr1[a]){
                arr1_index = a;
              }
            }
            var ri = arr2[arr1_index];
            // var hm = redList[ri].CouponDetails[0].Amount;
            // var cb = redList[ri].CouponDetails[0].DiscountAmount;
            // console.log("红包列表"+ri);

            var AmountNum = parseFloat(redList[ri].CouponDetails[0].Amount);
            var DiscountAmountNum = parseFloat(redList[ri].CouponDetails[0].DiscountAmount);
            var couponId = redList[ri].Id;
            window.sessionStorage.setItem("couponId",couponId);
            $("#promotionTitle").text("满"+AmountNum+"减"+DiscountAmountNum+"红包");
            actualMoneys = parseFloat(actualMoney) - DiscountAmountNum;
            $("#actualMoney").text("￥" + actualMoneys);
          }else{
            // console.log("最大值"+amount_max);
            // window.sessionStorage.setItem("couponId",'');
            // $("#promotion").hide();
          }
        }
      };
    } else {
      $("#promotion").hide();
      $("#redWindow").hide();
      $(".no-hb").css("display", "block");
    }


    // if(sr){
    //   for(var i = 0; i < sr.length; i++){
    //     var srMinus = parseFloat(sr[i].Minus);
    //     var srUpper = parseFloat(sr[i].Upper);
    //     if(totalPrice >= srUpper){
    //       var actualMoney = totalPrice - srMinus;
    //       $("#specialChoose").attr("src","../../images/quick-order/new-choose.png");
    //       $("#specialMoney").text("-￥" + srMinus);
    //       $("#actualMoney").text("￥" + actualMoney);
    //     }
    //     if(totalPrice < srUpper){
    //       var actualMoney = totalPrice;
    //       $("#specialChoose").attr("src","../../images/quick-order/new-unchoose.png");
    //       $("#specialMoney").text('');
    //       $("#actualMoney").text("￥" + actualMoney);
    //       if(actualMoney == ""){
    //         $("#actualMoney").text('');
    //       }
    //     }
    //   }
    // }
    // if(pr){
    //   for(var i = 0; i < pr.length; i++){
    //     var prMinus = pr[i].Minus;
    //     var prUpper = pr[i].Upper;
    //     var prMinus = parseFloat(pr[i].Minus);
    //     var prUpper = parseFloat(pr[i].Upper);
    //     if(totalPrice >= prUpper){
    //       $("#promotionChoose").attr("src","../../images/quick-order/new-choose.png");
    //     }
    //     if(totalPrice < srUpper){
    //       $("#promotionChoose").attr("src","../../images/quick-order/new-unchoose.png");
    //     }
    //   }
    // }
    switch(tpLength)
    {
      case 0:
        $("#moneySymbol").hide();
        $("#totalPrice").css("width","120px");
        break;
      case 1:
        $("#moneySymbol").show();
        $("#totalPrice").css("width","10px");
        break;
      case 2:
        $("#moneySymbol").show();
        $("#totalPrice").css("width","20px");
        break;
      case 3:
        $("#moneySymbol").show();
        $("#totalPrice").css("width","30px");
        break;
      case 4:
        $("#moneySymbol").show();
        $("#totalPrice").css("width","40px");
        break;
      case 5:
        $("#moneySymbol").show();
        $("#totalPrice").css("width","50px");
        break;
    }
  })

  /*--下拉选框代码--*/
  // $("#serviceType").on("change",function(){
  //   stId = $(this).children('option:selected').val();
  //   $("#totalPrice").val('').css("width","120px");
  //   $("#moneySymbol").hide();
  //   $("#actualMoney").text('');
  //   if(stId != "-1"){
  //     activityMess = getActivity(token,stId).done(function(response){return response});
  //   }
  //   var activity = activityMess.responseJSON;
  //   console.log("活动",activity);
  //   if(activity != null){
  //     $("#activity").show();
  //   }
  //   if(activity.Meta.ErrorCode == "2004"){
  //     window.location.href="/template/login/login.html";
  //   }
  //   var specialHelp = activity.Body.SpecialHelp;
  //   var promotionHelp = activity.Body.PromotionHelp;
  //   sr = activity.Body.SpecialRule;
  //   pr = activity.Body.PromotionRule;
  //   $("#specialTitle").text(specialHelp);
  //   $("#promotionTitle").text(promotionHelp);
  //   $("#specialImg").click(function(){
  //     alert(activity.Body.SpecialTitle);
  //   })
  //   $("#promotionImg").click(function(){
  //     alert(activity.Body.PromotionTitle);
  //   })
  //   $("#special").show();
  //   $("#promotion").show();
  //   if(specialHelp == null){
  //     $("#special").hide();
  //   }
  //   if(promotionHelp == null){
  //     $("#promotion").hide();
  //   }
  //   if(specialHelp == null && promotionHelp == null){
  //     $("#activity").hide();
  //   }
  // })
  /*--下拉选框代码--*/
  if(Type == 1){
    var detail = getDetail(Type,markId).done(function(response){return response;});
    var data = detail.responseJSON;
    console.log(data);
    var api = data.Body.Worker;
    $("#busPhoto").attr("src", api.Photo);
    $("#busName").text(api.Name);
    $("#busAddr").text(api.Address);
    var serviceType = api.Services;  
    // $("#toDetail").attr("href","../worker/worker-info.html?type=1&markid="+markId);  
  }
  if(Type == 2){
    var detail = getDetail(Type,markId).done(function(response){return response;});
    var data = detail.responseJSON;
    console.log(data);
    var api = data.Body.Business;
    $("#busPhoto").attr("src", api.Photo);
    $("#busName").text(api.Name);
    $("#busAddr").text(api.Address);
    var serviceType = api.Services;
    // $("#toDetail").attr("href","../business-detail/business-detail.html?type=1&markid="+markId);
  }

  // var serviceName = serviceType[0].Name;
  // $("#serviceName").text(serviceName);
  // var sn = "<option value='-1'>请选择服务类型</option>";
  // for (var i = 0; i < serviceType.length; i++) {
  //   sn += '<option value="' + serviceType[i].Id + '">' + serviceType[i].Name + '</option>';
  // }
  // $("#serviceType").html(sn); 
  $("#submitBtn").on("click",function(){
    var actualMoneyf = $("#actualMoney").text();
    var actualMoneyNumf = actualMoneyf.slice(1);
    sessionStorage.setItem("needToPay",actualMoneyNumf);
    sessionStorage.setItem("totalPriceNum",totalPriceNum);
    // sessionStorage.setItem("couponId",couponId);
    // console.log("实际价格"+actualMoneyNum);
    /*--拼跳转页面的url--*/
    // var orderMsgParameter = {"stId":stId,"markId":markId};
    // var orderMsgParameterStr = JSON.stringify(orderMsgParameterStr);
    // var orderMsg = encodeURI(orderMsgParameterStr);
    // console.log("调到下个页面:"+orderMsg);
    // window.sessionStorage.setItem("stId",stId);
    // window.sessionStorage.setItem("markId",markId);
    /*--拼跳转页面的url--*/
    var data = {
      Token:token,
      // ServiceTypeId:stId,
      ServicePrice:totalPrice,
      ServcieProviderId:markId,
      ServiceProviderType:1
    }
    if(actualMoneyNumf != null && actualMoneyNumf != ""){
      // console.log('成功');
      window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2ftemplate%2fpay%2fnew-pay.html&response_type=code&scope=snsapi_base&state=123456#wechat_redirect";
      // window.location.href="../pay/new-pay.html";
    }
  })

  $("#promotion").on("click",function(){
    $("#redWindow").show();
    $.ajax({
      type: 'POST',
      url: urlIp+'api/v2/Coupon/CouponList',
      dataType: 'json',
      async: false,
      data: {
        Token: token
      },
      success: function(data) {
        // console.log("红包",data);
        var api = data.Body.CouponList;
        if (api.length > 0) {
          res_0 = "";
          res_1 = "";
          res_2 = "";
          var ServiceNames = ""; //品类名称
          for (var i = 0; i < api.length; i++) {
            if (api[i].ServiceTypes.length == 0) {
              ServiceNames = "全品类使用";
            } else {
              for (var j = 0; j < api[i].ServiceTypes.length; j++) {
                ServiceNames += api[i].ServiceTypes[j].ServiceName;
              }
            }
            var IsUsed = api[i].IsUsed; //是否可用
            var Id = api[i].Id;
            var DiscountAmount = parseInt(api[i].CouponDetails[0].DiscountAmount); // 红包金额
            var Amount = parseInt(api[i].CouponDetails[0].Amount); //满减金额
            var StartTime = api[i].StartTime.substr(0, 10); //起始时间
            var EndTime = api[i].EndTime.substr(0, 10); //结束时间
            var CreateTime = api[i].CreateTime.substr(0,10);
            var now_time = Date.parse(new Date()); //当前时间的时间戳
            var end_time = Date.parse(EndTime); //结束时间时间戳
            var create_time = Date.parse(CreateTime);
            var start_time = Date.parse(StartTime);
            var flag = (now_time < end_time && start_time < now_time) ? true: false; //true是未使用  false是已过期
            // 未使用
            if (IsUsed == 0 && flag) {
              res_0 += '<div class="red-item" Id=' + Id + ' DiscountAmount=' + DiscountAmount + ' Amount=' + Amount + '><div class="item-left"><div class="price"><span class="rmb">￥</span><span class="DiscountAmount">' + DiscountAmount + '</span></div><div class="Amount">满' + Amount + '可用</div></div><div class="item-right"><div class="red-name">闪付红包</div><ul class="red-rule"><li class="ServiceTypes">' + ServiceNames + '</li><li><span class="StartTime">' + StartTime + '</span>至<span class="EndTime">' + EndTime + '</span></li></ul></div></div>';
              $(".red-list").html(res_0);
            }
          };
          $(".red-item").on("click",function(){
            var redAmounts = $(this).attr("Amount");
            var redDiscounts = $(this).attr("DiscountAmount");
            var redAmountNums = parseFloat(redAmounts);
            var redDiscountNums = parseFloat(redDiscounts);

            console.log(redAmountNums);
            console.log(redDiscountNums);
            if(actualMoney>=redAmountNums){
              console.log("实际支付的钱"+actualMoney);
              couponId = $(this).attr("Id");
              window.sessionStorage.setItem("couponId",couponId);
              console.log(couponId);
              money = actualMoney - redDiscountNums;
              $("#actualMoney").text("￥"+money);
              $("#promotionTitle").text("满"+redAmountNums+"返"+redDiscountNums+"红包");
              $("#redWindow").hide();
            }
            else{
              console.log("实际支付的钱"+actualMoney);
              $("#tipDialog").show();
              $("#response").text("无法使用该红包");
              $("#confirmDialog").on("click",function(){
                $("#tipDialog").hide();
              })
            }
          })
        } else {
          $("#redWindow").hide();
          $(".no-hb").css("display", "block");
        }
      },
      error: function(xhr, type) {}
    });
  })

  /*查找相关信息方法*/
  function getDetail(type,id){
    return $.ajax({
      type: 'POST',
      url: urlIp+'api/v2/Provider/Detail',
      dataType: 'json',
      async:false,
      data: {
        Type: type,
        Id: id
      }
    });
  }

  /*查找活动信息方法*/
  function getActivity(token,serviceTypeId){
    return $.ajax({
      type: 'POST',
      url: urlIp+'api/v2/SystemService/GetActivity',
      async:false,
      data:{
        Token: token,
        ServiceTypeId: serviceTypeId
      }
    })
  }
  /*下单方法*/
  // function createOrder(msg){
  //   $.ajax({
  //     type:'POST',
  //     url:'http://192.168.1.191:3001/api/v2/SystemService/',
  //     async:false,
  //     data:msg,
  //     success:function(data){
  //       console.log(data);
  //       window.location.href="../../pay/new-pay.html";
  //     }
  //   })
  // }
})