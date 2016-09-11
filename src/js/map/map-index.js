"use strict"
var PATH = "http://192.168.1.191:7002/";
var WORK_MAN = "../images/map/test1.png";
var Local_Img = "../images/map/ic_coordinate.svg";




/**
 * 创建标注
 * @param  {[type]} workers [description]
 * @return {[type]}         [description]
 */
function createMarker(workers){

    remove_overlay();

	for(var i=0,len=workers.length;i<len;i++){
		var point = new BMap.Point(workers[i].Longitude,workers[i].Latitude);
		var icon = new BMap.Icon(WORK_MAN,new BMap.Size(34,32));
		var marker = new BMap.Marker(point,{icon:icon});
		map.addOverlay(marker);

        var id = workers[i].Id;
        marker.addEventListener("click",function(){
            goDetail("worker",id);
        });

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
                label.addEventListener("click",function(){
                    goDetail("worker",id);
                });
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
                label.addEventListener("click",function(){
                    goDetail("worker",id);
                }); 
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
                label.addEventListener("click",function(){
                    goDetail("worker",id);
                });
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
                label.addEventListener("click",function(){
                    goDetail("worker",id);
                });
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
                label.addEventListener("click",function(){
                    goDetail("worker",id);
                }); 
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
                label.addEventListener("click",function(){
                    goDetail("worker",id);
                });
                break;
            default :
                var htm0 = "<div class='bubbleInfo'>"
                +   "<span>"+workers[i].DefaultService.Name+"</span>"
                +   "<span class='num'>杭州</span>"
                +"</div>";
                var label = new BMap.Label(htm0,opts);
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-50px",
                    marginTop:"-30px"
                });
                marker.setLabel(label);
                label.addEventListener("click",function(){
                    goDetail("worker",id);
                });
                break;  
        }
	}
}

/**
 * 跳转到详情页面
 * @return {[type]} [description]
 */
function goDetail(type,id){
    alert(type);
    alert(id);
    // window.location.href = "";
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
		url: PATH+"api/v1/Provider/IndexEx",
		data: data,
	}).success(function(res){
		console.log("获取数据",res);
        var workers = res.Body.Workers;
        var length = res.Body.Workers.length;
        for(var i=0;i<length;i++){
            var num =  parseInt(Math.random()*6);
            workers[i].DisplayAttribute = num;
        }


		createMarker(workers);

	})
}

/**
 * 商户控件
 * @return {[type]} [description]
 */
function bossControl(){
    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
    this.defaultOffset = new BMap.Size(10, 70);
}
bossControl.prototype = new BMap.Control();
bossControl.prototype.initialize = function(map){
    var img = document.createElement("img");
    img.src = "../../images/map/btn_boss.svg";
    img.style.width = "30px";
    img.id = "boss";
    // 绑定事件
    img.onclick = function(e){    
        var boss = document.getElementById("boss");
        var yesorno = boss.getAttribute("active");    
        // console.log(yesorno);
        if(yesorno === "active"){
            boss.removeAttribute("active");
            img.src = "../../images/map/btn_boss.svg";
        }else{
            boss.setAttribute("active","active");
            img.src = "../../images/map/btn_boss_active.svg";     
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
    this.defaultOffset = new BMap.Size(10, 108);
}  
workManControl.prototype = new BMap.Control();    
workManControl.prototype.initialize = function(map){
    var img = document.createElement("img");
    img.src = "../../images/map/btn_worker.svg";
    img.style.width = "30px";
    img.id = "worker";

    img.onclick = function(e){    
        var worker = document.getElementById("worker");
        var yesorno = worker.getAttribute("active");    
        // console.log(yesorno);
        if(yesorno === "active"){
            worker.removeAttribute("active");
            img.src = "../../images/map/btn_worker.svg";
        }else{
            worker.setAttribute("active","active");
            img.src = "../../images/map/btn_worker_active.svg";     
        }              
    }
    map.getContainer().appendChild(img);
    return img;
}

/**
 * 初始化定位(根据浏览器定位)
 * @type {BMap}
 */
var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
        var myIcon = new BMap.Icon(Local_Img, new BMap.Size(22,22));
        mk = new BMap.Marker(r.point,{icon:myIcon});
        mk.setTop(true);
        mk.setZIndex(10000);
        mk.disableMassClear();
        map.addOverlay(mk);
        map.panTo(r.point); 

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
   



