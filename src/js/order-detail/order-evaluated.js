$(function(){
  var token = localStorage.getItem("Token");
  var orderId = getQueryString("orderId");
  var type = getQueryString("type");
  var id = getQueryString("markid");
  $li = $(".rate li");
  function getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
          return unescape(r[2]);
      }
      return null;
  }
  function getDatetime(tm){
    var timestamp = tm;
    var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
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

  $("#toTop").click(function(){
    $('body,html').animate({scrollTop:0},1000);
    return false;
  });
  $("#toHome").on("click",function(){
    window.location.href="../my-order/my-order-new.html?flag=1";
  })
  $.ajax({
    type:"POST",
    url:"http://192.168.1.191:3001/api/v2/Provider/Detail",
    data:{
      Type:type,
      Id:id,
      Token:token
    },
    success:function(data){
      console.log(data);
      if(type == "1"){
        var str = data.Body.Worker.Grade;
        var grade = str.slice(2,5);
        $("#providerPic").attr("src",data.Body.Worker.Photo);
        // $("#providerPic").css("backgroundImage",data.Body.Worker.Photo);
        $("#providerName").text(data.Body.Worker.Name);
        $("#grade").text(grade);
        $("#praiseCount").text(data.Body.Worker.PraiseCount);
        $("#favoriteCount").text(data.Body.Worker.FavoriteCount);
      }
      if(type == "2"){
        var str = data.Body.Business.Grade;
        var grade = str.slice(2,5);
        $("#providerPic").attr("src",data.Body.Business.Photo);
        $("#providerName").text(data.Body.Business.Name);
        $("#grade").text(grade);
        $("#praiseCount").text(data.Body.Business.PraiseCount);
        $("#favoriteCount").text(data.Body.Business.FavoriteCount);
      }
    }
  })
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
      $("#serviceName").text(data.Body.Service.ServiceName);
      var createTime = new Date(data.Body.CreateTime);
      $("#createTime").text(createTime.Format("yyyy-MM-dd hh:mm"));
      $("#orderCode").text(data.Body.OrderCode);
      var finishTime = new Date(data.Body.FinishTime);
      $("#finishAt").text(finishTime.Format("yyyy-MM-dd hh:mm"));
      $("#servicePrice").text(data.Body.TotalPrice);
      $("#contactBus").attr("href","tel:"+data.Body.ServiceProviderPhone);
      $("#wordContent").append(data.Body.Service.Content);
      $("#evaContent").text(data.Body.Evaluation.Content);
      var evaTime = new Date(data.Body.Evaluation.Date);
      $("#evaTime").text(evaTime.Format("yyyy-MM-dd hh:mm"));
      var score = parseInt(data.Body.Evaluation.Score);
      console.log(score);
      for(i = 0;i < score; i++){
        $li.eq(i).find("img").attr("src","../../images/order-detail/redLove.png");
      }
      var scores = score + ".0";
      $("#scores").text(scores);
      var picNum = data.Body.Service.Pictures.length;
      var picData = data.Body.Service.Pictures;

      console.log(picNum);
      if(picNum == "0"){
        $("#picContent").hide();
      }else{
        for(i = 0; i < picNum; i++ ){
          var html = "<img class='photo-show' src='"+ picData[i].SmallPIc +"'>";
          $("#picContent").append(html);
        }
      }

      var evaPicNum = data.Body.Evaluation.Pictures.length;
      var evaPicData = data.Body.Evaluation.Pictures;
      if(evaPicNum == 0){
        $("#evaPic").hide();
      }else{
        for(i = 0; i < evaPicNum; i++ ){
          var evaHtml = "<img class='photo-show' src='"+ evaPicData[i].SmallPIc +"'>";
          $("#evaPic").append(evaHtml);
        }
      }
    }
  })

  // console.log(score);
  // for(var i = 0;i < 5; i++){
  //   $li.eq(i).find("img").attr("src","../../images/order-detail/redLove.png");
  // }
})