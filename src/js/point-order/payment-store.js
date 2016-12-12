$(function(){
  //获取url参数
  function getvl(name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
  }
  var Type = getvl("type");
  var Id = getvl("markid");
  var token = window.localStorage.getItem("Token");
  $("#toDetail").attr("href","../worker/worker-info.html?type=" + Type + "&markid=" + Id);
  var stId = $("#serviceType option:selected").val();
  $("#totalPrice").bind("keydown keyup",function(){
    $("#submitBtn").removeClass().addClass('submit-btn');
    $("#moneySymbol").show();
    totalPrice = $("#totalPrice").val();
    totalPriceNum = parseFloat($("#totalPrice").val());
    tpLength = totalPrice.length;
    $("#actualMoney").text("￥" + totalPrice);
    if(sr){
      for(var i = 0; i < sr.length; i++){
        var srMinus = parseFloat(sr[i].Minus);
        var srUpper = parseFloat(sr[i].Upper);
        if(totalPrice >= srUpper){
          var actualMoney = totalPrice - srMinus;
          $("#specialChoose").attr("src","../../images/quick-order/new-choose.png");
          $("#specialMoney").text("-￥" + srMinus);
          $("#actualMoney").text("￥" + actualMoney);
        }
        if(totalPrice < srUpper){
          var actualMoney = totalPrice;
          $("#specialChoose").attr("src","../../images/quick-order/new-unchoose.png");
          $("#specialMoney").text('');
          $("#actualMoney").text("￥" + actualMoney);
          if(actualMoney == ""){
            $("#actualMoney").text('');
          }
        }
      }
    }
    if(pr){
      for(var i = 0; i < pr.length; i++){
        var prMinus = pr[i].Minus;
        var prUpper = pr[i].Upper;
        var prMinus = parseFloat(pr[i].Minus);
        var prUpper = parseFloat(pr[i].Upper);
        if(totalPrice >= prUpper){
          $("#promotionChoose").attr("src","../../images/quick-order/new-choose.png");
        }
        if(totalPrice < srUpper){
          $("#promotionChoose").attr("src","../../images/quick-order/new-unchoose.png");
        }
      }
    }
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
  $("#serviceType").on("change",function(){
    stId = $(this).children('option:selected').val();
    $("#totalPrice").val('').css("width","120px");
    $("#moneySymbol").hide();
    $("#actualMoney").text('');
    if(stId != "-1"){
      activityMess = getActivity(token,stId).done(function(response){return response});
    }
    var activity = activityMess.responseJSON;
    console.log("活动",activity);
    if(activity != null){
      $("#activity").show();
    }
    if(activity.Meta.ErrorCode == "2004"){
      window.location.href="/template/login/login.html";
    }
    var specialHelp = activity.Body.SpecialHelp;
    var promotionHelp = activity.Body.PromotionHelp;
    sr = activity.Body.SpecialRule;
    pr = activity.Body.PromotionRule;
    $("#specialTitle").text(specialHelp);
    $("#promotionTitle").text(promotionHelp);
    $("#specialImg").click(function(){
      alert(activity.Body.SpecialTitle);
    })
    $("#promotionImg").click(function(){
      alert(activity.Body.PromotionTitle);
    })
    $("#special").show();
    $("#promotion").show();
    if(specialHelp == null){
      $("#special").hide();
    }
    if(promotionHelp == null){
      $("#promotion").hide();
    }
    if(specialHelp == null && promotionHelp == null){
      $("#activity").hide();
    }
  })
  
  var detail = getDetail(Type,Id).done(function(response){return response;});
  var data = detail.responseJSON;
  console.log(data);
  var api = data.Body.Worker;
  $("#busPhoto").attr("src", api.Photo);
  $("#busName").text(api.Name);
  $("#busAddr").text(api.Address);
  var serviceType = api.Services;
  var sn = "<option value='-1'>请选择服务类型</option>";
  for (var i = 0; i < serviceType.length; i++) {
    sn += '<option value="' + serviceType[i].Id + '">' + serviceType[i].Name + '</option>';
  }
  $("#serviceType").html(sn); 
  $("#submitBtn").on("click",function(){
    var actualMoney = $("#actualMoney").text();
    var actualMoneyNum = actualMoney.slice(1);
    sessionStorage.setItem("needToPay",actualMoneyNum);
    sessionStorage.setItem("totalPriceNum",totalPriceNum);
    console.log(actualMoneyNum);
    var data = {
      Token:token,
      ServiceTypeId:stId,
      ServicePrice:totalPrice,
      ServcieProviderId:Id,
      ServiceProviderType:1
    }
    if(stId != "-1" && actualMoneyNum != null && actualMoneyNum != ""){
      console.log('成功');
      window.location.href="../pay/new-pay.html?markid=" + Id + "&stId=" + stId;
    }
  })

  /*查找工人信息方法*/
  function getDetail(type,id){
    return $.ajax({
      type: 'POST',
      url: 'http://192.168.1.191:3001/api/v2/Provider/Detail',
      dataType: 'json',
      async:false,
      data: {
        Type: Type,
        Id: Id
      }
    });
  }
  /*查找活动信息方法*/
  function getActivity(token,serviceTypeId){
    return $.ajax({
      type: 'POST',
      url: 'http://192.168.1.191:3003/api/v2/SystemService/GetActivity',
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