$(function(){

	var Type=getUrl('type');
    var Id=getUrl('id');
    $.ajax({
	    dataType:"json",
	    type:"POST",
	    url: CONFIG.IP+"api/v2/Provider/Detail",
	    data:{
	        Type:Type,
	        Id:Id
	    },
	    success:function(data){
            if(data.Body){
                var api=data.Body.Business;
                $(".Number").text(api.Number);
                $(".region").text(api.EstablishedTime);
                $(".Area").text(api.Area);
                $(".Scale").text(api.Scale);
                $(".Property").text(api.Property);
                $(".StaffNumber").text(api.StaffNumber);
                $(".Signature").text(api.Signature);
                $(".ServiceTime").text(api.ServiceTime);
                $(".Address").text(api.Address);
                $(".ServiceScope").text(api.ServiceScope);
                $(".Intro").text(api.Intro);
                $(".ServiceScope").text(api.ServiceScope);

                if(api.SystemCertification.length){
                    var ModelRzImgs="";
                    for (var j = 0; j < api.SystemCertification.length; j++) {
                        ModelRzImgs+='<li><img src="'+api.SystemCertification[j].Image+'" class="sys-img" alt=""><span class="rz-name">'+api.SystemCertification[j].Name+'</span></li>';
                    }
                    $(".items").html(ModelRzImgs);  
                }
                              
            }

	        
	    },
	    error: function(xhr, type){
	        console.log('Ajax error!');
            // 即使加载出错，也得重置
            me.resetload();
	    }
	});

	// 获取商户标签
	$.ajax({
        type: 'POST',
        url: CONFIG.IP+'api/v2/Business/GetMerchantTags',
        dataType: 'json',
        data:{
            BusinessId:Id
        },
        success:function(data){
            if(data.Body){
                var api=data.Body.TagList;
                if(api.length==0){
                    $(".business-tag").css("display","none");
                    $(".hide-line").css("display","none");
                }else{
                    var res="";
                    for (var i = 0; i < api.length; i++) {
                        res+="<li>"+api[i].TagName+"</li>";
                    }
                    $(".tag-item").html(res);

                    $(".business-tag").css("display","block");
                    $(".hide-line").css("display","block");
                }                   
            }
        },
        error: function(xhr, type){
           console.log('Ajax error!');
           // 即使加载出错，也得重置
           me.resetload();
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