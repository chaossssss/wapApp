var PATH = "http://wapapi.zhujiash.com/";
var WORK_MAN = "../images/测试3.png";
function createMarker(workers){

	for(var i=0,len=workers.length;i<len;i++){
		var point = new BMap.Point(workers[i].Longitude,workers[i].Latitude);
		var icon = new BMap.Icon(WORK_MAN,new BMap.Size(60,60));
		var marker = new BMap.Marker(point,{icon:icon});
		map.addOverlay(marker);

		var htm = "<div class='bubbleInfo'>"
                +   "<span class='name'>开锁换锁</span>"
                +   "<span class='num'>杭州</span>"
                +"</div>";
        var opts = {
            position:point,
            offset:new BMap.Size(-15,-30)
        }              

        var label = new BMap.Label(htm,opts);
        label.setStyle({
            border:0,
            backgroundColor:"rgba(0,0,0,0)"
            // color:"blue",
            // fontsize:"12px",
            // height:"20px",
            // lineheight:"20px",
            // fontFamily:"微软雅黑"
            // backgroundColor:"rgba(0,0,0,0.4)"
        });

        marker.setLabel(label);
        // map.addOverlay(label);
	}
}

function getData(data){

	$.ajax({
		method: "POST",
		url: PATH+"api/v1/provider/Index",
		data: data,
	}).success(function(res){
		console.log("获取数据",res);
		createMarker(res.Body.Workers);

	})
}