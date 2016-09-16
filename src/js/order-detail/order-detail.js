$(function(){
  var $contactWorker = $("#contactWorker");
  var $workerPhone = $("#workerPhone");
  var $cancelBtn = $("#cancelBtn");

  $cancelBtn.on('click',function(){
    $workerPhone.css('display','none');
  });
/*--��������--*/
  $.ajax({
    method:"POST",
    url:"http://192.168.1.191:3003/api/v2/OrderInfo/GetOrderInfoEx",
    async:false,
    data:{
    Token:"a81a27a193ff18a39e51b838e3e13496",
    OrderId:"c546013a-9a79-e611-a80e-14dda950621b"
    },
    success:function(data){
      console.log(data);
      orderState = data.Body.OrderStatus;
      serviceId = data.Body.ServiceId;
      serviceProviderType = data.Body.ServiceProviderType;

      // picData = data.Body.OrderService.Pictures;
      // picLength = data.Body.OrderService.Pictures.length;
      // var gender = data.body[0].ServiceProviderGender;
      // orderIsGeted = data.Body.ServiceProviderId;
      var orderID = data.Body.OrderId;

      $("#orderCode").text(data.Body.OrderCode);
      $("#createTime").text(data.Body.CreateTime);
      $("#acceptAt").text(data.Body.AcceptTime);
      $("#serviceAt").text(data.Body.ServiceStartAt);
      $("#finishAt").text(data.Body.FinishTime);
      $("#confirmAt").text(data.Body.ConfirmTime);
      $("#cancalAt").text(data.Body.CancelTime);
      $("#clientName").text(data.Body.AddressInfo.Contact);
      
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
      if(data.Body.Price == "����"){
        $("ifNegotiable").text("����");
        $("#multiple").hide();
      }
      if(data.Body.AddressInfo.Gender == "0"){
        $("#clientGender").text("����");
      }else if(data.Body.AddressInfo.Gender == "1"){
        $("#clientGender").text("Ůʿ");
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
        console.log("����");
        var workHeadPic = data.Body.ServiceProviderPic;
        var workName = data.Body.ServiceProviderName;
        var gender = data.Body.ServiceProviderGender;
        $("#serviceProviderName").text(workName);
        $("#providerHead").attr("src",workHeadPic);
        if(gender == "1"){
          $("#workerGender").text('����');
        }else if(gender == "0"){
          $("#workerGender").text("ʦ��");
        }
      }
      if(data.Body.ServiceProviderType == "3"){
        console.log("�̻�");
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
/*--��ȡָ������ļ۸���Ϣ--*/
  // $.ajax({
  //   method:"POST",
  //   url:"http://192.168.1.191:3003/api/v2/ClientInfo/GetServicePriceEx",
  //   data:{
  //     Token:"3b9433fdb953e2b2d97dfcd6d2fdaecd",
  //     ServiceTypeId:"13",
  //     ServiceProviderType:"2"
  //   },
  //   success:function(data){
  //     console.log(data);
  //     console.log(data.Body.Min);
  //     console.log(data.Body.Max);
  //     console.log(data.Body.unit);
  //     console.log(data.Body.IsNegotaiable);
  //   }
  // });

console.log(orderState);
  switch(orderState){
    case "10":
    console.log("���ӵ�");
    $("#orderStatus").css("background-image","url(../../images/order-detail/order-success.png)");

    $("#status").text('�����ύ�ɹ�');
    $("#explanation").text('�����ĵȴ��ͷ�Ϊ�����Ź��ˣ���ȷ������۸�');
    $("#tabFirst").text('�������ύ');
    $("#tabSecond").text('�����˽ӵ�');
    $("#tabThird").text('������');
    $("#tabFourth").text('������');
    $("#btnRight").text('ȡ������');

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
      $("#cancelOrderBtn").click(function(){
        cancelOrder();
        updateOrder();    
      })
    });

    break;
    
    // case "11":
    // console.log("������");
    // $("#orderStatus").css("background-image","url(../../images/order-detail/get-order.png)");

    // $("#status").text('�����ѽӵ�');
    // $("#explanation").text('��֧��������ò��ȴ��������ŷ�����Ҳ�����ڹ��˷�����ɺ��ٸ���Ŷ');
    // $("#tabFirst").text('�������ύ');
    // $("#tabSecond").text('�����˽ӵ�');
    // $("#tabThird").text('������');
    // $("#tabFourth").text('������');
    // $("#btnLeft").text('ȡ������');
    // $("#btnRight").text('֧��');

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
    // console.log("������");
    // $("#orderStatus").css("background-image","url(../../images/order-detail/paying.png)");

    // $("#status").text('������');
    // $("#explanation").text('�ȴ�֧�����');
    // $("#tabFirst").text('�������ύ');
    // $("#tabSecond").text('�����ѽӵ�');
    // $("#tabThird").text('������');
    // $("#tabFourth").text('������');

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
    // console.log("��ȷ��");
    // $("#orderStatus").css("background-image","url(../../images/order-detail/worker-uncomfirm.png)");

    // $("#status").text('���ŷ���');
    // $("#explanation").text('�����ĵȴ�������Լ��ʱ�����ŷ���Ŷ');
    // $("#tabFirst").text('�������ύ');
    // $("#tabSecond").text('�����ѽӵ�');
    // $("#tabThird").text('������');
    // $("#tabFourth").text('������');
    // $("#btnRight").text('ȡ������');

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
    // console.log("�˿���");
    // $("#orderStatus").css("background-image","url(../../images/order-detail/refund.png)");

    // $("#status").text('�˿���');
    // $("#explanation").text('ϵͳ����72Сʱ���˿�');
    // $("#tabFirst").text('�������ύ');
    // $("#tabSecond").text('�����ѽӵ�');
    // $("#tabThird").text('�˿���');
    // $("#tabFourth").text('�˿�ɹ�');

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
    console.log("�ѽӵ�");

    if(isPayOff == "0"){
      console.log("����״̬��������");
      $("#orderStatus").css("background-image","url(../../images/order-detail/get-order.png)");

      $("#status").text('�����ѽӵ�');
      $("#explanation").text('��֧��������ò��ȴ��������ŷ�����Ҳ�����ڹ��˷�����ɺ��ٸ���Ŷ');
      $("#tabFirst").text('�������ύ');
      $("#tabSecond").text('�����˽ӵ�');
      $("#tabThird").text('������');
      $("#tabFourth").text('������');
      $("#btnLeft").text('ȡ������');
      $("#btnRight").text('֧��');

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
          UpdataOrder(Token,OrderId);
        })
      })

      $("#btnRight").click(function(){

      })
    }
    // if(hasPaied == "1"){
    //   console.log("����״̬������");
    // }
    if(payLock == "1"){
      console.log("������");
      $("#orderStatus").css("background-image","url(../../images/order-detail/paying.png)");

      $("#status").text('������');
      $("#explanation").text('�ȴ�֧�����');
      $("#tabFirst").text('�������ύ');
      $("#tabSecond").text('�����ѽӵ�');
      $("#tabThird").text('������');
      $("#tabFourth").text('������');

      $("#tabThird").addClass("processing");
      $("#roundFirst").addClass("round-complete");
      $("#roundSecond").addClass("round-complete");
      $("#roundThird").addClass("round-processing");
      $("#roundFourth").addClass("round-undone");

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

    $("#status").text('�����ѽӵ�');
    $("#explanation").text('��֧��������ò��ȴ��������ŷ�����Ҳ�����ڹ��˷�����ɺ��ٸ���Ŷ');
    $("#tabFirst").text('�������ύ');
    $("#tabSecond").text('�����˽ӵ�');
    $("#tabThird").text('������');
    $("#tabFourth").text('������');
    $("#btnLeft").text('ȡ������');
    $("#btnRight").text('֧��');

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
        UpdataOrder(Token,OrderId);
      })
    })

    break;

    case "30":
    console.log("�����");
    $("#orderStatus").css("background-image","url(../../images/order-detail/awaiting-assessment.png)");

    Date.prototype.Format = function (fmt) { //��ʽ��ʱ��
      var o = {
        "M+": this.getMonth() + 1, //�·� 
        "d+": this.getDate(), //�� 
        "h+": this.getHours(), //Сʱ 
        "m+": this.getMinutes(), //�� 
        "s+": this.getSeconds(), //�� 
        "q+": Math.floor((this.getMonth() + 3) / 3), //���� 
        "S": this.getMilliseconds() //���� 
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

    function DateDiff(sDate1, sDate2){//sDate1��sDate2��yyyy-MM-dd��ʽ  
      var aDate, oDate1, oDate2, iDays, iHours, diffText;
      aDate = sDate1.split("-");
      oDate1 = new  Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); 
      aDate = sDate2.split("-"); 
      oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); 
      iDays = parseInt(Math.abs(oDate1 - oDate2)/1000/60/60/24);   //�����ĺ�����ת��Ϊ���� 
      iHours = parseInt(Math.abs(oDate1 - oDate2)/1000/60/60%24);//��������Сʱ��
      diffText = iDays + "��" + iHours + "ʱ";
      return  diffText; 
    }
    var dateDiff = DateDiff(confirmTime,now);
    var dataDiffText = "��ȷ�Ϸ�����ɣ���ʣ" + dateDiff + "�Զ�ȷ��";
    console.log(dataDiffText);
    console.log(now);
    console.log(confirmTime);
    // console.log(ftime);

    $("#status").text('��������ɷ���');
    $("#explanation").text(dataDiffText);
    $("#tabFirst").text('�������ύ');
    $("#tabSecond").text('�����˽ӵ�');
    $("#tabThird").text('�Ѹ���');
    $("#tabFourth").text('ȷ�Ϸ������');
    $("#btnRight").text('ȷ�Ϸ������');

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
    $("#btnRight").click(function(Token,OrderId,Memo){
      confirmOrder(Token,OrderId,Memo);
    })

    break;

    case "40":
    console.log("�ͻ�ȷ����ɣ�������");

    $("#orderStatus").css("background-image","url(../../images/order-detail/awaiting-assessment.png)");

    $("#status").text('���������');
    $("#explanation").text('����һ����η����~');
    $("#tabFirst").text('�������ύ');
    $("#tabSecond").text('�����ѽӵ�');
    $("#tabThird").text('�������');
    $("#btnRight").text('����');

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

    $("#btnRight").click(function(Token,OrderId,Memo){
      confirmOrder(Token,OrderId,Memo);
    })

    break;
    // case "21":
    // console.log("������");
    // $("#orderStatus").css("background-image","url(../../images/order-detail/awaiting-assessment.png)");

    // $("#status").text('���������');
    // $("#explanation").text('����һ����η����~');
    // $("#tabFirst").text('�������ύ');
    // $("#tabSecond").text('�����ѽӵ�');
    // $("#tabThird").text('�������');
    // $("#btnRight").text('����');

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
    console.log("��ȡ��");
    if(orderIsGeted!=""){
      console.log('ȡ�������������Ѿ��ӵ�');
      $("#orderStatus").css("background-image","url(../../images/order-detail/canceled.png)");

      $("#status").text('������ȡ��');
      $("#explanation").text('�����Ѿ��ӵ������´������¹���Ŷ');
      $("#tabFirst").text('�������ύ');
      $("#tabSecond").text('�����ѽӵ�');
      $("#tabThird").text('������ȡ��');
      $("#btnRight").text('ɾ������');

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

    };
    if(orderIsGeted == ""){
      console.log("ȡ������������û�ӵ�");
     $("#orderStatus").css("background-image","url(../../images/order-detail/canceled.png)");

     $("#status").text('������ȡ��');
     $("#explanation").text('');
     $("#tabFirst").text('�������ύ');
     $("#tabSecond").text('������ȡ��');
     $("#btnRight").text('ɾ������');

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

    $("#btnRight").click(function(){
      $("#deleteOrder").css("display","block");
      removeOrder();
    })
    }
    
    break;

    /*--�˿�״̬--*/
    if(refundIsFinshed == "1"){
      console.log("�˿���");
      $("#orderStatus").css("background-image","url(../../images/order-detail/refund.png)");

      $("#status").text('�˿���');
      $("#explanation").text('ϵͳ����72Сʱ���˿�');
      $("#tabFirst").text('�������ύ');
      $("#tabSecond").text('�����ѽӵ�');
      $("#tabThird").text('�˿���');
      $("#tabFourth").text('�˿�ɹ�');
      $("#refundStatus").text('�˿���');

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
      console.log("�˿����");

      $("#status").text('������ȡ��');
      $("#explanation").text('');
      $("#tabFirst").text('�������ύ');
      $("#tabSecond").text('�����ѽӵ�');
      $("#tabThird").text('�˿�ɹ�');
      $("#tabFourth").text('������ȡ��');
      $("#refundStatus").text('�˿����');

      // $("#tabThird").addClass("processing");
      $("#roundFirst").addClass("round-undone");
      $("#roundSecond").addClass("round-undone");
      $("#roundThird").addClass("round-undone");
      $("#roundFourth").addClass("round-undone");
      $("#btnRight").addClass("delete-btn");
      $("#btnRight").click(function(){
        $("#deleteOrder").css("display","block");
        removeOrder();
      })
    }
  }



  function removeOrder(){
    console.log("ɾ������");
    $.ajax({
      type:"POST",
      url:"http://192.168.1.191:3003/api/v2/OrderInfo/RemoveOrderEx",
      data:{
        Token:"",
        OrderId:""
      },
      success:function(data){

      } 
    })
  }

      /*--��ӱ�ע--*/
/*--
  $("#addRemark").click(function(){
    console.log("��ʾ����");
    $("#userMemo").show();
  });
  $("#confirmBtn").click(function(){
    var memoText = $("#memoText").val();
    console.log(memoText);
    if(memoText != ""){
      memo();
    }else{
      console.log("���ύ");
    }
  })
  $("#cancelBtn,#confirmBtn").click(function(){
    $("#userMemo").hide();
  });
  // $("#addRemark").on("click",function(){
  //   console.log("��ʾ����");
  //   $("#userMemo").show();
  // })
  function memo(){
    console.log("���䱸ע");
    $.ajax({

    })
  }
  --*/
  function updateOrder(Token,OrderId){
    console.log("���¶���");
    $.ajax({
        type:"POST",
        url:"http://192.168.1.191:3003/api/v2/OrderInfo/CancelOrderEx",
        data:{
          Token:"",
          OrderId:""
        },
        success:function(data){

        }     
    })
  }
  function cancelOrder(Token,OrderId){
    console.log("ȡ������");
    $.ajax({
        type:"POST",
        url:"http://192.168.1.191:3003/api/v2/OrderInfo/CancelOrderEx",
        data:{
          Token:"",
          OrderId:""
        },
        success:function(data){

        }     
    })
  }
  function confirmOrder(Token,OrderId,Memo){
    console.log("ȷ�϶���");
    $.ajax({
      type:"POST",
      url:"http://192.168.1.191:3003/api/v2/OrderInfo/CompleteOrderEx",
      data:{
        Token:"",
        OrderId:"",
        Memo:""
      },
      success:function(data){

      }
    })
  } 
  function completeOrder(){
    console.log("��ɶ���");
    $.ajax({
      type:"POST",
      url:"http://192.168.1.191:3003/api/v2/OrderInfo/CompleteOrderEx",
      data:{
        Token:"",
        OrderId:""
      },
      success:function(data){

      }
    })
  }
  $("#toProviderDetail").on("click",function(){
    console.log('��ת����Ӧҳ��');
    // window.location.href="";
  });

});