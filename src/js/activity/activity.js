$(function(){
	// 下载页判断设备
    if(/(micromessenger)/i.test(navigator.userAgent)){

        $("#weixin-tip").show();
        $(".btn_down").click(function(){
            $("#weixin-tip").show();
        });
        $("#weixin-tip").click(function(){
            $("#weixin-tip").hide();
        });

    }

    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  

        $(".double_btn").html('<a href="https://itunes.apple.com/cn/app/id1066586831?mt=8"><img src="/images/activity/btn_ios.png" alt="" class="btn_down"></a>');
        window.location.href="https://itunes.apple.com/cn/app/id1066586831?mt=8";
    }else if{
        $(".double_btn").html('<a href="http://copen.zhujiash.com/Download/android_client.apk"><img src="/images/activity/btn_android.png" alt="" class="btn_down"></a>');
        window.location.href="http://copen.zhujiash.com/Download/android_client.apk";
    }  

    $(".double_btn").click(function(){
        if(/(micromessenger)/i.test(navigator.userAgent)){
            $("#weixin-tip").show();
            $(".btn_down").click(function(){
                $("#weixin-tip").show();
            });
            $("#weixin-tip").click(function(){
                $("#weixin-tip").hide();
            });
        }
    });


})