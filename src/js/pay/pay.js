"use strict"
angular.module('com.wapapp.app',[])
.run(['$rootScope',function($rootScope){
	// FastClick.attach(document.body);
	$rootScope.url = "http://192.168.1.191:3003";
	// $rootScope.token = "2494b57ed8810651fea6bd80da6b84e8";
	// $rootScope.token = $.cookie("Token");

	//获取url参数
    function getvl(name) {
        var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
        if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
        return "";
    } 
    $rootScope.orderId = getvl("orderId");
}])
.controller('payCtrl',['$rootScope','$scope','getMyInfo','getOdetail','payForService',function($rootScope,$scope,getMyInfo,getOdetail,payForService){
	var vm = $scope.vm = {};

	$scope.loadingToast = false;

	getMyInfo.event($rootScope.token)
		.success(function(res){
			console.log(res);
			if(res.Meta.ErrorCode === "0"){
				$scope.vm.Balance = res.Body.Info.Balance;
			}
			$scope.$apply();
		})
 
 	getOdetail.event($rootScope.token,$rootScope.orderId)
 		.success(function(res){
 			console.log(res);
 		})

 	vm.hasPayOrder = function(){
 		vm.dialogConfirm = true;
 	}

 	vm.payOrder = function(){
 		if(vm.radioBox === "account"){
 			$scope.loadingToast = true;
 			vm.Price = 60;
 			console.log(vm.Price);
			payForService.account({
				Token: $rootScope.token,
	            OrderId: $rootScope.orderId,
	            CouponId: "",
	            BalancePay: vm.Price
			}).success(function(res){
				console.log(res);
				$scope.loadingToast = false;
				if(res.Meta.ErrorCode === "0"){
					// window.location.href = "";
				}else{
					vm.dialogshow = true;
					vm.errorMsg = res.Meta.ErrorMsg;
				}
				$scope.$apply();
			})
 		}
 		if(vm.radioBox === "zhifubao"){
 			console.log(vm.radioBox);
			payForService.zhifubao({
				Token : $rootScope.token,
	            OrderId : $rootScope.orderId,
	            CouponId: "",
	            Alipay : vm.Price,
	            BalancePay : 0
			}).success(function(res){
				console.log(res);
				// aplipayTradePay();
				if(res.Meta.ErrorCode === "0"){
					// window.location.href = "";
				}else{
					vm.dialogshow = true;
					vm.errorMsg = res.Meta.ErrorMsg;
				}
				$scope.$apply();
			})
 		}
 		if(vm.radioBox === "weixin"){
 			console.log(vm.radioBox);
 			payForService.weixin({
 				Token: $rootScope.token,
	            OrderId: $rootScope.orderId,
	            CouponId: "",
	            WxPay: vm.Price,
	            BalancePay: 0
 			}).success(function(res){
				console.log(res);
				if(res.Meta.ErrorCode === "0"){
					// window.location.href = "";
				}else{
					vm.dialogshow = true;
					vm.errorMsg = res.Meta.ErrorMsg;
				}
				$scope.$apply();
			})
 		}
 	}

 	//支付宝支付
    function aplipayTradePay(){
        console.log("进来");
        var aplipayUrl = $scope.GATEWAY_NEW + $scope.aplipay.sign;
        //window.location.href=$scope.GATEWAY_NEW + $scope.aplipay.sign;
    }
}])
.factory('getMyInfo',['$rootScope',function($rootScope){
	var _getInfo = $rootScope.url+"/api/v1/ClientInfo/Index";
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
.factory('getOdetail',['$rootScope',function($rootScope){
	var _getDetail = $rootScope.url+"/api/v2/OrderInfo/GetOrderInfoEx";
	var getDetail = function(token,id){
		return $.ajax({
					method:"POST",
					url: _getDetail,
					data: {
						Token:token,
						OrderId: id 
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
		event:function(token,id){
			return getDetail(token,id);
		}
	};
}])
.factory('payForService',['$rootScope',function($rootScope){
	var _accountPath = $rootScope.url+"/api/v2/orderinfo/BalancePay"; 
	var _zhifubaoPath = $rootScope.url+"/api/v2/orderinfo/GetAlipaySign";
	var _weixinPath = $rootScope.url+"/api/v2/orderinfo/GetWxpaySign"

	var accountPay = function(data){
		return $.ajax({
				method:"POST",
				url: _accountPath,
				data: data
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
	}
	var zhifubaoPay = function(data){
		return $.ajax({
				method:"POST",
				url: _zhifubaoPath,
				data: data
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
	}
	var weixin = function(data){
		return $.ajax({
				method:"POST",
				url: _weixinPath,
				data: data
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
	}
	return {
		account:function(data){
			return accountPay(data);
		},
		zhifubao:function(data){
			return zhifubaoPay(data);
		},
		weixin:function(data){
			return weixinPay(data);
		}
	}
}])





 










