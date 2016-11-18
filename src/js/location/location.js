'use strict'
angular.module('com.wapapp.app',[])
.run(['$rootScope',function($rootScope){
	FastClick.attach(document.body);
	$rootScope.token = window.sessionStorage.getItem("Token");

	//获取url参数
    function getvl(name) {
        var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
        if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
        return "";
    } 
    $rootScope.channel = getvl("channel");
    $rootScope.type = getvl("type");
    $rootScope.markid= getvl("markid");
    $rootScope.search = window.location.search;
}])
.controller('addLocationCtrl',['$rootScope','$scope','addrService',function($rootScope,$scope,addrService){

	var sessionStorage = window.sessionStorage;
	var vm = $scope.vm = {};

	vm.error = "";
	vm.isActive = false;

	if(sessionStorage.LocalContent){
		vm.Address2 = sessionStorage.LocalContent;
	}
	if(sessionStorage.LocalTitle){
		vm.Address1 = sessionStorage.LocalTitle;
	}

	addrService.tag()
		.success(function(res){
			console.log(res);
			vm.tagList = res.Body;
			$scope.$apply();
		})

	vm.save = function(name,address,addrDetail,phone){
		console.log(vm.Gender);
		if(name.$valid === true && address.$valid === true && phone.$valid === true){
			var formData = {
				Contact: vm.Contact,
				Gender: vm.Gender,
				PhoneNumber: vm.PhoneNumber,
				Tag: vm.tag,
				Address1: vm.Address1,
				Address2: vm.Address2
			};
			addrService.add($rootScope.token,formData)
				.success(function(res){
					console.log(res);
					if(res.Meta.ErrorCode === "0"){
						window.location.href = "/template/location/mag-location.html"+$rootScope.search;
					}
				})
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
			window.location.href = '/template/map/ser-location.html'+$rootScope.search;
		}
	}

}])
.controller('editLocationCtrl',['$rootScope','$scope','addrService',function($rootScope,$scope,addrService){
	var sessionStorage = window.sessionStorage;

	var vm = $scope.vm = {};
	var hm = $scope.hm = {};

	vm.error = "";
	vm.isActive = false;
	vm.isDialog = false;

	if(sessionStorage.LocalContent){
		vm.Address2 = sessionStorage.LocalContent;
	}
	if(sessionStorage.LocalTitle){
		vm.Address1 = sessionStorage.LocalTitle;
	}

	//获取url参数
    function getvl(name) {
        var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
        if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
        return "";
    };
    var addressId  = getvl("id");
	addrService.tag()
		.success(function(res){
			console.log("标签回调",res);
			hm.tagList = res.Body;
			$scope.$apply();
		})

	addrService.search($rootScope.token,addressId)
		.success(function(res){
			console.log("根据id查找地址",res);
			vm = $scope.vm = res.Body[0];
			$scope.$apply();
		})	

	$scope.saveLocal = function(name,address,addrDetail,phone){
		if(name.$valid === true && address.$valid === true && phone.$valid === true){
			var formData = {
				Id: addressId,
				Contact: vm.Contact,
				Gender: vm.Gender,
				PhoneNumber: vm.PhoneNumber,
				Tag: vm.Tag,
				Address1: vm.Address1,
				Address2: vm.Address2
			};
			addrService.edit($rootScope.token,formData)
				.success(function(res){
					console.log(res);
					if(res.Meta.ErrorCode === "0"){
						window.location.href = "/template/location/mag-location.html"+$rootScope.search;
					}
				})	
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
	};
	$scope.deleteLocal = function(){
		addrService.delete($rootScope.token,addressId)
			.success(function(res){
				console.log("删除回调",res);
				window.location.href = "/template/location/mag-location.html"+$rootScope.search;
			})
	}
	// 搜索地址
	$scope.searchLocal = function(address,addrDetail){
		console.log(address);
		console.log(addrDetail);
		if(address === false && addrDetail === false){
			window.location.href = '/template/map/ser-location.html'+$rootScope.search;
		}
	};
}])
.controller('magLocationCtrl',['$rootScope','$scope','addrService',function($rootScope,$scope,addrService){

	var vm = $scope.vm = {};

	// 点击编辑信息跳转判断
	// 0 ：指定下单
	// 1 ：一键下单
	vm.editLocation = function(item){
		switch ($rootScope.channel)
		{
			case "0" :
				window.location.href = '/template/point-order/point-order.html?channel=0&type='+$rootScope.type+'&markid='+$rootScope.markid+'&id='+item.Id;
				break;
			case "1" :
				window.location.href = '/template/quick-order/quick-order.html?channel=1&id='+item.Id;
				break;
			default:
				window.location.href = '/template/location/edit-location.html?id='+item.Id;
				break;	
		}	
	}

	//跳转到新增地址
	vm.gotoAdd = function(){
		switch ($rootScope.channel)
		{
			case "0":
				window.location.href = '/template/location/add-location.html?channel='+$rootScope.channel;
				break;
			case "1":
				window.location.href = '/template/location/add-location.html?channel='+$rootScope.channel;
				break;
			default:
				window.location.href = '/template/location/add-location.html';
				break;		
		}	
	}

	addrService.get($rootScope.token)
		.success(function(res){
			console.log(res);
			vm.locationList = res.Body;
			$scope.$apply();
		});

}])
.factory('addrService',[function(){
	var PATH = CONFIG.IP;
	var _getpath = PATH+"api/v2/ClientInfo/GetAddress";
	var _addpath = PATH+"api/v2/ClientInfo/AddAddress";
	var _editpath = PATH+"api/v2/ClientInfo/EditAddress";
	var _deletepath = PATH+"api/v2/ClientInfo/DeleteAddress";
	var _searchpath = PATH+"api/v2/ClientInfo/GetAddress";
	var _gettag = PATH+"api/v2/ClientInfo/GetAddressTags";

	var getAddr = function(token){
		return $.ajax({
					method:"POST",
					url: _getpath,
					data:{
						Token:token
					},
				}).success(function(res){
					if(res.Meta.ErrorCode !== "0"){
						alert(res.Meta.ErrorMsg)
					}
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	};

	var addAddr = function(token,data){
		var formData = {
			Token: token,
			Address: data
		}
		return $.ajax({
					method:"POST",
					url: _addpath,
					data: formData
				}).success(function(res){
					if(res.Meta.ErrorCode !== "0"){
						alert(res.Meta.ErrorMsg)
					}
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	};

	var editAddr = function(token,data){
		var formData = {
			Token: token,
			Address: data
		}
		return $.ajax({
					method:"POST",
					url: _editpath,
					data: formData
				}).success(function(res){
					if(res.Meta.ErrorCode !== "0"){
						alert(res.Meta.ErrorMsg)
					}
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	};

	var searchAddr = function(token,id){
		var formData = {
			Token: token,
			Id: id
		}
		return $.ajax({
					method:"POST",
					url: _searchpath,
					data: formData
				}).success(function(res){
					if(res.Meta.ErrorCode !== "0"){
						alert(res.Meta.ErrorMsg)
					}
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	};

	var deleteAddr = function(token,id){
		var formData = {
			Token: token,
			AddressId: id
		}
		return $.ajax({
					method:"POST",
					url: _deletepath,
					data: formData
				}).success(function(res){
					if(res.Meta.ErrorCode !== "0"){
						alert(res.Meta.ErrorMsg)
					}
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	};
	var getTag = function(){
		return $.ajax({
			method:"POST",
			url: _gettag
		}).success(function(res){
			if(res.Meta.ErrorCode !== "0"){
				alert(res.Meta.ErrorMsg)
			}
			if(res.Meta.ErrorCode === "2004"){
				window.location.href = "/template/login/login.html";
			}
		}).error(function(res){
			alert("服务器连接失败，请检查网络设置");
		})
	};

	return {
		get:function(token){
			return getAddr(token);
		},
		add:function(token,data){
			return addAddr(token,data);
		},
		edit:function(token,data){
			return editAddr(token,data);
		},
		search:function(token,id){
			return searchAddr(token,id);
		},
		delete:function(token,id){
			return deleteAddr(token,id);
		},
		tag:function(){
			return getTag();
		}


	};
	
}])























