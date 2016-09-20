$(function(){
	$(".fuwu-cont").click(function(){
		$(".kehu-pingjia").removeClass("active");
		$(this).addClass("active");
		$("#tab-kehu").css("display","none");
		$("#tab-fuwu").css("display","block");
	})
	$(".kehu-pingjia").click(function(){
		$(".fuwu-cont").removeClass("active");
		$(this).addClass("active");
		$("#tab-kehu").css("display","block");
		$("#tab-fuwu").css("display","none");
	})

	// 认证信息弹出层
	$('#container').on('click', '#showDialog2', function () {
	    $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
	        $('#dialog2').off('click').hide();
	    });
	});

// 轮播图弹出效果---------------------------------------------
    var swiper = new Swiper('.swiper-container', {
            //pagination: '.swiper-pagination',
            initialSlide :0,
            slidesPerView: 2,
            paginationClickable: true,
            spaceBetween: 0,
            touchRatio:1,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true//修改swiper的父元素时，自动初始化swiper
    });
	$("#showSlide").click(function(){
		ShowDiv('MyDiv','fade');
	});
	$(".black_overlay").click(function(){
		CloseDiv('MyDiv','fade');
	});


// jax--------------------------------------------------------
// 加载页面其他数据
    var Type=getUrl('type');
    var Id=getUrl('markid');
    $.ajax({
    	type: 'POST',
        url: 'http://192.168.1.191:3001/api/v2/Provider/Detail',
        dataType: 'json',
        data:{
            Type:Type,
            Id:Id
        },
    	success:function(data){
            var api=data.Body.Business;
            $(".bus-img").attr("src",api.Photo);
    		$(".bus-name").text(api.DefaultService.Name);
    		$(".PraiseCount").text(api.PraiseCount);
    		$(".FavoriteCount").text(api.FavoriteCount);
    		$(".wk-list").text(api.Intro);
    	    $(".address").text(api.Address);
    		$(".jl-num").text(api.Distance);
    		$(".OrderCount").text(api.OrderCount);
    		$(".OrderRank").text(api.OrderRank);
    		$(".PhoneCount").text(api.PhoneCount);
    		$(".PhoneRank").text(api.PhoneRank);
    		$(".Grade").text(api.Grade);
    		$(".GradeRank").text(api.GradeRank);
            $(".phoneNo").attr("href","tel:"+api.PhoneNumber);
            $(".business-mes").attr("href","business-message.html?type="+Type+"&id="+Id);
            $(".a-tag").attr("href","business-tags.html?markid="+Id);

            // 认证集合
    		var RzImgs="";
    		for (var i = 0; i < api.SystemCertification.length; i++) {
    			RzImgs+='<img src="'+api.SystemCertification[i].Image+'" class="rz-dia-img" alt="">';
    		}
    		$(".rz-imgs").html(RzImgs);

    		var ModelRzImgs="";
    		for (var j = 0; j < api.SystemCertification.length; j++) {
    			ModelRzImgs+='<li><img src="'+api.SystemCertification[j].pic+'" class="rz-dia-img" alt=""><span class="rz-name">'+api.SystemCertification[j].Name+'</span></li>';
    		}
    		$(".dialog-imgs").html(ModelRzImgs);


    		
    	},
    	error: function(xhr, type){
            alert('Ajax error!');
            // 即使加载出错，也得重置
            me.resetload();
        }
    });

    // 加载商户头像列表
    $.ajax({
        type: 'POST',
        url: 'http://192.168.1.191:3001/api/v2/Provider/Avatar',
        dataType: 'json',
        data:{
            Type:Type,
            Id:Id
        },
        success:function(data){
            var imgs_api=data.Body.Avatars;
            var imgs_res="";
            for (var i = 0; i <imgs_api.length; i++) {
                imgs_res+='<div class="swiper-slide"><img src="'+imgs_api[i]+'" class="swiper-img" alt=""></div>';            
            }
            $(".swiper-wrapper").html(imgs_res);

            
        },
        error: function(xhr, type){
            alert('Ajax error!');
            // 即使加载出错，也得重置
            me.resetload();
        }
    });

    //上滑加载"服务内容"更多数据--------------------------------
    var counter = 0;  
    var num = 5;// 每页展示5个
    var pageStart = 0,pageEnd = 0;
    $('#tab-fuwu').dropload({
        scrollArea : window,
        loadDownFn : function(me){
            $.ajax({
                type: 'POST',
                url: 'http://192.168.1.191:3001/api/v2/ClientInfo/GetMerchantServiceListEx',
                dataType: 'json',
                data:{
                    MerchantId:Id
                },
                success: function(data){ 
                    var ser_api=data.Body.ServiceTypeList;        
                    var result = '';
                    counter++;
                    pageEnd = num * counter;
                    pageStart = pageEnd - num;

                    for(var i = pageStart; i < pageEnd; i++){
                        result  +='<a class="weui_media_box weui_media_appmsg" href="javascrit:void(0);">'
                                +' <div class="weui_media_hd"><img src="'+ser_api[i].PicPath+'" alt="" class="weui_media_appmsg_thumb"></div>'
                                +'<div class="weui_media_bd"><h4 class="weui_media_title">'+ser_api[i].ServiceName+'</h4>'
                                +'<p class="weui_media_desc">'+ser_api[i].ServiceTypeName+'</p>'
                                +'<span class="price">￥<span class="tab-price">'+ser_api[i].Price+'</span>/小时</span>'
                                +'</div></a>';

                        if((i + 1) >=ser_api.length){
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                            break;
                        }
                    }
                    $('.lists').append(result);
                    // 每次数据加载完，必须重置
                    me.resetload();
                },
                error: function(xhr, type){
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        }
    });

    //上滑加载"客户评价"更多数据--------------------------------
    var counter2 = 0;
    var num2 = 5;// 每页展示5个
    var pageStart2 = 0,pageEnd2 = 0;
    $('#tab-kehu').dropload({
        scrollArea : window,
        loadDownFn : function(me){
            $.ajax({
                type: 'POST',
                url: 'http://192.168.1.191:3003/api/v2/Evaluation/GetMerchantEvaluationList',
                dataType: 'json',
                data:{
                    ID:Id
                },
                
                success: function(data){ 
                    if(data.Body){
                        // var result = '';
                        // counter2++;
                        // pageEnd2 = num2 * counter2;
                        // pageStart2 = pageEnd2 - num2;
                        
                        // for(var i = pageStart2; i < pageEnd2; i++){
                        //     var res='';
                        //     if(data.Pingjia[i].xin<5){
                        //         for(var j = 1; j <= data.Pingjia[i].xin; j++){
                        //             res+='<img src="/images/business-detail/ic_xin_sel.svg" alt="" class="kehu-xin">'
                        //         }
                        //         var x=5-data.Pingjia[i].xin;
                        //         for(var m = 1; m <= x; m++){
                        //             res+='<img src="/images/business-detail/ic_xin_nor.svg" alt="" class="kehu-xin">'
                        //          }
                        //     }else{
                        //         for(var k = 1; k <= 5; k++){
                        //             res+='<img src="/images/business-detail/ic_xin_sel.svg" alt="" class="kehu-xin">'
                        //          }
                        //     }   

                        //     result  +='<div class="kehu-item"><div class="kehu-top"><img src="../../images/business-detail/bus-img.png" alt="" class="kehu-img">'
                        //         +'<span class="kehu-name">'+data.Pingjia[i].name+'</span>'
                        //         +'<span class="kehu-time">'+data.Pingjia[i].date+'</span>'
                        //         +'<div class="kehu-heart">'+res
                        //         +'<span class="kehu-pingfen">'+data.Pingjia[i].xin+'</span></div></div>'
                        //         +'<div class="clear"></div><div class="kehu-cont">'+data.Pingjia[i].cont+'</div></div>';

                        //     if((i + 1) >= data.Pingjia.length){
                        //         // 锁定
                        //         me.lock();
                        //         // 无数据
                        //         me.noData();
                        //         break;
                        //     }
                        // }
                        // // 为了测试，延迟1秒加载
                        // setTimeout(function(){
                        //     $('.kehu-list').append(result);
                        //     // 每次数据加载完，必须重置
                        //     me.resetload();
                        // },1000);               
                    }else{
                        $('#tab-kehu').find('.no-fuwu').show();
                    }
                    
                       
                    
                },
                error: function(xhr, type){
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        }
    });

    //获取工人标签
    $.ajax({
        type: 'POST',
        url: 'http://192.168.1.191:3001/api/v2/Business/GetMerchantTags',
        dataType: 'json',
        data:{
            BusinessId:Id
        },
        success:function(data){
            var api=data.Body.TagList;
            var res="";
            for (var i = 0; i < api.length; i++) {
                res+="<span class='Tag TagName'>"+api[i].TagName+"</span>";
            }
            
            if(api.length==0){
                $(".worker-tag").css("display","none");
            }

            $(".tab-num").text(api.length);
            $(".worker-tag-box").html(res);

        },
        error: function(xhr, type){
           alert('Ajax error!');
           // 即使加载出错，也得重置
           me.resetload();
        }
    });

});

function ShowDiv(show_div,bg_div){
    document.getElementById(show_div).style.display='block';
    document.getElementById(bg_div).style.display='block' ;
    var bgdiv = document.getElementById(bg_div);
    bgdiv.style.width = document.body.scrollWidth; 
    // bgdiv.style.height = $(document).height();
    $("#"+bg_div).height($(document).height());
};

//关闭弹出层
function CloseDiv(show_div,bg_div)
{
    $('#'+show_div).hide();
    $('#'+bg_div).hide();
};

// 获取地址传参
function getUrl(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
} 