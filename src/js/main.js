"use static"
$(function(){
  var $phoneNum = $(".login-phonenum");
  var $loginPhone = $("#loginPhone");
  var $cleanBtn = $("#clean-btn");
  var $pwdNum = $(".login-pwdnum");
  var $loginPwd = $("#loginPwd");
  var $toggleBtn = $("#toggle-btn");
  var $btnlog = $("#btnlog");
  var $tip = $("#loginTip");

  $phoneNum.blur(function(){
    // var phone = $phoneNum.val();
    // if(phone === ''){
    //   console.log('手机号为空');
    // }
    // if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){
    //   console.log('错误的手机号');
    //   $tip.text('账号错误');
    //   $tip.removeClass("btnhidden");
    //   $tip.addClass("login-tip");
    // }
    $loginPhone.removeClass("login-blur");
    $loginPhone.addClass("login-phone");
    // $cleanBtn.removeClass();
    // $cleanBtn.attr("class","btnhidden");//输入手机号图标消失有问题
  });
  $phoneNum.click(function(){
    $loginPhone.addClass("login-blur");
    $cleanBtn.attr("class","cleanbtn");
    $cleanBtn.click(function(){
       $phoneNum.val('');
       $(this).attr("class","btnhidden");
    });
  });

  $pwdNum.blur(function(){
    // if($pwdNum.val() === ''){
    //   console.log('密码为空');
    // }
    // $cleanBtn.attr("class","btnhidden");
    $loginPwd.removeClass("login-blur");
    $loginPwd.addClass("login-pwd");
    // $toggleBtn.attr("class","btnhidden");
    // $toggleBtn.removeClass();
  });
  $pwdNum.click(function(){
    $cleanBtn.attr("class","btnhidden");
    $loginPwd.addClass("login-blur");
    $toggleBtn.attr("class","pwdshow");
  });
    $toggleBtn.click(function(){
      if($toggleBtn.attr("class") == "pwdshow"){
        $toggleBtn.attr("class","pwdhidden");
        $pwdNum.attr("type","password");
      }else{
        $toggleBtn.attr("class","pwdshow");
        $pwdNum.attr("type","text");
      }
    })

  $btnlog.click(function(){
    console.log($phoneNum.val());
    console.log($pwdNum.val());
    $tip.text('');
    $tip.removeClass();

    $.ajax({
      method:'post',
      url:'http://wapapi.zhujiash.com/api/v1/clientinfo/Login',
      data:{
        LoginName:$phoneNum.val(),
        Password:$pwdNum.val()
      },
      success:function(data){
        if(data.Meta.ErrorCode == '0'){
          console.log('成功');
        }else{
          console.log(data.Meta);
          $tip.attr("class","login-tip");
          $tip.text(data.Meta.ErrorMsg);
        }
      }
    });
  })
})
