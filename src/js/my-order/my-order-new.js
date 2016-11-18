"use strict"
angular.module('com.wapapp.app',['infinite-scroll'])
.run(['$rootScope',function($rootScope){
	FastClick.attach(document.body);
	$rootScope.token = window.sessionStorage.getItem("Token");
	$rootScope.url = CONFIG.IP+"api/v2/orderinfo/GetOrderListEx";

	//获取url参数
    function getvl(name) {
        var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
        if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
        return "";
    } 
    $rootScope.flag = getvl("flag");
}]) 
.controller('orderListCtrl',['$rootScope','$scope','orderService',function($rootScope,$scope,orderService){
	var tb = $scope.tb = {};	//tab标签点击
	var vm = $scope.vm = {};
	var tip = $scope.tip = {};	//提示

	tb.activeTab = $rootScope.flag;
	tip.toast = false;
	tip.loading = true;

	$('#container').on('click', '#showToast', function () {
        $('#toast').show();
        setTimeout(function () {
            $('#toast').hide();
        }, 2000);
    })


	/**
	 * 	OrderStatus
	 */


	//跳转到订单详情页面
	vm.goOrderDetail = function(orderId){
		window.location.href = "/template/orderManage/order-detail.html?orderId="+orderId;
	}
	//支付订单
 	vm.pay = function(orderId){
 		console.log("订单id",orderId);
 		window.location.href = "/template/pay/pay.html?orderId="+orderId;
 	}
 	//确认订单完成
 	vm.confirm = function(orderId){
 		console.log("订单id",orderId);
 		tip.toast = true;
 		orderService.confirm($rootScope.token,orderId)
 			.success(function(res){
 				console.log("订单确认",res);
 				tip.toast = false;
 				if(res.Meta.ErrorCode === "0"){
					window.location.reload();
				}
 				$scope.$apply();
 			})
 	}
	//取消订单
 	vm.cancel = function(orderId){
 		tip.toast = true;
 		console.log("订单id",orderId);
 		orderService.cancel($rootScope.token,orderId)
 			.success(function(res){
 				console.log("订单取消",res);
 				tip.toast = false;
 				if(res.Meta.ErrorCode === "0"){
					window.location.reload();
				}else{
					
				}
 				$scope.$apply();
 			})
 	}
 	//删除订单
 	vm.delete = function(orderId){
 		console.log("订单id",orderId);
 		tip.toast = true;
 		orderService.delete($rootScope.token,orderId)
 			.success(function(res){
 				console.log("订单删除",res);
 				tip.toast = false;
 				if(res.Meta.ErrorCode === "0"){
					window.location.reload();
				}
 				$scope.$apply();
 			})
 	}

	var Reddit = function(type) {
         this.items = [];
         this.busy = false;
         this.currentPage = 1;
         this.type = type;
    };
    Reddit.prototype.nextPage = function() {
        console.log("当前页:::",this.currentPage);
        if (this.busy) return;
        this.busy = true;
        $.ajax({
        	method:"POST",
        	url:$rootScope.url,
        	data:{
        		Token: $rootScope.token,
        		PageIndex: this.currentPage,
        		PageSize: 3,
        		Type: this.type 
        	}
        }).success(function(res){
        	tip.loading = false;
        	console.log("全部列表",res); 
        	if(res.Meta.ErrorCode === "0"){
                if(res.Body.OrderList){
	        		var items = res.Body.OrderList;
					for (var i = 0; i < items.length; i++) {
						this.items.push(items[i]);
					}
					console.log(this.items);
		        	this.busy = false;
		        	this.currentPage = this.currentPage +1;
		        	$scope.$apply();
	        	}else{
	        		this.busy = true;
	        	}
            }
            if(res.Meta.ErrorCode === "2004"){
				window.location.href = "/template/login/login.html";
			} 
        }.bind(this));
    };
    tb.active = function(flag){
    	console.log("当前点击:",flag);
    	$rootScope.flag = flag;
    	if($rootScope.flag){
    		window.location.href = window.location.pathname+'?flag='+flag;
    	}else{
    		var url = window.location.pathname+'?flag='+flag;
    		window.location.href = url;
    	}  	
    }
    switch ($rootScope.flag)
    {
    	case "1":
    		$scope.reddit = new Reddit("0");
    		break;
    	case "2":
    		$scope.reddit = new Reddit("4");
    		break;
    	case "3":
			$scope.reddit = new Reddit("1");
			break;
		case "4":
			$scope.reddit = new Reddit("2");
			break;
		case "5":
			$scope.reddit = new Reddit("3");
			break;	
		default	:
			$scope.reddit = new Reddit("0");	
    }
	

}]) 
.factory('Reddit',[function(){
	var _getPath = CONFIG.IP+"api/v2/orderinfo/GetOrderListEx";
	var token = window.sessionStorage.getItem("Token");

	var Reddit = function() {
         this.items = [];
         this.busy = false;
         this.currentPage = 1;
    };

    Reddit.prototype.nextPage = function() {
        console.log("当前页:::",this.currentPage);
        if (this.busy) return;
        this.busy = true;

        $.ajax({
        	method:"POST",
        	url: _getPath,
        	data:{
        		Token: token,
        		PageIndex: this.currentPage,
        		PageSize: 2,
        		Type: "0" 
        	}
        }).success(function(res){
        	console.log("全部列表",res); 
        	if(res.Meta.ErrorCode === "0"){
                if(res.Body.OrderList){
	        		var items = res.Body.OrderList;
					for (var i = 0; i < items.length; i++) {
						this.items.push(items[i]);
					}
					console.log(this.items);
		        	this.busy = false;
		        	this.currentPage = this.currentPage +1;
		        	// $scope.$apply();
	        	}else{
	        		this.busy = true;
	        	}
            }
            if(res.Meta.ErrorCode === "2004"){
				window.location.href = "/template/login/login.html";
			} 
        }.bind(this));
    };

    return Reddit;
}])
.factory('orderService',[function(){
	var _confirmPath = CONFIG.IP+"api/v2/orderinfo/ConfirmOrderEx";
	var _cancelPath =  CONFIG.IP+"api/v2/orderinfo/CancelOrderEx";
	var _deletePath =  CONFIG.IP+"api/v2/orderinfo/RemoveOrderEx";

	var confirmOrder = function(token,id){
		var formdata = {
			Token: token,
			OrderId: id
		}
		return $.ajax({
					method: "POST",
					url: _confirmPath,
					data: formdata,
				}).success(function(res){
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	}
	var cancelOrder = function(token,id){
		var formdata = {
			Token: token,
			OrderId: id
		}
		return $.ajax({
					method: "POST",
					url: _cancelPath,
					data: formdata,
				}).success(function(res){
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	}
	var deleteOrder = function(token,id){
		var formdata = {
			Token: token,
			OrderId: id
		}
		return $.ajax({
					method: "POST",
					url: _deletePath,
					data: formdata,
				}).success(function(res){
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	}
	return {
		confirm:function(token,id){
			return confirmOrder(token,id);
		},
		cancel: function(token,id){
			return cancelOrder(token,id);
		},
		delete: function(token,id){
			return deleteOrder(token,id);
		}
	}
}])



















