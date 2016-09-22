"use strict"
angular.module('com.wapapp.app',[])
.run(['$rootScope',function($rootScope){
	// FastClick.attach(document.body);
	$rootScope.url = "http://192.168.1.191:3003";

}])
.controller('orderListCtrl',['$scope',function($scope){
	var vm = $scope.vm = {};

	// vm.login = function(){
	// 	loginService.event(vm.phone,vm.password)
	// 		.success(function(res){
	// 			console.log(res);
	// 			if(res.Meta.ErrorCode === "0"){
	// 				$.cookie("Token",res.Body.Token);
	// 				window.localStorage.setItem("Token",res.Body.Token);
	// 				window.location.href = "/template/map-index.html";
	// 			}else{
	// 				vm.dialogshow = true;
	// 				vm.errorMsg = res.Meta.ErrorMsg;
	// 			} 
	// 			$scope.$apply();
	// 		});
	// }
}]) 




















