"use strict"
angular.module('com.wapapp.app',[])
.run(['$rootScope',function($rootScope){
	// $rootScope.token = "8c03ea1b31cef926698d08c964f53302";
	$rootScope.token = window.localStorage.getItem("Token");

	//获取url参数
    function getvl(name) {
        var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
        if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
        return "";
    } 
    $rootScope.channel = getvl("channel");
    $rootScope.ObjectType = getvl("type");
    $rootScope.ObjectId = getvl("markid");
    $rootScope.addressId = getvl("id");
    $rootScope.search = window.location.search;
}])
.controller('orderCtrl',['$rootScope','$scope','priceService','orderService','addrService','markService','typeService',function($rootScope,$scope,priceService,orderService,addrService,markService,typeService){
	var vm = $scope.vm = {};
	var addr = $scope.addr = {};

	$scope.textarea_size = 0;
	$scope.loadingToast = false;

	vm.dateTen = ["1","1.5","2","2.5","3","3.5","4","4.5","5","5.5","6","6.5","7","7.5","8","8.5","9","9.5","10"];
	vm.Total = 0;
	// vm.unitPrice = 30;
	vm.datePickerShow = false;
	vm.serviceShow = false;

	vm.sub = function(){
		if(vm.Total >0){
			vm.Total -= 1;
		}
	}
	vm.add = function(){
		if(vm.Total < 9999){
			vm.Total += 1;
		}
	}
 
	vm.ServiceContent = "1234";
	vm.ServiceAddressId = $rootScope.addressId;

	addrService.search($rootScope.token,$rootScope.addressId)
		.success(function(res){
			console.log(res);
			// if(res.Meta.ErrorCode === "0"){
				$scope.addr = res.Body[0];
			// }
			$scope.$apply();
		})

	markService.search($rootScope.ObjectType,$rootScope.ObjectId)
		.success(function(res){
			console.log(res);
			if(res.Meta.ErrorCode === "0"){
				vm.Name = res.Body.Worker.Name;
				vm.Gender = res.Body.Worker.Gender;
				vm.Photo = res.Body.Worker.Photo;
			}
			$scope.$apply();
		})

	if($rootScope.ObjectType == "1"){
		typeService.searchWorkList($rootScope.ObjectId)
			.success(function(res){
				console.log(res);
				if(res.Meta.ErrorCode === "0"){
					vm.serviceTypeList = res.Body.ServiceTypeList;
				}
				$scope.$apply();
			})
	}else{
		typeService.searchBossList($rootScope.ObjectId)
			.success(function(res){
				console.log(res);
				if(res.Meta.ErrorCode === "0"){
					vm.serviceTypeList = res.Body.ServiceTypeList;
				}
				$scope.$apply();
			})
	}

	//流程流向判断并跳转
	vm.gotojudge = function(){
		window.location.href = "/template/location/mag-location.html"+$rootScope.search;
	}

	//textarea长度
	$scope.$watch('vm.ServiceContent',function(){
		var a = vm.ServiceContent;
		$scope.textarea_size = a.length;
	})

	$scope.$on('service-time-date',function(event,date){
		console.log("父亲接收时间",date);
		vm.ServiceStartAt = date;

	})

	vm.datePickerShow = function(){
		$scope.$broadcast("service-time-show",vm.ServiceTypeId);
	}

	vm.submitOrder = function(){
		$scope.loadingToast = true;
		$scope.$broadcast("uploader-img-data");
	}

	$scope.$on("uploader-form",function(event,img){
		console.log("img",img);
		console.log("Token",$rootScope.token);
		console.log("ObjectType",$rootScope.ObjectType);
		console.log("ObjectId",$rootScope.ObjectId);
		console.log("serviceTypeObj",vm.serviceTypeObj),
		console.log("ServiceTypeId",vm.serviceTypeObj.ServiceTypeId);
		console.log("ServiceContent",vm.ServiceContent);
		console.log("Total",vm.Total);
		console.log("ServiceStartAt",vm.ServiceStartAt);
		console.log("ServiceAddressId",vm.ServiceAddressId);

		var Json_data = {
            "Token":$rootScope.token,
            "ObjectType":$rootScope.ObjectType,
            "ObjectId":$rootScope.ObjectId,
            "ServiceTypeId": vm.serviceTypeObj.ServiceTypeId,
            "ServiceContent": vm.ServiceContent,
            "Total": vm.Total,
            "OrderFrom": "1",
            "ServiceStartAt": vm.ServiceStartAt,
            "ServiceAddressId": vm.ServiceAddressId
        };
        Json_data = JSON.stringify(Json_data);

        var formdata = new FormData();
        formdata.append("Token",$rootScope.token);   
        formdata.append("ObjectType",$rootScope.ObjectType);  
        formdata.append("ObjectId",$rootScope.ObjectId);  
        formdata.append("ServiceTypeId", vm.serviceTypeObj.ServiceTypeId);   
        formdata.append("ServiceContent", vm.ServiceContent);   
        formdata.append("Total", vm.Total);    
        formdata.append("OrderForm", "1");   
        formdata.append("ServiceStartAt", vm.ServiceStartAt);  
        formdata.append("ServiceAddressId", vm.ServiceAddressId); 

        for(var i=0,leng=img.length;i<leng;i++){
            formdata.append("img"+i,img[i]);
        }
        formdata.append("JSON_Data",Json_data);

		orderService.uploader(formdata)
			.success(function(res){
				console.log(res);
				$scope.loadingToast = false;
				if(res.Meta.ErrorCode === "0"){
					window.location.href = "/template/orderManage/order-detail.html?orderId="+res.Body.OrderId;
				}else{
					vm.dialogshow = true;
					vm.errorMsg = res.Meta.ErrorMsg;
				}
				$scope.$apply();
			})
	})
}])
.controller('datePickerCtrl',['$scope','timeService',function($scope,timeService){

	var dp = $scope.dp = {};
	dp.show =false;

	dp.getdpDay = function(item){
		// console.log(item.TimeRange);
		dp.timeItem = item.TimeRange;
		dp.serviceDay = item.Date;
	}
	dp.getdpTime = function(item){
		// console.log(item);
		dp.serviceTime = item;
		console.log("天：",dp.serviceDay,"小时",dp.serviceTime);
		//选中
		var serviceStartAt = dp.serviceDay + dp.serviceTime +"";
		dp.show = false;
		$scope.$emit("service-time-date",serviceStartAt);
	}

	$scope.$on("service-time-show",function(event,id){
		dp.show = true;
		console.log(id);
		timeService.get("5")
			.success(function(res){
				console.log(res);
				dp.timeList =  res.Body;
				$scope.$apply();
			})
	})
}])
.controller('uploaderFileCtrl',['$scope',function($scope){
	var uf = $scope.uf = {};

	var fileFilter = [];

	//选择文件组的过滤方法
	function filter(files) {
        var arrFiles = [];
        for (var i = 0, file; file = files[i]; i++) {
            if (file.type.indexOf("image") == 0) {
                if (file.size >= 512000) {
                    alert('您这张"'+ file.name +'"图片大小过大，应小于500k');    
                } else {
                    arrFiles.push(file);    
                }           
            } else {
                alert('文件"' + file.name + '"不是图片。');    
            }
        }
        return arrFiles;
    };

	//选中文件的处理与回调
	function funDealFiles() {
		for (var i = 0, file; file = fileFilter[i]; i++) {
			//增加唯一索引值
			file.index = i;
		}
		//执行选择回调
		onSelect(fileFilter);
	};

	//获取选择文件，file控件或拖放
	function funGetFiles(e) {
		// 获取文件列表对象
		var files = e.target.files || e.dataTransfer.files;
		//继续添加文件
		fileFilter = fileFilter.concat(filter(files));
		funDealFiles();
	};

	function onSelect(files){
		var html = '', i = 0;
		var file;
		var funAppendImage = function() {
            file = files[i];
            if(i <= 8){
	            if (file) {
	                var reader = new FileReader()
	                reader.onload = function(e) {
	                	console.log(e.target.result);
	            	   	html = html + '<li id="uploadList_'+ i +'" class="weui_uploader_file" style="background-image:url('+e.target.result+');">'
							+	'<div id="uploadProgress_'+i+'" class="weui_uploader_status_content"  data-index="'+ i +'"></div>'
							+'</li>';
						i++;	
						funAppendImage();
	                }
	                reader.readAsDataURL(file);
	            } else {
	            	console.log(html);
	            	$(".weui_uploader_files").html("");
	            	$(".weui_uploader_files").append(html);
	                if (html) {
	                    //删除方法
	                    // $(".upload_delete").click(function() {
	                    //     funDeleteFile(files[parseInt($(this).attr("data-index"))]);
	                    //     return false;   
	                    // });   
	                }
	            }
            }
            if(i === 8){
            	$(".weui_uploader_input_wrp").hide();
            }
        };
        funAppendImage();    
	};

	//删除对应的文件
	function funDeleteFile(fileDelete) {
		var arrFile = [];
		for (var i = 0, file; file = fileFilter[i]; i++) {
			if (file != fileDelete) {
				arrFile.push(file);
			} else {
				onDelete(fileDelete);	
			}
		}
		fileFilter = arrFile;
	};

	//文件删除后
	function onDelete(file){
		$("#uploadList_"+ file.index).fadeOut();
	}

	//文件上传进度
	function onProgress(file, loaded, total) {
		var eleProgress = $("#uploadProgress_" + file.index);
		var percent = (loaded / total * 100).toFixed(2) + '%';
		eleProgress.show().text(percent);
	};

	//文件上传成功时
	function onSuccess(file,response){
		var eleSuccess = $("#uploadProgress_" + file.index);
		eleSuccess.append('<i class="weui_icon_success"></i>');
	}

	//文件上传失败时
	function onFailure(file){
		var eleError = $("#uploadProgress_" + file.index);
		eleError.append('<i class="weui_icon_warn"></i>');
	}

	//文件全部上传完毕时
    function onComplete() {
        //file控件value置空
        $("#file").val("");
    }    


	var fileInput = document.getElementById("file"); 
	fileInput.addEventListener("change",function(e){
		console.log(e.target);
		funGetFiles(e);
	})

	//文件上传
	function funUploadFile(){
		// console.log(fileFilter);
		$scope.$emit("uploader-form",fileFilter)
	}

	$scope.$on("uploader-img-data",function(event,data){
		funUploadFile();
	})

}])
.directive('zhDatePicker',function(){
	return {
		restrict:'A',
		link:function(scope,elem,attrs){
			// console.log(elem);	
			var $zhDatePicker = $("#zh_date_picker");
			$zhDatePicker.on("click",".zj_navbar_item li",function(e){
				// console.log($(this).index("li"));
				$(this).siblings().removeClass("in_active");
				$(this).addClass("in_active");
			});
			$zhDatePicker.on("click",".zj_tab_bd li",function(e){
				
				$(this).siblings().find(".zj_icon").removeClass("show").addClass("hide");
				$(this).find(".zj_icon").removeClass("hide").addClass("show");
			});
			// $zhDatePicker.on("click",".zj_ft",function(e){
			// 	$(this).parent(".zj_actionsheet").removeClass("zj_actionsheet_toggle");
			// 	$(this).parent(".zj_actionsheet").siblings(".zj_mask_transition").removeClass("zj_fade_toggle");
			// });
		}
	};
})
.factory('orderService',[function(){
	// 获取服务类型列表
	var PATH = "http://192.168.1.191:3003/";
	var _postpath = PATH+"api/v2/OrderInfo/CreateOrderOneKey";

	var uploaderService = function(formData){
		return $.ajax({
					method:"POST",
					url: _postpath,
					data: formData,
					cache: false,  
	                async: true,
	                processData: false,  // 告诉jQuery不要去处理发送的数据
	                contentType: false  // 告诉jQuery不要去设置Content-Type请求头
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
	}

	return {
		uploader: function(formData){
			return uploaderService(formData);
		}
	}
}])
.factory('priceService',[function(){
	// 获取服务价格
	var PATH = "http://192.168.1.191:3003/";
	var _getpath = PATH+"api/v2/ClientInfo/GetServicePriceEx";

	var getPrice = function(token,id,type){
		var formData = {
			Token: token,
			ServiceTypeId: id,
			ServiceProviderType: type
		}
		return $.ajax({
					method:"POST",
					url: _getpath,
					data: formData
				}).success(function(res){
					if(res.Meta.ErrorCode !== "0"){
						// alert(res.Meta.ErrorMsg)
					}
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	}
	return {
		get: function(token,id,type){
			return getPrice(token,id,type);
		}
	}
}])
.factory('timeService',[function(){
	// 获取服务时间
	var PATH = "http://192.168.1.191:3003/";
	var _getpath = PATH+"api/v2/SystemService/ServiceTimeStartAt";

	var getService = function(id){
		var formData = {
			ServiceTypeId: id
		}
		return $.ajax({
					method:"POST",
					url: _getpath,
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
	}

	return {
		get: function(id){
			return getService(id);
		}
	}
}])
.factory('addrService',[function(){
	var _searchpath = "http://192.168.1.191:3003/api/v2/ClientInfo/GetAddress";
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
						// alert(res.Meta.ErrorMsg)
					}
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	};

	return {
		search:function(token,id){
			return searchAddr(token,id);
		}
	};
}])
.factory('markService',[function(){
	var _searchpath = "http://192.168.1.191:3003/api/v2/Provider/Detail";
	var searchMark = function(type,id){
		var formData = {
			Type: type,
			Id: id
		}
		return $.ajax({
					method:"POST",
					url: _searchpath,
					data: formData
				}).success(function(res){
					if(res.Meta.ErrorCode !== "0"){
						// alert(res.Meta.ErrorMsg)
					}
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	};
	return {
		search:function(type,id){
			return searchMark(type,id);
		}
	};
}])
.factory('typeService',[function(){
	var _searchwpath = "http://192.168.1.191:3003/api/v2/ClientInfo/GetWorkerServiceListEx";
	var _searchbpath = "http://192.168.1.191:3003/api/v2/ClientInfo/GetMerchantServiceListEx"

	var searchWork = function(id){
		var formData = {
			WorkerId: id
		}
		return $.ajax({
					method:"POST",
					url: _searchwpath,
					data: formData
				}).success(function(res){
					if(res.Meta.ErrorCode !== "0"){
						// alert(res.Meta.ErrorMsg)
					}
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	}
	var bossWork = function(id){
		var formData = {
			MerchantId: id
		}
		return $.ajax({
					method:"POST",
					url: _searchbpath,
					data: formData
				}).success(function(res){
					if(res.Meta.ErrorCode !== "0"){
						// alert(res.Meta.ErrorMsg)
					}
					if(res.Meta.ErrorCode === "2004"){
						window.location.href = "/template/login/login.html";
					}
				}).error(function(res){
					alert("服务器连接失败，请检查网络设置");
				})
	}
	return {
		searchWorkList:function(id){
			return searchWork(id);
		},
		searchBossList:function(id){
			return bossWork(id);
		}
	};
}])















