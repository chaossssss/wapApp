"use strict"
angular.module('com.wapapp.app',[])
.run(['$rootScope',function($rootScope){
	FastClick.attach(document.body);
	$rootScope.token = window.localStorage.getItem("Token");
	
}])
.controller('myHomeCtrl',['$rootScope','$scope','getMyInfo','loginOut',function($rootScope,$scope,getMyInfo,loginOut){
	var vm = $scope.vm = {};
	
	getMyInfo.event($rootScope.token)
		.success(function(res){
			console.log(res);
			$scope.vm = res.Body.Info;
			 $("#code").qrcode({
			 	width:"25",
			 	height:"25",
			 	text:res.Body.Info.QrCode
			 });
			$scope.$apply();
		})

	$scope.loginOut = function(){
		loginOut.event()
			.success(function(res){
				console.log(res);
				window.localStorage.removeItem("Token");
				window.location.href = "/template/login/login.html";
			})
	}
}])
.factory('getMyInfo',[function(){
	var _getInfo = "http://192.168.1.191:3003/api/v1/ClientInfo/Index";
	var getInfo = function(token){
		return $.ajax({
					method:"POST",
					url: _getInfo,
					data: {
						Token:token
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
		event:function(token){
			return getInfo(token);
		}
	};
}])
.factory('loginOut',[function(){
	var _loginOut = "http://192.168.1.191:3003/api/v1/ClientInfo/LoginOut";
	var loginOut = function(token){
		return $.ajax({
					method:"POST",
					url: _loginOut
				}).success(function(res){
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	};
	return {
		event:function(){
			return loginOut();
		}
	};
}])
















