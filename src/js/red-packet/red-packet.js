$(function(){
	var token = window.localStorage.getItem("Token");
	console.log(token);

	// 头部菜单切换效果
	$(".red-state li").each(function(){
		$(this).click(function(){
			$(".red-state li").each(function(i,item){
	             $(item).removeClass("active");
			})
			$(this).addClass("active");
		})
	})


	$.ajax({
        type: 'POST',
        url: 'http://wapapi.zhujiash.com/api/v2/Coupon/CouponList',
        dataType: 'json',
        async:false,
        data:{
    		Token:token
        },
        success:function(data){
        	var api=data.Body.CouponList;
        	res_0="";
        	res_1="";
        	res_2="";
        	var ServiceNames=""; //品类名称

        	for (var i=0;i<api.length;i++) {
        		if(api[i].ServiceTypes.length==0){
        			ServiceNames="全品类使用";
        		}else{
        			for(var j=0;j<api[i].ServiceTypes.length;j++){
	        			ServiceNames+=api[i].ServiceTypes[j].ServiceName;
	        		}
        		}
        		
        		var IsUsed=api[i].IsUsed; //是否可用
        		var Id=api[i].Id;
        		var DiscountAmount=parseInt(api[i].CouponDetails[0].DiscountAmount);// 红包金额
        		var Amount=parseInt(api[i].CouponDetails[0].Amount); //满减金额
        		var StartTime=api[i].StartTime.substr(0,10); //起始时间
        		var EndTime=api[i].EndTime.substr(0,10);  //结束时间
 		
        		var now_time=Date.parse(new Date())/1000; //当前时间的时间戳
        		var end_time=Date.parse(EndTime)/1000;    //结束时间时间戳
        		var flag=(now_time<end_time)?true:false;  //true是未使用  false是已过期


        		// 未使用
        		if(IsUsed==0 && flag){
					res_0+='<div class="red-item" Id='+Id+' DiscountAmount='+DiscountAmount+' Amount='+Amount+'><div class="item-left"><div class="price"><span class="rmb">￥</span><span class="DiscountAmount">'+DiscountAmount+'</span></div><div class="Amount">满'+Amount+'可用</div></div><div class="item-right"><div class="red-name">闪付红包</div><ul class="red-rule"><li class="ServiceTypes">'+ServiceNames+'</li><li><span class="StartTime">'+StartTime+'</span>至<span class="EndTime">'+EndTime+'</span></li></ul></div></div>';
					$(".red-list").html(res_0);
        		}

				// 已使用
        		if(IsUsed==1){
    				res_1+='<div class="red-item" Id='+Id+' DiscountAmount='+DiscountAmount+' Amount='+Amount+'><div class="item-left"><div class="price"><span class="rmb">￥</span><span class="DiscountAmount">'+DiscountAmount+'</span></div><div class="Amount">满'+Amount+'可用</div></div><div class="item-right"><div class="red-name">闪付红包</div><ul class="red-rule"><li class="ServiceTypes">'+ServiceNames+'</li><li><span class="StartTime">'+StartTime+'</span>至<span class="EndTime">'+EndTime+'</span></li></ul></div></div>';
        		}
        		// 已过期
        		if(now_time>end_time){
        			res_2+='<div class="red-item" Id='+Id+' DiscountAmount='+DiscountAmount+' Amount='+Amount+'><div class="item-left"><div class="price"><span class="rmb">￥</span><span class="DiscountAmount">'+DiscountAmount+'</span></div><div class="Amount">满'+Amount+'可用</div></div><div class="item-right"><div class="red-name">闪付红包</div><ul class="red-rule"><li class="ServiceTypes">'+ServiceNames+'</li><li><span class="StartTime">'+StartTime+'</span>至<span class="EndTime">'+EndTime+'</span></li></ul></div></div>';
        		}
		
        	};    	
            
        },
        error: function(xhr, type){
        }
	});

	$("#unuse").click(function(){
		$(".red-list").html(res_0);
	})
	$("#used").click(function(){
		$(".red-list").html(res_1);
		NoUse();

	})
	$("#delay").click(function(){
		$(".red-list").html(res_2);
		NoUse();
	})

})

// 未使用和已过期的效果
function NoUse(){
	$(".red-item").css("background-image","url(/images/red-packet/bg-n.png)");
	$(".item-left").css("color","#ccc");
	$(".rmb").css("color","#ccc");
	$(".red-name").css("color","#ccc");
	$(".red-rule").css("color","#ccc");
}

// // 获取红包信息
// function GetRedInfo(){
//     $(".red-item").each(function(){
//         $(this).click(function(){
//             var Id=$(this).attr("Id");
//             var DiscountAmount=$(this).attr("DiscountAmount");
//             var Amount=$(this).attr("Amount");

//             var jsonstr={ "Id":Id, "DiscountAmount":DiscountAmount,"Amount":Amount};

//             alert(jsonstr.Id);
//             alert(jsonstr.DiscountAmount);
//             alert(jsonstr.Amount);

//         })
//     }); 
// }
