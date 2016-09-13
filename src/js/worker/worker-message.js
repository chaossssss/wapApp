/**
 * Created by Administrator on 2016/9/13.
 */
'use strict'
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
    },
    //error: function(xhr, type){
    //    console("type");
    //}
})