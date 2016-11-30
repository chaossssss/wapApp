"use strict"
angular.module('com.wapapp.app', [])
	.run(['$rootScope', function($rootScope) {
		FastClick.attach(document.body);
		$rootScope.url = CONFIG.IP;
		$rootScope.token = window.localStorage.getItem("Token");

		//设置红包弹窗的高度
		$(".red-list").height($(window).height() - 67);

		//获取url参数
		function getvl(name) {
			var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
			if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
			return "";
		}
		// $rootScope.orderId = getvl("orderId");
		$rootScope.orderId = getvl("state");
		$rootScope.code = getvl("code");
	}])
	.controller('payCtrl', ['$rootScope', '$scope', 'getMyInfo', 'getOdetail', 'payForService', 'redCouponService', function($rootScope, $scope, getMyInfo, getOdetail, payForService, redCouponService) {
		var vm = $scope.vm = {};
		var uc = $scope.uc = {};
		var od = $scope.od = {};
		var ac = $scope.ac = {}; //状态对象: 是否升起红包
		var rp = $scope.rp = {}; //红包

		$scope.loadingToast = false;
		ac.IsUsePacket = false; //是否使用红包
		ac.redChanged = "1"; //红包是否被选中

		//是否选中 余额&支付宝&微信支付
		vm.yeIschecked = false;
		vm.zfbIschecked = false;
		vm.wxIschecked = false;
		vm.zfbchecked = function() {
			if (vm.zfbIschecked === false) {
				vm.zfbIschecked = true;
				vm.wxIschecked = false;
			} else {
				vm.zfbIschecked = false;
			}
		}
		vm.wxchecked = function() {
			if (vm.wxIschecked === false) {
				vm.wxIschecked = true;
				vm.zfbIschecked = false;
			} else {
				vm.wxIschecked = false;
			}
		}

		//获取红包
		redCouponService.event($rootScope.token)
			.success(function(res) {
				console.log("获取红包", res);
				if (res.Meta.ErrorCode === "0") {
					res.Body.CouponList.forEach(function(item, index, arry) {
						item.CouponDetails.forEach(function(item, index, arry) {
							item.Amount = parseFloat(item.Amount);
							item.Discount = parseFloat(item.Discount);
							item.DiscountAmount = parseFloat(item.DiscountAmount);
							item.DiscountType = parseFloat(item.DiscountType);
						})
					})
					rp = $scope.rp = res.Body;
				}
				$scope.$apply();
			})

		//获取个人信息
		getMyInfo.event($rootScope.token)
			.success(function(res) {
				console.log("个人信息，获取余额", res);
				if (res.Meta.ErrorCode === "0") {
					$scope.uc.Balance = res.Body.Info.Balance;
				}
				$scope.$apply();
			})

		//获取订单详情
		getOdetail.event($rootScope.token, $rootScope.orderId)
			.success(function(res) {
				console.log("订单详情", res);
				if (res.Meta.ErrorCode === "0") {
					od = $scope.od = res.Body;
				}
				$scope.$apply();
			})

		//使用红包
		if (sessionStorage.getItem("RedPacketChoose")) {
			ac.redChanged = sessionStorage.getItem("RedPacketChoose");
		};
		vm.useRedPacket = function(item) {
			// console.log("使用哪个红包", item);
			if (item.IsUsed === '0' && od.TotalPrice >= item.CouponDetails[0].Amount) {
				sessionStorage.setItem("RedPacketChoose", item.Id);
				ac.redChanged = item.Id;
				vm.redpacketInfo = "满" + item.CouponDetails[0].Amount + "减" + item.CouponDetails[0].DiscountAmount + "元";
				ac.IsUsePacket = false; //关闭红包窗口
				ac.Id = item.Id;
				ac.amount = item.CouponDetails[0].Amount;
				ac.discountAmount = item.CouponDetails[0].DiscountAmount;
			}
		}

		vm.hasPayOrder = function() {
			vm.dialogConfirm = true;
		}

		vm.payOrder = function() {
			console.log("余额", vm.yeIschecked, "支付宝", vm.zfbIschecked, "微信", vm.wxIschecked);
			//金额换算 od.TotalPrice 需付款
			//vm.Price 应付金额
			vm.Price = od.TotalPrice;
			if (ac.redChanged === '1') {
				if (parseFloat(od.TotalPrice) < parseFloat(uc.Balance)) {
					vm.otherPrice = 0;
				} else {
					vm.otherPrice = Math.abs(parseFloat(od.TotalPrice) - parseFloat(uc.Balance));
				}
			} else {
				if ((parseFloat(od.TotalPrice) - ac.discountAmount) < parseFloat(uc.Balance)) {
					vm.otherPrice = 0;
					vm.Price = parseFloat(od.TotalPrice) - ac.discountAmount;
				} else {
					vm.otherPrice = Math.abs((parseFloat(vm.Price) - ac.discountAmount) - parseFloat(uc.Balance));
					vm.Price = parseFloat(od.TotalPrice) - ac.discountAmount
				}
			}

			console.log("另外需要付款:", vm.otherPrice);

			// 余额＋支付宝
			if (vm.yeIschecked === true && vm.zfbIschecked === true && vm.wxIschecked === false) {
				$scope.loadingToast = true;
				vm.Price = od.TotalPrice;
				payForService.zhifubao({
					Token: $rootScope.token,
					OrderId: $rootScope.orderId,
					CouponId: ac.Id,
					Alipay: vm.otherPrice,
					BalancePay: vm.Price
				}).success(function(res) {
					$scope.loadingToast = false;
					console.log(res);
					aplipayTradePay(res.Body.GATEWAY_NEW, res.Body.AlipaySign);
					if (res.Meta.ErrorCode === "0") {
						// window.location.href = "/template/pay/success.html";
					} else {
						vm.dialogshow = true;
						vm.errorMsg = res.Meta.ErrorMsg;
					}
					$scope.$apply();
				})
			}
			//余额＋微信
			if (vm.yeIschecked === true && vm.zfbIschecked === false && vm.wxIschecked === true) {
				$scope.loadingToast = true;
				payForService.weixin({
					Token: $rootScope.token,
					OrderId: $rootScope.orderId,
					CouponId: ac.Id,
					WxPay: vm.otherPrice,
					BalancePay: vm.Price,
					Code: $rootScope.code
				}).success(function(res) {
					console.log(res);
					$scope.loadingToast = false;
					if (res.Meta.ErrorCode === "0") {
						//微信支付
						function onBridgeReady() {
							WeixinJSBridge.invoke(
								'getBrandWCPayRequest', {
									"appId": res.Body.appId, //公众号名称，由商户传入     
									"timeStamp": res.Body.timeStamp, //时间戳，自1970年以来的秒数     
									"nonceStr": res.Body.nonceStr, //随机串     
									"package": res.Body.package,
									"signType": res.Body.signType, //微信签名方式     
									"paySign": res.Body.paySign //微信签名 
								},
								function(res) {
									if (res.err_msg == "get_brand_wcpay_request：ok") {
										window.location.href = "/template/pay/pay_success.html?orderId=" + $rootScope.orderId + "&price=" + vm.Price;
									} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
								}
							);
						}
						if (typeof WeixinJSBridge == "undefined") {
							if (document.addEventListener) {
								document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
							} else if (document.attachEvent) {
								document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
								document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
							}
						} else {
							onBridgeReady();
						}
					} else {
						vm.dialogshow = true;
						vm.errorMsg = "不好意思，出错了!";
						vm.reload = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2ftemplate%2fpay%2fpay.html&response_type=code&scope=snsapi_base&state=" + $rootScope.orderId + "#wechat_redirect";
					}
					$scope.$apply();
				})
			}

			//余额
			if (vm.yeIschecked === true && vm.zfbIschecked === false && vm.wxIschecked === false) {
				$scope.loadingToast = true;
				payForService.account({
					Token: $rootScope.token,
					OrderId: $rootScope.orderId,
					CouponId: ac.Id,
					BalancePay: vm.Price
				}).success(function(res) {
					console.log(res);
					$scope.loadingToast = false;
					if (res.Meta.ErrorCode === "0") {
						window.location.href = "/template/pay/pay_success.html?orderId=" + $rootScope.orderId + "&price=" + vm.Price;
					} else {
						vm.dialogshow = true;
						vm.errorMsg = res.Meta.ErrorMsg;
						vm.reload = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2ftemplate%2fpay%2fpay.html&response_type=code&scope=snsapi_base&state=" + $rootScope.orderId + "#wechat_redirect";
					}
					$scope.$apply();
				})
			}
			// 支付宝
			if (vm.yeIschecked === false && vm.zfbIschecked === true && vm.wxIschecked === false) {
				console.log("支付宝支付:");
				console.log(vm.wxOrzfb === "zhifubao");
				$scope.loadingToast = true;
				payForService.zhifubao({
					Token: $rootScope.token,
					OrderId: $rootScope.orderId,
					CouponId: ac.Id,
					Alipay: vm.Price,
					BalancePay: 0
				}).success(function(res) {
					console.log(res);
					$scope.loadingToast = false;
					aplipayTradePay(res.Body.GATEWAY_NEW, res.Body.AlipaySign);
					if (res.Meta.ErrorCode === "0") {
						// window.location.href = "/template/pay/pay_success.html?orderId="+$rootScope.orderId;
					} else {
						vm.dialogshow = true;
						vm.errorMsg = res.Meta.ErrorMsg;
					}
					$scope.$apply();
				})
			}
			// 微信
			if (vm.yeIschecked === false && vm.zfbIschecked === false && vm.wxIschecked === true) {
				console.log("微信支付");
				console.log(vm.wxOrzfb === "weixin");
				$scope.loadingToast = true;
				payForService.weixin({
					Token: $rootScope.token,
					OrderId: $rootScope.orderId,
					CouponId: ac.Id,
					WxPay: vm.Price,
					BalancePay: 0,
					Code: $rootScope.code
				}).success(function(res) {
					console.log("微信支付：", res);
					$scope.loadingToast = false;
					if (res.Meta.ErrorCode === "0") {
						//微信支付
						function onBridgeReady() {
							WeixinJSBridge.invoke(
								'getBrandWCPayRequest', {
									"appId": res.Body.appId, //公众号名称，由商户传入     
									"timeStamp": res.Body.timeStamp, //时间戳，自1970年以来的秒数     
									"nonceStr": res.Body.nonceStr, //随机串     
									"package": res.Body.package,
									"signType": res.Body.signType, //微信签名方式     
									"paySign": res.Body.paySign //微信签名 
								},
								function(res) {
									if (res.err_msg == "get_brand_wcpay_request：ok") {
										window.location.href = "/template/pay/pay_success.html?orderId=" + $rootScope.orderId + "&price=" + vm.Price;
									} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
								}
							);
						}
						if (typeof WeixinJSBridge == "undefined") {
							if (document.addEventListener) {
								document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
							} else if (document.attachEvent) {
								document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
								document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
							}
						} else {
							onBridgeReady();
						}
					} else {
						vm.dialogshow = true;
						vm.errorMsg = "不好意思，出错了!";
						vm.reload = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2ftemplate%2fpay%2fpay.html&response_type=code&scope=snsapi_base&state=" + $rootScope.orderId + "#wechat_redirect";
					}
					$scope.$apply();
				})
			}
		}

		//支付宝支付
		function aplipayTradePay(GATEWAY_NEW, aplipaySign) {
			var aplipayUrl = GATEWAY_NEW + aplipaySign;
			window.sessionStorage.setItem("AlipayUrl", aplipayUrl);
			window.location.href = "/template/pay/alipay.html";
		}

	}])
	.factory('getMyInfo', ['$rootScope', function($rootScope) {
		// 获取个人信息
		var _getInfo = $rootScope.url + "api/v1/ClientInfo/Index";
		var getInfo = function(token) {
			return $.ajax({
				method: "POST",
				url: _getInfo,
				data: {
					Token: token
				}
			}).success(function(res) {
				if (res.Meta.ErrorCode === "2004") {
					// window.location.href = "/template/login/login.html";
				}
			}).error(function(res) {
				alert("服务器连接失败，请检查网络设置");
			})
		};
		return {
			event: function(token) {
				return getInfo(token);
			}
		};
	}])
	.factory('getOdetail', ['$rootScope', function($rootScope) {
		// 获取订单详情
		var _getDetail = $rootScope.url + "api/v2/OrderInfo/GetOrderInfoEx";
		var getDetail = function(token, id) {
			return $.ajax({
				method: "POST",
				url: _getDetail,
				data: {
					Token: token,
					OrderId: id
				}
			}).success(function(res) {
				if (res.Meta.ErrorCode === "2004") {
					// window.location.href = "/template/login/login.html";
				}
			}).error(function(res) {
				alert("服务器连接失败，请检查网络设置");
			})
		};
		return {
			event: function(token, id) {
				return getDetail(token, id);
			}
		};
	}])
	.factory('payForService', ['$rootScope', function($rootScope) {
		var _accountPath = $rootScope.url + "api/v2/orderinfo/BalancePay";
		var _zhifubaoPath = $rootScope.url + "api/v2/orderinfo/GetAlipaySign";
		var _weixinPath = $rootScope.url + "api/v2/orderinfo/GetWxpaySign"

		var accountPay = function(data) {
			return $.ajax({
				method: "POST",
				url: _accountPath,
				data: data
			}).success(function(res) {
				if (res.Meta.ErrorCode === "2004") {
					// window.location.href = "/template/login/login.html";
				}
			}).error(function(res) {
				alert("服务器连接失败，请检查网络设置");
			})
		}
		var zhifubaoPay = function(data) {
			return $.ajax({
				method: "POST",
				url: _zhifubaoPath,
				data: data
			}).success(function(res) {
				if (res.Meta.ErrorCode === "2004") {
					// window.location.href = "/template/login/login.html";
				}
			}).error(function(res) {
				alert("服务器连接失败，请检查网络设置");
			})
		}
		var weixinPay = function(data) {
			return $.ajax({
				method: "POST",
				url: _weixinPath,
				data: data
			}).success(function(res) {
				if (res.Meta.ErrorCode === "2004") {
					// window.location.href = "/template/login/login.html";
				}
			}).error(function(res) {
				alert("服务器连接失败，请检查网络设置");
			})
		}
		return {
			account: function(data) {
				return accountPay(data);
			},
			zhifubao: function(data) {
				return zhifubaoPay(data);
			},
			weixin: function(data) {
				return weixinPay(data);
			}
		}
	}])
	.factory('redCouponService', ['$rootScope', function($rootScope) {
		var couponUrl = $rootScope.url + "api/v2/Coupon/CouponList";
		var redCoupon = function(token) {
			return $.ajax({
				method: "POST",
				url: couponUrl,
				data: {
					Token: token
				}
			}).success(function(res) {
				if (res.Meta.ErrorCode === "2004") {
					// window.location.href = "/template/login/login.html";
				}
			}).error(function(res) {
				alert("服务器连接失败，请检查网络设置");
			})
		}
		return {
			event: function(token) {
				return redCoupon(token);
			}
		}
	}])