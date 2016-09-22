/**
 * Created by Administrator on 2016/9/13.
 */
"use strict"
$(function() {
    var Type = getUrl('type');
    var Id = getUrl('markid');
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "http://192.168.1.191:3001/api/v2/Provider/Detail",
        data: {
            Type:Type,
            Id:Id
        },
        success: function (data) {
            var api = data.Body.Worker;
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
            var ModelRzImgs = "";
            for (var j = 0; j < api.SystemCertification.length; j++) {
                ModelRzImgs += '<li><img src="' + api.SystemCertification[j].Image + '" class="sys-img" alt=""><span class="rz-name">' + api.SystemCertification[j].Name + '</span></li>';
            }
            $(".items").html(ModelRzImgs);
        },
        //error: function(xhr, type){
        //    console("type");
        //}
    })
    // ��ȡ�̻���ǩ
    $.ajax({
        type: 'POST',
        url: 'http://192.168.1.191:3001/api/v2/Worker/GetWorkerTags',
        dataType: 'json',
        data:{
            WorkerId:"1474"
        },
        success:function(data){
            var api=data.Body.TagList;
            var res="";
            for (var i = 0; i < api.length; i++) {
                res+="<li>"+api[i].TagName+"</li>";
            }

            if(api.length==0){
                $(".business-tag").css("display","none");
                $(".hide-line").css("display","none");
            }
            $(".tag-item").html(res);

        },
        error: function(xhr, type){
            alert('Ajax error!');
            // ��ʹ���س���Ҳ������
            me.resetload();
        }
    });
});
// ��ȡ��ַ����
function getUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //����һ������Ŀ�������������ʽ����
    var r = window.location.search.substr(1).match(reg);  //ƥ��Ŀ�����
    if (r != null) return unescape(r[2]);
    return null; //���ز���ֵ
}