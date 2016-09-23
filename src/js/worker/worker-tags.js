$(function(){
    var Type=getUrl('type');
    var Id=getUrl('markid');
    //获取商户标签
    $.ajax({
        type: 'POST',
        url: 'http://192.168.1.191:3001/api/v2/Worker/GetWorkerTags',
        dataType: 'json',
        data:{
            BusinessId:Id
        },
        success:function(data){
            if(data.Body){
                var api=data.Body.TagList;
                if(api.length){
                    var res="";
                    for (var i = 0; i < api.length; i++) {
                        res+="<li>"+api[i].TagName+"</li>";
                    }

                    $(".tag-num").text(api.length);
                    $(".tag-item").html(res); 
                }               
            }            
        },
        error: function(xhr, type){
           alert('Ajax error!');
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