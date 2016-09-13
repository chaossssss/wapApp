'use strict'
// ��֤��Ϣ������
$('#authenticate').click(function(){
    $('#dialog2').show();
})
$('.defaults').click(function(){
    $('#dialog2').hide();
})


$('.dianhua-img').click(function(){
    $('.weui_dialog_alert').show();
})
$('.xx-img').click(function(){
    $('.weui_dialog_alert').hide();
})
//var aj = $.ajax({
//    url: "http://192.168.1.191:3003/api/v1/Provider/Detail",
//    data: {
//        Id:"qqq"
//    },
//    type: 'post',
//    cache: false,
//    dataType: 'json',
//    success: function (data) {
//        if (data.msg == "true") {
//            alert("成功");
//            window.location.reload();
//        } else {
//            //view(data.msg);
//        }
//    },
//    error: function () {
//        alert("失败");
//    }
//});


$.ajax({

    dataType:"json",
    type:"POST",
    url: "http://192.168.1.191:3001/api/v2/Provider/Detail",
    data:{
        Type:"1",
        Id:"3110"
    },

    success:function(data){
        var api=data.Body.Worker;
        $(".Name").text(api.Name);
        $(".bus-img").text(api.Photo);
        $(".Gender").text(api.Gender);
        $(".Age").text(api.Age);
        $(".jl-num").text(api.Distance);
        $(".WorkingYears").text(api.WorkingYears);
        $(".PraiseCount").text(api.PraiseCount);
        $(".Grade").text(api.Grade);
        $(".PhoneNumber").text(api.PhoneNumber);
        $(".FavoriteCount").text(api.FavoriteCount);
        $(".Wage").text(api.Wage);
        $(".NativePlace").text(api.NativePlace);
        $(".WorkingYears").text(api.WorkingYears);
        $(".addresss").text(api.Address);
        $(".Distance").text(api.Distance);
        $(".OrderCount").text(api.OrderCount);
        $(".OrderRank").text(api.OrderRank);
        $(".PhoneCount").text(api.PhoneCount);
        $(".PhoneRank").text(api.PhoneRank);
        $(".GradeRank").text(api.GradeRank);





    },
    //error: function(xhr, type){
    //    console("type");
    //}
})