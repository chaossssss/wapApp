"use strict"
angular.module('com.wapapp.app',[])
.run(function(){
	FastClick.attach(document.body);
})
.controller('loginCtrl',['$scope','loginService',function($scope,loginService){
	var vm = $scope.vm = {};

	vm.login = function(){
		loginService.runlogin(vm.phone,vm.password);
	}
	




}])
.factory('loginService',[function(){
	var _login = "http://192.168.1.191:3003/api/v1/clientinfo/Login";
	
	return {
		runlogin: function(loginName,password){
			$.ajax({
					method:"POST",
					url: _login,
					data: {
					LoginName:loginName,
					Password:password
				},
				success: function(res){
					console.log("结果",res);
					$.cookie("Token",res.Body.Token);
					window.location.href = "/template/map-index.html";
				},
				error:function(){
					alert("错误");
				}
			})
		}
	}
		

	

}])



















