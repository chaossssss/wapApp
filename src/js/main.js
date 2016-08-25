"use static"
$(function(){
  var $phoneNum = $(".login-phonenum");
  var $loginPhone = $("#loginPhone");
  var $cleanBtn = $("#clean-btn");
  var $pwdNum = $(".login-pwdnum");
  var $loginPwd = $("#loginPwd");
  var $toggleBtn = $("#toggle-btn");
  $phoneNum.blur(function(){
    if($phoneNum.val() === ''){
      console.log('手机号为空');
    }
    $loginPhone.removeClass("login-blur");
    $loginPhone.addClass("login-phone");
    // $cleanBtn.attr("class","btnhidden");输入手机号图标消失有问题
  })
  $phoneNum.click(function(){
    $loginPhone.addClass("login-blur");
    $cleanBtn.attr("class","cleanbtn");
    $cleanBtn.click(function(){
       $phoneNum.val('');
       $(this).attr("class","btnhidden");
    })
  });

  $pwdNum.blur(function(){
    if($pwdNum.val() === ''){
      console.log('密码为空');
    }
    $cleanBtn.attr("class","btnhidden");
    $loginPwd.removeClass("login-blur");
    $loginPwd.addClass("login-pwd");
    // $toggleBtn.attr("class","btnhidden");
  });
  $pwdNum.click(function(){
    $loginPwd.addClass("login-blur");
    $toggleBtn.attr("class","pwdshow");
    $toggleBtn.click(function(){
      if($toggleBtn.attr("class") == "pwdshow"){
        $toggleBtn.attr("class","pwdhidden");
        $pwdNum.attr("type","password");
      }else{
        $toggleBtn.attr("class","pwdshow");
        $pwdNum.attr("type","text");
      }
    })
  });
})