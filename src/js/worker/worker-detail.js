"use strict"
$(function() {
    var swiper = new Swiper('.swiper-container', {
        //pagination: '.swiper-pagination',
        initialSlide: 0,
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 0,
        touchRatio: 1,
        observer: true,
        //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
    });

    // 轮播图弹出层
    $('#container').on('click', '#showDialog1',
        function() {
            $('#dialog1').show().on('click', '.weui_btn_dialog',
                function() {
                    $('#dialog1').off('click').hide();
                });
        });

    // 认证信息弹出层
    $('#container').on('click', '#showDialog2',
        function() {
            $('#dialog2').show().on('click', '.weui_btn_dialog',
                function() {
                    $('#dialog2').off('click').hide();
                });
        });

    // 轮播图弹出效果---------------------------------------------
    //弹出隐藏层
    $("#showSlide").click(function() {
        ShowDiv('MyDiv', 'fade');
    });
    $(".black_overlay").click(function() {
        CloseDiv('MyDiv', 'fade');
    });

    // 加载页面其他数据
    var Type = getUrl('type');
    var Id = getUrl('markid');
    $.ajax({
        type: 'POST',
        url: 'http://192.168.1.191:3001/api/v2/Provider/Detail',
        dataType: 'json',
        data: {
            Type: Type,
            Id: Id
        },
        success: function(data) {
            var api = data.Body.Worker;
            $(".bus-img").attr("src", api.Photo);
            $(".Gender").attr("src", api.Gender);
            $(".Name").text(api.Name);
            $(".Age").text(api.Age);
            $(".jl-num").text(api.Distance);
            $(".PraiseCount").text(api.PraiseCount);
            $(".Grade").text(api.Grade);
            $(".phoneNo").attr("href", "tel:" + api.PhoneNumber);
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
            $(".worker-mes").attr("href", "worker-message.html?type=" + Type + "&markid=" + Id);
            $(".a-tag").attr("href", "worker-tags.html?markid=" + Id);
            if (api.Gender == "1") {
                $(".Gender").attr("src", "../../images/worker/ic_nv.svg");
            } else {
                $(".Gender").attr("src", "../../images/worker/ic_nan.svg");

            }

            var RzImgs = "";
            for (var i = 0; i < api.SystemCertification.length; i++) {
                RzImgs += '<img src="' + api.SystemCertification[i].Image + '" class="rz-dia-img" alt="">';

            }
            $(".rz-imgs").html(RzImgs);

            var ModelRzImgs = "";
            for (var j = 0; j < api.SystemCertification.length; j++) {
                ModelRzImgs += '<li><img src="' + api.SystemCertification[j].Image + '" class="rz-dia-img" alt=""><span class="rz-name">' + api.SystemCertification[j].Name + '</span></li>';
            }
            $(".dialog-imgs").html(ModelRzImgs);

        },
        error: function(xhr, type) {
            alert('Ajax error!');
            // 即使加载出错，也得重置
            me.resetload();
        }
    });
    // 加载商户头像列表
    $.ajax({
        type: 'POST',
        url: 'http://192.168.1.191:3001/api/v2/Provider/Avatar',
        dataType: 'json',
        data: {
            Type: Type,
            Id: Id
        },
        success: function(data) {
            var imgs_api = data.Body.Avatars;
            var imgs_res = "";
            for (var i = 0; i < imgs_api.length; i++) {
                imgs_res += '<div class="swiper-slide"><img src="' + imgs_api[i] + '" class="swiper-img" alt=""></div>';
            }
            $(".swiper-wrapper").html(imgs_res);

        },
        error: function(xhr, type) {
            alert('Ajax error!');
            // 即使加载出错，也得重置
            me.resetload();
        }
    });
    //获取工人标签
    $.ajax({
        type: 'POST',
        url: 'http://192.168.1.191:3001/api/v2/Worker/GetWorkerTags',
        dataType: 'json',
        data: {
            WorkerId: Id
        },
        success: function(data) {
            var api = data.Body.TagList;
            var res = "";
            for (var i = 0; i < api.length; i++) {
                res += "<span class='Tag TagName'>" + api[i].TagName + "</span>";
            }
            if (api.length == 0) {
                $(".worker-tag").css("display", "none");
            }

            $(".tab-num").text(api.length);
            $(".worker-tag-box").html(res);

        },
        error: function(xhr, type) {
            alert('Ajax error!');
            // 即使加载出错，也得重置
            me.resetload();
        }
    });

});
//   客户评论列表
var Type = getUrl('type');
var Id = getUrl('markid');
var counter2 = 0;
var num2 = 5; // 每页展示5个
var pageStart2 = 0,
    pageEnd2 = 0;
$('.kuhupingjia').dropload({
    scrollArea: window,
    loadDownFn: function(me) {
        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.191:3003/api/v2/Evaluation/GetWorkerEvaluationList',
            dataType: 'json',
            data: {
                ID: Id
            },
            success: function(data) {
                if (data.Body == null) {
                    $(".kuhupingjia").css("display", "block");
                }

                if (data.Body) {
                    var api = data.Body.EvaluationList;
                    var result = '';
                    counter2++;
                    pageEnd2 = num2 * counter2;
                    pageStart2 = pageEnd2 - num2;
                    for (var i = pageStart2; i < pageEnd2; i++) {
                        var res_xin = '';
                        if (api[i].Score == 0) {
                            for (var m = 0; m < 5; m++) {
                                res_xin += '<img src="../../images/worker/ic_xin_nor.svg"  class="xingx-img" alt=""/>';
                            }
                        }else if(api[i].Score == 5) {
                            for (var k = 0; k <= 5; m++) {
                                res_xin += '<img src="../../images/worker/ic_xin_sel.svg"  class="xingx-img" alt=""/>';
                            }
                        }else {
                            var x = 5 - api[i].Score;
                            for (var n = 0; n <= api[i].Score; n++) {
                                res_xin += '<img src="../../images/worker/ic_xin_sel.svg"  class="xingx-img" alt=""/>';
                            }
                            for (var j = 1; j <= x; j++) {
                                res_xin += '<img src="../../images/worker/ic_xin_nor.svg"  class="xingx-img" alt=""/>';
                            }
                        }

                        result += '<div class="pl-item"><div class="fl"><img style="width: 28px; height: 28px; vertical-align: middle;" src="' + api[i].Pictures[0].SmallPic + '" class="touxiang-img" alt=""/><span class="client-name">' + api[i].ClientName + '</span><span class="pl-date">' + api[i].Date + '</span></div><div class="fr"><span class="xinxin">' + res_xin + '</span><span class="pl-score">' + api[i].Score + '</span></div><div class="clear"></div><div class="pl-cont">' + api[i].Content + '</div></div>';

                        if((i + 1) >= api.length){
                                     // 锁定
                                     me.lock();
                                     // 无数据
                                     me.noData();
                                     break;
                        }
                    }
                    $('.client-pl').html(result);
                }

            },
            error: function(xhr, type) {
                alert('Ajax error!');
                // 即使加载出错，也得重置
                me.resetload();

            }

        });

    }
});
function ShowDiv(show_div, bg_div) {
    document.getElementById(show_div).style.display = 'block';
    document.getElementById(bg_div).style.display = 'block';
    var bgdiv = document.getElementById(bg_div);
    bgdiv.style.width = document.body.scrollWidth;
    // bgdiv.style.height = $(document).height();
    $("#" + bg_div).height($(document).height());
};

//关闭弹出层
function CloseDiv(show_div, bg_div) {
    $('#' + show_div).hide();
    $('#' + bg_div).hide();
};

// 获取地址传参
function getUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}