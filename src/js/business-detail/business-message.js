$(function(){

	var Type=getUrl('type');
    var Id=getUrl('id');
    $.ajax({
	    dataType:"json",
	    type:"POST",
	    url: "http://192.168.1.191:3001/api/v2/Provider/Detail",
	    data:{
	        Type:Type,
	        Id:Id
	    },
	    success:function(data){
	        var api=data.Body.Business;
	        $(".Number").text(api.Number);
	        $(".region").text(api.EstablishedTime);
	        $(".Area").text(api.Area);
	        $(".Scale").text(api.Scale);
	        $(".Property").text(api.Property);
	        $(".StaffNumber").text(api.StaffNumber);
	        //$(".Signature").text(api.Signature);
	        $(".ServiceTime").text(api.ServiceTime);
	        $(".Address").text(api.Address);
	        $(".ServiceScope").text(api.ServiceScope);
	        $(".Intro").text(api.Intro);
	        $(".ServiceScope").text(api.ServiceScope);

	        var ModelRzImgs="";
    		for (var j = 0; j < api.SystemCertification.length; j++) {
    			ModelRzImgs+='<li><img src="'+api.SystemCertification[j].pic+'" class="sys-img" alt=""><span class="rz-name">'+api.SystemCertification[j].Name+'</span></li>';
    		}
    		$(".items").html(ModelRzImgs);




	        
	    },
	    error: function(xhr, type){
	       console("type");
	    }
	});
});

// 获取地址传参
function getUrl(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
} 