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
//    url: 'http://www.xxxx.com/api/v2/Evaluation/GetWorkerEvaluationList',
//    data: {
//       ID:'worker-Detail.Id',
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