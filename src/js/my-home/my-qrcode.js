"use strict"
angular.module('com.wapapp.app',[])
.run(['$rootScope',function($rootScope){
	$rootScope.token = window.localStorage.getItem("Token");
	
}])
.controller('qrCodeCtrl',['$rootScope','$scope','getMyInfo',function($rootScope,$scope,getMyInfo){
	var vm = $scope.vm = {};
	getMyInfo.event($rootScope.token)
		.success(function(res){
			console.log(res);
			$scope.vm = res.Body.Info;
			var codeUrl = res.Body.Info.QrCode;
			$("#code").qrcode({
			 	width:"200",
			 	height:"200",
			 	text:codeUrl
			 });
			$("canvas").css({
				"display":"block",
				"margin-left":"auto",
				"margin-right":"auto",
				"z-index":"6000"
			})
			$scope.$apply();
		})
}])
.factory('getMyInfo',[function(){
	var _getInfo = CONFIG.IP+"api/v1/ClientInfo/Index";
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

















