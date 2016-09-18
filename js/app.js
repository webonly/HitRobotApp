/*!
 * HRG-Setting v1.1.1 
 * Copyright 2015-2016 HIT ROBOT GROUP
 * Date: 2016-6-24 17:33:30 
 *
 * 使用说明：
 * getIsClick          在class添加未点击会初始化
 * getIsService        在class添加未点击会跳转首页初始化
 *
 */
$(function() {
 //初始化
  var getIsClick=0;   //设置屏幕点击状态
  var getIsService=0; //设置是否进入新服务页面
  var stayHome=1;
  var voiceSet=JSON.parse(window.localStorage.getItem("voiceSet"));
  var voiceList;
  if (voiceSet==null) {
     voiceList=["xiaoyan","xiaokun","aisxrong","dalong","jiajia","xiaoxue"]; 
  }else{
    voiceList=voiceSet;
  }

  var voiceData={
    "xiaoyan":"小燕_普通话",
    "aisxyan":"艳萍_普通话",
    "xiaoyu":"小宇_普通话",
    "xiaofeng":"宇峰_普通话",
    "xiaoqi":"小琪_普通话",
    "aisnn":"楠楠_普通话",
    "dalong":"大龙_粤语",
    "xiaomei":"小梅_粤语",
    "aisxlin":"晓琳_台湾普通话",
    "xiaoqian":"晓倩_东北话",
    "aisxrong":"小蓉_四川话",
    "xiaokun":"小坤_河南话",
    "aisxqiang":"小强_湖南话",
    "aisxying":"小英_陕西话",
    "aisjiuxu":"许久_普通话",
    "aisxping":"小萍_普通话",
    "aisxiaobin":"小兵_普通话",
    "laoma":"老马_普通话",
    "xiaorong":"晓蓉_普通话",
    "wangru":"王茹_普通话",
    "aisbabyxu":"许小宝_普通话",
    "aisjinger":"小婧_普通话",
    "yefang":"叶芳_普通话",
    "aisduck":"唐老鸭_普通话",
    "aisxmeng":"小梦_普通话",
    "aismengchun":"孟春_普通话",
    "ziqi":"紫琪_普通话",
    "aisduoxu":"许多_普通话",
    "aisxxin":"蜡笔小新_普通话",
    "jiajia":"佳佳_普通话",
    "xiaoxue":"小雪_普通话"
  };
 if (voiceList.length==1) {
  $(".voice-henan,.voice-sichuan,.voice-guangdong,.voice-liang,.voice-lily").hide();
  $(".voice-mandarin").text(voiceData[voiceList[0]]);
 }else if (voiceList.length==2) {
  $(".voice-sichuan,.voice-guangdong,.voice-liang,.voice-lily").hide();
  $(".voice-mandarin").text(voiceData[voiceList[0]]);
  $(".voice-henan").text(voiceData[voiceList[1]]);
 }else if (voiceList.length==3) {
  $(".voice-guangdong,.voice-liang,.voice-lily").hide();
  $(".voice-mandarin").text(voiceData[voiceList[0]]);
  $(".voice-henan").text(voiceData[voiceList[1]]);
  $(".voice-sichuan").text(voiceData[voiceList[2]]);
 }else if (voiceList.length==4) {
  $(".voice-liang,.voice-lily").hide();
  $(".voice-mandarin").text(voiceData[voiceList[0]]);
  $(".voice-henan").text(voiceData[voiceList[1]]);
  $(".voice-sichuan").text(voiceData[voiceList[2]]);
  $(".voice-guangdong").text(voiceData[voiceList[3]]);
 }else if (voiceList.length==5) {
  $(".voice-lily").hide();
  $(".voice-mandarin").text(voiceData[voiceList[0]]);
  $(".voice-henan").text(voiceData[voiceList[1]]);
  $(".voice-sichuan").text(voiceData[voiceList[2]]);
  $(".voice-guangdong").text(voiceData[voiceList[3]]);
  $(".voice-liang").text(voiceData[voiceList[4]]);
 }else if (voiceList.length==6) {
  $(".voice-mandarin").text(voiceData[voiceList[0]]);
  $(".voice-henan").text(voiceData[voiceList[1]]);
  $(".voice-sichuan").text(voiceData[voiceList[2]]);
  $(".voice-guangdong").text(voiceData[voiceList[3]]);
  $(".voice-liang").text(voiceData[voiceList[4]]);
  $(".voice-lily").text(voiceData[voiceList[5]]);
 }
//离开页面
window.onbeforeunload = function(){
    close_cameraVideo();
    StopTTSspeak();
    ISR_unWakeUp();
  }
//刷新
  $(".refresh").click(function() {
    getIsClick=1;
    StopTTSspeak();
    btnAudio();
    close_cameraVideo() 
    refreshAudio();
    isToggle = true;
    $(".refresh").css("webkitTransform", "rotate(360deg)");
    setTimeout(function() {
      location.reload();
    }, 1000);
  });
// 按钮声音控制
   var videoAudio=document.getElementById("adVideo");
   if (videoAudio) {
    videoAudio.volume=0.1
   }
   document.getElementById("audio-btn").volume = 0.2;
   document.getElementById("audio-btn2").volume = 0.2;
   document.getElementById("photo-video").volume = 0.2;
   function refreshAudio(){
   document.getElementById("audio-btn").play();
  }
  function btnAudio(){
    document.getElementById("audio-btn2").play();
  }
//主界面动画
  $(".main").on("touchstart",function(){
        $(".voice-mandarin").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-henan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-sichuan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-guangdong").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-liang").css({"left":"0px","opacity":"0","visibility":"hidden"});    
        $(".voice-lily").css({"left":"0px","opacity":"0","visibility":"hidden"});      
        $(".voice-chinese").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-english").css({"left":"0px","opacity":"0","visibility":"hidden"});
        getIsClick=1;
  });
  //nav
  $(".nav-btn").css("webkitTransform", "translateY(0px)");
  $(".nav-bottom").css("webkitTransform", "translateY(0px)");
  $(".box-logo").css("webkitTransform", "translateX(-800px)");
  var isToggle = true;
  $("#nav-toggle").bind("click", function() {
      getIsClick=1;
    if (isToggle == false) {
      $("#nav-btn1").css("animation", "navdown 1s  linear 1 forwards");
      $("#nav-btn2").css("animation", "navdown 1.4s  linear 1 forwards");
      $("#nav-btn3").css("animation", "navdown 1.8s   linear 1 forwards");
      $(".nav-bottom").css("animation", "navdownbtn 0.5s linear 1 forwards");
      $("#nav-img").attr("src", "image/toggle-up.png");
      isToggle = true;
    } else {
      $(".nav-btn").css("animation", "navup 0.3s linear 1 forwards");
      $(".nav-bottom").css("animation", "navupbtn 0.3s linear 1 forwards");
      $("#nav-img").attr("src", "image/toggle-down.png");
      isToggle = false;
    }
  });

  var isLeftHidden = false;
  var isRightHidden = false;
  //左右菜单开关
  function switchNav(name,action){
    if (name=="left") {
      if (action=="close") {
    $(".navbox-cont-l").css("webkitTransform", "translateX(-80px)");
    $(".navbox-left").css("webkitTransform", "rotateY(60deg)");
    $("#navigator").css("animationName", "mynavigator");
    isLeftHidden = true;
     }else if (action=="open") {
    $(".navbox-cont-l").css("webkitTransform", "");
    $(".navbox-left").css("webkitTransform", "");
    $("#navigator").css("animationName", "");
    $(".navbox-cont-l").css({"visibility":"visible","opacity":"1"});
    isLeftHidden = false;
      }
    }else if (name=="right") {
      if (action=="close") {
    $(".navbox-cont-r").css("webkitTransform", "translateX(80px)");
    $(".navbox-right").css("webkitTransform", "rotateY(-60deg)");
    $("#voice").css("animationName", "mynavigator");
    isRightHidden = true;
      }else if (action=="open") {
    $(".navbox-cont-r").css("webkitTransform", "");
    $(".navbox-right").css("webkitTransform", "");
    $("#voice").css("animationName", "");
    $(".navbox-cont-r").css({"visibility":"visible","opacity":"1"});
    isRightHidden = false;
      }
    }
  }
  //logo动画开关
  function switchLogo(action){
    if (action=="open") {
      $(".winbox").css("visibility", "visible");
      $(".box-logo").css("visibility", "visible");
      $(".winbox").css("opacity", "1");
      $(".win").css("webkitTransform", "translateX(0px)");
      $(".box-logo").css("animationName","mylogoleft");
    }else if (action=="close") {
    $(".box-logo").css("animationName", "");
    $(".box-logo").css("webkitTransform", "translateX(-800px)");
    $(".win").css("webkitTransform", "translateZ(-1000px)");
    $(".winbox").css("opacity", "0");
    $(".winbox").css("visibility", "hidden");
    $(".box-logo").css("visibility", "hidden");
    }
  }
  //3d-left
  $(".navbox-l-btn").click(function() {
    getIsClick=1;
      btnAudio();
      if (isLeftHidden == false) {
         switchNav("left","close");
        if (isLeftHidden == true && isRightHidden == true) {
             switchLogo("open");
         }
      }else if (isLeftHidden ==true) {
      switchNav("left","open");
      switchLogo("close");
      }
  });
  $(".navbox-l-main").click(function() {
      getIsClick=1;
      btnAudio();
    if (event.target.className=="navbox-l-main") {
      switchNav("left","open");
      switchLogo("close");
    }
  });
  //3d-right
  $(".navbox-r-btn").click(function() {
      getIsClick=1;
      btnAudio();
    if (isRightHidden == false) {
      switchNav("right","close");
      if(isLeftHidden == true && isRightHidden == true) {
         switchLogo("open");
      }
    }else if (isRightHidden == true) {
      switchNav("right","open");
      switchLogo("close");
    }
  });

  $(".navbox-r-main").click(function(event) {
      getIsClick=1;
      btnAudio();
    if (event.target.className=="navbox-r-main") {
      switchNav("right","open");
      switchLogo("close");
      $(".navbox-r-main").unbind("click");
    }
  });

//打开语音识别界面
  $("#voice").click(function(event){
      getIsClick=1;
      btnAudio();
      if (event.target.id=="voice") {
        close_cameraFaceRecog();
        if (isRightHidden == false) {
         switchNav("left","close");
         switchNav("right","close");
        $(".navbox-cont-l, .navbox-cont-r").css({"visibility":"hidden","opacity":"0"});

        $(".voice-main").css({"visibility":"visible","opacity":"1"});
        $(".voice-mainbg").css({"webkitTransform":"translateZ(0px)","visibility":"visible","opacity":"1"});
        $(".voice-state").css({"top":"260px","opacity":"1","visibility":"visible"});
        $(".voice-closebtn").css({"right":"130px","opacity":"1","visibility":"visible"});
        $(".voice-clearbtn").css({"right":"130px","opacity":"1","visibility":"visible"});
        $(".voice-mode").css({"top":"620px","opacity":"1","visibility":"visible"});
        $(".voice-language").css({"left":"40px","opacity":"1","visibility":"visible"});
         //设置滚动条处于底部
        $(".voice-cont").scrollTop($(".voice-cont")[0].scrollHeight);


        }else if (isRightHidden ==true) {
        switchLogo("close");
        switchNav("right","open");
        }
      }
  });
$("body").click(function(event){
       getIsClick=1;
       if (event.target.id=="homemain") {
          $(".voice-mandarin").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-henan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-sichuan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-guangdong").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-liang").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-lily").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-chinese").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-english").css({"left":"0px","opacity":"0","visibility":"hidden"});
       }
});


//关闭语音识别界面
 $(".voice-closebtn").click(function(){
  open_cameraFaceRecog();
  getIsClick=1;
  StopTTSspeak();
  btnAudio();
 $(".voice-closebtn").css("backgroundImage","url(image/closeBtn2.png)");

        $(".voice-mandarin").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-henan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-sichuan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-guangdong").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-liang").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-lily").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-chinese").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-english").css({"left":"0px","opacity":"0","visibility":"hidden"});
   setTimeout(function(){

        $(".voice-main").css({"visibility":"hidden","opacity":"0"});
        $(".voice-mainbg").css({"webkitTransform":"translateZ(-1000px)","opacity":"0","visibility":"hidden"});
        $(".voice-state").css({"top":"100px","opacity":"0","visibility":"hidden"});
        $(".voice-closebtn").css({"right":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-clearbtn").css({"right":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-mode").css({"top":"830px","opacity":"0","visibility":"hidden"});
        $(".voice-language").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".navbox-cont-l , .navbox-cont-r").css("opacity","1");
        $(".voice-closebtn").css("backgroundImage","url(image/closeBtn.png)");
        switchNav("right","open");
        switchNav("left","open");
      }, 200);
 });
//设置语音识别语音
  $(".yuzhong").click(function(){
        getIsClick=1;
        btnAudio();
        $(".voice-mandarin").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-henan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-sichuan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-guangdong").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-liang").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-lily").css({"left":"0px","opacity":"0","visibility":"hidden"});        
        $(".voice-chinese").css({"left":"145px","opacity":"1","visibility":"visible"});
        $(".voice-english").css({"left":"145px","opacity":"1","visibility":"visible"});
        setTimeout(function(){
            $(".voice-chinese").css({"left":"0px","opacity":"0","visibility":"hidden"});
            $(".voice-english").css({"left":"0px","opacity":"0","visibility":"hidden"});
        }, 10000);
 });
 $(".bobao").click(function(){
       getIsClick=1;
       btnAudio();
        $(".voice-chinese").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-english").css({"left":"0px","opacity":"0","visibility":"hidden"});

        $(".voice-mandarin").css({"left":"145px","opacity":"1","visibility":"visible"});
        $(".voice-henan").css({"left":"145px","opacity":"1","visibility":"visible"});
        $(".voice-sichuan").css({"left":"145px","opacity":"1","visibility":"visible"});
        $(".voice-guangdong").css({"left":"145px","opacity":"1","visibility":"visible"});
        $(".voice-liang").css({"left":"145px","opacity":"1","visibility":"visible"});
        $(".voice-lily").css({"left":"145px","opacity":"1","visibility":"visible"});
        setTimeout(function(){
        $(".voice-mandarin").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-henan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-sichuan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-guangdong").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-liang").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-lily").css({"left":"0px","opacity":"0","visibility":"hidden"});
        }, 10000);
 });

 $(".voice-chinese").click(function(){
       getIsClick=1;
        $(".voice-chinese").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-english").css({"left":"0px","opacity":"0","visibility":"hidden"});
        cmdSetISR(language.zh_cn, area.mandarin, true);
 });
 $(".voice-english").click(function(){
        getIsClick=1;
        $(".voice-chinese").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-english").css({"left":"0px","opacity":"0","visibility":"hidden"});
        cmdSetISR(language.en_us, area.mandarin, true);
 });
  $(".voice-mandarin").click(function(){
        getIsClick=1;
        $(".voice-mandarin").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-henan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-sichuan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-guangdong").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-liang").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-lily").css({"left":"0px","opacity":"0","visibility":"hidden"});
       cmdSetTTS(0,voiceList[0]);
 });
  $(".voice-henan").click(function(){
        getIsClick=1;
        $(".voice-mandarin").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-henan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-sichuan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-guangdong").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-liang").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-lily").css({"left":"0px","opacity":"0","visibility":"hidden"});
        cmdSetTTS(0,voiceList[1]);
 });
  $(".voice-sichuan").click(function(){
        getIsClick=1;
        $(".voice-mandarin").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-henan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-sichuan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-guangdong").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-liang").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-lily").css({"left":"0px","opacity":"0","visibility":"hidden"});
            cmdSetTTS(0,voiceList[2]);
 });
  $(".voice-guangdong").click(function(){
        getIsClick=1;
        $(".voice-mandarin").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-henan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-sichuan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-guangdong").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-liang").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-lily").css({"left":"0px","opacity":"0","visibility":"hidden"});
        cmdSetTTS(0,voiceList[3]);
 });
    $(".voice-liang").click(function(){
        getIsClick=1;
        $(".voice-mandarin").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-henan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-sichuan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-guangdong").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-liang").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-lily").css({"left":"0px","opacity":"0","visibility":"hidden"});
        cmdSetTTS(0,voiceList[4]);
 });
      $(".voice-lily").click(function(){
        getIsClick=1;
        $(".voice-mandarin").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-henan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-sichuan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-guangdong").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-liang").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-lily").css({"left":"0px","opacity":"0","visibility":"hidden"});
        cmdSetTTS(0,voiceList[5]);
 });
 $(".voice-clearbtn").click(function(){
  getIsClick=1;
  $(".voice-cont").empty();

 });
//打开人脸识别界面
        $(".face-main").css({"visibility":"hidden","opacity":"0"});
        $(".face-mainbg").css({"webkitTransform":"translateZ(-1000px)","visibility":"hidden"});
        $(".face-closebtn").css({"right":"0px","opacity":"0","visibility":"hidden"});
  $("#face").click(function(event){
      getIsClick=1;
      btnAudio();
      if (event.target.id=="face") {
         videoUser=2;
         console.log("videoUser---"+videoUser)
         open_cameraVideo();
        if (isRightHidden == false) {
         switchNav("left","close");
         switchNav("right","close");
       $(".navbox-cont-l , .navbox-cont-r").css({"visibility":"hidden","opacity":"0"});
        $(".face-main").css({"visibility":"visible","opacity":"1"});
        $(".face-mainbg").css({"webkitTransform":"translateZ(0px)","visibility":"visible"});
        $(".face-closebtn").css({"right":"85px","opacity":"1","visibility":"visible"});
       
        }else if (isRightHidden ==true) {
        switchLogo("close");
        switchNav("right","open");
        }
      }
  });
//关闭人脸识别界面
 $(".face-closebtn").click(function(){
    getIsClick=1;
    btnAudio();
    close_cameraVideo();
    //关闭键盘
   $("#keyboard_5xbogf8c").css({"display":"none"});
 $(".face-closebtn").css("backgroundImage","url(image/closeBtn2.png)");
   setTimeout(function(){
        $(".face-main").css({"visibility":"hidden","opacity":"0"});
        $(".face-mainbg").css({"webkitTransform":"translateZ(-1000px)","visibility":"hidden"});
        $(".face-closebtn").css({"right":"0px","opacity":"0","visibility":"hidden"});

        $(".navbox-cont-l , .navbox-cont-r").css("opacity","1");
        $(".face-closebtn").css("backgroundImage","url(image/closeBtn.png)");
        switchNav("right","open");
        switchNav("left","open");
      }, 200);
 });
$("#setting").click(function(){
     getIsClick=1;
      btnAudio();
      
    close_cameraVideo(); 
    StopTTSspeak();
});
$("#serviePagebtn").click(function(){
    getIsClick=1;
    StopTTSspeak();
    close_cameraVideo();
});
$(".homeService").click(function(){
    getIsService=1;
    getIsClick=1;
    btnAudio();
    close_cameraVideo();
});
$("#openPhoto").click(function(){
    getIsClick=1;
    btnAudio();

});

//打开地图导航界面
        $(".navigator-main").css({"visibility":"hidden","opacity":"0"});
        $(".navigator-mainbg").css({"webkitTransform":"translateZ(-1000px)","visibility":"hidden"});
        $(".navigator-closebtn").css({"right":"0px","opacity":"0","visibility":"hidden"});
  $("#navigator").click(function(event){
      getIsClick=1;
      btnAudio();
      if (event.target.id=="navigator") {
      	close_cameraFaceRecog();
        if (isLeftHidden == false) {
         switchNav("left","close");
         switchNav("right","close");
       $(".navbox-cont-l , .navbox-cont-r").css({"visibility":"hidden","opacity":"0"});

        $(".navigator-main").css({"visibility":"visible","opacity":"1"});
        $(".navigator-mainbg").css({"webkitTransform":"translateZ(0px)","visibility":"visible"});
        $(".navigator-closebtn").css({"right":"85px","opacity":"1","visibility":"visible"});
        }else if (isLeftHidden ==true) {
        switchLogo("close");
        switchNav("left","open");
        }
      }
  });
//关闭地图导航界面
 $(".navigator-closebtn").click(function(){
 	 open_cameraFaceRecog()
    getIsClick=1;
    StopTTSspeak();
    btnAudio();
 $(".navigator-closebtn").css("backgroundImage","url(image/closeBtn2.png)");
        setTimeout(function(){
        $(".navigator-main").css({"visibility":"hidden","opacity":"0"});
        $(".navigator-mainbg").css({"webkitTransform":"translateZ(-1000px)","visibility":"hidden"});
        $(".navigator-closebtn").css({"right":"0px","opacity":"0","visibility":"hidden"});

        $(".navbox-cont-l , .navbox-cont-r").css("opacity","1");
        $(".navigator-closebtn").css("backgroundImage","url(image/closeBtn.png)");
        switchNav("right","open");
        switchNav("left","open");
      }, 200);
 });

//打开业务展示界面
        $(".service-main").css({"visibility":"hidden","opacity":"0"});
        $(".service-mainbg").css({"webkitTransform":"translateZ(-1000px)","visibility":"hidden"});
        $(".service-closebtn").css({"right":"0px","opacity":"0","visibility":"hidden"});
  $("#service").click(function(event){
    getIsClick=1;
    btnAudio();
      if (event.target.id=="service") {
    // document.getElementById("serviceVideo").play();
    // document.getElementById("serviceVideo").volume=0.1;
    close_cameraFaceRecog();
        if (isLeftHidden == false) {
         switchNav("left","close");
         switchNav("right","close");
       $(".navbox-cont-l , .navbox-cont-r").css({"visibility":"hidden","opacity":"0"});

        $(".service-main").css({"visibility":"visible","opacity":"1"});
        $(".service-mainbg").css({"webkitTransform":"translateZ(0px)","visibility":"visible"});
        $(".service-closebtn").css({"right":"85px","opacity":"1","visibility":"visible"});
        }else if (isLeftHidden ==true) {
        switchLogo("close");
        switchNav("left","open");
        }
      }
  });
//关闭业务展示界面
 $(".service-closebtn").click(function(){
  getIsClick=1;
  // document.getElementById("serviceVideo").pause();
  // document.getElementById("serviceVideo").currentTime =0;
  open_cameraFaceRecog();
  btnAudio();
 $(".service-closebtn").css("backgroundImage","url(image/closeBtn2.png)");
   setTimeout(function(){
        $(".service-main").css({"visibility":"hidden","opacity":"0"});
        $(".service-mainbg").css({"webkitTransform":"translateZ(-1000px)","visibility":"hidden"});
        $(".service-closebtn").css({"right":"0px","opacity":"0","visibility":"hidden"});

        $(".navbox-cont-l , .navbox-cont-r").css("opacity","1");
        $(".service-closebtn").css("backgroundImage","url(image/closeBtn.png)");
        switchNav("right","open");
        switchNav("left","open");
      }, 200);
 });
      $("#voice-mode2").hide();
      $("#voice-state2").hide();
      $("#voice-state3").hide();
   $(".voice-mode").on("touchstart",function(){ 
       StopTTSspeak();
      $("#voice-mode1").hide();
      $("#voice-mode2").show();
      cmdISRstart();
   });
   $(".voice-mode").on("touchend",function(){
      $("#voice-mode1").show();
      $("#voice-mode2").hide();
      cmdISRend();
   });

//地图位置翻页
$(".locationName-topbtn").click(function(){
  $(".locationName").animate({
      scrollTop:'-=364',
    },"slow");
   if (document.querySelector(".locationName").scrollTop<364) {
     $(".locationName-topbtn").css("visibility","hidden");
   }
});

$(".locationName-botbtn").click(function(){
      getIsClick=1;
  $(".locationName").animate({
      scrollTop:'+=364',
    },"slow");
 $(".locationName-topbtn").css("visibility","visible");
});

//获取地图位置名称
function getPlaceName(){
     $.ajax({
        url:"http://127.0.0.1/Access.asmx/GetAllInfo",
        dataType: "json",
        async: true,
        success: function(data) {
        //渲染导航界面
        var contData=""
        for(var i=0;i<data.length;i++){
              contData+="<div id='locationName-list' class='waves-effect waves-light' onclick='mapController("+i+")'>"+data[i].PlaceName+"</div>"
        }
        $(".locationName").html(contData);
        if (data.length>7) {
           $(".locationName-botbtn").css("visibility","visible");
         }else{
           $(".locationName-botbtn").css("visibility","hidden");
           $(".locationName-topbtn").css("visibility","hidden");
         }
        // 包装位置数据
        for(var i=0;i<data.length;i++){
        var poseData={pose:{position: { x: 0.0, y: 0.0, z: 0.0 },orientation: { x: 0.0, y: 0.0, z: 0.0, w: 1 }},poseId:0,AutoBack:false,SpeakText:''};
        poseData.pose.position.x=data[i].PointValue.Pos_x;
        poseData.pose.position.y=data[i].PointValue.Pos_y;
        poseData.pose.position.z=data[i].PointValue.Pos_z;
        poseData.pose.orientation.x=data[i].PointValue.Ori_x;
        poseData.pose.orientation.y=data[i].PointValue.Ori_y;
        poseData.pose.orientation.z=data[i].PointValue.Ori_z;
        poseData.pose.orientation.w=data[i].PointValue.Ori_w;
        poseData.poseId=i;
        poseData.AutoBack=data[i].AutoBack;
        poseData.SpeakText=data[i].SpeakText;
        poseDataSet[i]=poseData;
        }
},
    error: function(request, error) {
    }
    });
}
    getPlaceName();
$(".backmain-rtr-r").click(function(){
  getIsClick=1;
  getPlaceName();
  getLocalWeather();
});
 //拍照
  $("#photoCont").hide();
 $("#openPhoto").click(function(){
      getIsClick=1;
       videoUser=1;
    open_cameraVideo();
   $("#photoCont").fadeIn("300");

 });
 $("#photoCont").click(function(e){
      getIsClick=1;
     if (e.target.id=="photoCont") {
     $("#photoCont").fadeOut("100");
     document.getElementById("catch_image").src="";
     close_cameraVideo();
      
     }
 });

/*
* getTime() 获取系统时间
* getDate("-") 获取系统日期 参数为日期分隔符
*/
var robot={
  getTime:function(){
     var myhours=new Date().getHours();
     var myminutes=new Date().getMinutes();
     if (myhours<10) {
       myhours="0"+new Date().getHours();
     }
     if (myminutes<10) {
       myminutes="0"+new Date().getMinutes();
     }
     return myhours+":"+myminutes;
  },
  getDate:function(i){
    return new Date().getFullYear()+i+(new Date().getMonth()+1)+i+new Date().getDate();
  },
  getWeek:function(){
  var weeks = new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');   
  return weeks[new Date().getDay()];
  }
}
setInterval(function(){
 $(".robotTime").text(robot.getTime());
 $(".robotDate1").text(robot.getDate("-"));
 $(".robotDate2").text(robot.getDate("/"));
 $(".robotWeek").text(robot.getWeek());
}, 1000)

//上传地图
$("#doc_createMap").change(function(){
  setImagePreview(this);
});

function setImagePreview(avalue) {
var docObj=document.getElementById("doc_createMap");
var imgObjPreview=document.getElementById("createMap_preview");
if(docObj.files &&docObj.files[0])
{
  var mapFileName=docObj.files[0].name;
  var mapFileType=mapFileName.substring(mapFileName.lastIndexOf('.')+1,mapFileName.length);
  if (mapFileType=="jpg" || mapFileType =="png") {
    imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);

  var canvas = document.getElementById("uploadMap");
  var ctx = canvas.getContext("2d");
  var img = document.getElementById("createMap_preview");
  img.onload = function(){
    ctx.drawImage(img,0,0);
  };

$("#upload_createMap").click(function(){
       var cxtMap = document.getElementById("uploadMap").getContext("2d");
       var imgData = cxtMap.getImageData(0, 0, document.getElementById("uploadMap").height, document.getElementById("uploadMap").width);
        var uint8data = new Array();

            uint8data = convert(imgData);
            var info={
    resolution: 0.05,
    width: 800,
    height: 800,
    origin: { position: { x: 0, y: 0, z: 0 }, 
             orientation: { x: 0, y: 0, z: 0, w: 1 } 
            }

            };
            info.width=document.getElementById("uploadMap").width;
            info.height=document.getElementById("uploadMap").height;
            data_map.data = uint8data;
         
           data_map.info =info;

            set_map.publish(data_map);


            string_Map.data = 'savemap_edit';
            cmd_string.publish(string_Map);

        function convert(Message_Image) {



            for (var i = 0, j = 0; i < imgData.data.length; i += 4, j++) {
                switch (imgData.data[i]) {
                    case 0:
                        uint8data[j] = 100;
                        break;
                    case 255:
                        uint8data[j] = 0;
                        break;
                    case 127:
                        uint8data[j] = -1;
                        break;
                    default:
                        uint8data[j] = 100;
                        break;
                }


            }

            return uint8data;

        };
});

  }else{
      Materialize.toast('请选择png或jpg格式图片！', 3000);
  }
}
}


  function mapBox(state,item){
    if (state=="open") {
      $(".settingMapBox").fadeIn('400').css("display","block");
       if (item==1) {
      $(".settingMapBox-upload").css("display","block");
       }else if (item==2) {
      $(".settingMapBox-create").css("display","block");
       }else if (item==3) {
      $(".settingMapBox-modify").css("display","block");  
       }else if (item==4) {
      $(".FaceRegistration").css("display","block");  
      open_cameraVideo();
       }else if (item==5) {
      $(".settingMapBox-setting").css("display","block");  
       }else if (item==6) {
      $(".hardwareTest-setting").css("display","block");  
       }else if (item==7) {
      $(".settingMapBox-modify-p").css("display","block");  
       }
    }
  }

$("#setting-upLoadMap").click(function(){
    mapBox("open",1);
});
$("#setting-createMap").click(function(){
      mapBox("open",2);
});
$("#setting-modifyMap").click(function(){
      mapBox("open",3);
      $("#modfiyIframe").attr("src","admin/mapModify.html");
});
$("#setting-FaceRegistration").click(function(){
       window.localStorage.setItem("regVideo","open");
        mapBox("open",4);
        videoUser=3;
});
$("#setting-settingMap").click(function(){
      mapBox("open",5);
});
$("#close-FaceRegistration").click(function(){
      $(".settingMapBox").css("display","none");
      $(".settingMapBox-upload").css("display","none");
      $(".settingMapBox-create").css("display","none");
      $(".settingMapBox-modify").css("display","none");
      $(".settingMapBox-modify-p").css("display","none");
      $(".settingMapBox-setting").css("display","none");
      $(".FaceRegistration").css("display","none");  
     close_cameraVideo();
});
$("#close-settingMapBox-upload").click(function(){
      $(".settingMapBox").css("display","none");
      $(".settingMapBox-upload").css("display","none");
});
$("#close-settingMapBox-create").click(function(){
   $("#createMapMode").hide();
   $("#quit-createMapMode").show();
});
$("#noQuitMap").click(function(){
  $("#quit-createMapMode").hide();
});
$("#isQuitMap").click(function(){
     $("#quit-createMapMode").hide();
     $(".settingMapBox").css("display","none");
     $(".settingMapBox-create").css("display","none");
     close_createMapMode();
     $("#mymap-save").hide();
     console.log("隐藏");
});

$("#hd-reboot").click(function(){
  $("#rebootMode").show();
});


$("#close-settingMapBox-modify").click(function(){
  $("#quit-modifyMapMode").show();
});
//导航提示
$("#close-settingMapBox-modify-p").click(function(){
  $("#quit-modifyMapMode-p").show();
});
$("#noQuitMap-modify").click(function(){
  $("#quit-modifyMapMode").hide();
});
$("#isQuitMap-modify").click(function(){
     $("#quit-modifyMapMode").hide();
     $(".settingMapBox").css("display","none");
     $(".settingMapBox-modify").css("display","none");
     close_createMapMode();
     $("#modfiyIframe").attr("src","admin/mapModify.html");
});



$("#close-hardwareTest-setting").click(function(){
          $(".settingMapBox").css("display","none");
      $(".hardwareTest-setting").css("display","none");
});



$("#close-settingMapBox-setting").click(function(){
          $(".settingMapBox").css("display","none");
      $(".settingMapBox-setting").css("display","none");
});

$("#hardwareTest-btn").click(function(){
    mapBox("open",6);
});


$("#face-activity1,#face-activity2,#face-activity3,#face-activity4").hide();

$("#homemain").on('touchmove', function(event) {
  event.preventDefault();
  return false;
});
$("#loginmain").on('touchmove', function(event) {
  event.preventDefault();
  return false;
});
$("#backmain").on('touchmove', function(event) {
  event.preventDefault();
  return false;
});
$("#submit").click(function(){
    var username=$("#username").val();
    var password=$("#password").val();
    if (username=="") {
        Materialize.toast('请输入用户名！', 3000);
    }else if (password=="") {
       Materialize.toast('请输入密码！', 3000); 
    }else{
        
    if (username=="admin"&&password=="123") {
      stayHome=0;
      $.mobile.changePage("#backmain",{transition: "fade" });
     $("#username").val("");
     $("#password").val("");
    }else {
          Materialize.toast('用户名或密码错误！', 3000);
    }

    }
});

//菜单操作
$(".modeSwitch,.naviData,.interfaceBox,.systemData,.settingCityData,.settingServiceData,.settingAdData,.settingVoiceData").hide();
//功能开关
$("#functionSwitch").click(function(){
    $(".modeSwitch").fadeIn('slow');
$(".settingCityData,.settingServiceData,.settingAdData,.settingVoiceData").hide();
});
$("#functionSwitch-close").click(function(){
$(".modeSwitch,.settingCityData,.settingServiceData,.settingAdData,.settingVoiceData").hide();
});

$("#navigatorData").click(function(){
    $(".naviData").fadeIn('slow');
    $(".settingServiceData").hide();
});
$("#navigatorData-close").click(function(){
    $(".naviData").hide();
});

$("#runningData").click(function(){
    $(".interfaceBox").fadeIn('slow');
    $(".settingServiceData").hide();
});
$("#runningData-close").click(function(){
    $(".interfaceBox").hide();
});

$("#systemData").click(function(){
    $(".systemData").fadeIn('slow');
    $(".settingServiceData").hide();
});
$("#systemData-close").click(function(){
    $(".systemData").hide();
});
$("#settingCity").click(function(){
    $(".settingCityData").fadeIn('slow');
$(".modeSwitch,.settingServiceData,.settingAdData").hide();
});
$("#settingCityData-close").click(function(){
$(".modeSwitch,.settingCityData,.settingServiceData,.settingAdData,.settingVoiceData").hide();
});
$("#settingService").click(function(){
    $(".settingServiceData").fadeIn('slow');
$(".modeSwitch,.settingCityData,.settingAdData").hide();
});
$("#settingServiceData-close").click(function(){
$(".modeSwitch,.settingCityData,.settingServiceData,.settingAdData,.settingVoiceData").hide();
});
$("#settingAd").click(function(){
$(".modeSwitch,.settingCityData,.settingServiceData,.settingVoiceData").hide();
    $(".settingAdData").fadeIn('slow');
});
$("#settingAdData-close").click(function(){
$(".modeSwitch,.settingCityData,.settingServiceData,.settingAdData,.settingVoiceData").hide();
});
$("#settingVoice").click(function(){
$(".modeSwitch,.settingCityData,.settingServiceData").hide();
    $(".settingVoiceData").fadeIn('slow');
});
$("#settingVoiceData-close").click(function(){
$(".modeSwitch,.settingCityData,.settingServiceData,.settingAdData,.settingVoiceData").hide();
});
//天气预报

$("#savaCity").click(function(){
  var cityname=$("#cityname").val();
   if (cityname!="") {
   window.localStorage.setItem("city",cityname);
   $("#nowCity").text(cityname);
   Materialize.toast('保存成功!', 600);
   }
});
function getLocalWeather(){
var city_storage = window.localStorage.getItem("city");
if (city_storage==null || city_storage=="") {
   city_storage="上海";
    $("#nowCity").text("未定义");
}else{
      $("#nowCity").text(city_storage);
}
try {
     $.ajax({
        url:"http://127.0.0.1/Access.asmx/GetWeatherByCityName?cityname="+city_storage,
        dataType: "json",
        async: true,
        success: function(data) {
                if (data.result != false) {
                window.localStorage.setItem("weather", JSON.stringify(data));

                $("#tianqi-2").text(data.result.data.weather[0].info.day[1]);
                $("#tianqi-3").text(data.result.data.weather[0].info.day[4]);
                $("#tianqi-4").text(data.result.data.weather[0].info.night[2] + "℃－" + data.result.data.weather[0].info.day[2] + "℃");
                
                $("#tianqi-cont2-temper").text(data.result.data.weather[1].info.night[2] + "℃－" + data.result.data.weather[1].info.day[2] + "℃");
                 $("#tianqi-cont3-temper").text(data.result.data.weather[2].info.night[2] + "℃－" + data.result.data.weather[2].info.day[2] + "℃");


                $("#tianqi-city").text(data.result.data.realtime.city_name);
                var iconname = "image/weather/a_" + data.result.data.weather[0].info.day[0] + ".gif";
                $("#tianqi-icon").attr("src", iconname);
                $("#tianqi-icon2").attr("src", "image/weather/a_" + data.result.data.weather[1].info.day[0] + ".gif");
                $("#tianqi-icon3").attr("src", "image/weather/a_" + data.result.data.weather[2].info.day[0] + ".gif");
            } else {
                var localWeather = JSON.parse(window.localStorage.getItem("weather"));
                $("#tianqi-1").text(localWeather.result.data.weather[0].info.day[1]);
                $("#tianqi-2").text(localWeather.result.data.weather[0].info.day[3]);
                $("#tianqi-3").text(localWeather.result.data.weather[0].info.day[4]);
                $("#tianqi-4").text(localWeather.result.data.weather[0].info.night[2] + "℃－" + localWeather.result.data.weather[0].info.day[2] + "℃");
                $("#tianqi-cont2-temper").text(localWeather.result.data.weather[1].info.night[2] + "℃－" + localWeather.result.data.weather[1].info.day[2] + "℃");
                 $("#tianqi-cont3-temper").text(localWeather.result.data.weather[2].info.night[2] + "℃－" + localWeather.result.data.weather[2].info.day[2] + "℃");
                $("#tianqi-city").text(localWeather.result.data.realtime.city_name);
                var iconname = "image/weather/a_" + localWeather.result.data.weather[0].info.day[0] + ".gif";
                $("#tianqi-icon").attr("src", iconname);
                $("#tianqi-icon2").attr("src", "image/weather/a_" + localWeather.result.data.weather[1].info.day[0] + ".gif");
                $("#tianqi-icon3").attr("src", "image/weather/a_" + localWeather.result.data.weather[2].info.day[0] + ".gif");
            }
        },
        error: function(request, error) {

        }
    });
} catch(e) {
  // statements
  console.log(e);
}
}
getLocalWeather();
//自动初始化
$(".backmain-rtr-r").click(function(){
  stayHome=1;
});

 $(".goIsClick").click(function(){
    getIsClick=1;
 });
$(".goIsService").click(function(){
  getIsService=1;
});
setInterval(function(){
  if (getIsClick==1) {
      getIsClick=0;
  }else if(getIsClick==0 && stayHome==1){
        StopTTSspeak();
        $(".winbox").hide();
        $(".box-logo").hide();
        $(".voice-closebtn").css("backgroundImage","url(image/closeBtn2.png)");
        //语音识别恢复
        $(".voice-mandarin").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-henan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-sichuan").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-guangdong").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-liang").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-lily").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-chinese").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-english").css({"left":"0px","opacity":"0","visibility":"hidden"});

        $(".voice-main").css({"visibility":"hidden","opacity":"0"});
        $(".voice-mainbg").css({"webkitTransform":"translateZ(-1000px)","opacity":"0","visibility":"hidden"});
        $(".voice-state").css({"top":"100px","opacity":"0","visibility":"hidden"});
        $(".voice-closebtn").css({"right":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-clearbtn").css({"right":"0px","opacity":"0","visibility":"hidden"});
        $(".voice-mode").css({"top":"830px","opacity":"0","visibility":"hidden"});
        $(".voice-language").css({"left":"0px","opacity":"0","visibility":"hidden"});
        $(".navbox-cont-l , .navbox-cont-r").css("opacity","1");
        $(".voice-closebtn").css("backgroundImage","url(image/closeBtn.png)");
        switchNav("right","open");
        switchNav("left","open");

        //人脸识别恢复
        $(".face-closebtn").css("backgroundImage","url(image/closeBtn2.png)");
        $(".face-main").css({"visibility":"hidden","opacity":"0"});
        $(".face-mainbg").css({"webkitTransform":"translateZ(-1000px)","visibility":"hidden"});
        $(".face-closebtn").css({"right":"0px","opacity":"0","visibility":"hidden"});

        $(".navbox-cont-l , .navbox-cont-r").css("opacity","1");
        $(".face-closebtn").css("backgroundImage","url(image/closeBtn.png)");

        //地图导航
        $(".navigator-closebtn").css("backgroundImage","url(image/closeBtn2.png)");
        $(".navigator-main").css({"visibility":"hidden","opacity":"0"});
        $(".navigator-mainbg").css({"webkitTransform":"translateZ(-1000px)","visibility":"hidden"});
        $(".navigator-closebtn").css({"right":"0px","opacity":"0","visibility":"hidden"});

        $(".navbox-cont-l , .navbox-cont-r").css("opacity","1");
        $(".navigator-closebtn").css("backgroundImage","url(image/closeBtn.png)");
        //业务展示
        $(".service-closebtn").css("backgroundImage","url(image/closeBtn2.png)");
        $(".service-main").css({"visibility":"hidden","opacity":"0"});
        $(".service-mainbg").css({"webkitTransform":"translateZ(-1000px)","visibility":"hidden"});
        $(".service-closebtn").css({"right":"0px","opacity":"0","visibility":"hidden"});

        $(".navbox-cont-l , .navbox-cont-r").css("opacity","1");
        $(".service-closebtn").css("backgroundImage","url(image/closeBtn.png)");
        switchNav("right","open");
        switchNav("left","open");

        $(".zonglan").hide();

    //菜单初始化
    if (isToggle) {
      $(".nav-btn").css("animation", "navup 0.3s linear 1 forwards");
      $(".nav-bottom").css("animation", "navupbtn 0.3s linear 1 forwards");
      $("#nav-img").attr("src", "image/toggle-down.png");
      isToggle = false;
    }

    $("#photoCont").hide();
     //业务详情初始化
     if (getIsService==1) {
       // location.reload();
       getIsService=0;
     } else{
      $.mobile.changePage('#homemain');
         cmdSetISR(language.zh_cn, area.mandarin, true);
    }
    
  }
}, 180000);
//业务总览
var fileDocPath="D:/HRG/HitRobotApp/APP/doc";
var pathDoc=".doc";
var pathToDoc=".html";
for(var i=1;i<=8;i++){
  getDocList(i);
}
function getDocList(id){
  var id=id;
  var pathDocName=fileDocPath+"/item"+id;
try {
       $.ajax({
        url:"http://127.0.0.1/Access.asmx/GetAllFilesName?filePath="+pathDocName+"&suffix="+pathDoc,
        dataType: "json",
        async: true,
        success: function(data) {
        if (data.FilesName.length!=0) {
         $(".zonglan-cont"+id).text("");
         for(i=0;i<data.FilesName.length;i++){
          var docFileName=(data.FilesName[i]).substring(pathDocName.length+1,(data.FilesName[i].length-pathDoc.length));

   $.ajax({
        url:"http://127.0.0.1/Access.asmx/AsposeWordToHtml?tWordName="+data.FilesName[i]+"&tsaveFileName="+pathDocName+"\\"+docFileName+pathToDoc,
        dataType: "json",
        async: true,
        success: function(data) {

         }
    });

         $("#zonglan-cont"+id).append("<a class='docTitle' onclick='goToDetail(\""+docFileName+"\","+id+")'' href='#zonglan-detail' data-transition='none'>"+docFileName+"</a>");
         }
        }
        },
        error: function(request, error) {
        }
    });
} catch(e) {
  // statements
  console.log(e);
}
}
$(".service-btn").click(function(e){
     btnAudio();
     $(".zonglan-cont").hide();
   var str=(e.currentTarget.id).substring(11);
   $("#zonglan-cont"+str).show();



});
//业务总览配置
   $("#service-btn1,#service-btn2,#service-btn3,#service-btn4,#service-btn5,#service-btn6,#service-btn7,#service-btn8").hide();
   var checkset=JSON.parse(window.localStorage.getItem("checkset"));
    if (checkset==null) {
     document.getElementById("checkdoc1").checked=true;
     document.getElementById("checkdoc2").checked=false;
     document.getElementById("checkdoc3").checked=false;
     document.getElementById("checkdoc4").checked=false;
     document.getElementById("checkdoc5").checked=false;
     document.getElementById("checkdoc6").checked=false;
     document.getElementById("checkdoc7").checked=false;
     document.getElementById("checkdoc8").checked=false;
     $("#service-btn1").show();
     $("#service-btn1").text("业务总览");
     // $("#servive-cont-t").text("业务总览");
     $("#textdoc1").val("业务总览");
     var checkdata=[{"checkdoc":true,"name":"业务总览"},{"checkdoc":false,"name":""},{"checkdoc":false,"name":""},{"checkdoc":false,"name":""},{"checkdoc":false,"name":""},{"checkdoc":false,"name":""},{"checkdoc":false,"name":""},{"checkdoc":false,"name":""}];
     window.localStorage.setItem("checkset",JSON.stringify(checkdata));
    }else{
      for(var i=0;i<8;i++){
        var j=i+1;
         if (checkset[i].checkdoc) {
           document.getElementById("checkdoc"+j).checked=true;
            $("#service-btn"+j).show();
         }else{
          document.getElementById("checkdoc"+j).checked=false;
         }
         $("#textdoc"+j).val(checkset[i].name);
         $("#service-btn"+j).text(checkset[i].name);
      }
    }

$("#checkdoc1").change(function(event) {
   goChangeCheck(1);
});
$("#checkdoc2").change(function(event) {
   goChangeCheck(2);
});
$("#checkdoc3").change(function(event) {
   goChangeCheck(3);
});
$("#checkdoc4").change(function(event) {
   goChangeCheck(4);
});
$("#checkdoc5").change(function(event) {
   goChangeCheck(5);
});
$("#checkdoc6").change(function(event) {
   goChangeCheck(6);
});
$("#checkdoc7").change(function(event) {
   goChangeCheck(7);
});
$("#checkdoc8").change(function(event) {
   goChangeCheck(8);
});
function goChangeCheck(id){
  var isToggle=document.getElementById("checkdoc"+id).checked;
  var checkset=JSON.parse(window.localStorage.getItem("checkset"));
   if (isToggle) {
    $("#service-btn"+id).show();
    checkset[id-1].checkdoc=true;
    window.localStorage.setItem("checkset",JSON.stringify(checkset));
    Materialize.toast('启用成功!', 500);
   }else{
       $("#service-btn"+id).hide();
     checkset[id-1].checkdoc=false;
    window.localStorage.setItem("checkset",JSON.stringify(checkset)); 
    Materialize.toast('取消成功!', 500);
   }
}

//保存栏目名
$("#savedoc1").click(function(){
    goSaveDoc(1);
});
$("#savedoc2").click(function(){
    goSaveDoc(2);
});
$("#savedoc3").click(function(){
    goSaveDoc(3);
});
$("#savedoc4").click(function(){
    goSaveDoc(4);
});
$("#savedoc5").click(function(){
    goSaveDoc(5);
});
$("#savedoc6").click(function(){
    goSaveDoc(6);
});
$("#savedoc7").click(function(){
    goSaveDoc(7);
});
$("#savedoc8").click(function(){
    goSaveDoc(8);
});
function goSaveDoc(id){
     var item=id-1;
  var checkset=JSON.parse(window.localStorage.getItem("checkset"));
   modifyName=$("#textdoc"+id).val();
   checkset[item].name=modifyName;
   $("#service-btn"+id).text(modifyName);
    // $("#servive-cont-t").text(modifyName);
   window.localStorage.setItem("checkset",JSON.stringify(checkset));
   Materialize.toast('保存成功!', 500);
}







var adType=window.localStorage.getItem("adType");   
if (adType==null) {
  $("#adVideo").css("visibility","visible");
  }else{
  if (adType=="video") {
  $("#adVideo").css("visibility","visible");
  $("#ad-title-name").text("视频广告");
    }else if (adType=="pic") {
  $("#adSlide").css("visibility","visible");
  $("#ad-title-name").text("循环图片");
  window.localStorage.setItem("adType","pic");
    for(var i=1;i<=$("#AdPicVal").val();i++){
   $(".slides").html("<li><img src='slides/"+i+".jpg'></li>");
   }
    $('.slider').slider({full_width: true});
  document.getElementById("adVideo").pause();
  document.getElementById("adVideo").currentTime =0;
    }else if (adType=="link") {
  $("#ad-title-name").text("外部网址");
  $("#adIframe").css("visibility","visible");
  document.getElementById("adVideo").pause();
  document.getElementById("adVideo").currentTime =0;
    }
  }


//底部广告配置
$("#ad-video").click(function(){
  $("#ad-title-name").text("视频广告");
  $("#adVideo").css("visibility","visible");
  $("#adSlide").css("visibility","hidden");
  $("#adIframe").css("visibility","hidden");
  Materialize.toast('设置成功!', 500);
  window.localStorage.setItem("adType","video");
  document.getElementById("adVideo").play();
  document.getElementById("adVideo").volume=0.1;
});
$("#ad-pic").click(function(){
      // document.getElementById("serviceVideo").play();
  $("#ad-title-name").text("循环图片");
  $("#adVideo").css("visibility","hidden");
  $("#adSlide").css("visibility","visible");
  $("#adIframe").css("visibility","hidden");
  Materialize.toast('设置成功!', 500);
 window.localStorage.setItem("adType","pic");
    for(var i=1;i<=$("#AdPicVal").val();i++){
   $(".slides").html("<li><img src='slides/"+i+".jpg'></li>");
   }
    $('.slider').slider({full_width: true});
  document.getElementById("adVideo").pause();
  document.getElementById("adVideo").currentTime =0;
});
$("#ad-link").click(function(){
  $("#ad-title-name").text("外部网址");
  $("#adVideo").css("visibility","hidden");
  $("#adSlide").css("visibility","hidden");
  $("#adIframe").css("visibility","visible");
  Materialize.toast('设置成功!', 500);
  window.localStorage.setItem("adType","link");
  document.getElementById("adVideo").pause();
  document.getElementById("adVideo").currentTime =0;
});
//设置图片数量
var saveAdPicSum=window.localStorage.getItem("saveAdPicSum");   
if (saveAdPicSum!=null) {
  	var strad="";
	for(var i=1;i<=parseInt(saveAdPicSum);i++){
		strad+="<li><img src='slides/"+i+".jpg'></li>";
	}
	$("#AdPicVal").val(saveAdPicSum);
	$(".slides").html(strad);
}else {
	$("#AdPicVal").val("");
}
$("#saveAdPicSum").click(function(){
	if ($("#AdPicVal").val()>=3) {
		for(var i=1;i<=$("#AdPicVal").val();i++){
			$(".slides").html("<li><img src='slides/"+i+".jpg'></li>");
		}
		$('.slider').slider({full_width: true});
		window.localStorage.setItem("saveAdPicSum",$("#AdPicVal").val());
		Materialize.toast('保存成功!', 500);
	}
});

//设置外部网址链接
var saveAdLink=window.localStorage.getItem("saveAdLink");   
if (saveAdLink!=null) {
  $("#AdLinkVal").val(saveAdLink);
  document.getElementById("adIframe").src=saveAdLink;
  }else{
  document.getElementById("adIframe").src="http://www.hitrobotgroup.com/";
  }
$("#saveAdLink").click(function(){
  document.getElementById("adIframe").src=$("#AdLinkVal").val();
 window.localStorage.setItem("saveAdLink",$("#AdLinkVal").val());
  Materialize.toast('保存成功!', 500);
});


$('.slider').slider({full_width: true});

var voiceObj=document.getElementsByName('voiceCheck'); 

  for(var i=0;i<voiceObj.length;i++){
     for(var j=0;j<voiceList.length;j++){
        if (voiceObj[i].value==voiceList[j]) {
          voiceObj[i].checked=true;
        }
     }
      
  }
//设置语种
$("#cancel-voiceType").click(function(){
    

var vstr=''; 
for(var i=0; i<voiceObj.length; i++){ 
voiceObj[i].checked=false;
} 
});

$("#save-voiceType").click(function(){
var voiceObj=document.getElementsByName('voiceCheck'); 
var vstr=''; 
var voiceSize=0;





for(var i=0; i<voiceObj.length; i++){ 
  if(voiceObj[i].checked){
    ++voiceSize;
  }
} 


if (voiceSize>6) {
  Materialize.toast('最多可设置6中语种，请重新选择！', 4000); 
}else if (voiceSize==0) {
    Materialize.toast('请选择设置语种！', 4000); 
}else{
var vitem=0;
voiceList=[];
for(var i=0; i<voiceObj.length; i++){ 
  if(voiceObj[i].checked){
    voiceList[vitem]=voiceObj[i].value;
    ++vitem;
  }
} 

window.localStorage.setItem("voiceSet",JSON.stringify(voiceList));
Materialize.toast('设置成功！', 4000); 
  $(".voice-mandarin,.voice-henan,.voice-sichuan,.voice-guangdong,.voice-liang,.voice-lily").show();
 if (voiceSize==1) {
  $(".voice-henan,.voice-sichuan,.voice-guangdong,.voice-liang,.voice-lily").hide();
  $(".voice-mandarin").text(voiceData[voiceList[0]]);
 }else if (voiceSize==2) {
  $(".voice-sichuan,.voice-guangdong,.voice-liang,.voice-lily").hide();
  $(".voice-mandarin").text(voiceData[voiceList[0]]);
  $(".voice-henan").text(voiceData[voiceList[1]]);
 }else if (voiceSize==3) {
  $(".voice-guangdong,.voice-liang,.voice-lily").hide();
  $(".voice-mandarin").text(voiceData[voiceList[0]]);
  $(".voice-henan").text(voiceData[voiceList[1]]);
  $(".voice-sichuan").text(voiceData[voiceList[2]]);
 }else if (voiceSize==4) {
  $(".voice-liang,.voice-lily").hide();
  $(".voice-mandarin").text(voiceData[voiceList[0]]);
  $(".voice-henan").text(voiceData[voiceList[1]]);
  $(".voice-sichuan").text(voiceData[voiceList[2]]);
  $(".voice-guangdong").text(voiceData[voiceList[3]]);
 }else if (voiceSize==5) {
  $(".voice-lily").hide();
  $(".voice-mandarin").text(voiceData[voiceList[0]]);
  $(".voice-henan").text(voiceData[voiceList[1]]);
  $(".voice-sichuan").text(voiceData[voiceList[2]]);
  $(".voice-guangdong").text(voiceData[voiceList[3]]);
  $(".voice-liang").text(voiceData[voiceList[4]]);
 }else if (voiceSize==6) {
  $(".voice-mandarin").text(voiceData[voiceList[0]]);
  $(".voice-henan").text(voiceData[voiceList[1]]);
  $(".voice-sichuan").text(voiceData[voiceList[2]]);
  $(".voice-guangdong").text(voiceData[voiceList[3]]);
  $(".voice-liang").text(voiceData[voiceList[4]]);
  $(".voice-lily").text(voiceData[voiceList[5]]);
 }

}

});























});
var goToItem="";
function goToDetail(name,id){
   name="doc/item"+id+"/"+name+".html"
   // $("#zonglan-cont-detail").css("src",name);
   document.getElementById("zonglan-cont-detail").src=name;
}

 //禁用右键
function stop() {
  return false;
}
document.oncontextmenu = stop;

  