/**
 * Created by Administrator on 2016/9/13.
 */
$(function(){
    var swiper = new Swiper('.swiper-container', {
        //pagination: '.swiper-pagination',
        initialSlide:0,
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 0,
        touchRatio:1,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true//修改swiper的父元素时，自动初始化swiper
    });

    $(".fuwu-cont").click(function(){
        $(".kehu-pingjia").removeClass("active");
        $(this).addClass("active");
        $("#tab-kehu").css("display","none");
        $("#tab-fuwu").css("display","block");
    })
    $(".kehu-pingjia").click(function(){
        $(".fuwu-cont").removeClass("active");
        $(this).addClass("active");
        $("#tab-kehu").css("display","block");
        $("#tab-fuwu").css("display","none");
    })

    // 轮播图弹出层
    $('#container').on('click', '#showDialog1', function () {
        $('#dialog1').show().on('click', '.weui_btn_dialog', function () {
            $('#dialog1').off('click').hide();
        });
    });
    ////手机弹出框
    //$('.dianhua-img').click(function(){
    //    $('.weui_dialog_alert').show();
    //})
    //$('.xx-img').click(function(){
    //    $('.weui_dialog_alert').hide();
    //})

    // 认证信息弹出层
    $('#container').on('click', '#showDialog2', function () {
        $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
            $('#dialog2').off('click').hide();
        });
    });

// 轮播图弹出效果---------------------------------------------
    //弹出隐藏层
    $("#showSlide").click(function(){
        ShowDiv('MyDiv','fade');
    });
    $(".black_overlay").click(function(){
        CloseDiv('MyDiv','fade');
    });


// jax--------------------------------------------------------
// 加载页面其他数据
    var Type=getUrl('type');
    var Id=getUrl('id');
    $.ajax({
        type: 'POST',
        url: 'http://192.168.1.191:3001/api/v2/Provider/Detail',
        dataType: 'json',
        data:{
            Type:"1",
            Id:"3110"
        },
        success:function(data){
            var api=data.Body.Worker;
            $(".bus-img").attr("src",api.Photo);
            $(".Gender").attr("src",api.Gender);
            $(".Name").text(api.Name);
            $(".Age").text(api.Age);
            $(".jl-num").text(api.Distance);
            $(".PraiseCount").text(api.PraiseCount);
            $(".Grade").text(api.Grade);
            $(".phoneNo").attr("href","tel:"+api.PhoneNumber);
            $(".FavoriteCount").text(api.FavoriteCount);
            $(".Wage").text(api.Wage);
            $(".NativePlace").text(api.NativePlace);
            $(".WorkingYears").text(api.WorkingYears);
            $(".addresss").text(api.Address);
            $(".Distance").text(api.Distance);
            $(".OrderCount").text(api.OrderCount);
            $(".OrderRank").text(api.OrderRank);
            $(".PhoneCount").text(api.PhoneCount);
            $(".PhoneRank").text(api.PhoneRank);
            $(".GradeRank").text(api.GradeRank);
            if(api.Gender=="0"){
                $(".Gender").attr("src","../../images/worker/ic_nv.svg");
            }else if(api.Gender=="1"){
                $(".Gender").attr("src","../../images/worker/ic_nan.svg");
            }

            // var RzImgs="";
            // for (var i = 0; i < data.Rzimgs.length; i++) {
            // 	RzImgs+='<img src="'+data.Rzimgs[i].pic+'" class="rz-dia-img" alt="">';
            // }
            // $(".rz-imgs").html(RzImgs);

            // var ModelRzImgs="";
            // for (var j = 0; j < data.Rzimgs.length; j++) {
            // 	ModelRzImgs+='<li><img src="'+data.Rzimgs[j].pic+'" class="rz-dia-img" alt=""><span class="rz-name">'+data.Rzimgs[j].title+'</span></li>';
            // }
            // $(".dialog-imgs").html(ModelRzImgs);



        },
        error: function(xhr, type){
            alert('Ajax error!');
            // 即使加载出错，也得重置
            me.resetload();
        }
    });

    //上滑加载"客户评价"更多数据--------------------------------
    var counter2 = 0;
    var num2 = 5;// 每页展示5个
    var pageStart2 = 0,pageEnd2 = 0;
    $('#tab-kehu').dropload({
        scrollArea : window,
        loadDownFn : function(me){
            $.ajax({
                type: 'POST',
                url: 'http://192.168.1.191:3003/api/v2/Evaluation/GetMerchantEvaluationList',
                dataType: 'json',
                data:{
                    ID:Id
                },

                success: function(data){
                    if(data.Body)
                        var result = '';
                        counter2++;
                        pageEnd2 = num2 * counter2;
                        pageStart2 = pageEnd2 - num2;

                    for(var i = pageStart2; i < pageEnd2; i++){
                        var res='';
                        var api=data.Body.Worker;
                        if(api[i].Gender<5){
                            for(var j = 1; j <= api[i].Gender; j++){
                                res+='<img src="/images/worker/ic_xin_sel.svg" alt="" class="kehu-xin">'
                            }
                            var x=5-api[i].Gender;
                            for(var m = 1; m <= x; m++){
                                res+='<img src="/images/worker/ic_xin_nor.svg" alt="" class="kehu-xin">'
                            }
                        }else{
                            for(var k = 1; k <= 5; k++){
                                res+='<img src="/images/worker/ic_xin_sel.svg" alt="" class="kehu-xin">'
                            }
                        }

                        result  +='<div class="kehu-item"><div class="kehu-top"><img src="../../images/worker/bus-img.png" alt="" class="kehu-img">'
                            +'<span class="kehu-name">'+api[i].name+'</span>'
                            +'<span class="kehu-time">'+api[i].date+'</span>'
                            +'<div class="kehu-heart">'+res
                            +'<span class="kehu-pingfen">'+api[i].Gender+'</span></div></div>'
                            +'<div class="clear"></div><div class="kehu-cont">'+api[i].cont+'</div></div>';

                        if((i + 1) >= data.Worker.length){
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                            break;
                        }
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
                        $('.kehu-list').append(result);
                        // 每次数据加载完，必须重置
                        me.resetload();
                    },1000);


                },
                error: function(xhr, type){
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        }
    });

});

function ShowDiv(show_div,bg_div){
    document.getElementById(show_div).style.display='block';
    document.getElementById(bg_div).style.display='block' ;
    var bgdiv = document.getElementById(bg_div);
    bgdiv.style.width = document.body.scrollWidth;
    // bgdiv.style.height = $(document).height();
    $("#"+bg_div).height($(document).height());
};

//关闭弹出层
function CloseDiv(show_div,bg_div)
{
    $('#'+show_div).hide();
    $('#'+bg_div).hide();
};

// 获取地址传参
function getUrl(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}