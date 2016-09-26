$(function(){
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
    }
  })
  // $("#zj-textarea").blur(function(){
  //     $("#zj-textarea").val() == '')
  //     $("#sendEva").attr("disabled","disabled");
  //     $("#submitBtn").removeClass();
  //     $("#submitBtn").addClass("submit-eva");
    
  // })


})