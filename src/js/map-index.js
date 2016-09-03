var PATH = "http://wapapi.zhujiash.com/";
var WORK_MAN = "../images/map/test1.png";
function createMarker(workers){

	for(var i=0,len=workers.length;i<len;i++){
		var point = new BMap.Point(workers[i].Longitude,workers[i].Latitude);
		var icon = new BMap.Icon(WORK_MAN,new BMap.Size(34,32));
		var marker = new BMap.Marker(point,{icon:icon});
		map.addOverlay(marker);

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
                +   "<span class='name'>开锁换锁</span>"
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
                break;  
            case 2:
                var htm2 = "<div class='bubbleInfo'>"
                +   "<span class='name'>开锁换锁</span>"
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
                break;    
            case 3:
                if(manOrwoman === "0"){
                    var htm3_0 = "<div class='bubbleInfo'>"
                    +   "<span class='name'>开锁换锁</span>"
                    +   "<span class='num mapRed'>男40岁</span>"
                    +"</div>"; 
                    var label = new BMap.Label(htm3_0,opts);
                }else{
                    var htm3_1 = "<div class='bubbleInfo'>"
                    +   "<span class='name'>开锁换锁</span>"
                    +   "<span class='num mapRed'>女40岁</span>"
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
                break; 
            case 4:
                var htm4 = "<div class='bubbleInfo'>"
                +   "<span class='name'>开锁换锁</span>"
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
                break; 
            case 5:
                var htm5 = "<div class='bubbleInfo'>"
                +   "<span class='name'>开锁换锁</span>"
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
                break;  
            case 6:
                var htm6 = "<div class='bubbleInfo'>"
                +   "<span class='name'>开锁换锁</span>"
                +   "<span class='num mapGreen'>浙江</span>"
                +"</div>"; 
                var label = new BMap.Label(htm6,opts);
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-50px",
                    marginTop:"-30px"
                });
                marker.setLabel(label);  
                break;
            default :
                var htm0 = "<div class='bubbleInfo'>"
                +   "<span>开锁换锁</span>"
                // +   "<span class='num'>杭州</span>"
                +"</div>";
                var label = new BMap.Label(htm0,opts);
                label.setStyle({
                    border:0,
                    backgroundColor:"rgba(0,0,0,0)",
                    marginLeft:"-50px",
                    marginTop:"-30px"
                });
                marker.setLabel(label);
                break;  
        }


	}
}

function getData(data){

	$.ajax({
		method: "POST",
		url: PATH+"api/v1/provider/Index",
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