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
            slidesPerView: 1,
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
            if(data.Body){
                var api=data.Body.Worker;;
                $(".bus-img").attr("src",api.Photo);
                $(".bus-name").text(api.Name);
                $(".age").text(api.Age);
                $(".PraiseCount").text(api.PraiseCount);
                $(".FavoriteCount").text(api.FavoriteCount);
                $(".wk-list").text(api.DefaultService.Name);
                $(".wage").text(api.Wage);
                $(".address").text(api.Address);
                $(".jl-num").text(api.Distance);
                $(".OrderCount").text(api.OrderCount);
                $(".OrderRank").text(api.OrderRank);
                $(".PhoneCount").text(api.PhoneCount);
                $(".PhoneRank").text(api.PhoneRank);
                $(".Grade").text(api.Grade);
                $(".GradeRank").text(api.GradeRank);
                $(".phoneNo").attr("href","tel:"+api.PhoneNumber);
                $(".business-mes").attr("href","worker-message.html?type="+Type+"&markid="+Id);
                $(".a-tag").attr("href","worker-tags.html?markid="+Id);
                $(".join_now").attr("href","/template/quick-order/quick-order.html?channel=1");

                // 男女图标
                if (api.Gender == "1") {
                    $(".sex").attr("src", "../../images/worker/ic_nv.svg");
                } else {
                    $(".sex").attr("src", "../../images/worker/ic_nan.svg");

                }

                // 认证集合
                var RzImgs="";
                var ModelRzImgs="";
                for (var i = 0; i < api.SystemCertification.length; i++) {
                    RzImgs+='<img src="'+api.SystemCertification[i].Image+'" class="rz-dia-img" alt="" onerror=this.src="http://www.guaiguai.com/attachments/201503/24/16/3symdnhef.png">';

                     ModelRzImgs+='<li><img src="'+api.SystemCertification[i].Image+'" class="rz-dia-img" alt="" onerror=this.src="http://www.guaiguai.com/attachments/201503/24/16/3symdnhef.png"><span class="rz-name">'+api.SystemCertification[i].Name+'</span></li>';

                }
                $(".rz-imgs").html(RzImgs);
                $(".dialog-imgs").html(ModelRzImgs);
                       
            }
    		
    	},
    	error: function(xhr, type){
            console.log('Ajax error!');
        }
    });

    // 加载工人头像列表
    $.ajax({
        type: 'POST',
        url: 'http://192.168.1.191:3001/api/v2/Provider/Avatar',
        dataType: 'json',
        data:{
            Type:Type,
            Id:Id
        },
        success:function(data){
            if(data.Body){
                var imgs_api=data.Body.Avatars;
                var imgs_res="";
                for (var i = 0; i <imgs_api.length; i++) {
                    imgs_res+='<div class="swiper-slide"><img src="'+imgs_api[i]+'" class="swiper-img" alt="" onerror=this.src="http://www.guaiguai.com/attachments/201503/24/16/3symdnhef.png"></div>';            
                }
                $(".swiper-wrapper").html(imgs_res); 
            }
            

            
        },
        error: function(xhr, type){
            console.log('Ajax error!');
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
                url: 'http://192.168.1.191:3003/api/v2/Evaluation/GetWorkerEvaluationList',
                dataType: 'json',
                data:{
                    ID:Id
                },

                success: function(data){
                    
                    if(data.Body){
                        var api = data.Body.EvaluationList;
                        var result = '';
                        counter2++;
                        pageEnd2 = num2 * counter2;
                        pageStart2 = pageEnd2 - num2;

                        for(var i = pageStart2; i < pageEnd2; i++){
                            var res_xin = '';
                            if (api[i].Score == 0) {
                                for (var m = 0; m < 5; m++) {
                                    res_xin += '<img src="../../images/worker/ic_xin_nor.svg"  class="xingx-img" alt=""/>';
                                }
                            }else if(api[i].Score == 5) {
                                for (var k = 0; k < 5; k++) {
                                    //console.log(res_xin);
                                    res_xin += '<img src="../../images/worker/ic_xin_sel.svg"  class="xingx-img" alt=""/>';
                                }
                            }else {
                                var x = 5 - api[i].Score;
                                for (var n = 0; n <= api[i].Score; n++) {
                                    res_xin += '<img src="../../images/worker/ic_xin_sel.svg"  class="xingx-img" alt=""/>';
                                }
                                for (var j = 1; j <= x; j++) {
                                    res_xin += '<img src="../../images/worker/ic_xin_nor.svg"  class="xingx-img" alt=""/>';
                                }
                            }

                            result  +='<div class="kehu-item"><div class="kehu-top"><img src="'+api[i].Pictures.SmallPic+'" alt="" class="kehu-img" onerror=this.src="http://www.guaiguai.com/attachments/201503/24/16/3symdnhef.png">'
                                +'<span class="kehu-name">'+api[i].ClientName+'</span>'
                                +'<span class="kehu-time">'+api[i].Date+'</span>'
                                +'<div class="kehu-heart">'+res_xin
                                +'<span class="kehu-pingfen">'+api[i].Score+'</span></div></div>'
                                +'<div class="clear"></div><div class="kehu-cont">'+api[i].Content+'</div></div>';

                            if((i + 1) >= api.length){
                                // 锁定
                                me.lock();
                                // 无数据
                                me.noData();
                                break;
                            }
                        }

                            $('.kehu-list').append(result);
                            // 每次数据加载完，必须重置
                            me.resetload();
                    }else{
                        $('#tab-kehu').find('.no-fuwu').show();
                    }



                },
                error: function(xhr, type){
                    console.log('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        }
    });

    //获取工人标签
    $.ajax({
        type: 'POST',
        url: 'http://192.168.1.191:3001/api/v2/Worker/GetWorkerTags',
        dataType: 'json',
        data:{
            WorkerId: Id
        },
        success:function(data){
            if(data.Body){
                var api=data.Body.TagList;
                if(!api.length==0){
                    var res="";
                    for (var i = 0; i < api.length; i++) {
                        res+="<span class='Tag TagName'>"+api[i].TagName+"</span>";
                    }
                    var all_tag_jtml='<a href="" class="a-tag"><p class="font-alltag">全部标签<span class="tab-num"></span><img src="/images/business-detail/blue-arrows.png" alt="" class="blue-jiantou"></p></a>';
                    $(".tab-num").text(api.length);
                    $(".worker-tag-box").html(res);
                    $(".worker-tag").append(all_tag_jtml);
                    $(".worker-tag").css("display","block");
                }else{
                    $(".worker-tag").css("display","none");
                }         
            }
            


        },
        error: function(xhr, type){
           console.log('Ajax error!');
        }
    });

    //获取工人活动
    var token = window.localStorage.getItem("Token");
    $.ajax({
        type: 'POST',
        url: 'http://192.168.1.191:3001/api/v2/SystemService/GetActivity',
        dataType: 'json',
        data:{
            Token:token,
            ServiceTypeId:"0"
        },
        success:function(data){
            if(data.Body){
                var api=data.Body.XXX;
                if(api.length){
                    var res="";
                    for (var i = 0; i < api.length; i++) {
                        res+='<div class="ac_detail"><span class="youhui_info">'+XXX+'</span></div>';
                    }
                    $(".ac_list").html(res);
                }        
            }
        },
        error: function(xhr, type){
           console.log('Ajax error!');
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