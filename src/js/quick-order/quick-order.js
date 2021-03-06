"use strict"
angular.module('com.wapapp.app', [])
	.run(['$rootScope', function($rootScope) {
		FastClick.attach(document.body);
		if (window.localStorage) {
			$rootScope.token = window.localStorage.getItem("Token");
		} else {
			alert('您的浏览器版本过低，请升级后重新下单!');
		}

		//获取url参数 
		function getvl(name) {
			var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
			if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
			return "";
		}
		$rootScope.channel = getvl("channel");
		$rootScope.addressId = getvl("id");
		$rootScope.search = window.location.search;
	}])
	.controller('orderCtrl', ['$rootScope', '$scope', 'priceService', 'orderService', 'addrService', 'giftService', 'explainService', function($rootScope, $scope, priceService, orderService, addrService, giftService, explainService) {
		var vm = $scope.vm = {};
		var addr = $scope.addr = {};
		var sv = $scope.sv = {}; //根据服务类型查找其价格(获取服务价格)
		var gt = $scope.gt = {}; //活动
		var fw = $scope.fw = {}; //获取服务说明

		$scope.textarea_size = 0;
		$scope.loadingToast = false;


		// 搜索服务类型，flag条显示更多按钮
		vm.flag0 = true; //热门服务
		vm.flag168 = true; //安装 
		vm.flag169 = true; //便民
		vm.flag170 = true; //家政
		vm.flag171 = true; //维修
		vm.flag172 = true; //装修
		// vm.dateTen = ["1","1.5","2","2.5","3","3.5","4","4.5","5","5.5","6","6.5","7","7.5","8","8.5","9","9.5","10"];
		// vm.unitPrice = 0;

		vm.datePickerShow = false;
		vm.serviceShow = false;
		vm.showImage = false; //是否显示上传图片

		vm.sub = function() {
			if (vm.Total > 0) {
				vm.Total -= 1;
			}
		}
		vm.add = function() {
			if (vm.Total < 9999) {
				vm.Total += 1;
			}
		}

		/*
		 *	数据初始化
		 */
		vm.ServiceContent = "";
		vm.Total = 3;
		if ($rootScope.addressId) {
			vm.ServiceAddressId = $rootScope.addressId;

			addrService.search($rootScope.token, $rootScope.addressId)
				.success(function(res) {
					console.log("获取地址", res);
					if (res.Meta.ErrorCode === "0") {
						$scope.addr = res.Body[0];
						//地址数据永久缓存
						window.localStorage.setItem("_address", JSON.stringify(res.Body[0]));
					}
					$scope.$apply();
				})
		} else if (window.localStorage.getItem("_address")) {
			//未选择过地址，取出上次缓存的地址
			var _address = JSON.parse(window.localStorage.getItem("_address"));
			vm.ServiceAddressId = _address.Id;
			$scope.addr = _address;
		}

		//小时工服务数量不能小于3小时
		$scope.$watch('vm.ServiceTypeId', function() {
			if (vm.ServiceTypeId) {
				if (vm.Total < 3 && (vm.ServiceTypeId == '5' || vm.ServiceTypeId == '707')) {
					vm.Total = 3;
				} else {
					vm.Total = 1;
				}
			}
		})

		//小时工服务数量不能小于3小时
		$scope.$watch('vm.Total', function() {
			if (vm.Total < 3 && (vm.ServiceTypeId == '5' || vm.ServiceTypeId == '707')) {
				vm.dialogshow = true;
				vm.errorMsg = "不能小于3小时";
				vm.Total = 3;
			}
			if (vm.Total <= 0) {
				vm.dialogshow = true;
				vm.errorMsg = "数量不能小于1";
				vm.Total = 1;
			}
		})

		//取出缓存数据
		// var _pointOrder = JSON.parse(window.localStorage.getItem("point-order"));
		// console.log(_pointOrder);
		// if(_pointOrder){
		// 	vm.ServiceTypeId = _pointOrder.ServiceTypeId;
		// 	vm.Total = _pointOrder.Total;
		// 	vm.ServiceStartAt = _pointOrder.ServiceStartAt;
		// 	vm.ServiceContent = _pointOrder.ServiceContent;
		// }



		//流程流向判断并跳转
		vm.gotojudge = function() {
			window.location.href = "/template/location/mag-location.html" + $rootScope.search;
		}

		//textarea长度
		$scope.$watch('vm.ServiceContent', function() {
			var a = vm.ServiceContent;
			$scope.textarea_size = a.length;
		})

		//监控serviceTypeId的值
		$scope.$watch('vm.ServiceTypeId', function() {
			console.log('服务类型id', vm.ServiceTypeId);
			if (vm.ServiceTypeId) {
				giftService.event($rootScope.token, vm.ServiceTypeId)
					.success(function(res) {
						console.log("活动", res);
						if (res.Meta.ErrorCode === "0") {
							gt = $scope.gt = res.Body;
						} else {
							gt = $scope.gt = null;
						}
						$scope.$apply();
					})
				explainService.event(vm.ServiceTypeId)
					.success(function(res) {
						console.log("获取服务说明", res);
						if (res.Meta.ErrorCode === "0") {
							// fw = $scope.fw = res.Body;	
							if (res.Body.Description && (res.Body.Description.indexOf("1、") !== -1)) {
								var descriptionList = [];
								descriptionList.push(res.Body.Description.slice(0, res.Body.Description.indexOf("2、")));
								descriptionList.push(res.Body.Description.slice(res.Body.Description.indexOf("2、"), res.Body.Description.indexOf("3、")));
								descriptionList.push(res.Body.Description.slice(res.Body.Description.indexOf("3、"), res.Body.Description.indexOf("4、")));
								descriptionList.push(res.Body.Description.slice(res.Body.Description.indexOf("4、"), res.Body.Description.indexOf("5、")));
								descriptionList.push(res.Body.Description.slice(res.Body.Description.indexOf("5、"), res.Body.Description.indexOf("6、")));
								descriptionList.push(res.Body.Description.slice(res.Body.Description.indexOf("6、"), res.Body.Description.indexOf("7、")));
								fw = $scope.fw = descriptionList;
							}
						} else {
							fw = $scope.fw = null;
						}
						$scope.$apply();
					})
			}


		})

		$scope.$on('service-type-id', function(event, id, name) {
			vm.serviceShow = false;
			vm.ServiceTypeId = id;
			sv.name = name;
			console.log("ParentCtrl", id, name);
			priceService.get($rootScope.token, id, "2")
				.success(function(res) {
					console.log("获取服务价格", res);
					vm.IsNegotiable = res.Body.IsNegotiable;
					sv.Unit = res.Body.Unit;
					sv.Min = parseInt(res.Body.Min, 10);
					sv.Max = parseInt(res.Body.Max, 10);
					sv.UnitName = res.Body.UnitName;
					sv.PriceList = res.Body.PriceList;
					sv.StartingPrice = res.Body.StartingPrice;
					$scope.$apply();
				})
		})

		$scope.$on('service-time-date', function(event, date) {
			console.log("父亲接收时间", date);
			vm.ServiceStartAt = date.serviceStartAt;
			var serviceDay = date.serviceDay;
			var serviceTime = date.serviceTime;
			vm.ServiceStartAtCut = serviceDay.slice(0, 10) + " " + serviceTime;
		})

		vm.datePickerShow = function() {
			if (vm.ServiceTypeId) {
				$scope.$broadcast("service-time-show", vm.ServiceTypeId);
			} else {
				vm.dialogshow = true;
				vm.errorMsg = "请先选择服务类型";
			}
		}

		vm.submitOrder = function() {
			//数据缓存进sessionStroage
			var stroage = {
				ServiceTypeId: vm.ServiceTypeId,
				Total: vm.Total,
				ServiceStartAt: vm.ServiceStartAt,
				ServiceContent: vm.ServiceContent
			}
			window.localStorage.setItem("point-order", JSON.stringify(stroage));
			if (vm.IsNegotiable == '0') {
				$scope.loadingToast = true;
				$scope.$broadcast("uploader-img-data");
			} else if (vm.IsNegotiable == '1') {
				vm.dialogInfoShow = true;
			}
		}

		vm.submitOrderSure = function() {
			vm.dialogInfoShow = false;
			$scope.$broadcast("uploader-img-data");
		}

		$scope.$on("uploader-form", function(event, img) {
			console.log("img", img);
			console.log("Token", $rootScope.token);
			console.log("ServiceTypeId", vm.ServiceTypeId);
			console.log("ServiceContent", vm.ServiceContent);
			console.log("Total", vm.Total);
			console.log("ServiceStartAt", vm.ServiceStartAtCut);
			console.log("ServiceAddressId", vm.ServiceAddressId);
			console.log("ServicePrice", vm.surePrice);

			var Json_data = {
				"Token": $rootScope.token,
				"ServiceTypeId": vm.ServiceTypeId,
				"ServiceContent": vm.ServiceContent,
				"Total": vm.Total,
				"OrderFrom": "1",
				"ServiceStartAt": vm.ServiceStartAtCut,
				"ServiceAddressId": vm.ServiceAddressId,
				"ServicePrice": vm.surePrice
			};
			Json_data = JSON.stringify(Json_data);

			var formdata = new FormData();
			formdata.append("Token", $rootScope.token);
			formdata.append("ServiceTypeId", vm.ServiceTypeId);
			formdata.append("ServiceContent", vm.ServiceContent);
			formdata.append("Total", vm.Total);
			formdata.append("OrderForm", "1");
			formdata.append("ServiceStartAt", vm.ServiceStartAtCut);
			formdata.append("ServiceAddressId", vm.ServiceAddressId);
			formdata.append("ServicePrice", vm.surePrice);


			for (var i = 0, leng = img.length; i < leng; i++) {
				formdata.append("img" + i, img[i]);
			}
			formdata.append("JSON_Data", Json_data);

			orderService.uploader(formdata)
				.success(function(res) {
					console.log(res);
					$scope.loadingToast = false;
					if (res.Meta.ErrorCode === "0") {
						window.location.href = "/template/orderManage/order-detail.html?orderId=" + res.Body.OrderId;
					} else {
						vm.dialogshow = true;
						vm.errorMsg = res.Meta.ErrorMsg;
					}
					$scope.$apply();
				})
		})
	}])
	.controller('datePickerCtrl', ['$scope', 'timeService', function($scope, timeService) {
		var dp = $scope.dp = {};
		dp.show = false;

		dp.getdpDay = function(item) {
			// console.log(item.TimeRange);
			dp.timeItem = item.TimeRange2;
			dp.serviceDay = item.Date;
		}
		dp.getdpTime = function(item) {
			// console.log(item);
			if (item.IsVacant === '0') {

			} else {
				dp.serviceTime = item.Time;
				console.log("天：", dp.serviceDay, "小时", dp.serviceTime);
				//选中
				var serviceStartAt = dp.serviceDay + dp.serviceTime + "";
				dp.show = false;
				var tofather = {};
				tofather.serviceStartAt = serviceStartAt;
				tofather.serviceDay = dp.serviceDay;
				tofather.serviceTime = dp.serviceTime;
				$scope.$emit("service-time-date", tofather);
			}
		}
		$scope.$on("service-time-show", function(event, id) {
			dp.show = true;
			console.log(id);
			timeService.get(id)
				.success(function(res) {
					console.log(res);
					dp.timeList = res.Body;
					$scope.$apply();
				})
		})
	}])
	.controller('serviceTypeCtrl', ['$scope', 'listService', function($scope, listService) {
		var st = $scope.st = {};
		st.dialog = false;

		listService.get()
			.success(function(res) {
				console.log("服务类型", res);
				// 有四级分类的，将三级拿出，放到二级中，并删掉此在三级中的值
				// var parse = function(obj){
				// 	obj = obj.Body;
				// 	obj.map(function(v,i){
				// 		v.Children.map(function(v1,j){
				// 			if(v1 && v1.Children){
				// 				v1.Children.map(function(v2,k){
				// 					if(v2.Children){
				// 						var copy = JSON.parse(JSON.stringify(v2));
				// 						obj[i].Children.push(copy);
				// 						obj[i].Children[j] = undefined;
				// 					}
				// 				});
				// 			}

				// 		});
				// 	});
				// 	return obj;
				// }
				// var list = parse(res);
				// for(var i=0,len=list.length;i<len;i++){
				// 	if(list[i].Children){
				// 		var apass = [];
				// 		for(var j=0,leng=list[i].Children.length;j<leng;j++){
				// 			if(list[i].Children[j] !== undefined){
				// 				apass.push(list[i].Children[j]);
				// 			}
				// 		}
				// 		list[i].Children = apass;
				// 	}
				// }

				// console.log("数组操作后2",list);
				// st.serviceList = list;
				st.serviceList = res.Body;
				$scope.$apply();
			})

		//获取选中的二级目录
		st.getTypeName = function(op) {
			console.log("op", op);
			if (op.Children !== null) {
				st.dialog = true;
				st.title = op.TypeName;
				st.List = op.Children;
				console.log(st.dialog);
			} else {
				$scope.$emit('service-type-id', op.TypeId, op.TypeName);
			}
		}

		//获取选中的三级目录
		st.getThreeTypeName = function(typeId, typeName) {
			$scope.$emit('service-type-id', typeId, typeName);
		}
	}])
	.controller('uploaderFileCtrl', ['$scope', function($scope) {
		var uf = $scope.uf = {};
		var fileFilter = [];
		//选择文件组的过滤方法
		function filter(files) {
			var arrFiles = [];
			for (var i = 0, file; file = files[i]; i++) {
				if (file.type.indexOf("image") == 0) {
					if (file.size >= 5120000000) {
						alert('您这张"' + file.name + '"图片大小过大，应小于50000k');
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

		function onSelect(files) {
			var html = '',
				i = 0;
			var file;
			var funAppendImage = function() {
				file = files[i];
				if (i <= 8) {
					if (file) {
						var reader = new FileReader()
						reader.onload = function(e) {
							console.log(e.target.result);
							html = html + '<li id="uploadList_' + i + '" class="weui_uploader_file" style="background-image:url(' + e.target.result + ');">' + '<div id="uploadProgress_' + i + '" class="weui_uploader_status_content"  data-index="' + i + '"></div>' + '</li>';
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
				if (i === 8) {
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
		function onDelete(file) {
			$("#uploadList_" + file.index).fadeOut();
		}

		//文件上传进度
		function onProgress(file, loaded, total) {
			var eleProgress = $("#uploadProgress_" + file.index);
			var percent = (loaded / total * 100).toFixed(2) + '%';
			eleProgress.show().text(percent);
		};

		//文件上传成功时
		function onSuccess(file, response) {
			var eleSuccess = $("#uploadProgress_" + file.index);
			eleSuccess.append('<i class="weui_icon_success"></i>');
		}

		//文件上传失败时
		function onFailure(file) {
			var eleError = $("#uploadProgress_" + file.index);
			eleError.append('<i class="weui_icon_warn"></i>');
		}

		//文件全部上传完毕时
		function onComplete() {
			//file控件value置空
			$("#file").val("");
		}


		var fileInput = document.getElementById("file");
		fileInput.addEventListener("change", function(e) {
			console.log(e.target);
			funGetFiles(e);
		})

		//文件上传
		function funUploadFile() {
			// console.log(fileFilter);
			$scope.$emit("uploader-form", fileFilter)
		}

		$scope.$on("uploader-img-data", function(event, data) {
			funUploadFile();
		})

	}])
	.directive('zhDatePicker', function() {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				// console.log(elem);	
				var $zhDatePicker = $("#zh_date_picker");
				$zhDatePicker.on("click", ".zj_navbar_item li", function(e) {
					// console.log($(this).index("li"));
					$(this).siblings().removeClass("in_active");
					$(this).addClass("in_active");
				});
				$zhDatePicker.on("click", ".zj_tab_bd li", function(e) {

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
	.factory('orderService', ['urlService', function(urlService) {
		// 获取服务类型列表
		var _postpath = urlService.url + "api/v2/OrderInfo/CreateOrderOneKey";
		var uploaderService = function(formData) {
			return $.ajax({
				method: "POST",
				url: _postpath,
				data: formData,
				cache: false,
				async: true,
				processData: false, // 告诉jQuery不要去处理发送的数据
				contentType: false // 告诉jQuery不要去设置Content-Type请求头
			}).success(function(res) {
				if (res.Meta.ErrorCode === "2004") {
					// window.location.href = "/template/login/login.html";
				}
			}).error(function(res) {
				alert("服务器连接失败，请检查网络设置");
			})
		}
		return {
			uploader: function(formData) {
				return uploaderService(formData);
			}
		}
	}])
	.factory('listService', ['urlService', function(urlService) {
		// 获取服务类型列表
		var _getpath = urlService.url + "api/v2/SystemService/InfoListEx";
		var getService = function() {
			return $.ajax({
				method: "POST",
				url: _getpath
			}).success(function(res) {
				if (res.Meta.ErrorCode === "2004") {
					window.location.href = "/template/login/login.html";
				}
			}).error(function(res) {
				alert("服务器连接失败，请检查网络设置");
			})
		}
		return {
			get: function() {
				return getService();
			}
		}
	}])
	.factory('priceService', ['urlService', function(urlService) {
		// 获取服务价格
		var _getpath = urlService.url + "api/v2/ClientInfo/GetServicePriceEx";
		var getPrice = function(token, id, type) {
			var formData = {
				Token: token,
				ServiceTypeId: id,
				ServiceProviderType: type
			}
			return $.ajax({
				method: "POST",
				url: _getpath,
				data: formData
			}).success(function(res) {
				if (res.Meta.ErrorCode === "2004") {
					window.location.href = "/template/login/login.html";
				}
			}).error(function(res) {
				alert("服务器连接失败，请检查网络设置");
			})
		}
		return {
			get: function(token, id, type) {
				return getPrice(token, id, type);
			}
		}
	}])
	.factory('timeService', ['urlService', function(urlService) {
		// 获取服务时间
		var _getpath = urlService.url + "api/v2/SystemService/ServiceTimeStartAt";
		var getService = function(id) {
			var formData = {
				ServiceTypeId: id
			}
			return $.ajax({
				method: "POST",
				url: _getpath,
				data: formData
			}).success(function(res) {
				if (res.Meta.ErrorCode === "2004") {
					window.location.href = "/template/login/login.html";
				}
			}).error(function(res) {
				alert("服务器连接失败，请检查网络设置");
			})
		}
		return {
			get: function(token, id) {
				return getService(token, id);
			}
		}
	}])
	.factory('addrService', ['urlService', function(urlService) {
		var _searchpath = urlService.url + "api/v2/ClientInfo/GetAddress";
		var searchAddr = function(token, id) {
			var formData = {
				Token: token,
				Id: id
			}
			return $.ajax({
				method: "POST",
				url: _searchpath,
				data: formData
			}).success(function(res) {
				if (res.Meta.ErrorCode === "2004") {
					window.location.href = "/template/login/login.html";
				}
			}).error(function(res) {
				alert("服务器连接失败，请检查网络设置");
			})
		};
		return {
			search: function(token, id) {
				return searchAddr(token, id);
			}
		};

	}])
	.factory('giftService', ['urlService', function(urlService) {
		var _getGift = urlService.url + "api/v2/SystemService/GetActivity";
		var getGift = function(token, id) {
			var formdata = {
				Token: token,
				ServiceTypeId: id
			}
			return $.ajax({
				method: "POST",
				url: _getGift,
				data: formdata,
			}).success(function(res) {
				if (res.Meta.ErrorCode === "2004") {
					window.location.href = "/template/login/login.html";
				}
			}).error(function(res) {
				alert("服务器连接失败，请检查网络设置");
			})
		}
		return {
			event: function(token, id) {
				return getGift(token, id);
			}
		}
	}])
	.factory('explainService', ['urlService', function(urlService) {
		// 根据服务类型，获取此类型的活动
		var _getPath = urlService.url + "api/v2/HelperInfo/GetAllDescription";
		var getExplain = function(id) {
			var formData = {
				Code: "Code002",
				ServiceId: id
			}
			return $.ajax({
				method: "POST",
				url: _getPath,
				data: formData
			}).success(function(res) {
				if (res.Meta.ErrorCode === "2004") {
					window.location.href = "/template/login/login.html";
				}
			}).error(function(res) {
				alert("服务器连接失败，请检查网络设置");
			})
		}
		return {
			event: function(id) {
				return getExplain(id);
			}
		}
	}])
	.factory('urlService', [function() {
		var testUrl = CONFIG.IP;
		var inlineUrl = "";
		return {
			url: testUrl
		}

	}])