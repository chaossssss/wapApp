"use strict"
var PATH = CONFIG.IP;
var WORK_MAN = "/images/map/test1.png";
var Local_Img = "/images/map/ic_coordinate.svg";

/**
 * 创建标注
 * @param  {[type]} workers [description]
 * @return {[type]}         [description]
 */
function createMarker(workers,boss){
    remove_overlay();
	for(var i=0,len=workers.length;i<len;i++){
		var point = new BMap.Point(workers[i].Longitude,workers[i].Latitude);
		var icon = new BMap.Icon(workers[i].DefaultService.Icon1,new BMap.Size(34,32));
        icon.setImageSize(new BMap.Size(34,32));
		var marker = new BMap.Marker(point,{icon:icon});
		map.addOverlay(marker);

        // var id = workers[i].Id;
        addClickHandler(marker,"worker",workers[i].Id);
        // marker.addEventListener("click",function(){
        //     alert(id);
        //     goDetail("worker",id);
        // });

        var manOrwoman = workers[i].Gender;
        var flag = workers[i].DisplayAttribute;

        var opts = {
            position:point
            // offset:new BMap.Size(-40,-30)
        }              
        // marker.setLabel(label);
        // map.addOverlay(label);
        
        switch (flag) {
            case 1:
                var htm1 = "<div class='bubbleInfo'>"
                +   "<span class='name'>"+workers[i].DefaultService.Name+"</span>"
                +   "<span class='num mapBlue'>5年</span>"
                +"</div>";
                var label = new BMap.Label(htm1,opts);
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-50px",
                    marginTop:"-30px"
                });
                marker.setLabel(label);  
                addClickLabel(label,"worker",workers[i].Id);
                // label.addEventListener("click",function(){
                //     goDetail("worker",id);
                // });
                break;  
            case 2:
                var htm2 = "<div class='bubbleInfo'>"
                +   "<span class='name'>"+workers[i].DefaultService.Name+"</span>"
                +   "<span class='num mapPink'>2年</span>"
                +"</div>"; 
                var label = new BMap.Label(htm2,opts);
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-50px",
                    marginTop:"-30px"
                });
                marker.setLabel(label);
                addClickLabel(label,"worker",workers[i].Id); 
                // label.addEventListener("click",function(){
                //     goDetail("worker",id);
                // }); 
                break;    
            case 3:
                if(manOrwoman === "0"){
                    var htm3_0 = "<div class='bubbleInfo'>"
                    +   "<span class='name'>"+workers[i].DefaultService.Name+"</span>"
                    +   "<span class='num mapRed'>男"+workers[i].Age+"</span>"
                    +"</div>"; 
                    var label = new BMap.Label(htm3_0,opts);
                }else{
                    var htm3_1 = "<div class='bubbleInfo'>"
                    +   "<span class='name'>开锁换锁</span>"
                    +   "<span class='num mapRed'>女"+workers[i].Age+"</span>"
                    +"</div>"; 
                    var label = new BMap.Label(htm3_1,opts);
                }
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-50px",
                    marginTop:"-30px"
                });
                marker.setLabel(label); 
                addClickLabel(label,"worker",workers[i].Id); 
                // label.addEventListener("click",function(){
                //     goDetail("worker",id);
                // });
                break; 
            case 4:
                var htm4 = "<div class='bubbleInfo'>"
                +   "<span class='name'>"+workers[i].DefaultService.Name+"</span>"
                +   "<span class='num mapPurple'>10公里</span>"
                +"</div>";
                var label = new BMap.Label(htm4,opts);
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-50px",
                    marginTop:"-30px"
                });
                marker.setLabel(label); 
                addClickLabel(label,"worker",workers[i].Id); 
                // label.addEventListener("click",function(){
                //     goDetail("worker",id);
                // });
                break; 
            case 5:
                var htm5 = "<div class='bubbleInfo'>"
                +   "<span class='name'>"+workers[i].DefaultService.Name+"</span>"
                +   "<span class='num mapOrange'>已备案</span>"
                +"</div>";  
                var label = new BMap.Label(htm5,opts);
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-50px",
                    marginTop:"-30px"
                });
                marker.setLabel(label);
                addClickLabel(label,"worker",workers[i].Id); 
                // label.addEventListener("click",function(){
                //     goDetail("worker",id);
                // }); 
                break;  
            case 6:
                var htm6 = "<div class='bubbleInfo'>"
                +   "<span class='name'>"+workers[i].DefaultService.Name+"</span>"
                +   "<span class='num mapGreen'>"+workers[i].NativePlace+"</span>"
                +"</div>"; 
                var label = new BMap.Label(htm6,opts);
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-50px",
                    marginTop:"-30px"
                });
                marker.setLabel(label);  
                addClickLabel(label,"worker",workers[i].Id);
                // label.addEventListener("click",function(){
                //     goDetail("worker",id);
                // });
                break;
            default :
                var htm0 = "<div class='bubbleInfo'>"
                +   "<span>"+workers[i].DefaultService.Name+"</span>"
                // +   "<span class='num'>杭州</span>"
                +"</div>";
                var label = new BMap.Label(htm0,opts);
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-15px",
                    marginTop:"-30px"
                });
                marker.setLabel(label);
                addClickLabel(label,"worker",workers[i].Id);
                // label.addEventListener("click",function(){
                //     goDetail("worker",id);
                // });
                break;  
        }
	}

    for(var j=0,len=boss.length;j<len;j++){
        var point = new BMap.Point(boss[j].Longitude,boss[j].Latitude);
        var icon = new BMap.Icon(boss[j].DefaultService.Icon1,new BMap.Size(34,32));
        icon.setImageSize(new BMap.Size(34,32));
        var marker = new BMap.Marker(point,{icon:icon});
        map.addOverlay(marker);

        // var bossId = boss[j].Id;
        // marker.addEventListener("click",function(){
        //     goDetail("boss",bossId);
        // });
        addClickHandler(marker,"boss",boss[j].Id);

        var flag = boss[j].DisplayAttribute;

        var opts = {
            position:point
            // offset:new BMap.Size(-40,-30)
        }                  
        switch (flag) {
            case 1:
                var htm1 = "<div class='bubbleInfo'>"
                +   "<span class='name'>"+boss[j].DefaultService.Name+"</span>"
                +   "<span class='num mapBlue'>5年</span>"
                +"</div>";
                var label = new BMap.Label(htm1,opts);
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-50px",
                    marginTop:"-30px"
                });
                marker.setLabel(label);  
                addClickLabel(label,"boss",boss[j].Id);
                // label.addEventListener("click",function(){
                //     goDetail("boss",bossId);
                // });
                break;  
            case 2:
                var htm2 = "<div class='bubbleInfo'>"
                +   "<span class='name'>"+boss[j].DefaultService.Name+"</span>"
                +   "<span class='num mapPink'>2年</span>"
                +"</div>"; 
                var label = new BMap.Label(htm2,opts);
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-50px",
                    marginTop:"-30px"
                });
                marker.setLabel(label); 
                addClickLabel(label,"boss",boss[j].Id);
                // label.addEventListener("click",function(){
                //     goDetail("boss",bossId);
                // }); 
                break;    
            case 3:
                if(manOrwoman === "0"){
                    var htm3_0 = "<div class='bubbleInfo'>"
                    +   "<span class='name'>"+boss[j].DefaultService.Name+"</span>"
                    +"</div>"; 
                    var label = new BMap.Label(htm3_0,opts);
                }else{
                    var htm3_1 = "<div class='bubbleInfo'>"
                    +   "<span class='name'>开锁换锁</span>"
                    +   "<span class='num mapRed'>杭州</span>"
                    +"</div>"; 
                    var label = new BMap.Label(htm3_1,opts);
                }
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-50px",
                    marginTop:"-30px"
                });
                marker.setLabel(label);  
                addClickLabel(label,"boss",boss[j].Id);
                // label.addEventListener("click",function(){
                //     goDetail("boss",bossId);
                // });
                break; 
            case 4:
                var htm4 = "<div class='bubbleInfo'>"
                +   "<span class='name'>"+boss[j].DefaultService.Name+"</span>"
                +   "<span class='num mapPurple'>10公里</span>"
                +"</div>";
                var label = new BMap.Label(htm4,opts);
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-50px",
                    marginTop:"-30px"
                });
                marker.setLabel(label); 
                addClickLabel(label,"boss",boss[j].Id); 
                // label.addEventListener("click",function(){
                //     goDetail("boss",bossId);
                // });
                break; 
            case 5:
                var htm5 = "<div class='bubbleInfo'>"
                +   "<span class='name'>"+boss[j].DefaultService.Name+"</span>"
                +   "<span class='num mapOrange'>已备案</span>"
                +"</div>";  
                var label = new BMap.Label(htm5,opts);
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-50px",
                    marginTop:"-30px"
                });
                marker.setLabel(label); 
                addClickLabel(label,"boss",boss[j].Id);
                // label.addEventListener("click",function(){
                //     goDetail("boss",bossId);
                // }); 
                break;  
            case 6:
                var htm6 = "<div class='bubbleInfo'>"
                +   "<span class='name'>"+boss[j].DefaultService.Name+"</span>"
                +   "<span class='num mapGreen'>"+boss[j].NativePlace+"</span>"
                +"</div>"; 
                var label = new BMap.Label(htm6,opts);
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-50px",
                    marginTop:"-30px"
                });
                marker.setLabel(label);  
                addClickLabel(label,"boss",boss[j].Id);
                // label.addEventListener("click",function(){
                //     goDetail("boss",bossId);
                // });
                break;
            default :
                var htm0 = "<div class='bubbleInfo'>"
                +   "<span>"+boss[j].DefaultService.Name+"</span>"
                // +   "<span class='num'>杭州</span>"
                +"</div>";
                var label = new BMap.Label(htm0,opts);
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-10px",
                    marginTop:"-30px"
                });
                marker.setLabel(label);
                addClickLabel(label,"boss",boss[j].Id);
                // label.addEventListener("click",function(){
                //     goDetail("boss",bossId);
                // });
                break;  
        }
    }
}


/**
 * 叔叔良心改版
 * @param  {[type]} workers [description]
 * @param  {[type]} boss    [description]
 * @return {[type]}         [description]
 */
// function createMarker(workers,boss){
//     remove_overlay();

//     for(var i=0,len=workers.length;i<len;i++){
//         var point = new BMap.Point(workers[i].Longitude,workers[i].Latitude);
//         var icon = new BMap.Icon(WORK_MAN,new BMap.Size(34,32));
//         var marker = new BMap.Marker(point,{icon:icon});
//         map.addOverlay(marker);

//         var id = workers[i].Id;
//         marker.addEventListener("click",function(){
//             goDetail("worker",id);
//         });

//         var manOrwoman = workers[i].Gender;
//         var flag = workers[i].DisplayAttribute;

//         var opts = {
//             position:point
//             // offset:new BMap.Size(-40,-30)
//         }              
        
//         var htm1 = "<div class='bubbleInfo'>"
//         +   "<span class='name'>"+workers[i].DefaultService.Name+"</span>"
//         +   "<span class='num mapBlue'>"+workers[i].DisplayAttribute+"</span>"
//         +"</div>";
//         var label = new BMap.Label(htm1,opts);
//         label.setStyle({
//             border:0,
//             backgroundColor:"rgba(0,0,0,0)",
//             marginLeft:"-50px",
//             marginTop:"-30px"
//         });
//         marker.setLabel(label);  
//         label.addEventListener("click",function(){
//             goDetail("worker",id);
//         });
//     }
// }

function addClickHandler(marker,type,id){
    marker.addEventListener("click",function(){
        // alert(id);
        goDetail(type,id);
    });
}

function addClickLabel(label,type,id){
    label.addEventListener("click",function(){
        // alert(id);
        goDetail(type,id);
    });
}

/**
 * 跳转到详情页面
 * @return {[type]} [description]
 */
function goDetail(type,id){
    // alert(type);
    // alert(id);
    if(type === "worker"){
        window.location.href = "/template/worker/worker-info.html?type=1&markid="+id;
    }
    if(type === "boss"){
        window.location.href = "/template/business-detail/business-detail.html?type=2&markid="+id;
    }
}

/**
 * 清除覆盖物
 * @return {[type]} [description]
 */
function remove_overlay(){
    map.clearOverlays();   
}

/**
 * 获取数据
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function getData(data){
	$.ajax({
		method: "POST",
		url: PATH+"api/v2/Provider/IndexEx",
		data: data,
	}).success(function(res){
        // console.log("标符号token",$.cookie("Token"));
		console.log("获取数据",res);
        // var workers = res.Body.Workers;
        // var length = res.Body.Workers.length;
        // for(var i=0;i<length;i++){
        //     var num =  parseInt(Math.random()*6);
        //     workers[i].DisplayAttribute = num;
        // }

        // var boss = res.Body.Business;
        // var length = res.Body.Business.length;
        // for(var j=0;j<length;j++){
        //     var numb =  parseInt(Math.random()*6);
        //     boss[j].DisplayAttribute = numb;
        // }
		createMarker(res.Body.Workers,res.Body.Business);
	})
}

function getServiceList(data){
    $.ajax({
        method:"POST",
        url: PATH+"api/v1/clientinfo/Index",
        data:data
    }).success(function(res){
        console.log("个人信息",res);
    })
}
// 获取热门服务
function getHotList(){
    $.ajax({
        method:'POST',
        url: CONFIG.IP+"api/v2/SystemService/InfoListEx",
    }).success(function(res){
        if(res.Meta.ErrorCode === "0"){
            console.log(res);
            var htm = "";
            res.Body.map(function(ele,index,array){
                if(ele.TypeId == "0"){
                    for(var i=0,len=ele.Children.length;i<len;i++){
                        htm = htm + '<li class="fl f15">'+ele.Children[i].TypeName+'</li>';      
                    }
                }
            })
            $("#result").find(".hot-service").append(htm);
        }
        if(res.Meta.ErrorCode === "2004"){
            window.location.href = "/template/login/login.html";
        }
    }).error(function(res){
        alert("服务器连接失败，请检查网络设置");
    })
}
getHotList();

/**
 * 商户控件
 * @return {[type]} [description]
 */
function bossControl(){
    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
    this.defaultOffset = new BMap.Size(10, 20);
}
bossControl.prototype = new BMap.Control();
bossControl.prototype.initialize = function(map){
    var img = document.createElement("img");
    img.src = "/images/map/btn_boss.svg";
    img.style.width = "40px";
    img.id = "boss";
    // 绑定事件
    img.onclick = function(e){    
        var $boss = $("#boss");   
        var yesorno = $("#boss").hasClass("active");
        if(yesorno){
            $boss.removeClass("active");
            $boss.attr("src","/images/map/btn_boss.svg");
        }else{
            $boss.addClass("active");
            $boss.attr("src","/images/map/btn_boss_active.svg");    
        }         
    }
    // 添加DOM元素到地图中
    map.getContainer().appendChild(img);
    // 将DOM元素返回
    return img;
}

/**
 * 工人控件
 * @return {[type]} [description]
 */
function workManControl(){
    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
    this.defaultOffset = new BMap.Size(10, 70);
}  
workManControl.prototype = new BMap.Control();    
workManControl.prototype.initialize = function(map){
    var img = document.createElement("img");
    img.src = "/images/map/btn_worker.svg";
    img.style.width = "40px";
    img.id = "worker";
    img.onclick = function(e){ 
        var $worker = $("#worker");   
        var yesorno = $("#worker").hasClass("active");
        if(yesorno){
            $worker.removeClass("active");
            $worker.attr("src","/images/map/btn_worker.svg");
        }else{
            $worker.addClass("active");
            $worker.attr("src","/images/map/btn_worker_active.svg");    
        }              
    }
    map.getContainer().appendChild(img);
    return img;
}

/**
 *  添加一键下单控件
 */
function activityControl(){
    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
    this.defaultOffset = new BMap.Size(20,50);
}
activityControl.prototype = new BMap.Control();    
activityControl.prototype.initialize = function(map){
    var img = document.createElement("img");
    img.src = "/images/map/one-key.png";
    img.style.width = "60px";

    img.onclick = function(e){    
        window.location.href = "/template/quick-order/quick-order.html?channel=1";     
    }
    map.getContainer().appendChild(img);
    return img;
} 

/**
 * 初始化定位(根据浏览器定位)
 * @type {BMap}
 */
function firstGeolocation(){
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var myIcon = new BMap.Icon(Local_Img, new BMap.Size(22,22));
            mk = new BMap.Marker(r.point,{icon:myIcon});
            mk.setTop(true);    // 放置到最顶层
            mk.setZIndex(10000);   
            mk.disableMassClear();  //不能被clear掉
            map.addOverlay(mk);     //mk放到地图中
            map.panTo(r.point);     //地图中心移动到定位点

            console.log('您的位置：'+r.point.lng+','+r.point.lat);
            //去除百度底部广告
            // $(".anchorBL > a").attr("href","javascript:;");
            // $(".BMap_cpyCtrl.BMap_noprint.anchorBL").css("display","none");
            // $(".anchorBL > a > img").css("opacity","0.5");
            //手动定位控件的自定义样式
            // console.log($(".BMap_geolocationIcon").css("background-image","url('img/geolocationIcon.png')"));
        }
        else {
            alert('failed'+this.getStatus());
        }        
    },{enableHighAccuracy: true})
}

/**
 * 添加手动定位控件
 */
var geolocationControl = new BMap.GeolocationControl({
    anchor:BMAP_ANCHOR_BOTTOM_LEFT, //控件停靠位置
    offset: new BMap.Size(10,30),
    showAddressBar:false,           //是否显示定位信息面板
    locationIcon:new BMap.Icon(Local_Img, new BMap.Size(22,22))   //自定义定位中心点的icon
});
geolocationControl.addEventListener("locationSuccess", function(e){
    // 定位成功事件
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    console.log("当前定位地址为：" + e);
    var pot = e.point;
    map.clearOverlays();  
    //alert(pot);    
    // var myIcon = new BMap.Icon(localTop, new BMap.Size(22,46));
    // if(mk0.point || mk1.point){
    //     //已经定位成功，移动到定位点
    //     console.log("mk0:",mk0.point,"mk1:",mk1.point);
        // map.panTo(mk0.point); 
        // mk1.setPosition(mk0.point);
    // }            
});
geolocationControl.addEventListener("locationError",function(e){
    // 定位失败事件
    alert(e.message);
});


   



