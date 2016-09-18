  $(function(){
    var $li = $("#tab li");
    // var $ul = $("#content .item-list");
      var tooken = $.cookie("Token");
      $li.eq(0).addClass("active");
      function stateWaiting(orderId,serName,time,addr,serPrice){
        var htmlList = "";
        var html = 
        "<div class='item'>" +
          "<a href='../orderManage/order-detail.html?orderId=" + orderId + "'>" + "<div class='item-top'>" + 
            "<div class='line-waiting'></div>" + 
            "<div class='item-top-name'>" + serName +"</div>" +
            "<div class='state-waiting'>等待工人接单</div>" + 
          "</div></a>" +
          "<div class='item-center'>" +
            "<ul>" +
              "<li><span>客服正在努力安排工人</span></li>" +
              "<li><span>服务时间</span><span class='title-right'>" + time +
              "<li><span>服务地址</span><span class='title-right'>" + addr + "</span></li>" +
              "<li><span>服务价格</span><span class='title-right'>" + serPrice + "</span></li>" +
            "</ul>" +
          "</div>" +
          "<div class='item-buttom'>" +
            "<a id='orderCancel' href='#' class='order-cancel'>取消订单</a>" +
          "</div>" +
        "</div>";
        htmlList += html;
        return htmlList;
      }
      function payment(orderId,serName,picSrc,name,gender,time,addr,price,unit,total,totalPrice){
        var htmlList = "";
        var html = 
        "<a href='../orderManage/order-detail.html?orderId=" + orderId + "'>" + "<div class='item'>" +
          "<div class='item-top'>" +
            "<div class='line-payment'></div>" +
            "<div class='item-top-name'>" + serName +"</div>" +
            "<div class='state-payment'>待付款</div>" +
          "</div></a>" +
          "<div class='item-center'>" +
          "<ul>" +
            "<li><img src='" + picSrc + "' alt='' class='worker-img'><span>" + name + " " + gender +"</span></li>" +
            "<li><span>服务时间</span><span class='title-right'>" + time + "</span></li>" +
            "<li><span>服务地址</span><span class='title-right'>" + addr + "</span></li>" +
            "<li><span>服务价格</span><span class='title-right'>￥" + price + "/" + unit + " ×" + total + "</span></li>" +
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
      function unconfirm(orderId,serName,picSrc,name,gender,time,addr,price,unit,total,totalPrice){
        var htmlList = "";
        var html =
        "<a href='../orderManage/order-detail.html?orderId=" + orderId + "'>" + "<div class='item'>" +
          "<div class='item-top'>" +
            "<div class='line-unconfirm'></div>" +
            "<div class='item-top-name'>" + serName +"</div>" +
            "<div class='state-payment'>待确认</div>" +
          "</div></a>" +
          "<div class='item-center'>" +
            "<ul>" +
              "<li><img src='" + picSrc + "' alt='' class='worker-img'>" + name + " " + gender + "</li>" +
              "<li><span>服务时间</span><span class='title-right'>" + time + "</span></li>" +
              "<li><span>服务地址</span><span class='title-right'>" + addr + "</span></li>" + 
              "<li><span>服务价格</span><span class='title-right'>￥" + price + "/" + unit + " ×" + total + "</span></li>" +
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
      function evaluation(orderId,serName,picSrc,name,gender,time,addr,price,unit,total,totalPrice){
        var htmlList = "";
        var html =
        "<a href='../orderManage/order-detail.html?orderId=" + orderId + "'>" + "<div class='item'>" +
          "<div class='item-top'>" +
            "<div class='line-evaluation'></div>" +
            "<div class='item-top-name'>" + serName + "</div>" +
            "<div class='state-payment'>待评价</div>" +
          "</div></a>" +
          "<div class='item-center'>" +
            "<ul>" +
              "<li><img src='" + picSrc +"' alt='' class='worker-img'><span>" + name + " " + gender + "</span></li>" +
              "<li><span>服务时间</span><span class='title-right'>" + time +"</span></li>" +
              "<li><span>服务地址</span><span class='title-right'>" + addr +"</span></li>" +
              "<li><span>服务价格</span><span class='title-right'>￥" + price + "/" + unit + " ×" + total + "</span></li>" +
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
      function canceled(orderId,serName,time,addr,totalPrice){
        var htmlList = "";
        var html =
        "<a href='../orderManage/order-detail.html?orderId=" + orderId + "'>" + "<div class='item'>" +
          "<div class='item-top'>" +
            "<div class='line-canceled'></div>" +
            "<div class='item-top-name'>" + serName + "</div>" +
            "<div class='state-canceled'>订单已取消</div>" +
          "</div></a>" +
          "<div class='item-center'>" +
            "<ul>" +
              "<li><span>客服正在努力安排工人</span></li>" +
              "<li><span>服务时间</span><span class='title-right'>" + time +"</span></li>" +
              "<li><span>服务地址</span><span class='title-right'>" + addr +"</span></li>" +
              "<li><span>服务价格</span><span class='title-right'>" + totalPrice +"</span></li>" +
            "</ul>" +
          "</div>" +
          "<div class='item-buttom'>" +
            "<a id='orderDelete' href='#'' class='order-cancel'>删除订单</a>" +
          "</div>" +
        "</div>";
        htmlList += html;
        return htmlList;
      }

      $.ajax({
        type:"POST",
        url:"http://192.168.1.191:3003/api/v2/OrderInfo/GetOrderListEx",
        // url:"order.json",
        data:{
          Token:"865077b7deb3082261d22bfc2765c5e0",
          PageIndex:"1",
          PageSize:"15",
          Type:0
        },
        // dataType:"json",
        success:function(data){
          console.log(data);
          var listData = data.Body.OrderList;
          if(listData == null){
            $("#noOrder").css("display","block");
          }
          var listLength = data.Body.OrderList.length;
          console.log(listLength);
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
            var serviceName = listData[i].Service.ServiceName;
            var servicePrice = listData[i].ServicePrice;
            var refundStatus = listData[i].RefundStatus;
            var activity = listData[i].Activity;
            var totalCount = listData[i].TotalCount;
            if(serviceProviderGender == "0"){
              var gender = "师傅";
            }else if(serviceProviderGender == "1"){
              var gender = "阿姨";
            }
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
              var orderContent = stateWaiting(orderId,serviceName,serviceTime,serviceAddress,price);
             // console.log(orderContent);
             $("#itemList").append(orderContent);
            }
            if( isPayOff == "0" && orderStatus == "20" ){
              var orderContent = payment(orderId,serviceName,serviceProviderPic,serviceProviderName,gender,createAt,serviceAddress,price,unitName,totalCount,totalPrice);
              $("#itemList").append(orderContent);
            }
            if( orderStatus == "30"){
              var orderContent = unconfirm(orderId,serviceName,serviceProviderPic,serviceProviderName,gender,createAt,serviceAddress,price,unitName,totalCount,totalPrice);
              $("#itemList").append(orderContent);
            }
            if( orderStatus == "40"){
              var orderContent = evaluation(orderId,serviceName,serviceProviderPic,serviceProviderName,gender,createAt,serviceAddress,price,unitName,totalCount,totalPrice);
              $("#itemList").append(orderContent);
            }
            if( orderStatus == "50"){
              var orderContent = canceled(orderId,serviceName,serviceTime,serviceAddress,totalPrice);
              $("#itemList").append(orderContent);
            }
          }
        }
      });

    $li.on("click",function(){
      var $this = $(this);
      // var $num = $this.attr("id");
      var $num = $this.index();
      $li.removeClass();
      $this.addClass("active");
      $("#itemList").empty();

      $.ajax({
        type:"POST",
        url:"http://192.168.1.191:3003/api/v2/OrderInfo/GetOrderListEx",
        // url:"order.json",
        data:{
          Token:'fde40e469eea5089eb0f3e2f030d821f',
          PageIndex:"1",
          PageSize:"15",
          Type:"0"
        },
        // dataType:"json",
        success:function(data){
          console.log(data);
          console.log($num);
          var listData = data.Body.OrderList;
          var listLength = data.Body.OrderList.length;
          var listData = data.Body.OrderList;

          switch($num){
            case 0:
            console.log("全部");
            if(listData == null){
              $("#noOrder").css("display","block");
            }
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
              var serviceName = listData[i].Service.ServiceName;
              var servicePrice = listData[i].ServicePrice;
              var refundStatus = listData[i].RefundStatus;
              var activity = listData[i].Activity;
              var totalCount = listData[i].TotalCount;

              if(serviceProviderGender == "0"){
                var gender = "师傅";
              }else if(serviceProviderGender == "1"){
                var gender = "阿姨";
              }
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
                var orderContent = stateWaiting(orderId,serviceName,serviceTime,serviceAddress,price);
               // console.log(orderContent);
               $("#itemList").append(orderContent);
              }
              if( isPayOff == "0" && orderStatus == "20" ){
                var orderContent = payment(orderId,serviceName,serviceProviderPic,serviceProviderName,gender,createAt,serviceAddress,price,unitName,totalCount,totalPrice);
                $("#itemList").append(orderContent);
              }
              if( orderStatus == "30"){
                var orderContent = unconfirm(orderId,serviceName,serviceProviderPic,serviceProviderName,gender,createAt,serviceAddress,price,unitName,totalCount,totalPrice);
                $("#itemList").append(orderContent);
              }
              if( orderStatus == "40"){
                var orderContent = evaluation(orderId,serviceName,serviceProviderPic,serviceProviderName,gender,createAt,serviceAddress,price,unitName,totalCount,totalPrice);
                $("#itemList").append(orderContent);
              }
              if( orderStatus == "50"){
                var orderContent = canceled(orderId,serviceName,serviceTime,serviceAddress,totalPrice);
                $("#itemList").append(orderContent);
              }
            }
            break;
            case 1:
            console.log("待接单");
            console.log(listLength);
            if(listData == null){
              $("#noOrder").css("display","block");
            }
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
              var serviceName = listData[i].Service.ServiceName;
              var servicePrice = listData[i].ServicePrice;
              var refundStatus = listData[i].RefundStatus;
              var activity = listData[i].Activity;
              var totalCount = listData[i].TotalCount;
              if(orderStatus == "10"){
                var orderContent = stateWaiting(orderId,serviceName,serviceTime,serviceAddress,price);
                $("#itemList").append(orderContent);
              }
            }
            break;
            case 2:
            console.log("待付款");
            if(listData == null){
              $("#noOrder").css("display","block");
            }
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
              var serviceName = listData[i].Service.ServiceName;
              var servicePrice = listData[i].ServicePrice;
              var refundStatus = listData[i].RefundStatus;
              var activity = listData[i].Activity;
              var totalCount = listData[i].TotalCount;
              if(serviceProviderGender == "0"){
                var gender = "师傅";
              }else if(serviceProviderGender == "1"){
                var gender = "阿姨";
              }
              if( isPayOff == "0" && orderStatus == "20" ){
                var orderContent = payment(orderId,serviceName,serviceProviderPic,serviceProviderName,gender,createAt,serviceAddress,price,unitName,totalCount,totalPrice);
                $("#itemList").append(orderContent);
              }
              
            }
            break;
            case 3:
            console.log("已完成");
            if(listData == null){
              $("#noOrder").css("display","block");
            }
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
              var serviceName = listData[i].Service.ServiceName;
              var servicePrice = listData[i].ServicePrice;
              var refundStatus = listData[i].RefundStatus;
              var activity = listData[i].Activity;
              var totalCount = listData[i].TotalCount;
              if(serviceProviderGender == "0"){
                var gender = "师傅";
              }else if(serviceProviderGender == "1"){
                var gender = "阿姨";
              }
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
                var orderContent = unconfirm(orderId,serviceName,serviceProviderPic,serviceProviderName,gender,createAt,serviceAddress,price,unitName,totalCount,totalPrice);
                $("#itemList").append(orderContent);
              }
            }
            break;
            case 4:
            console.log("待评价");
            if(listData == null){
              $("#noOrder").css("display","block");
            }
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
              var serviceName = listData[i].Service.ServiceName;
              var servicePrice = listData[i].ServicePrice;
              var refundStatus = listData[i].RefundStatus;
              var activity = listData[i].Activity;
              var totalCount = listData[i].TotalCount;
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
                var gender = "师傅";
              }else if(serviceProviderGender == "1"){
                var gender = "阿姨";
              }
              if( orderStatus == "40"){
                var orderContent = evaluation(orderId,serviceName,serviceProviderPic,serviceProviderName,gender,createAt,serviceAddress,price,unitName,totalCount,totalPrice);
                $("#itemList").append(orderContent);
              }
            }
            break;
          }
        }
      })

      // function stateWaiting(orderId,serName,time,addr,serPrice){
      //   var htmlList = "";
      //   var html = 
      //   "<div class='item'>" +
      //     "<a href='../orderManage/order-detail.html?orderId=" + orderId + "'>" + "<div class='item-top'>" + 
      //       "<div class='line-waiting'></div>" + 
      //       "<div class='item-top-name'>" + serName +"</div>" +
      //       "<div class='state-waiting'>等待工人接单</div>" + 
      //     "</div></a>" +
      //     "<div class='item-center'>" +
      //       "<ul>" +
      //         "<li><span>客服正在努力安排工人</span></li>" +
      //         "<li><span>服务时间</span><span class='title-right'>" + time +
      //         "<li><span>服务地址</span><span class='title-right'>" + addr + "</span></li>" +
      //         "<li><span>服务价格</span><span class='title-right'>" + serPrice + "</span></li>" +
      //       "</ul>" +
      //     "</div>" +
      //     "<div class='item-buttom'>" +
      //       "<a id='orderCancel' href='#' class='order-cancel'>取消订单</a>" +
      //     "</div>" +
      //   "</div>";
      //   htmlList += html;
      //   return htmlList;
      // }
      // function payment(orderId,serName,picSrc,name,gender,time,addr,price,unit,total,totalPrice){
      //   var htmlList = "";
      //   var html = 
      //   "<a href='../orderManage/order-detail.html?orderId=" + orderId + "'>" + "<div class='item'>" +
      //     "<div class='item-top'>" +
      //       "<div class='line-payment'></div>" +
      //       "<div class='item-top-name'>" + serName +"</div>" +
      //       "<div class='state-payment'>待付款</div>" +
      //     "</div></a>" +
      //     "<div class='item-center'>" +
      //     "<ul>" +
      //       "<li><img src='" + picSrc + "' alt='' class='worker-img'><span>" + name + " " + gender +"</span></li>" +
      //       "<li><span>服务时间</span><span class='title-right'>" + time + "</span></li>" +
      //       "<li><span>服务地址</span><span class='title-right'>" + addr + "</span></li>" +
      //       "<li><span>服务价格</span><span class='title-right'>￥" + price + "/" + unit + " ×" + total + "</span></li>" +
      //     "</ul>" +
      //     "</div>" +
      //     "<div class='total-price'>订单总价：<span class='price-num'>￥" + totalPrice + "</span></div>" +
      //     "<div class='item-buttom'>" +
      //     "<a href='#' class='order-pay'>支 付</a>" +
      //     "<a href='#' class='order-cancel'>取消订单</a>" +
      //     "<div class='clear'></div>" +
      //     "</div>" +
      //   "</div>";
      //   htmlList += html;
      //   return htmlList;
      // }
      // function unconfirm(orderId,serName,picSrc,name,gender,time,addr,price,unit,total,totalPrice){
      //   var htmlList = "";
      //   var html =
      //   "<a href='../orderManage/order-detail.html?orderId=" + orderId + "'>" + "<div class='item'>" +
      //     "<div class='item-top'>" +
      //       "<div class='line-unconfirm'></div>" +
      //       "<div class='item-top-name'>" + serName +"</div>" +
      //       "<div class='state-payment'>待确认</div>" +
      //     "</div></a>" +
      //     "<div class='item-center'>" +
      //       "<ul>" +
      //         "<li><img src='" + picSrc + "' alt='' class='worker-img'>" + name + " " + gender + "</li>" +
      //         "<li><span>服务时间</span><span class='title-right'>" + time + "</span></li>" +
      //         "<li><span>服务地址</span><span class='title-right'>" + addr + "</span></li>" + 
      //         "<li><span>服务价格</span><span class='title-right'>￥" + price + "/" + unit + " ×" + total + "</span></li>" +
      //       "</ul>" +
      //     "</div>" +
      //     "<div class='total-price'>订单总价：<span class='price-num'>￥" + totalPrice + "</span></div>" +
      //     "<div class='item-buttom'>" +         
      //       "<a href='#' class='order-cancel'>确认服务完成</a>" +
      //       "<div class='clear'></div>" +
      //     "</div>" +
      //   "</div>";
      //   htmlList += html;
      //   return htmlList;
      // }
      // function evaluation(orderId,serName,picSrc,name,gender,time,addr,price,unit,total,totalPrice){
      //   var htmlList = "";
      //   var html =
      //   "<a href='../orderManage/order-detail.html?orderId=" + orderId + "'>" + "<div class='item'>" +
      //     "<div class='item-top'>" +
      //       "<div class='line-evaluation'></div>" +
      //       "<div class='item-top-name'>" + serName + "</div>" +
      //       "<div class='state-payment'>待评价</div>" +
      //     "</div></a>" +
      //     "<div class='item-center'>" +
      //       "<ul>" +
      //         "<li><img src='" + picSrc +"' alt='' class='worker-img'><span>" + name + " " + gender + "</span></li>" +
      //         "<li><span>服务时间</span><span class='title-right'>" + time +"</span></li>" +
      //         "<li><span>服务地址</span><span class='title-right'>" + addr +"</span></li>" +
      //         "<li><span>服务价格</span><span class='title-right'>￥" + price + "/" + unit + " ×" + total + "</span></li>" +
      //       "</ul>" +
      //     "</div>" +
      //     "<div class='total-price'>实付<span class='price-num'>￥" + totalPrice + "</span></div>" +
      //       "<div class='item-buttom'>" +         
      //       "<a href='#' class='order-pay2'>支付</a>" +
      //       "<div class='clear'></div>" +
      //       "</div>" +
      //     "</div>";
      //     htmlList += html;
      //     return htmlList;
      // }
      // function canceled(orderId,serName,time,addr,totalPrice){
      //   var htmlList = "";
      //   var html =
      //   "<a href='../orderManage/order-detail.html?orderId=" + orderId + "'>" + "<div class='item'>" +
      //     "<div class='item-top'>" +
      //       "<div class='line-canceled'></div>" +
      //       "<div class='item-top-name'>" + serName + "</div>" +
      //       "<div class='state-canceled'>订单已取消</div>" +
      //     "</div></a>" +
      //     "<div class='item-center'>" +
      //       "<ul>" +
      //         "<li><span>客服正在努力安排工人</span></li>" +
      //         "<li><span>服务时间</span><span class='title-right'>" + time +"</span></li>" +
      //         "<li><span>服务地址</span><span class='title-right'>" + addr +"</span></li>" +
      //         "<li><span>服务价格</span><span class='title-right'>" + totalPrice +"</span></li>" +
      //       "</ul>" +
      //     "</div>" +
      //     "<div class='item-buttom'>" +
      //       "<a id='orderDelete' href='#'' class='order-cancel'>删除订单</a>" +
      //     "</div>" +
      //   "</div>";
      //   htmlList += html;
      //   return htmlList;
      // }


      $("#cancelBtn2").click(function(){
        $("#cancelOrder2").hide();
      })
      $("#cancelBtn1").click(function(){
        $("#cancelOrder1").hide();
      })
      $("#deleteCancel").click(function(){
        $("#deleteOrder").hide();
      })

      $("#itemList #orderCancel").on("click",function(){
        $("#cancelOrder1").css("display","block");
        $("#cancelOrderBtn").click(function(){
          cancelOrder(token,orderId);
          $("#cancelOrder1").hide();
          location.reload();
        })
      })
      $("#itemList #orderDelete").on("click",function(){
        $("#deleteOrder").css("display","block");
      })
        $("#deleteBtn").click(function(){
          deleteOrder(token,orderId);
          $("#deleteOrder").hide();
          location.reload();
        })






/*--按钮操作--*/
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
      function deleteOrder(token,orderId){
        console.log("完成订单");
        $.ajax({
          type:"POST",
          url:"http://192.168.1.191:3003/api/v2/OrderInfo/RemoveOrderEx",
          data:{
            Token:token,
            OrderId:orderId
          },
          success:function(data){
            console.log("完成订单成功");
          }
        })
      }



      // $ul.hide();
      // $ul.eq($num).css("display","block");
    })
  })