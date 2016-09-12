$(function(){
    var swiper = new Swiper('.swiper-container', {
        //pagination: '.swiper-pagination',
        initialSlide:0,
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 0,
        touchRatio:1,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true//修改swiper的父元素时，自动初始化swiper
    });

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

	// 轮播图弹出层
	$('#container').on('click', '#showDialog1', function () {
	    $('#dialog1').show().on('click', '.weui_btn_dialog', function () {
	        $('#dialog1').off('click').hide();
	    });
	});


	// 认证信息弹出层
	$('#container').on('click', '#showDialog2', function () {
	    $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
	        $('#dialog2').off('click').hide();
	    });
	});

// 轮播图弹出效果---------------------------------------------
	//弹出隐藏层
	$("#showSlide").click(function(){
		ShowDiv('MyDiv','fade');
	});
	$(".black_overlay").click(function(){
		CloseDiv('MyDiv','fade');
	});


// jax--------------------------------------------------------
// 加载页面其他数据
    $.ajax({
    	type: 'POST',
        url: 'http://192.168.1.191:3003/api/v2/Provider/Detail',
        dataType: 'json',
        data:{
            Type:"1",
            Id:"59"
        },
    	success:function(data){
    		
    		$(".bus-img").attr("src",data.Photo);
    		$(".bus-name").text(data.Name);
    		$(".PraiseCount").text(data.PraiseCount);
    		$(".FavoriteCount").text(data.FavoriteCount);
    		$(".wk-list").text(data.ServiceScope);
    		$(".address").text(data.Address);
    		$(".jl-num").text(data.Distance);
    		$(".OrderCount").text(data.OrderCount);
    		$(".OrderRank").text(data.OrderRank);
    		$(".PhoneCount").text(data.PhoneCount);
    		$(".PhoneRank").text(data.PhoneRank);
    		$(".Grade").text(data.Grade);
    		$(".GradeRank").text(data.GradeRank);

    		var RzImgs="";
    		for (var i = 0; i < data.Rzimgs.length; i++) {
    			RzImgs+='<img src="'+data.Rzimgs[i].pic+'" class="rz-dia-img" alt="">';
    		}
    		$(".rz-imgs").html(RzImgs);

    		var ModelRzImgs="";
    		for (var j = 0; j < data.Rzimgs.length; j++) {
    			ModelRzImgs+='<li><img src="'+data.Rzimgs[j].pic+'" class="rz-dia-img" alt=""><span class="rz-name">'+data.Rzimgs[j].title+'</span></li>';
    		}
    		$(".dialog-imgs").html(ModelRzImgs);


    		
    	},
    	error: function(xhr, type){
            alert('Ajax error!');
            // 即使加载出错，也得重置
            me.resetload();
        }
    });

    //上滑加载"服务内容"更多数据--------------------------------
    // var counter = 0;  
    // var num = 5;// 每页展示5个
    // var pageStart = 0,pageEnd = 0;
    // $('#tab-fuwu').dropload({
    //     scrollArea : window,
    //     loadDownFn : function(me){
    //         $.ajax({
    //             type: 'GET',
    //             // url: 'http://192.168.1.191:7002/api/v2/OrderInfoController/GetOrderInfoEx',
    //             url: '',
    //             dataType: 'json',

    //             success: function(data){         
    //                 var result = '';
    //                 counter++;
    //                 pageEnd = num * counter;
    //                 pageStart = pageEnd - num;

    //                 for(var i = pageStart; i < pageEnd; i++){
    //                     result  +=   '<a class="weui_media_box weui_media_appmsg" href="javascrit:void(0);">'
    //                             +' <div class="weui_media_hd"><img src="'+data.Services[i].pic+'" alt="" class="weui_media_appmsg_thumb"></div>'
    //                             +'<div class="weui_media_bd"><h4 class="weui_media_title">'+data.Services[i].title+'</h4>'
    //                             +'<p class="weui_media_desc">'+data.Services[i].date+'</p>'
    //                             +'<p class="tab-price">'+data.Services[i].link+'</p>'
    //                             +'</div></a>';

    //                     if((i + 1) >= data.Services.length){
    //                         // 锁定
    //                         me.lock();
    //                         // 无数据
    //                         me.noData();
    //                         break;
    //                     }
    //                 }
    //                 // 为了测试，延迟1秒加载
    //                 setTimeout(function(){
    //                     $('.lists').append(result);
    //                     // 每次数据加载完，必须重置
    //                     me.resetload();
    //                 },1000);
    //             },
    //             error: function(xhr, type){
    //                 alert('Ajax error!');
    //                 // 即使加载出错，也得重置
    //                 me.resetload();
    //             }
    //         });
    //     }
    // });

    //上滑加载"客户评价"更多数据--------------------------------
    // var counter2 = 0;
    // var num2 = 5;// 每页展示5个
    // var pageStart2 = 0,pageEnd2 = 0;
    // $('#tab-kehu').dropload({
    //     scrollArea : window,
    //     loadDownFn : function(me){
    //         $.ajax({
    //             type: 'GET',
    //             // url: 'http://192.168.1.191:7002/api/v2/OrderInfoController/GetOrderInfoEx',
    //             url: '',
    //             dataType: 'json',

    //             success: function(data){             
    //                 var result = '';
    //                 counter2++;
    //                 pageEnd2 = num2 * counter2;
    //                 pageStart2 = pageEnd2 - num2;
                    
    //                 for(var i = pageStart2; i < pageEnd2; i++){
    //             		var	res='';
    //             		if(data.Pingjia[i].xin<5){
    //             			for(var j = 1; j <= data.Pingjia[i].xin; j++){
    //             			 	res+='<img src="/images/business-detail/ic_xin_sel.svg" alt="" class="kehu-xin">'
    //             			}
    //             			var x=5-data.Pingjia[i].xin;
    //             			for(var m = 1; m <= x; m++){
    //             			 	res+='<img src="/images/business-detail/ic_xin_nor.svg" alt="" class="kehu-xin">'
    //             			 }
    //             		}else{
    //             			for(var k = 1; k <= 5; k++){
    //             			 	res+='<img src="/images/business-detail/ic_xin_sel.svg" alt="" class="kehu-xin">'
    //             			 }
    //             		}	

    // 					result  +='<div class="kehu-item"><div class="kehu-top"><img src="../../images/business-detail/bus-img.png" alt="" class="kehu-img">'
    // 						+'<span class="kehu-name">'+data.Pingjia[i].name+'</span>'
    // 						+'<span class="kehu-time">'+data.Pingjia[i].date+'</span>'
    // 						+'<div class="kehu-heart">'+res
    // 						+'<span class="kehu-pingfen">'+data.Pingjia[i].xin+'</span></div></div>'
    // 						+'<div class="clear"></div><div class="kehu-cont">'+data.Pingjia[i].cont+'</div></div>';

    //                     if((i + 1) >= data.Pingjia.length){
    //                         // 锁定
    //                         me.lock();
    //                         // 无数据
    //                         me.noData();
    //                         break;
    //                     }
    //                 }
    //                 // 为了测试，延迟1秒加载
    //                 setTimeout(function(){
    //                     $('.kehu-list').append(result);
    //                     // 每次数据加载完，必须重置
    //                     me.resetload();
    //                 },1000);
    //             },
    //             error: function(xhr, type){
    //                 alert('Ajax error!');
    //                 // 即使加载出错，也得重置
    //                 me.resetload();
    //             }
    //         });
    //     }
    // });

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
 document.getElementById(show_div).style.display='none';
 document.getElementById(bg_div).style.display='none';
};
