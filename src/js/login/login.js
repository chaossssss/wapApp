"use strict"
angular.module('com.wapapp.app',[])
.run(function(){
	FastClick.attach(document.body);
})
.controller('loginCtrl',['$scope','loginService',function($scope,loginService){
	var vm = $scope.vm = {};

	vm.login = function(){
		loginService.event(vm.phone,vm.password)
			.success(function(res){
				console.log(res);
				if(res.Meta.ErrorCode !== "0"){
					vm.dialogshow = true;
					vm.errorMsg = res.Meta.ErrorMsg;
				}
				$scope.$apply();
			});
	}

}]) 
.factory('loginService',[function(){
	var _login = "http://192.168.1.191:3001/api/v1/clientinfo/Login";
	
	var runlogin = function(loginName,password){

		return $.ajax({
					method:"POST",
					url: _login,
					data: {
						LoginName:loginName,
						Password:password
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
		event:function(loginName,password){
			return runlogin(loginName,password);
		}
	};

}])



















