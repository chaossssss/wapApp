  $(function(){
    var $li = $("#tab li");
    // var $ul = $("#content .item-list");

      $li.eq(0).addClass("active");
      $.ajax({
        type:"POST",
        url:"http://192.168.1.191:3003/api/v2/OrderInfo/GetOrderListEx",
        // url:"order.json",
        data:{
          Token:'a81a2de3d59b6a964b510044a8966921',
          PageIndex:"1",
          PageSize:"5",
          Type:0
        },
        // dataType:"json",
        success:function(data){
          console.log(data);
          var listData = data.Body.OrderList;
          var listLength = data.Body.OrderList.length;
          for(i = 0; i < listLength; i++){
            var orderId = listData[i].OrderId;
            var orderCode = listData[i].OrderCode;
            var createAt = listData[i].CreateTime;
            var orderStatus = listData[i].OrderStatus;
            var isPayOff = listData[i].IsPayOff;
            var price = listData[i].Price;
            var totalPrice = listData[i].TotalPrice;
            var total = listData[i].Total;
            var unitName = listData[i].UnitName;
            var discountInfo = listData[i].DiscountInfo;
            var serviceProviderType = listData[i].ServiceProviderType;
            var serviceProviderPic = listData[i].ServiceProviderPic;
            var serviceProviderName = listData[i].ServiceProviderName;
            var serviceProviderGender = listData[i].ServiceProviderGender;
            var serviceAddress = listData[i].ServiceAddress;
            var serviceName = listData[i].ServiceName;
            var servicePrice = listData[i].ServicePrice;
            var refundStatus = listData[i].RefundStatus;
            var activity = listData[i].Activity;
            function getLocalTime(nS) {     
              var time = new Date(parseInt(nS) * 1000);
              return time;
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
            var formatTime = getLocalTime(createAt);
            var serviceTime = formatTime.Format("yyyy-MM-dd hh:mm");
            console.log(orderStatus);
            if(orderStatus == "10"){
              var orderContent = stateWaiting(serviceName,serviceTime,serviceAddress,price);
             // console.log(orderContent);
             $("#itemList").append(orderContent);
            }
            if( isPayOff == "0" && orderStatus == "20" ){
              var orderContent = payment(serviceName,serviceProviderPic,serviceProviderName,gender,createAt,serviceAddress,totalPrice);
              $("#itemList").append(orderContent);
            }
            if( orderStatus == "30"){
              unconfirm(serviceName,serviceProviderPic,serviceProviderName,serviceTime,serviceAddress,price,unitName,total,totalPrice);
              $("#itemList").append(orderContent);
            }
            if( orderStatus == "40"){
              evaluation(serviceName,serviceProviderPic,serviceProviderName,gender,serviceTime,serviceAddress,price,unitName,total,totalPrice);
              $("#itemList").append(orderContent);
            }
            if( orderStatus == "50"){
              canceled(serviceName,serviceTime,serviceAddress,totalPrice);
              $("#itemList").append(orderContent);
            }
          }
        }
      });




    // $li(0).trigger("click");

    $li.bind("click",function(){
      var $this = $(this);
      var $num = $this.index();
      $li.removeClass();
      $this.addClass("active");
      $("#itemList").empty();

      $.ajax({
        type:"POST",
        url:"http://192.168.1.191:3003/api/v2/OrderInfo/GetOrderListEx",
        // url:"order.json",
        data:{
          Token:'7fc358149d33d646c3f86b7300ba8603',
          PageIndex:"1",
          PageSize:"5",
          Type:$num
        },
        // dataType:"json",
        success:function(data){
          console.log(data);
          console.log($num);
          var listData = data.Body.OrderList;
          var listLength = data.Body.OrderList.length;

          switch($num){
            case 0:
            console.log("全部");
            for(i = 0; i < listLength; i++){
              var orderId = listData[i].OrderId;
              var orderCode = listData[i].OrderCode;
              var createAt = listData[i].CreateTime;
              var orderStatus = listData[i].OrderStatus;
              var isPayOff = listData[i].IsPayOff;
              var price = listData[i].Price;
              var totalPrice = listData[i].TotalPrice;
              var total = listData[i].Total;
              var unitName = listData[i].UnitName;
              var discountInfo = listData[i].DiscountInfo;
              var serviceProviderType = listData[i].ServiceProviderType;
              var serviceProviderPic = listData[i].ServiceProviderPic;
              var serviceProviderName = listData[i].ServiceProviderName;
              var serviceProviderGender = listData[i].ServiceProviderGender;
              var serviceAddress = listData[i].ServiceAddress;
              var serviceName = listData[i].ServiceName;
              var servicePrice = listData[i].ServicePrice;
              var refundStatus = listData[i].RefundStatus;
              var activity = listData[i].Activity;
              function getLocalTime(nS) {     
                var time = new Date(parseInt(nS) * 1000);
                return time;
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
              var formatTime = getLocalTime(createAt);
              var serviceTime = formatTime.Format("yyyy-MM-dd hh:mm");
              console.log(orderStatus);
              if(orderStatus == "10"){
                var orderContent = stateWaiting(serviceName,serviceTime,serviceAddress,price);
               // console.log(orderContent);
               $("#itemList").append(orderContent);
              }
              if( isPayOff == "0" && orderStatus == "20" ){
                var orderContent = payment(serviceName,serviceProviderPic,serviceProviderName,gender,createAt,serviceAddress,totalPrice);
                $("#itemList").append(orderContent);
              }
              if( orderStatus == "30"){
                unconfirm(serviceName,serviceProviderPic,serviceProviderName,serviceTime,serviceAddress,price,unitName,total,totalPrice);
                $("#itemList").append(orderContent);
              }
              if( orderStatus == "40"){
                evaluation(serviceName,serviceProviderPic,serviceProviderName,gender,serviceTime,serviceAddress,price,unitName,total,totalPrice);
                $("#itemList").append(orderContent);
              }
              if( orderStatus == "50"){
                canceled(serviceName,serviceTime,serviceAddress,totalPrice);
                $("#itemList").append(orderContent);
              }
            }
            break;
            case 1:
            console.log("待接单，订单状态10");
            for(i = 0; i < listLength; i++){
              var orderId = listData[i].OrderId;
              var orderCode = listData[i].OrderCode;
              var createAt = listData[i].CreateTime;
              var orderStatus = listData[i].OrderStatus;
              var isPayOff = listData[i].IsPayOff;
              var price = listData[i].Price;
              var totalPrice = listData[i].TotalPrice;
              var total = listData[i].Total;
              var unitName = listData[i].UnitName;
              var discountInfo = listData[i].DiscountInfo;
              var serviceProviderType = listData[i].ServiceProviderType;
              var serviceProviderPic = listData[i].ServiceProviderPic;
              var serviceProviderName = listData[i].ServiceProviderName;
              var serviceProviderGender = listData[i].ServiceProviderGender;
              var serviceAddress = listData[i].ServiceAddress;
              var serviceName = listData[i].ServiceName;
              var servicePrice = listData[i].ServicePrice;
              var refundStatus = listData[i].RefundStatus;
              var activity = listData[i].Activity;
              if(orderStatus == 10){
                var orderContent = stateWaiting(createAt,serviceAddress,servicePrice);
                $("#itemList").append(orderContent);
              }
              if( isPayOff == "0" && orderStatus == "20" ){
                var orderContent = payment(serviceProviderPic,serviceProviderName,gender,createAt,serviceAddress,totalPrice);
                $("#itemList").append(orderContent);
              }
            }
            break;
            case 2:
            console.log("待付款，订单状态20");
            for(i = 0; i < listLength; i++){
              var gender ="";
              var orderId = listData[i].OrderId;
              var orderCode = listData[i].OrderCode;
              var createAt = listData[i].CreateTime;
              var orderStatus = listData[i].OrderStatus;
              var isPayOff = listData[i].IsPayOff;
              var price = listData[i].Price;
              var totalPrice = listData[i].TotalPrice;
              var total = listData[i].Total;
              var unitName = listData[i].UnitName;
              var discountInfo = listData[i].DiscountInfo;
              var serviceProviderType = listData[i].ServiceProviderType;
              var serviceProviderPic = listData[i].ServiceProviderPic;
              var serviceProviderName = listData[i].ServiceProviderName;
              var serviceProviderGender = listData[i].ServiceProviderGender;
              var serviceAddress = listData[i].ServiceAddress;
              var serviceName = listData[i].ServiceName;
              var servicePrice = listData[i].ServicePrice;
              var refundStatus = listData[i].RefundStatus;
              var activity = listData[i].Activity;
              if(serviceProviderGender == "0"){
                var gender = "男";
              }else if(serviceProviderGender == "1"){
                var gender = "女";
              }
              if( isPayOff == "0" && orderStatus == "20" ){
                var orderContent = payment(serviceProviderPic,serviceProviderName,gender,createAt,serviceAddress,totalPrice);
                $("#itemList").append(orderContent);
              }
              
            }
            break;
            case 3:
            console.log("已完成，订单状态30");
            for(i = 0; i < listLength; i++){
              var orderId = listData[i].OrderId;
              var orderCode = listData[i].OrderCode;
              var createAt = listData[i].CreateTime;
              var orderStatus = listData[i].OrderStatus;
              var isPayOff = listData[i].IsPayOff;
              var price = listData[i].Price;
              var totalPrice = listData[i].TotalPrice;
              var total = listData[i].Total;
              var unitName = listData[i].UnitName;
              var discountInfo = listData[i].DiscountInfo;
              var serviceProviderType = listData[i].ServiceProviderType;
              var serviceProviderPic = listData[i].ServiceProviderPic;
              var serviceProviderName = listData[i].ServiceProviderName;
              var serviceProviderGender = listData[i].ServiceProviderGender;
              var serviceAddress = listData[i].ServiceAddress;
              var serviceName = listData[i].ServiceName;
              var servicePrice = listData[i].ServicePrice;
              var refundStatus = listData[i].RefundStatus;
              var activity = listData[i].Activity;
              function getLocalTime(nS) {     
                var time = new Date(parseInt(nS) * 1000);
                return time;
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
              var formatTime = getLocalTime(createAt);
              var serviceTime = formatTime.Format("yyyy-MM-dd hh:mm");
              if( orderStatus == "30"){
                unconfirm(serviceProviderPic,serviceProviderName,serviceTime,serviceAddress,price,unitName,total,totalPrice);
                $("#itemList").append(orderContent);
              }
            }
            break;
            case 4:
            console.log("待评价，订单状态40");
            for(i = 0; i < listLength; i++){
              var orderId = listData[i].OrderId;
              var orderCode = listData[i].OrderCode;
              var createAt = listData[i].CreateTime;
              var orderStatus = listData[i].OrderStatus;
              var isPayOff = listData[i].IsPayOff;
              var price = listData[i].Price;
              var totalPrice = listData[i].TotalPrice;
              var total = listData[i].Total;
              var unitName = listData[i].UnitName;
              var discountInfo = listData[i].DiscountInfo;
              var serviceProviderType = listData[i].ServiceProviderType;
              var serviceProviderPic = listData[i].ServiceProviderPic;
              var serviceProviderName = listData[i].ServiceProviderName;
              var serviceProviderGender = listData[i].ServiceProviderGender;
              var serviceAddress = listData[i].ServiceAddress;
              var serviceName = listData[i].ServiceName;
              var servicePrice = listData[i].ServicePrice;
              var refundStatus = listData[i].RefundStatus;
              var activity = listData[i].Activity;
              function getLocalTime(nS) {     
                var time = new Date(parseInt(nS) * 1000);
                return time;
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
              var formatTime = getLocalTime(createAt);
              var serviceTime = formatTime.Format("yyyy-MM-dd hh:mm");
              if(serviceProviderGender == "0"){
                var gender = "男";
              }else if(serviceProviderGender == "1"){
                var gender = "女";
              }
              if( orderStatus == "40"){
                evaluation(serviceProviderPic,serviceProviderName,gender,serviceTime,serviceAddress,price,unitName,total,totalPrice);
                $("#itemList").append(orderContent);
              }
            }
            break;
          }
        }
      })

      function stateWaiting(serName,time,addr,serPrice){
        var htmlList = "";
        var html = 
        "<div class='item'>" +
          "<div class='item-top'><div class='line-waiting'></div>" + 
          "<div class='item-top-name'>" + serName +"</div>" +
          "<div class='state-waiting'>等待工人接单</div>" + 
        "</div>" +
        "<div class='item-center'>" +
          "<ul>" +
            "<li><span>客服正在努力安排工人</span></li>" +
            "<li><span>服务时间</span><span class='title-right'>" + time +
            "<li><span>服务地址</span><span class='title-right'>" + addr + "</span></li>" +
            "<li><span>服务价格</span><span class='title-right'>" + serPrice + "</span></li>" +
          "</ul>" +
        "</div>" +
        "<div class='item-buttom'>" +
          "<a href='#' class='order-cancel'>取消订单</a>" +
        "</div>";
        htmlList += html;
        return htmlList;
      }
      function payment(serName,picSrc,name,gender,time,addr,price,unit,total,totalPrice){
        var htmlList = "";
        var html = 
        "<div class='item'>" +
          "<div class='item-top'>" +
            "<div class='line-payment'></div>" +
            "<div class='item-top-name'>" + serName +"</div>" +
            "<div class='state-payment'>待付款</div>" +
          "</div>" +
          "<div class='item-center'>" +
          "<ul>" +
            "<li><img src='" + picSrc + "' alt='' class='worker-img'><span>" + name + " " + gender +"</span></li>" +
            "<li><span>服务时间</span><span class='title-right'>" + time + "</span></li>" +
            "<li><span>服务地址</span><span class='title-right'>" + addr + "</span></li>" +
            "<li><span>服务价格</span><span class='title-right'>￥" + price + "/" + unit + "X" + total + "</span></li>" +
          "</ul>" +
          "</div>" +
          "<div class='total-price'>订单总价：<span class='price-num'>￥" + totalPrice + "</span></div>" +
          "<div class='item-buttom'>" +
          "<a href='#' class='order-pay'>支 付</a>" +
          "<a href='#' class='order-cancel'>取消订单</a>" +
          "<div class='clear'></div>" +
          "</div>" +
        "</div>";
        htmlList += html;
        return htmlList;
      }
      function unconfirm(serName,picSrc,name,time,addr,price,unit,total,totalPrice){
        var htmlList = "";
        var html =
        "<div class='item'>" +
          "<div class='item-top'>" +
            "<div class='line-unconfirm'></div>" +
            "<div class='item-top-name'>" + serName +"</div>" +
            "<div class='state-payment'>待确认</div>" +
          "</div>" +
          "<div class='item-center'>" +
            "<ul>" +
              "<li><img src='" + picSrc + "' alt='' class='worker-img'>" + name + " " + gender + "</li>" +
              "<li><span>服务时间</span><span class='title-right'>" + time + "</span></li>" +
              "<li><span>服务地址</span><span class='title-right'>" + addr + "</span></li>" + 
              "<li><span>服务价格</span><span class='title-right'>￥" + price + "/" + unit + "X" + total + "</span></li>" +
            "</ul>" +
          "</div>" +
          "<div class='total-price'>订单总价：<span class='price-num'>￥" + totalPrice + "</span></div>" +
          "<div class='item-buttom'>" +         
            "<a href='#' class='order-cancel'>确认服务完成</a>" +
            "<div class='clear'></div>" +
          "</div>" +
        "</div>";
        htmlList += html;
        return htmlList;
      }
      function evaluation(serName,picSrc,name,gender,time,addr,price,unit,total,totalPrice){
        var htmlList = "";
        var html =
        "<div class='item'>" +
          "<div class='item-top'>" +
            "<div class='line-evaluation'></div>" +
            "<div class='item-top-name'>" + serName + "</div>" +
            "<div class='state-payment'>待评价</div>" +
          "</div>" +
          "<div class='item-center'>" +
            "<ul>" +
              "<li><img src='" + picSrc +"' alt='' class='worker-img'><span>" + name + " " + gender + "</span></li>" +
              "<li><span>服务时间</span><span class='title-right'>" + time +"</span></li>" +
              "<li><span>服务地址</span><span class='title-right'>" + addr +"</span></li>" +
              "<li><span>服务价格</span><span class='title-right'>￥" + price + "/" + unit + "X" + total + "</span></li>" +
            "</ul>" +
          "</div>" +
          "<div class='total-price'>实付<span class='price-num'>￥" + totalPrice + "</span></div>" +
            "<div class='item-buttom'>" +         
            "<a href='#' class='order-pay2'>支付</a>" +
            "<div class='clear'></div>" +
            "</div>" +
          "</div>";
          htmlList += html;
          return htmlList;
      }
      function canceled(serName,time,addr,totalPrice){
        var htmlList = "";
        var html =
        "<div class='item'>" +
          "<div class='item-top'>" +
            "<div class='line-canceled'></div>" +
            "<div class='item-top-name'>" + serName + "</div>" +
            "<div class='state-canceled'>订单已取消</div>" +
          "</div>" +
          "<div class='item-center'>" +
            "<ul>" +
              "<li><span>客服正在努力安排工人</span></li>" +
              "<li><span>服务时间</span><span class='title-right'>" + time +"</span></li>" +
              "<li><span>服务地址</span><span class='title-right'>" + addr +"</span></li>" +
              "<li><span>服务价格</span><span class='title-right'>" + totalPrice +"</span></li>" +
            "</ul>" +
          "</div>" +
          "<div class='item-buttom'>" +
            "<a href='#'' class='order-cancel'>删除订单</a>" +
          "</div>" +
        "</div>";
        htmlList += html;
        return htmlList;
      }





      // $ul.hide();
      // $ul.eq($num).css("display","block");
    })
  })