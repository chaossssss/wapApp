"use strict"
angular.module('com.wapapp.app',[])
.controller('orderCtrl',['$scope',function($scope){
	var vm = $scope.vm = {};

	$scope.textarea_size = 0;

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

	//textarea长度
	$scope.$watch('vm.serviceStartAt',function(){
		var a = vm.serviceStartAt;
		$scope.textarea_size = a.length;
	})

	// datePicker时间处理
	var dp = $scope.dp = {};
	dp.show = false;
	
	dp.getdpDay = function(item){
		console.log(item);
		vm.serviceDay = item;
	}
	dp.getdpTime = function(item){
		console.log(item);
		vm.serviceTime = item;
	}

	vm.dayDate = [
		"2016-08-24 今天",
		"2016-08-25 明天",
		"2016-08-25 周五",
		"2016-08-25 周六",
		"2016-08-25 周日"
	]
	vm.timeDate = [
		"15:30",
		"16:00",
		"16:30",
		"17:00",
		"17:30"
	]


	// 图片上传
    // var params = {
    //     fileInput: $("#input").get(0),
    //     upButton: $("#fileSubmit").get(0),
    //     // url: $("#uploadForm").attr("action"),
    //     filter: function(files) {
    //         var arrFiles = [];
    //         for (var i = 0, file; file = files[i]; i++) {
    //             if (file.type.indexOf("image") == 0) {
    //                 if (file.size >= 512000) {
    //                     alert('您这张"'+ file.name +'"图片大小过大，应小于500k');    
    //                 } else {
    //                     arrFiles.push(file);    
    //                 }           
    //             } else {
    //                 alert('文件"' + file.name + '"不是图片。');    
    //             }
    //         }
    //         return arrFiles;
    //     },
    //     onSelect: function(files) {
    //         var html = '', i = 0;
    //         $("#preview").html('<div class="upload_loading"></div>');
    //         var funAppendImage = function() {
    //             file = files[i];
    //             if (file) {
    //                 var reader = new FileReader()
    //                 reader.onload = function(e) {
    //                     html = html + '<div id="uploadList_'+ i +'" class="upload_append_list"><p>'+ 
    //                     '<a href="javascript:" class="upload_delete" title="删除" data-index="'+ i +'"><img class="deleteImg" src="img/ic_delete.svg" alt=""></a>' +
    //                     '<img id="uploadImage_' + i + '" src="' + e.target.result + '" class="upload_image" /></p>'+ 
    //                     '<span id="uploadProgress_' + i + '" class="upload_progress"></span>' +
    //                 '</div>';
    //                     i++;
    //                     funAppendImage();
    //                 }
    //                 reader.readAsDataURL(file);
    //             } else {
    //                 $("#preview").html(html);
    //                 if (html) {
    //                     //删除方法
    //                     $(".upload_delete").click(function() {
    //                         ZXXFILE.funDeleteFile(files[parseInt($(this).attr("data-index"))]);
    //                         return false;   
    //                     });   
    //                 }
    //             }
    //         };
    //         funAppendImage();       
    //     },
    //     onDelete: function(file) {
    //         $("#uploadList_" + file.index).fadeOut();
    //     },
    //     onProgress: function(file, loaded, total) {
    //      var eleProgress = $("#uploadProgress_" + file.index), percent = (loaded / total * 100).toFixed(2) + '%';
    //      eleProgress.show().html(percent);
    //     },
    //     // onSuccess: function(file, response) {
    //     //     $("#uploadInf").append("<p>上传成功，图片地址是：" + response + "</p>");
    //     // },
    //     // onFailure: function(file) {
    //     //     $("#uploadInf").append("<p>图片" + file.name + "上传失败！</p>");  
    //     //     $("#uploadImage_" + file.index).css("opacity", 0.2);
    //     // },
    //     onComplete: function() {
    //         //file控件value置空
    //         $("#input").val("");
    //         // $("#uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
    //     }
    // };
    // ZXXFILE = $.extend(ZXXFILE, params);
    // ZXXFILE.init();
	





}])
// .directive('zhUploadImg',function(){
// 	return {
// 		restrict:'A',
// 		link:function(scope,elem,attrs,ngModel){
// 			var file = document.getElementById("file");
// 			if(typeof FileReader == 'undefined'){
// 				alert("你的浏览器不支持FileReader接口！");
// 			}

// 			var reader = new FileReader();
// 			//将文件以Data URL形式读入页面
// 			reader.readAsDataURL(file.files[0]);
// 			reader.onload = function(e){
// 				console.log(e);
// 				console.log(this.result);
// 			}
// 			// console.log(file.files);
		

// 		}
// 	};
// })
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
// .directive('zhTextareaSize',function(){
// 	return {
// 		restrict:'A',
// 		link:function(scope,elem,attrs){
// 			// console.log(element);
// 			$("#textarea").val();
			
// 		}
// 	};
// })


















