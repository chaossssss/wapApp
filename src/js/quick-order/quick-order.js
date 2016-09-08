angular.module('com.wapapp.app',[])
.controller('orderCtrl',['$scope',function($scope){

	$scope.textarea_size = 0;


	var vm = $scope.vm = {};

	vm.dateTen = ["1","1.5","2","2.5","3","3.5","4","4.5","5","5.5","6","6.5","7","7.5","8","8.5","9","9.5","10"];
	vm.serviceTimeCount = 0;

	vm.unitPrice = 30;

	vm.sub = function(){
		if(vm.serviceTimeCount >0){
			vm.serviceTimeCount -= 1;
		}
	}
	vm.add = function(){
		if(vm.serviceTimeCount < 9999){
			vm.serviceTimeCount += 1;
		}
	}

	vm.serviceStartAt = "1234";
}])
.directive('uploadImg',function(){
	return {
		restrict:'A',
		link:function(scope,element,attrs,ngModel){

		}
	};
})
// .directive('textareaSize',function(){
// 	return {
// 		restrict:'A',
// 		link:function(scope,element,attrs){
// 			console.log(element);
// 			console.log(attrs.$$element[0].textLength);
// 			console.log(attrs.$$element[0]);
// 		}
// 	};
// })
