/**
 * Created by Administrator on 2016/9/13.
 */

$.ajax({

    dataType:"json",
    type:"POST",
    url: "http://192.168.1.191:3001/api/v2/Provider/Detail",
    data:{
        Type:"Type",
        Id:"Id"
    },

    success:function(data){
        var api=data.Body.Worker;
        $(".JobNumber").text(api.JobNumber);
        $(".NativePlace").text(api.NativePlace);
        $(".Education").text(api.Education);
        $(".Stature").text(api.Stature);
        $(".Weight").text(api.Weight);
        $(".WorkingYears").text(api.WorkingYears);
        $(".Hobby").text(api.Hobby);
        $(".BloodType").text(api.BloodType);
        $(".Constellation").text(api.Constellation);
        $(".Signature").text(api.Signature);
        $(".ServiceTime").text(api.ServiceTime);
        $(".ServiceScope").text(api.ServiceScope);
        $(".Intro").text(api.Intro);
        $(".Address").text(api.Address);
        var ModelRzImgs="";
        for (var j = 0; j < api.SystemCertification.length; j++) {
            ModelRzImgs+='<li><img src="'+api.SystemCertification[j].pic+'" class="sys-img" alt=""><span class="rz-name">'+api.SystemCertification[j].Name+'</span></li>';
        }
        $(".items").html(ModelRzImgs);
    },
    //error: function(xhr, type){
    //    console("type");
    //}
})