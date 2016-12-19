$(function(){
  //获取url参数
  function getvl(name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
  }
  var token = window.localStorage.getItem("Token");
  // var urlIp = "http://wapapi.zhujiash.com/";
  var urlIp = "http://192.168.1.191:3003/";
  // var Type = getvl("type");
  // var Id = getvl("markid");
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
  var markId = getvl("state");
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
      list = data.Body.List;
    }
  })
  $("#activity").hide();
  /*--   就拿一个markId参数   --*/
  $("#toDetail").attr("href","../worker/worker-info.html?type=1&markid="+markId);
  $("#totalPrice").bind("keydown keyup",function(){
    $("#submitBtn").removeClass().addClass('submit-btn');
    $("#moneySymbol").show();
    totalPrice = $("#totalPrice").val();
    totalPriceNum = parseFloat($("#totalPrice").val());
    tpLength = totalPrice.length;
    $("#actualMoney").text('');

    if(list){
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
            var actualMoney = totalPriceNum - list[n].ReturnMoney;
          // }
          $("#activity").show();
          // $("#specialTitle").text(list[i].Ads);
          console.log("实际价格"+actualMoney);
          $("#specialChoose").attr("str","../../images/quick-order/new-choose.png");
          $("#specialMoney").text("-￥" + returnMoney);
          $("#actualMoney").text("￥" + actualMoney);
        }
        if(totalPriceNum < list[0].TotalPriceCondition){
          console.log("输入总价"+totalPriceNum);
          console.log("最低活动价格"+list[0].TotalPriceCondition);
          $("#activity").hide();
          $("#actualMoney").text("￥" + totalPriceNum);
        }
      }
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

  var detail = getDetail(markId).done(function(response){return response;});
  var data = detail.responseJSON;
  console.log(data);
  var api = data.Body.Worker;
  $("#busPhoto").attr("src", api.Photo);
  $("#busName").text(api.Name);
  $("#busAddr").text(api.Address);
  var serviceType = api.Services;
  var serviceName = serviceType[0].Name;
  $("#serviceName").text(serviceName);
  // var sn = "<option value='-1'>请选择服务类型</option>";
  // for (var i = 0; i < serviceType.length; i++) {
  //   sn += '<option value="' + serviceType[i].Id + '">' + serviceType[i].Name + '</option>';
  // }
  // $("#serviceType").html(sn); 
  $("#submitBtn").on("click",function(){
    var actualMoney = $("#actualMoney").text();
    var actualMoneyNum = actualMoney.slice(1);
    sessionStorage.setItem("needToPay",actualMoneyNum);
    sessionStorage.setItem("totalPriceNum",totalPriceNum);
    console.log("实际价格"+actualMoneyNum);
    /*--拼跳转页面的url--*/
    // var orderMsgParameter = {"stId":stId,"markId":markId};
    // var orderMsgParameterStr = JSON.stringify(orderMsgParameterStr);
    // var orderMsg = encodeURI(orderMsgParameterStr);
    // console.log("调到下个页面:"+orderMsg);
    // window.sessionStorage.setItem("stId",stId);
    window.sessionStorage.setItem("markId",markId);
    /*--拼跳转页面的url--*/
    var data = {
      Token:token,
      // ServiceTypeId:stId,
      ServicePrice:totalPrice,
      ServcieProviderId:markId,
      ServiceProviderType:1
    }
    if(actualMoneyNum != null && actualMoneyNum != ""){
      console.log('成功');
      // window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2ftemplate%2fpay%2fnew-pay.html&response_type=code&scope=snsapi_userinfo&state=123456#wechat_redirect";
      window.location.href="../pay/new-pay.html";
    }
  })

  /*查找工人信息方法*/
  function getDetail(id){
    return $.ajax({
      type: 'POST',
      url: urlIp+'api/v2/Provider/Detail',
      dataType: 'json',
      async:false,
      data: {
        Type: 1,
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