"use strict"
angular.module('com.wapapp.app',['infinite-scroll'])
.run(['$rootScope',function($rootScope){
	// FastClick.attach(document.body);
	$rootScope.token = window.localStorage.getItem("Token");
	$rootScope.url = "http://192.168.1.191:3003/api/v2/orderinfo/GetOrderListEx";


}])
.controller('orderListCtrl',['$rootScope','$scope',function($rootScope,$scope){
	var tb = $scope.tb = {};
	var vm = $scope.vm = {};

	tb.activeTab = 1;

 	

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
        	url:$rootScope.url,
        	data:{
        		Token: $rootScope.token,
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

	$scope.reddit = new Reddit();

}]) 
.factory('Reddit',[function(){
	var _getPath = "http://192.168.1.191:3003/api/v2/orderinfo/GetOrderListEx";
	var token = window.localStorage.getItem("Token");

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
// .factory('listService',[function(){
// 	var _getPath = "api/v2/SystemService/GetActivity";
// 	var getGift = function(token,id){
// 		var formdata = {
// 			Token: token,
// 			ServiceTypeId: id
// 		}
// 		return $.ajax({
// 					method: "POST",
// 					url: _getPath,
// 					data: formdata,
// 				}).success(function(res){
// 					if(res.Meta.ErrorCode === "2004"){
// 						window.location.href = "/template/login/login.html";
// 					}
// 				}).error(function(res){
// 					alert("服务器连接失败，请检查网络设置");
// 				})
// 	}
// 	return {
// 		event:function(token,id){
// 			return getGift(token,id);
// 		}
// 	}
// }])



















