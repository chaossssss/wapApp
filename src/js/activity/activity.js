$(function(){
	// 下载页判断设备
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        $(".double_btn").html('<a href="javascript:;"><img src="images/btn_ios.png" alt="" class="btn_down"></a>');
    } else{
        $(".double_btn").html('<a href="javascript:;"><img src="images/btn_android.png" alt="" class="btn_down"></a>');
    }   

    // 列表页点击下单按钮后禁用
    $(".item a").each(function(){
    	$(this).click(function(){
    		$(this).attr("href","javascript:void(0)");
    	});
    })
})