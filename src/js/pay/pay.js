"use strict"
angular.module('com.wapapp.app',[])
.run(['$rootScope',function($rootScope){
	// FastClick.attach(document.body);
	$rootScope.url = "http://192.168.1.191:3003";
	$rootScope.token = window.sessionStorage.getItem("Token");
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
	var uc = $scope.uc = {};
	var od = $scope.od = {};

	$scope.loadingToast = false;

	//是否选中 余额&支付宝&微信支付
	vm.yeIschecked = false;
	vm.zfbIschecked = false;
	vm.wxIschecked = false;
	vm.zfbchecked = function(){
		if(vm.zfbIschecked === false){
			vm.zfbIschecked = true;
			vm.wxIschecked = false;
		}else{
			vm.zfbIschecked = false;
		}
	}
	vm.wxchecked = function(){
		if(vm.wxIschecked === false){
			vm.wxIschecked = true;
			vm.zfbIschecked = false;
		}else{
			vm.wxIschecked = false;
		}
	}


	getMyInfo.event($rootScope.token)
		.success(function(res){
			console.log("个人信息，获取余额",res);
			if(res.Meta.ErrorCode === "0"){
				$scope.uc.Balance = res.Body.Info.Balance;
			}
			$scope.$apply();
		})
 
 	getOdetail.event($rootScope.token,$rootScope.orderId)
 		.success(function(res){
 			console.log("订单详情",res);
 			if(res.Meta.ErrorCode === "0"){
 				od = $scope.od = res.Body;
 			}
 			$scope.$apply();
 		})

 	vm.hasPayOrder = function(){
 		vm.dialogConfirm = true;
 	}

 	vm.payOrder = function(){
 		console.log("余额",vm.yeIschecked,"支付宝",vm.zfbIschecked,"微信",vm.wxIschecked);
 		//金额换算 od.TotalPrice 需付款
 		vm.Price = od.TotalPrice;
 		if(parseInt(vm.Price) < parseInt(uc.Balance)){
 			vm.otherPrice = 0;	
 		}else{
 			vm.otherPrice = Math.abs(parseInt(vm.Price) - parseInt(uc.Balance));
 		}
 		console.log("另外需要付款:",vm.otherPrice);

 		// 余额＋支付宝
 		if(vm.yeIschecked === true && vm.zfbIschecked === true && vm.wxIschecked === false){
 			$scope.loadingToast = true;
 			vm.Price = od.TotalPrice;
			payForService.zhifubao({
				Token : $rootScope.token,
	            OrderId : $rootScope.orderId,
	            CouponId: "",
	            Alipay : vm.otherPrice,
	            BalancePay : vm.Price
			}).success(function(res){
				$scope.loadingToast = false;
				console.log(res);
				aplipayTradePay(res.Body.GATEWAY_NEW,res.Body.AlipaySign);
				if(res.Meta.ErrorCode === "0"){
					// window.location.href = "/template/pay/success.html";
				}else{
					vm.dialogshow = true;
					vm.errorMsg = res.Meta.ErrorMsg;
				}
				$scope.$apply();
			})
 		}
 		//余额＋微信
 		if(vm.yeIschecked === true && vm.zfbIschecked === false && vm.wxIschecked === true){
 			$scope.loadingToast = true;
 			payForService.weixin({
 				Token: $rootScope.token,
	            OrderId: $rootScope.orderId,
	            CouponId: "",
	            WxPay: vm.otherPrice,
	            BalancePay: vm.Price
 			}).success(function(res){
				console.log(res);
				$scope.loadingToast = false;
				if(res.Meta.ErrorCode === "0"){
					// window.location.href = "/template/pay/success.html";
				}else{
					vm.dialogshow = true;
					vm.errorMsg = res.Meta.ErrorMsg;
				}
				$scope.$apply();
			})
 		}

 		//余额
 		if(vm.yeIschecked === true && vm.zfbIschecked === false && vm.wxIschecked === false){
 			$scope.loadingToast = true;
			payForService.account({
				Token: $rootScope.token,
	            OrderId: $rootScope.orderId,
	            CouponId: "",
	            BalancePay: vm.Price
			}).success(function(res){
				console.log(res);
				$scope.loadingToast = false;
				if(res.Meta.ErrorCode === "0"){
					window.location.href = "/template/pay/success.html";
				}else{
					vm.dialogshow = true;
					vm.errorMsg = res.Meta.ErrorMsg;
				}
				$scope.$apply();
			})
 		}
 		// 支付宝
 		if(vm.yeIschecked === false && vm.zfbIschecked === true && vm.wxIschecked === false){
 			console.log("支付宝支付:");
 			console.log(vm.wxOrzfb === "zhifubao");
 			$scope.loadingToast = true;
			payForService.zhifubao({
				Token : $rootScope.token,
	            OrderId : $rootScope.orderId,
	            CouponId: "",
	            Alipay : vm.Price,
	            BalancePay : 0
			}).success(function(res){
				console.log(res);
				$scope.loadingToast = false;
				aplipayTradePay(res.Body.GATEWAY_NEW,res.Body.AlipaySign);
				if(res.Meta.ErrorCode === "0"){
					// window.location.href = "/template/pay/success.html";
				}else{
					vm.dialogshow = true;
					vm.errorMsg = res.Meta.ErrorMsg;
				}
				$scope.$apply();
			})
 		}
 		// 微信
 		if(vm.yeIschecked === false && vm.zfbIschecked === false && vm.wxIschecked === true){
 			console.log("微信支付:");
 			console.log(vm.wxOrzfb === "weixin");
 			$scope.loadingToast = true;
 			payForService.weixin({
 				Token: $rootScope.token,
	            OrderId: $rootScope.orderId,
	            CouponId: "",
	            WxPay: vm.Price,
	            BalancePay: 0
 			}).success(function(res){
				console.log(res);
				$scope.loadingToast = false;
				if(res.Meta.ErrorCode === "0"){
					// window.location.href = "/template/pay/success.html";
				}else{
					vm.dialogshow = true;
					vm.errorMsg = res.Meta.ErrorMsg;
				}
				$scope.$apply();
			})
 		}
 	}

 	//支付宝支付
    function aplipayTradePay(GATEWAY_NEW,aplipaySign){
        var aplipayUrl = GATEWAY_NEW + aplipaySign;
		window.sessionStorage.setItem("AlipayUrl",aplipayUrl);
        window.location.href= "/template/pay/alipay.html";
    }
}])
.factory('getMyInfo',['$rootScope',function($rootScope){
	// 获取个人信息
	var _getInfo = $rootScope.url+"/api/v1/ClientInfo/Index";
	var getInfo = function(token){
		return $.ajax({
					method:"POST",
					url: _getInfo,
					data: {
						Token:token
					}
				}).success(function(res){
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
	// 获取订单详情
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
				if(res.Meta.ErrorCode === "2004"){
					// window.location.href = "/template/login/login.html";
				}
			}).error(function(res){
				alert("服务器连接失败，请检查网络设置");
			})
	}
	var weixinPay = function(data){
		return $.ajax({
				method:"POST",
				url: _weixinPath,
				data: data
			}).success(function(res){
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





 










