'use strict'
angular.module('com.wapapp.app',[])
.controller('addLocationCtrl',['$scope',function($scope){

	var sessionStorage = window.sessionStorage;

	var vm = $scope.vm = {};

	vm.name = "小豪";
	vm.phone = "18257561789";
	// vm.sex = "先生";
	vm.title = "迪凯国际中心";
	vm.location = "2502室";

	vm.error = "";
	vm.isActive = false;

	if(sessionStorage.LocalContent){
		vm.location = sessionStorage.LocalContent;
	}
	if(sessionStorage.LocalTitle){
		vm.title = sessionStorage.LocalTitle;
	}

	vm.save = function(name,address,addrDetail,phone){
		console.log(name);
		console.log(address);
		console.log(addrDetail);
		console.log(phone);
		if(name.$valid === true && address.$valid === true && phone.$valid === true){
			window.location.href = "";
		}
		if(name.$dirty === true && name.$valid === false){
			vm.error = "请输入联系人姓名";
			vm.isActive = true;
		}
		if(phone.$dirty === true && phone.$valid === false){
			vm.error = "请输入11位数字的手机号";
			vm.isActive = true;
		}
		if(address.$valid === false){
			vm.error = "请选择服务地址";
			vm.isActive = true;
		}
		if(addrDetail.$valid === false){
			vm.error = "请补充详细地址";
			vm.isActive = true;
		}
	}
	vm.searchLocal = function(address,addrDetail){
		console.log(address);
		console.log(addrDetail);
		if(address === false && addrDetail === false){
			window.location.href = '/template/map/ser-location.html';
		}
	}

}])
.controller('editLocationCtrl',['$scope',function($scope){
	var sessionStorage = window.sessionStorage;

	var vm = $scope.vm = {};

	vm.name = "小豪";
	vm.phone = "18257561789";
	// vm.sex = "先生";
	vm.title = "迪凯国际中心";
	vm.location = "2502室";

	vm.error = "";
	vm.isActive = false;
	vm.isDialog = false;

	if(sessionStorage.LocalContent){
		vm.location = sessionStorage.LocalContent;
	}
	if(sessionStorage.LocalTitle){
		vm.title = sessionStorage.LocalTitle;
	}

	vm.saveLocal = function(name,address,addrDetail,phone){
		console.log(name);
		console.log(address);
		console.log(addrDetail);
		console.log(phone);
		if(name.$valid === true && address.$valid === true && phone.$valid === true){
			window.location.href = "";
		}
		if(name.$dirty === true && name.$valid === false){
			vm.error = "请输入联系人姓名";
			vm.isActive = true;
		}
		if(phone.$dirty === true && phone.$valid === false){
			vm.error = "请输入11位数字的手机号";
			vm.isActive = true;
		}
		if(address.$valid === false){
			vm.error = "请选择服务地址";
			vm.isActive = true;
		}
		if(addrDetail.$valid === false){
			vm.error = "请补充详细地址";
			vm.isActive = true;
		}
	}

	vm.searchLocal = function(address,addrDetail){
		console.log(address);
		console.log(addrDetail);
		if(address === false && addrDetail === false){
			window.location.href = '/template/map/ser-location.html';
		}
	}

	vm.deleteLocal = function(){

	}

}])
.controller('magLocationCtrl',['$scope',function($scope){

	var vm = $scope.vm = {};

	vm.locationList = [
		{ name : "李诗诗",sex : "女士",phone : "156477382490",tag : "公司",local : "上海市区" },
		{ name : "李诗诗",sex : "女士",phone : "156477382490",tag : "公司",local : "上海市区" },
		{ name : "李诗诗",sex : "女士",phone : "156477382490",tag : "公司",local : "上海市区" },
		{ name : "李诗诗",sex : "女士",phone : "156477382490",tag : "公司",local : "上海市区" },
		{ name : "李诗诗",sex : "女士",phone : "156477382490",tag : "公司",local : "上海市区" }
	]

	vm.editLocation = function(item){
		window.location.href = '/template/location/edit-location.html';
	}















}])