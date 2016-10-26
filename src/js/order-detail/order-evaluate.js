$(function(){
  var token = localStorage.getItem("Token");
  var orderId = getQueryString("orderId");
  var type = getQueryString("type");
  var id = getQueryString("markid");
  function getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
          return unescape(r[2]);
      }
      return null;
  }

  $li = $(".rate li");
  $li.on("click",function(){
    $li.find("img").attr("src","../../images/order-detail/darkLove.png");
    var $this = $(this);
    var $num = $this.index()+1;
    for(var i=0; i<$num; i++){
    $li.eq(i).find("img").attr("src","../../images/order-detail/redLove.png");
    $("#score").text($num);
    }
  })
  $("#zj-textarea").keydown(function(){
    if($("#zj-textarea").val() != null){
      $("#sendEva").removeAttr("disabled");
      $("#submitBtn").removeClass();
      $("#submitBtn").addClass("send-eva");
    }else if($("#zj-textarea").val() === ''){
      $("#sendEva").attr("disabled","disabled");
      $("#submitBtn").removeClass();
      $("#submitBtn").addClass("submit-eva");
    }
  })


$.ajax({
  type:"POST",
  url:"http://192.168.1.191:3001/api/v2/Provider/Detail",
  data:{
    Type:type,
    Id:id,
    Token:token
  },
  success:function(data){
    console.log(data);
    if(type == "1"){
      var str = data.Body.Worker.Grade;
      var grade = str.slice(2,5);
      $("#providerPic").attr("src",data.Body.Worker.Photo);
      // $("#providerPic").css("backgroundImage",data.Body.Worker.Photo);
      $("#providerName").text(data.Body.Worker.Name);
      $("#grade").text(grade);
      $("#praiseCount").text(data.Body.Worker.PraiseCount);
      $("#favoriteCount").text(data.Body.Worker.FavoriteCount);
    }
    if(type == "2"){
      var str = data.Body.Business.Grade;
      var grade = str.slice(2,5);
      $("#providerPic").attr("src",data.Body.Business.Photo);
      $("#providerName").text(data.Body.Business.Name);
      $("#grade").text(grade);
      $("#praiseCount").text(data.Body.Business.PraiseCount);
      $("#favoriteCount").text(data.Body.Business.FavoriteCount);
    }
  }
})

var FILE = {
  fileInput: null,        //html file控件
  dragDrop: null,         //拖拽敏感区域
  upButton: null,         //提交按钮
  url: "",            //ajax地址
  fileFilter: [],         //过滤后的文件数组
  filter: function(files) {   //选择文件组的过滤方法
    return files; 
  },
  onSelect: function() {},    //文件选择后
  onDelete: function() {},    //文件删除后
  // onDragOver: function() {},    //文件拖拽到敏感区域时
  // onDragLeave: function() {}, //文件离开到敏感区域时
  // onProgress: function() {},    //文件上传进度
  // onSuccess: function() {},   //文件上传成功时
  // onFailure: function() {},   //文件上传失败时,
  // onComplete: function() {},    //文件全部上传完毕时
  
  /* 开发参数和内置方法分界线 */
  
  //文件拖放
  funDragHover: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this[e.type === "dragover"? "onDragOver": "onDragLeave"].call(e.target);
    return this;
  },
  //获取选择文件，file控件或拖放
  funGetFiles: function(e) {
    // 取消鼠标经过样式
    this.funDragHover(e);
        
    // 获取文件列表对象
    var files = e.target.files || e.dataTransfer.files;
    //继续添加文件
    this.fileFilter = this.fileFilter.concat(this.filter(files));
    this.funDealFiles();
    return this;
  },
  
  //选中文件的处理与回调
  funDealFiles: function() {
    for (var i = 0, file; file = this.fileFilter[i]; i++) {
      //增加唯一索引值
      file.index = i;
    }
    //执行选择回调
    this.onSelect(this.fileFilter);
    return this;
  },
  
  //删除对应的文件
  funDeleteFile: function(fileDelete) {
    var arrFile = [];
    for (var i = 0, file; file = this.fileFilter[i]; i++) {
      if (file != fileDelete) {
        arrFile.push(file);
      } else {
        this.onDelete(fileDelete);  
      }
    }
    this.fileFilter = arrFile;
    return this;
  },
  
  //文件上传
  // funUploadFile: function() {
  //   var self = this;  
  //   if (location.host.indexOf("sitepointstatic") >= 0) {
  //     //非站点服务器上运行
  //     return; 
  //   }
  //   for (var i = 0, file; file = this.fileFilter[i]; i++) {
  //     (function(file) {
  //       var xhr = new XMLHttpRequest();
  //       if (xhr.upload) {
  //         // 上传中
  //         xhr.upload.addEventListener("progress", function(e) {
  //           self.onProgress(file, e.loaded, e.total);
  //         }, false);
    
  //         // 文件上传成功或是失败
  //         xhr.onreadystatechange = function(e) {
  //           if (xhr.readyState == 4) {
  //             if (xhr.status == 200) {
  //               self.onSuccess(file, xhr.responseText);
  //               self.funDeleteFile(file);
  //               if (!self.fileFilter.length) {
  //                 //全部完毕
  //                 self.onComplete();  
  //               }
  //             } else {
  //               self.onFailure(file, xhr.responseText);   
  //             }
  //           }
  //         };
    
  //         // 开始上传
  //         xhr.open("POST", self.url, true);
  //         xhr.setRequestHeader("X_FILENAME", encodeURIComponent(file.name));
  //         xhr.send(file);
  //       } 
  //     })(file); 
  //   } 
      
  // },
  
  init: function() {
    var self = this;
    
    if (this.dragDrop) {
      this.dragDrop.addEventListener("dragover", function(e) { self.funDragHover(e); }, false);
      this.dragDrop.addEventListener("dragleave", function(e) { self.funDragHover(e); }, false);
      this.dragDrop.addEventListener("drop", function(e) { self.funGetFiles(e); }, false);
    }
    
    //文件选择控件选择
    if (this.fileInput) {
      this.fileInput.addEventListener("change", function(e) { self.funGetFiles(e); }, false); 
    }
    
    //上传按钮提交
    // if (this.upButton) {
    //   this.upButton.addEventListener("click", function(e) { self.funUploadFile(e); }, false); 
    // } 
  }
};

var params = {
  fileInput: $("#fileImage").get(0),
  dragDrop: $("#fileDragArea").get(0),
  upButton: $("#submitBtn").get(0),
  url: '',
  filter: function(files) {
    var arrFiles = [];
    for (var i = 0, file; file = files[i]; i++) {
      if (file.type.indexOf("image") == 0) {
        if (file.size >= 5120000) {
          alert('您这张"'+ file.name +'"图片大小过大，应小于5000k');  
        } else {
          arrFiles.push(file);  
        }     
      } else {
        alert('文件"' + file.name + '"不是图片。');  
      }
    }
    return arrFiles;
  },
  onSelect: function(files) {
    var html = '', i = 0;
    var funAppendImage = function() {
      file = files[i];
      if (file) {
        var reader = new FileReader()
        reader.onload = function(e) {
          html = html + '<div id="uploadList_'+ i +'" class="upload_append_list">' + 
            '<div class="upload_delete" data-index="'+ i +'">x</div>' +
            '<img id="uploadImage_' + i + '" src="' + e.target.result + '" class="upload_image upload_pic" />'+ 
            '<span id="uploadProgress_' + i + '" class="upload_progress"></span>' +
          '</div>';
          i++;
          funAppendImage();
        }
        reader.readAsDataURL(file);
      } else {
        $("#preview").html(html);
        if (html) {
          //删除方法
          $(".upload_delete").on("click",function(){
            FILE.funDeleteFile(files[parseInt($(this).attr("data-index"))]);
            return false; 
          });
          //提交按钮显示
          // $("#submitBtn").show();  
        }
        // else {
        //   //提交按钮隐藏
        //   $("#submitBtn").hide();  
        // }
      }
    };
    funAppendImage();   
  },
  onDelete: function(file) {
    $("#uploadList_" + file.index).fadeOut();
    // $("#uploadList_" + file.index).html('');
  },
  onDragOver: function() {
    $(this).addClass("upload_drag_hover");
  },
  onDragLeave: function() {
    $(this).removeClass("upload_drag_hover");
  },
  onProgress: function(file, loaded, total) {
    var eleProgress = $("#uploadProgress_" + file.index), percent = (loaded / total * 100).toFixed(2) + '%';
    eleProgress.show().html(percent);
  },
  onSuccess: function(file, response) {
    $("#uploadInf").append("<p>上传成功，图片地址是：" + response + "</p>");
  },
  onFailure: function(file) {
    $("#uploadInf").append("<p>图片" + file.name + "上传失败！</p>");  
    $("#uploadImage_" + file.index).css("opacity", 0.2);
  },
  onComplete: function() {
    //提交按钮隐藏
    $("#submitBtn").hide();
    //file控件value置空
    $("#fileImage").val("");
    $("#uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
  }
};
FILE = $.extend(FILE, params);
FILE.init();

$("#fileImage").on("click",function(){
  console.log($("#fileImage")[0].files[0]);
  var imgData = new FormData();
  imgData.append("user","1111");
  var img = $("#fileImage")[0].files;
  for(i = 0; i < img.length; i++){
    imgData.append("img"+i,img[i]);
  }
  console.log(imgData);
})

$("#submitBtn").on("click",function(){
  function GetJsonData(){
    var json_data = {
      "Token":token,
      "OrderId":orderId,
      "Score":$("#score").text(),
      "Content":$("#zj-textarea").val()
    };
    return json_data;
  }
  var formData = new FormData();
  var jsonData = JSON.stringify(GetJsonData());
  formData.append("JSON_Data",jsonData);
  var img = $("#fileImage")[0].files;
  for(i = 0; i < img.length; i++){
    formData.append("img"+i,img[i]);
  }
  // fileinfo = document.getElementById('uploadForm').files[0];
  // formData.append("img",fileinfo);
  // console.log(GetJsonData());
  console.log(formData);
  $.ajax({
    type:"POST",
    url:"http://192.168.1.191:3003/api/v2/Evaluation/EvaluateOrder",
    data:formData,
    async:false,
    cache:false,
    contentType:false,
    processData:false,
    success:function(data){
      console.log(data.Meta.ErrorMsg);
      alert(data.Meta.ErrorMsg);
    }
  })
      window.location.href="order-evaluated.html?orderId=" + orderId + "&type=" + type + "&markid=" + id;
})

})