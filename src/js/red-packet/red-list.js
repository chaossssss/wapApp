$(function(){
	var token = window.localStorage.getItem("Token");

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

				// 已使用 或 已过期（灰色）
        		if(IsUsed==1 || now_time>end_time){
    				res_1+='<div class="red-item-n" Id='+Id+' DiscountAmount='+DiscountAmount+' Amount='+Amount+'><div class="item-left-n"><div class="price"><span class="rmb-n">￥</span><span class="DiscountAmount">'+DiscountAmount+'</span></div><div class="Amount">满'+Amount+'可用</div></div><div class="item-right"><div class="red-name-n">闪付红包</div><ul class="red-rule-n"><li class="ServiceTypes">'+ServiceNames+'</li><li><span class="StartTime">'+StartTime+'</span>至<span class="EndTime">'+EndTime+'</span></li></ul></div></div>';
        		}

                $(".red-list").html(res_0+res_1);		
        	};    	
            
        },
        error: function(xhr, type){
        }
	});

})


