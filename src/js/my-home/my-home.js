"use strict"
angular.module('com.wapapp.app',[])
.run(['$rootScope',function($rootScope){
	// FastClick.attach(document.body);
	$rootScope.token = "d803769104f565854438336f131ca1d5";
}])
.controller('myHomeCtrl',['$rootScope','$scope','getMyInfo','loginOut',function($rootScope,$scope,getMyInfo,loginOut){
	var vm = $scope.vm = {};
	getMyInfo.event($rootScope.token)
		.success(function(res){
			console.log(res);
			$scope.vm = res.Body.Info;
			$scope.$apply();
		})
	
	vm.loginOut = function(){
		console.log("1");
		loginOut.event()
			.success(function(res){
				console.log(res);
				// window.location.href = "";
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
					if(res.Meta.ErrorCode !== "0"){
						// alert(res.Meta.ErrorMsg);
					}
					if(res.Meta.ErrorCode === "2004"){
						// window.location.href = "/template/login/login.html";
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
					if(res.Meta.ErrorCode !== "0"){
						// alert(res.Meta.ErrorMsg);
					}
					if(res.Meta.ErrorCode === "2004"){
						// window.location.href = "/template/login/login.html";
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
















