"use strict"
angular.module('com.wapapp.app',[])
.run(['$rootScope',function($rootScope){
	FastClick.attach(document.body);
	$rootScope.url = CONFIG.IP;
	$rootScope.token = window.localStorage.getItem("Token");
	
}])
.controller('registCtrl',['$scope','$timeout','registService','captchaService',function($scope,$timeout,registService,captchaService){
	var vm = $scope.vm = {};
	vm.submitRegist = function(){
		registService.event(vm.phone,vm.password,vm.code)
			.success(function(res){
				console.log(res);
				if(res.Meta.ErrorCode === "0"){
					window.location.href = "/template/login/login.html";
				}else{
					vm.dialogshow = true;
					vm.errorMsg = res.Meta.ErrorMsg;
				}
				$scope.$apply();
			})
	}	
	vm.sendTime = function(){
		captchaService.event(vm.phone)
			.success(function(res){
				console.log(res);
				if(res.Meta.ErrorCode !== "0"){
					vm.dialogshow = true;
					vm.errorMsg = res.Meta.ErrorMsg;
				}else{
					smsCodeLoad(50);
				}
				$scope.$apply();
			})
	}
	//发送内容
	$scope.sms_code_content='发送验证码';
	//用于设置disabled
	$scope.sms_code_status=true;
	var time = 60;
	function smsCodeLoad(time) {
	    if (time == 0) {
	    //倒计时结束do something
	    $scope.sms_code_content = '发送验证码';
	    $scope.sms_code_status = true;
	    }
	    else {
	    $scope.sms_code_content = time+'秒后重发';
	    $scope.sms_code_status = false;
	    time--;
	        $timeout(function () {
	            smsCodeLoad(time)
	        }, 800);
	    }
	};
}])
.factory('registService',['$rootScope',function($rootScope){
	var _regist = $rootScope.url+"api/v1/clientinfo/Register";
	var runlogin = function(loginName,password,captcha){
		return $.ajax({
					method:"POST",
					url: _regist,
					data: {
						LoginName: loginName,
						Password: password,
						Captcha: captcha,
						Type: 0
					}
				}).success(function(res){
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	};
	return {
		event:function(loginName,password,captcha){
			return runlogin(loginName,password,captcha);
		}
	};
}])
.factory('captchaService',['$rootScope',function($rootScope){
	var _sendcode = $rootScope.url+"api/v1/helper/SendCaptcha";
	var sendCode = function(phone){
		return $.ajax({
					method:"POST",
					url: _sendcode,
					data: {
						Phone: phone,
						Type: "1"
					}
				}).success(function(res){
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	};
	return {
		event:function(phone){
			return sendCode(phone);
		}
	};
}])
















