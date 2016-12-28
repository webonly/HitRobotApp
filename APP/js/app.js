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
  var getIsClick = 0; //设置屏幕点击状态
  var getIsService = 0; //设置是否进入新服务页面
  var stayHome = 1;
  var voiceSet = JSON.parse(window.localStorage.getItem("voiceSet"));
  var voiceList;
  if (voiceSet == null) {
    voiceList = ["xiaoyan", "xiaokun", "aisxrong", "dalong", "jiajia", "xiaoxue"];
  } else {
    voiceList = voiceSet;
  }

  var voiceData = {
    "xiaoyan": "小燕_普通话",
    "aisxyan": "艳萍_普通话",
    "xiaoyu": "小宇_普通话",
    "xiaofeng": "宇峰_普通话",
    "xiaoqi": "小琪_普通话",
    "aisnn": "楠楠_普通话",
    "dalong": "大龙_粤语",
    "xiaomei": "小梅_粤语",
    "aisxlin": "晓琳_台湾普通话",
    "xiaoqian": "晓倩_东北话",
    "aisxrong": "小蓉_四川话",
    "xiaokun": "小坤_河南话",
    "aisxqiang": "小强_湖南话",
    "aisxying": "小英_陕西话",
    "aisjiuxu": "许久_普通话",
    "aisxping": "小萍_普通话",
    "aisxiaobin": "小兵_普通话",
    "laoma": "老马_普通话",
    "xiaorong": "晓蓉_普通话",
    "wangru": "王茹_普通话",
    "aisbabyxu": "许小宝_普通话",
    "aisjinger": "小婧_普通话",
    "yefang": "叶芳_普通话",
    "aisduck": "唐老鸭_普通话",
    "aisxmeng": "小梦_普通话",
    "aismengchun": "孟春_普通话",
    "ziqi": "紫琪_普通话",
    "aisduoxu": "许多_普通话",
    "aisxxin": "蜡笔小新_普通话",
    "jiajia": "佳佳_普通话",
    "xiaoxue": "小雪_普通话"
  };
  if (voiceList.length == 1) {
    $(".voice-henan,.voice-sichuan,.voice-guangdong,.voice-liang,.voice-lily").hide();
    $(".voice-mandarin").text(voiceData[voiceList[0]]);
  } else if (voiceList.length == 2) {
    $(".voice-sichuan,.voice-guangdong,.voice-liang,.voice-lily").hide();
    $(".voice-mandarin").text(voiceData[voiceList[0]]);
    $(".voice-henan").text(voiceData[voiceList[1]]);
  } else if (voiceList.length == 3) {
    $(".voice-guangdong,.voice-liang,.voice-lily").hide();
    $(".voice-mandarin").text(voiceData[voiceList[0]]);
    $(".voice-henan").text(voiceData[voiceList[1]]);
    $(".voice-sichuan").text(voiceData[voiceList[2]]);
  } else if (voiceList.length == 4) {
    $(".voice-liang,.voice-lily").hide();
    $(".voice-mandarin").text(voiceData[voiceList[0]]);
    $(".voice-henan").text(voiceData[voiceList[1]]);
    $(".voice-sichuan").text(voiceData[voiceList[2]]);
    $(".voice-guangdong").text(voiceData[voiceList[3]]);
  } else if (voiceList.length == 5) {
    $(".voice-lily").hide();
    $(".voice-mandarin").text(voiceData[voiceList[0]]);
    $(".voice-henan").text(voiceData[voiceList[1]]);
    $(".voice-sichuan").text(voiceData[voiceList[2]]);
    $(".voice-guangdong").text(voiceData[voiceList[3]]);
    $(".voice-liang").text(voiceData[voiceList[4]]);
  } else if (voiceList.length == 6) {
    $(".voice-mandarin").text(voiceData[voiceList[0]]);
    $(".voice-henan").text(voiceData[voiceList[1]]);
    $(".voice-sichuan").text(voiceData[voiceList[2]]);
    $(".voice-guangdong").text(voiceData[voiceList[3]]);
    $(".voice-liang").text(voiceData[voiceList[4]]);
    $(".voice-lily").text(voiceData[voiceList[5]]);
  }

  //离开页面
  window.onbeforeunload = function() {
      close_cameraVideo();
      StopTTSspeak();
      ISR_unWakeUp();
    }
    //刷新
  $(".refresh").click(function() {
    getIsClick = 1;
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
  var videoAudio = document.getElementById("adVideo");
  if (videoAudio) {
    videoAudio.volume = 0.1
  }
  document.getElementById("audio-btn").volume = 0.2;
  document.getElementById("audio-btn2").volume = 0.2;
  document.getElementById("photo-video").volume = 0.2;

  function refreshAudio() {
    document.getElementById("audio-btn").play();
  }

  function btnAudio() {
    document.getElementById("audio-btn2").play();
  }
  //主界面动画
  $(".main").on("touchstart", function() {
    $(".voice-mandarin").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-henan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-sichuan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-guangdong").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-liang").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-lily").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-chinese").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-english").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    getIsClick = 1;
  });
  //nav
  $(".nav-btn").css("webkitTransform", "translateY(0px)");
  $(".nav-bottom").css("webkitTransform", "translateY(0px)");
  $(".box-logo").css("webkitTransform", "translateX(-800px)");
  var isToggle = true;
  $("#nav-toggle").bind("click", function() {
    getIsClick = 1;
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
  function switchNav(name, action) {
    if (name == "left") {
      if (action == "close") {
        $(".navbox-cont-l").css("webkitTransform", "translateX(-80px)");
        $(".navbox-left").css("webkitTransform", "rotateY(60deg)");
        $("#navigator").css("animationName", "mynavigator");
        isLeftHidden = true;
      } else if (action == "open") {
        $(".navbox-cont-l").css("webkitTransform", "");
        $(".navbox-left").css("webkitTransform", "");
        $("#navigator").css("animationName", "");
        $(".navbox-cont-l").css({
          "visibility": "visible",
          "opacity": "1"
        });
        isLeftHidden = false;
      }
    } else if (name == "right") {
      if (action == "close") {
        $(".navbox-cont-r").css("webkitTransform", "translateX(80px)");
        $(".navbox-right").css("webkitTransform", "rotateY(-60deg)");
        $("#voice").css("animationName", "mynavigator");
        isRightHidden = true;
      } else if (action == "open") {
        $(".navbox-cont-r").css("webkitTransform", "");
        $(".navbox-right").css("webkitTransform", "");
        $("#voice").css("animationName", "");
        $(".navbox-cont-r").css({
          "visibility": "visible",
          "opacity": "1"
        });
        isRightHidden = false;
      }
    }
  }
  //logo动画开关
  function switchLogo(action) {
    if (action == "open") {
      $(".winbox").css("visibility", "visible");
      $(".box-logo").css("visibility", "visible");
      $(".winbox").css("opacity", "1");
      $(".win").css("webkitTransform", "translateX(0px)");
      $(".box-logo").css("animationName", "mylogoleft");
    } else if (action == "close") {
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
    getIsClick = 1;
    btnAudio();
    if (isLeftHidden == false) {
      switchNav("left", "close");
      if (isLeftHidden == true && isRightHidden == true) {
        switchLogo("open");
      }
    } else if (isLeftHidden == true) {
      switchNav("left", "open");
      switchLogo("close");
    }
  });
  $(".navbox-l-main").click(function() {
    getIsClick = 1;
    btnAudio();
    if (event.target.className == "navbox-l-main") {
      switchNav("left", "open");
      switchLogo("close");
    }
  });
  //3d-right
  $(".navbox-r-btn").click(function() {
    getIsClick = 1;
    btnAudio();
    if (isRightHidden == false) {
      switchNav("right", "close");
      if (isLeftHidden == true && isRightHidden == true) {
        switchLogo("open");
      }
    } else if (isRightHidden == true) {
      switchNav("right", "open");
      switchLogo("close");
    }
  });

  $(".navbox-r-main").click(function(event) {
    getIsClick = 1;
    btnAudio();
    if (event.target.className == "navbox-r-main") {
      switchNav("right", "open");
      switchLogo("close");
      $(".navbox-r-main").unbind("click");
    }
  });

  //打开语音识别界面
  $("#voice").click(function(event) {
    getIsClick = 1;
    btnAudio();
    if (event.target.id == "voice") {
      close_cameraFaceRecog();
      if (isRightHidden == false) {
        switchNav("left", "close");
        switchNav("right", "close");
        $(".navbox-cont-l, .navbox-cont-r").css({
          "visibility": "hidden",
          "opacity": "0"
        });

        $(".voice-main").css({
          "visibility": "visible",
          "opacity": "1"
        });
        $(".voice-mainbg").css({
          "webkitTransform": "translateZ(0px)",
          "visibility": "visible",
          "opacity": "1"
        });
        $(".voice-state").css({
          "top": "260px",
          "opacity": "1",
          "visibility": "visible"
        });
        $(".voice-closebtn").css({
          "right": "130px",
          "opacity": "1",
          "visibility": "visible"
        });
        $(".voice-clearbtn").css({
          "right": "130px",
          "opacity": "1",
          "visibility": "visible"
        });
        $(".voice-mode").css({
          "top": "620px",
          "opacity": "1",
          "visibility": "visible"
        });
        $(".voice-language").css({
          "left": "40px",
          "opacity": "1",
          "visibility": "visible"
        });
        //设置滚动条处于底部
        $(".voice-cont").scrollTop($(".voice-cont")[0].scrollHeight);


      } else if (isRightHidden == true) {
        switchLogo("close");
        switchNav("right", "open");
      }
    }
  });
  $("body").click(function(event) {
    getIsClick = 1;
    if (event.target.id == "homemain") {
      $(".voice-mandarin").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-henan").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-sichuan").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-guangdong").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-liang").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-lily").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-chinese").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-english").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
    }
  });


  //关闭语音识别界面
  $(".voice-closebtn").click(function() {
    open_cameraFaceRecog();
    getIsClick = 1;
    StopTTSspeak();
    btnAudio();
    $(".voice-closebtn").css("backgroundImage", "url(image/closeBtn2.png)");

    $(".voice-mandarin").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-henan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-sichuan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-guangdong").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-liang").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-lily").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-chinese").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-english").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    setTimeout(function() {

      $(".voice-main").css({
        "visibility": "hidden",
        "opacity": "0"
      });
      $(".voice-mainbg").css({
        "webkitTransform": "translateZ(-1000px)",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-state").css({
        "top": "100px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-closebtn").css({
        "right": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-clearbtn").css({
        "right": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-mode").css({
        "top": "830px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-language").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".navbox-cont-l , .navbox-cont-r").css("opacity", "1");
      $(".voice-closebtn").css("backgroundImage", "url(image/closeBtn.png)");
      switchNav("right", "open");
      switchNav("left", "open");
    }, 200);
  });
  //设置语音识别语音
  $(".yuzhong").click(function() {
    getIsClick = 1;
    btnAudio();
    $(".voice-mandarin").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-henan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-sichuan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-guangdong").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-liang").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-lily").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-chinese").css({
      "left": "145px",
      "opacity": "1",
      "visibility": "visible"
    });
    $(".voice-english").css({
      "left": "145px",
      "opacity": "1",
      "visibility": "visible"
    });
    setTimeout(function() {
      $(".voice-chinese").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-english").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
    }, 10000);
  });
  $(".bobao").click(function() {
    getIsClick = 1;
    btnAudio();
    $(".voice-chinese").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-english").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });

    $(".voice-mandarin").css({
      "left": "145px",
      "opacity": "1",
      "visibility": "visible"
    });
    $(".voice-henan").css({
      "left": "145px",
      "opacity": "1",
      "visibility": "visible"
    });
    $(".voice-sichuan").css({
      "left": "145px",
      "opacity": "1",
      "visibility": "visible"
    });
    $(".voice-guangdong").css({
      "left": "145px",
      "opacity": "1",
      "visibility": "visible"
    });
    $(".voice-liang").css({
      "left": "145px",
      "opacity": "1",
      "visibility": "visible"
    });
    $(".voice-lily").css({
      "left": "145px",
      "opacity": "1",
      "visibility": "visible"
    });
    setTimeout(function() {
      $(".voice-mandarin").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-henan").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-sichuan").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-guangdong").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-liang").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-lily").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
    }, 10000);
  });

  $(".voice-chinese").click(function() {
    getIsClick = 1;
    $(".voice-chinese").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-english").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    cmdSetISR(language.zh_cn, area.mandarin, true);
  });
  $(".voice-english").click(function() {
    getIsClick = 1;
    $(".voice-chinese").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-english").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    cmdSetISR(language.en_us, area.mandarin, true);
  });
  $(".voice-mandarin").click(function() {
    getIsClick = 1;
    $(".voice-mandarin").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-henan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-sichuan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-guangdong").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-liang").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-lily").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    cmdSetTTS(0, voiceList[0]);
  });
  $(".voice-henan").click(function() {
    getIsClick = 1;
    $(".voice-mandarin").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-henan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-sichuan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-guangdong").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-liang").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-lily").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    cmdSetTTS(0, voiceList[1]);
  });
  $(".voice-sichuan").click(function() {
    getIsClick = 1;
    $(".voice-mandarin").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-henan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-sichuan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-guangdong").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-liang").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-lily").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    cmdSetTTS(0, voiceList[2]);
  });
  $(".voice-guangdong").click(function() {
    getIsClick = 1;
    $(".voice-mandarin").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-henan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-sichuan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-guangdong").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-liang").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-lily").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    cmdSetTTS(0, voiceList[3]);
  });
  $(".voice-liang").click(function() {
    getIsClick = 1;
    $(".voice-mandarin").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-henan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-sichuan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-guangdong").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-liang").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-lily").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    cmdSetTTS(0, voiceList[4]);
  });
  $(".voice-lily").click(function() {
    getIsClick = 1;
    $(".voice-mandarin").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-henan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-sichuan").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-guangdong").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-liang").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    $(".voice-lily").css({
      "left": "0px",
      "opacity": "0",
      "visibility": "hidden"
    });
    cmdSetTTS(0, voiceList[5]);
  });
  $(".voice-clearbtn").click(function() {
    getIsClick = 1;
    $(".voice-cont").empty();

  });
  //打开人脸识别界面
  $(".face-main").css({
    "visibility": "hidden",
    "opacity": "0"
  });
  $(".face-mainbg").css({
    "webkitTransform": "translateZ(-1000px)",
    "visibility": "hidden"
  });
  $(".face-closebtn").css({
    "right": "0px",
    "opacity": "0",
    "visibility": "hidden"
  });
  $("#face").click(function(event) {
    getIsClick = 1;
    btnAudio();
    if (event.target.id == "face") {
      videoUser = 2;
      open_cameraVideo();
      if (isRightHidden == false) {
        switchNav("left", "close");
        switchNav("right", "close");
        $(".navbox-cont-l , .navbox-cont-r").css({
          "visibility": "hidden",
          "opacity": "0"
        });
        $(".face-main").css({
          "visibility": "visible",
          "opacity": "1"
        });
        $(".face-mainbg").css({
          "webkitTransform": "translateZ(0px)",
          "visibility": "visible"
        });
        $(".face-closebtn").css({
          "right": "85px",
          "opacity": "1",
          "visibility": "visible"
        });

      } else if (isRightHidden == true) {
        switchLogo("close");
        switchNav("right", "open");
      }
    }
  });
  //关闭人脸识别界面
  $(".face-closebtn").click(function() {
    getIsClick = 1;
    btnAudio();
    close_cameraVideo();
    //关闭键盘
    $("#keyboard_5xbogf8c").css({
      "display": "none"
    });
    $(".face-closebtn").css("backgroundImage", "url(image/closeBtn2.png)");
    setTimeout(function() {
      $(".face-main").css({
        "visibility": "hidden",
        "opacity": "0"
      });
      $(".face-mainbg").css({
        "webkitTransform": "translateZ(-1000px)",
        "visibility": "hidden"
      });
      $(".face-closebtn").css({
        "right": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });

      $(".navbox-cont-l , .navbox-cont-r").css("opacity", "1");
      $(".face-closebtn").css("backgroundImage", "url(image/closeBtn.png)");
      switchNav("right", "open");
      switchNav("left", "open");
    }, 200);
  });
  $("#setting").click(function() {
    getIsClick = 1;
    btnAudio();

    close_cameraVideo();
    StopTTSspeak();
  });
  $("#serviePagebtn").click(function() {
    getIsClick = 1;
    StopTTSspeak();
    close_cameraVideo();
  });
  $(".homeService").click(function() {
    getIsService = 1;
    getIsClick = 1;
    btnAudio();
    close_cameraVideo();
  });
  $("#openPhoto").click(function() {
    getIsClick = 1;
    btnAudio();

  });

  //打开地图导航界面
  $(".navigator-main").css({
    "visibility": "hidden",
    "opacity": "0"
  });
  $(".navigator-mainbg").css({
    "webkitTransform": "translateZ(-1000px)",
    "visibility": "hidden"
  });
  $(".navigator-closebtn").css({
    "right": "0px",
    "opacity": "0",
    "visibility": "hidden"
  });
  $("#navigator").click(function(event) {
    getIsClick = 1;
    btnAudio();
    if (event.target.id == "navigator") {
      close_cameraFaceRecog();
      if (isLeftHidden == false) {
        switchNav("left", "close");
        switchNav("right", "close");
        $(".navbox-cont-l , .navbox-cont-r").css({
          "visibility": "hidden",
          "opacity": "0"
        });

        $(".navigator-main").css({
          "visibility": "visible",
          "opacity": "1"
        });
        $(".navigator-mainbg").css({
          "webkitTransform": "translateZ(0px)",
          "visibility": "visible"
        });
        $(".navigator-closebtn").css({
          "right": "85px",
          "opacity": "1",
          "visibility": "visible"
        });
      } else if (isLeftHidden == true) {
        switchLogo("close");
        switchNav("left", "open");
      }
    }
  });
  //关闭地图导航界面
  $(".navigator-closebtn").click(function() {
    open_cameraFaceRecog()
    getIsClick = 1;
    StopTTSspeak();
    btnAudio();
    $(".navigator-closebtn").css("backgroundImage", "url(image/closeBtn2.png)");
    setTimeout(function() {
      $(".navigator-main").css({
        "visibility": "hidden",
        "opacity": "0"
      });
      $(".navigator-mainbg").css({
        "webkitTransform": "translateZ(-1000px)",
        "visibility": "hidden"
      });
      $(".navigator-closebtn").css({
        "right": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });

      $(".navbox-cont-l , .navbox-cont-r").css("opacity", "1");
      $(".navigator-closebtn").css("backgroundImage", "url(image/closeBtn.png)");
      switchNav("right", "open");
      switchNav("left", "open");
    }, 200);
  });

  //打开业务展示界面
  $(".service-main").css({
    "visibility": "hidden",
    "opacity": "0"
  });
  $(".service-mainbg").css({
    "webkitTransform": "translateZ(-1000px)",
    "visibility": "hidden"
  });
  $(".service-closebtn").css({
    "right": "0px",
    "opacity": "0",
    "visibility": "hidden"
  });
  $("#service").click(function(event) {
    getIsClick = 1;
    btnAudio();
    if (event.target.id == "service") {
      // document.getElementById("serviceVideo").play();
      // document.getElementById("serviceVideo").volume=0.1;
      close_cameraFaceRecog();
      if (isLeftHidden == false) {
        switchNav("left", "close");
        switchNav("right", "close");
        $(".navbox-cont-l , .navbox-cont-r").css({
          "visibility": "hidden",
          "opacity": "0"
        });

        $(".service-main").css({
          "visibility": "visible",
          "opacity": "1"
        });
        $(".service-mainbg").css({
          "webkitTransform": "translateZ(0px)",
          "visibility": "visible"
        });
        $(".service-closebtn").css({
          "right": "85px",
          "opacity": "1",
          "visibility": "visible"
        });
      } else if (isLeftHidden == true) {
        switchLogo("close");
        switchNav("left", "open");
      }
    }
  });
  //关闭业务展示界面
  $(".service-closebtn").click(function() {
    getIsClick = 1;
    // document.getElementById("serviceVideo").pause();
    // document.getElementById("serviceVideo").currentTime =0;
    open_cameraFaceRecog();
    btnAudio();
    $(".service-closebtn").css("backgroundImage", "url(image/closeBtn2.png)");
    setTimeout(function() {
      $(".service-main").css({
        "visibility": "hidden",
        "opacity": "0"
      });
      $(".service-mainbg").css({
        "webkitTransform": "translateZ(-1000px)",
        "visibility": "hidden"
      });
      $(".service-closebtn").css({
        "right": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });

      $(".navbox-cont-l , .navbox-cont-r").css("opacity", "1");
      $(".service-closebtn").css("backgroundImage", "url(image/closeBtn.png)");
      switchNav("right", "open");
      switchNav("left", "open");
    }, 200);
  });
  $("#voice-mode2").hide();
  $("#voice-state2").hide();
  $("#voice-state3").hide();
  $(".voice-mode").on("touchstart", function() {
    StopTTSspeak();
    $("#voice-mode1").hide();
    $("#voice-mode2").show();
    cmdISRstart();
  });
  $(".voice-mode").on("touchend", function() {
    $("#voice-mode1").show();
    $("#voice-mode2").hide();
    cmdISRend();
  });

  //地图位置翻页
  $(".locationName-topbtn").click(function() {
    $(".locationName").animate({
      scrollTop: '-=364',
    }, "slow");
    if (document.querySelector(".locationName").scrollTop < 364) {
      $(".locationName-topbtn").css("visibility", "hidden");
    }
  });

  $(".locationName-botbtn").click(function() {
    getIsClick = 1;
    $(".locationName").animate({
      scrollTop: '+=364',
    }, "slow");
    $(".locationName-topbtn").css("visibility", "visible");
  });

  //获取地图位置名称
  function getPlaceName() {
    $.ajax({
      url: "http://127.0.0.1/Access.asmx/GetAllInfo",
      dataType: "json",
      async: true,
      success: function(data) {
        //渲染导航界面
        var contData = ""
        for (var i = 0; i < data.length; i++) {
          contData += "<div id='locationName-list' class='waves-effect waves-light locationName-list' onclick='mapController(" + i + ")'>" + data[i].PlaceName + "</div>"
        }
        $(".locationName").html(contData);
        if (data.length > 7) {
          $(".locationName-botbtn").css("visibility", "visible");
        } else {
          $(".locationName-botbtn").css("visibility", "hidden");
          $(".locationName-topbtn").css("visibility", "hidden");
        }
        // 包装位置数据
        autoList.length = 0;
        for (var i = 0; i < data.length; i++) {
          var poseData = {
            pose: {
              position: {
                x: 0.0,
                y: 0.0,
                z: 0.0
              },
              orientation: {
                x: 0.0,
                y: 0.0,
                z: 0.0,
                w: 1
              }
            },
            poseId: 0,
            AutoBack: false,
            SpeakText: '',
            MovieOrText: 0,
            MoviePath: ''
          };
          poseData.pose.position.x = data[i].PointValue.Pos_x;
          poseData.pose.position.y = data[i].PointValue.Pos_y;
          poseData.pose.position.z = data[i].PointValue.Pos_z;
          poseData.pose.orientation.x = data[i].PointValue.Ori_x;
          poseData.pose.orientation.y = data[i].PointValue.Ori_y;
          poseData.pose.orientation.z = data[i].PointValue.Ori_z;
          poseData.pose.orientation.w = data[i].PointValue.Ori_w;
          poseData.poseId = i;
          poseData.AutoBack = data[i].AutoBack;
          poseData.SpeakText = data[i].SpeakText;
          poseData.MovieOrText = data[i].MovieOrText;
          poseData.MoviePath = data[i].MoviePath;
          poseData.Loop = data[i].Loop;
          if (data[i].Loop) {
            autoList.push(i);
          }

          poseDataSet[i] = poseData;
        }
      },
      error: function(request, error) {}
    });
  }
  getPlaceName();

  $(".login-back").click(function() {
    getPlaceName();
  });
  $("#backmain-rtr-r").click(function() {
    getIsClick = 1;
    window.location.reload();
  });

  //拍照
  $("#photoCont").hide();
  $("#openPhoto").click(function() {
    getIsClick = 1;
    videoUser = 1;
    open_cameraVideo();
    $("#photoCont").fadeIn("300");

  });
  $("#photoCont").click(function(e) {
    getIsClick = 1;
    if (e.target.id == "photoCont") {
      $("#photoCont").fadeOut("100");
      document.getElementById("catch_image").src = "";
      close_cameraVideo();

    }
  });

  /*
   * getTime() 获取系统时间
   * getDate("-") 获取系统日期 参数为日期分隔符
   */
  var robot = {
    getTime: function() {
      var myhours = new Date().getHours();
      var myminutes = new Date().getMinutes();
      if (myhours < 10) {
        myhours = "0" + new Date().getHours();
      }
      if (myminutes < 10) {
        myminutes = "0" + new Date().getMinutes();
      }
      return myhours + ":" + myminutes;
    },
    getDate: function(i) {
      return new Date().getFullYear() + i + (new Date().getMonth() + 1) + i + new Date().getDate();
    },
    getWeek: function() {
      var weeks = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
      return weeks[new Date().getDay()];
    }
  }
  setInterval(function() {
    $(".robotTime").text(robot.getTime());
    $(".robotDate1").text(robot.getDate("-"));
    $(".robotDate2").text(robot.getDate("/"));
    $(".robotWeek").text(robot.getWeek());
  }, 1000)

  function setImagePreview(avalue) {
    var docObj = document.getElementById("doc_createMap");
    var imgObjPreview = document.getElementById("createMap_preview");
    if (docObj.files && docObj.files[0]) {
      var mapFileName = docObj.files[0].name;
      var mapFileType = mapFileName.substring(mapFileName.lastIndexOf('.') + 1, mapFileName.length);
      if (mapFileType == "jpg" || mapFileType == "png") {
        imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);

        var canvas = document.getElementById("uploadMap");
        var ctx = canvas.getContext("2d");
        var img = document.getElementById("createMap_preview");
        img.onload = function() {
          ctx.drawImage(img, 0, 0);
        };

        $("#upload_createMap").click(function() {
          var cxtMap = document.getElementById("uploadMap").getContext("2d");
          var imgData = cxtMap.getImageData(0, 0, document.getElementById("uploadMap").height, document.getElementById("uploadMap").width);
          var uint8data = new Array();

          uint8data = convert(imgData);
          var info = {
            resolution: 0.05,
            width: 800,
            height: 800,
            origin: {
              position: {
                x: 0,
                y: 0,
                z: 0
              },
              orientation: {
                x: 0,
                y: 0,
                z: 0,
                w: 1
              }
            }

          };
          info.width = document.getElementById("uploadMap").width;
          info.height = document.getElementById("uploadMap").height;
          data_map.data = uint8data;

          data_map.info = info;

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

      } else {
        Materialize.toast('请选择png或jpg格式图片！', 3000);
      }
    }
  }


  function mapBox(state, item) {
    if (state == "open") {
      $(".settingMapBox").fadeIn('400').css("display", "block");
      if (item == 1) {
        $(".settingMapBox-upload").css("display", "block");
      } else if (item == 2) {
        $(".settingMapBox-create").css("display", "block");
      } else if (item == 3) {
        $(".settingMapBox-modify").css("display", "block");
      } else if (item == 4) {
        $(".FaceRegistration").css("display", "block");
        open_cameraVideo();
      } else if (item == 5) {
        $(".settingMapBox-setting").css("display", "block");
      } else if (item == 6) {
        $(".hardwareTest-setting").css("display", "block");
      } else if (item == 7) {
        $(".settingMapBox-modify-p").css("display", "block");
      }
    }
  }

  $("#setting-upLoadMap").click(function() {
    mapBox("open", 1);
  });
  $("#setting-createMap").click(function() {
    mapBox("open", 2);
    $("#mymap-save,#mymap-save2").hide();
  });
  $("#setting-modifyMap").click(function() {
    mapBox("open", 3);
    $("#modfiyIframe").attr("src", "admin/mapModify.html");
  });
  $("#setting-FaceRegistration").click(function() {
    window.localStorage.setItem("regVideo", "open");
    mapBox("open", 4);
    videoUser = 3;
  });
  $("#setting-settingMap").click(function() {
    mapBox("open", 5);
  });
  $("#close-FaceRegistration").click(function() {
    $(".settingMapBox").css("display", "none");
    $(".settingMapBox-upload").css("display", "none");
    $(".settingMapBox-create").css("display", "none");
    $(".settingMapBox-modify").css("display", "none");
    $(".settingMapBox-modify-p").css("display", "none");
    $(".settingMapBox-setting").css("display", "none");
    $(".FaceRegistration").css("display", "none");
    close_cameraVideo();
  });
  $("#close-settingMapBox-upload").click(function() {
    $(".settingMapBox").css("display", "none");
    $(".settingMapBox-upload").css("display", "none");
  });
  $("#close-settingMapBox-create").click(function() {
    $("#createMapMode").hide();
    $("#quit-createMapMode").show();
  });
  $("#noQuitMap").click(function() {
    $("#quit-createMapMode").hide();
  });
  $("#isQuitMap").click(function() {
    $("#quit-createMapMode").hide();
    $(".settingMapBox").css("display", "none");
    $(".settingMapBox-create").css("display", "none");
    close_createMapMode();
    $("#mymap-save").hide();
  });

  $("#hd-reboot").click(function() {
    $("#rebootMode").show();
  });

  $("#close-settingMapBox-modify").click(function() {
    $("#quit-modifyMapMode").show();
  });
  //导航提示
  $("#close-settingMapBox-modify-p").click(function() {
    $("#quit-modifyMapMode-p").show();
  });
  $("#noQuitMap-modify").click(function() {
    $("#quit-modifyMapMode").hide();
  });
  $("#isQuitMap-modify").click(function() {
    $("#quit-modifyMapMode").hide();
    $(".settingMapBox").css("display", "none");
    $(".settingMapBox-modify").css("display", "none");
    close_createMapMode();
  });



  $("#close-hardwareTest-setting").click(function() {
    $(".settingMapBox").css("display", "none");
    $(".hardwareTest-setting").css("display", "none");
  });



  $("#close-settingMapBox-setting").click(function() {
    $(".settingMapBox").css("display", "none");
    $(".settingMapBox-setting").css("display", "none");
  });

  $("#hardwareTest-btn").click(function() {
    mapBox("open", 6);
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
  $("#submit").click(function() {
    var username = $("#username").val();
    var password = $("#password").val();
    if (username == "") {
      Materialize.toast('请输入用户名！', 3000);
    } else if (password == "") {
      Materialize.toast('请输入密码！', 3000);
    } else {

      if (username == "admin" && password == "123") {
        stayHome = 0;
        $.mobile.changePage("#backmain", {
          transition: "fade"
        });
        $("#username").val("");
        $("#password").val("");
      } else {
        Materialize.toast('用户名或密码错误！', 3000);
      }

    }
  });

  //菜单操作
  $(".modeSwitch,.naviData,.interfaceBox,.systemData,.settingCityData,.settingServiceData,.settingAdData,.settingVoiceData").hide();
  //功能开关
  $("#functionSwitch").click(function() {
    $(".modeSwitch").fadeIn('slow');
    $(".settingCityData,.settingServiceData,.settingAdData,.settingVoiceData").hide();
  });
  $("#functionSwitch-close").click(function() {
    $(".modeSwitch,.settingCityData,.settingServiceData,.settingAdData,.settingVoiceData").hide();
  });

  $("#navigatorData").click(function() {
    $(".naviData").fadeIn('slow');
    $(".settingServiceData").hide();
  });
  $("#navigatorData-close").click(function() {
    $(".naviData").hide();
  });

  $("#runningData").click(function() {
    $(".interfaceBox").fadeIn('slow');
    $(".settingServiceData").hide();
  });
  $("#runningData-close").click(function() {
    $(".interfaceBox").hide();
  });

  $("#systemData").click(function() {
    $(".systemData").fadeIn('slow');
    $(".settingServiceData").hide();
  });
  $("#systemData-close").click(function() {
    $(".systemData").hide();
  });
  $("#settingCity").click(function() {
    $(".settingCityData").fadeIn('slow');
    $(".modeSwitch,.settingServiceData,.settingAdData,.settingVoiceData").hide();
  });
  $("#settingCityData-close").click(function() {
    $(".modeSwitch,.settingCityData,.settingServiceData,.settingAdData,.settingVoiceData").hide();
  });
  $("#settingService").click(function() {
    $(".settingServiceData").fadeIn('slow');
    $(".modeSwitch,.settingCityData,.settingAdData,.settingVoiceData").hide();
  });
  $("#settingServiceData-close").click(function() {
    $(".modeSwitch,.settingCityData,.settingServiceData,.settingAdData,.settingVoiceData").hide();
  });
  $("#settingAd").click(function() {
    $(".modeSwitch,.settingCityData,.settingServiceData,.settingVoiceData").hide();
    $(".settingAdData").fadeIn('slow');
  });
  $("#settingAdData-close").click(function() {
    $(".modeSwitch,.settingCityData,.settingServiceData,.settingAdData,.settingVoiceData").hide();
  });
  $("#settingVoice").click(function() {
    $(".modeSwitch,.settingCityData,.settingServiceData,.settingAdData").hide();
    $(".settingVoiceData").fadeIn('slow');
  });
  $("#settingVoiceData-close").click(function() {
    $(".modeSwitch,.settingCityData,.settingServiceData,.settingAdData,.settingVoiceData").hide();
  });

  function getLocalWeather() {
    var city_storage = window.localStorage.getItem("city");
    if (city_storage == null || city_storage == "") {
      city_storage = "上海";
      $("#nowCity").text("未定义");
    } else {
      $("#nowCity").text(city_storage);
    }
    try {
      $.ajax({
        url: "http://127.0.0.1/Access.asmx/GetWeatherByCityName?cityname=" + city_storage,
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
    } catch (e) {
      // statements
    }
  }
  getLocalWeather();
  //自动初始化
  $(".backmain-rtr-r").click(function() {
    stayHome = 1;
  });

  $(".goIsClick").click(function() {
    getIsClick = 1;
  });
  $(".goIsService").click(function() {
    getIsService = 1;
  });
  setInterval(function() {
    if (getIsClick == 1) {
      getIsClick = 0;
    } else if (getIsClick == 0 && stayHome == 1) {
      StopTTSspeak();
      $(".winbox").hide();
      $(".box-logo").hide();
      $(".voice-closebtn").css("backgroundImage", "url(image/closeBtn2.png)");
      //语音识别恢复
      $(".voice-mandarin").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-henan").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-sichuan").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-guangdong").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-liang").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-lily").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-chinese").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-english").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });

      $(".voice-main").css({
        "visibility": "hidden",
        "opacity": "0"
      });
      $(".voice-mainbg").css({
        "webkitTransform": "translateZ(-1000px)",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-state").css({
        "top": "100px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-closebtn").css({
        "right": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-clearbtn").css({
        "right": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-mode").css({
        "top": "830px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".voice-language").css({
        "left": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });
      $(".navbox-cont-l , .navbox-cont-r").css("opacity", "1");
      $(".voice-closebtn").css("backgroundImage", "url(image/closeBtn.png)");
      switchNav("right", "open");
      switchNav("left", "open");

      //人脸识别恢复
      $(".face-closebtn").css("backgroundImage", "url(image/closeBtn2.png)");
      $(".face-main").css({
        "visibility": "hidden",
        "opacity": "0"
      });
      $(".face-mainbg").css({
        "webkitTransform": "translateZ(-1000px)",
        "visibility": "hidden"
      });
      $(".face-closebtn").css({
        "right": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });

      $(".navbox-cont-l , .navbox-cont-r").css("opacity", "1");
      $(".face-closebtn").css("backgroundImage", "url(image/closeBtn.png)");

      //地图导航
      $(".navigator-closebtn").css("backgroundImage", "url(image/closeBtn2.png)");
      $(".navigator-main").css({
        "visibility": "hidden",
        "opacity": "0"
      });
      $(".navigator-mainbg").css({
        "webkitTransform": "translateZ(-1000px)",
        "visibility": "hidden"
      });
      $(".navigator-closebtn").css({
        "right": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });

      $(".navbox-cont-l , .navbox-cont-r").css("opacity", "1");
      $(".navigator-closebtn").css("backgroundImage", "url(image/closeBtn.png)");
      //业务展示
      $(".service-closebtn").css("backgroundImage", "url(image/closeBtn2.png)");
      $(".service-main").css({
        "visibility": "hidden",
        "opacity": "0"
      });
      $(".service-mainbg").css({
        "webkitTransform": "translateZ(-1000px)",
        "visibility": "hidden"
      });
      $(".service-closebtn").css({
        "right": "0px",
        "opacity": "0",
        "visibility": "hidden"
      });

      $(".navbox-cont-l , .navbox-cont-r").css("opacity", "1");
      $(".service-closebtn").css("backgroundImage", "url(image/closeBtn.png)");
      switchNav("right", "open");
      switchNav("left", "open");

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
      if (getIsService == 1) {
        // location.reload();
        getIsService = 0;
      } else {
        $.mobile.changePage('#homemain');
        cmdSetISR(language.zh_cn, area.mandarin, true);
      }

    }
  }, 180000);
  //业务总览
  var fileDocPath = "D:/HRG/HitRobotApp/APP/doc";
  var pathDoc = ".doc";
  var pathToDoc = ".html";
  for (var i = 1; i <= 8; i++) {
    getDocList(i);
  }

  function getDocList(id) {
    var id = id;
    var pathDocName = fileDocPath + "/item" + id;
    try {
      $.ajax({
        url: "http://127.0.0.1/Access.asmx/GetAllFilesName?filePath=" + pathDocName + "&suffix=" + pathDoc,
        dataType: "json",
        async: true,
        success: function(data) {
          if (data.FilesName.length != 0) {
            $(".zonglan-cont" + id).text("");
            for (i = 0; i < data.FilesName.length; i++) {
              var docFileName = (data.FilesName[i]).substring(pathDocName.length + 1, (data.FilesName[i].length - pathDoc.length));

              $.ajax({
                url: "http://127.0.0.1/Access.asmx/AsposeWordToHtml?tWordName=" + data.FilesName[i] + "&tsaveFileName=" + pathDocName + "\\" + docFileName + pathToDoc,
                dataType: "json",
                async: true,
                success: function(data) {

                }
              });

              $("#zonglan-cont" + id).append("<a class='docTitle' onclick='goToDetail(\"" + docFileName + "\"," + id + ")'' href='#zonglan-detail' data-transition='none'>" + docFileName + "</a>");
            }
          }
        },
        error: function(request, error) {}
      });
    } catch (e) {
      // statements
    }
  }
  $(".service-btn").click(function(e) {
    btnAudio();
    $(".zonglan-cont").hide();
    var str = (e.currentTarget.id).substring(11);
    $("#zonglan-cont" + str).show();



  });
  //业务总览配置
  $("#service-btn1,#service-btn2,#service-btn3,#service-btn4,#service-btn5,#service-btn6,#service-btn7,#service-btn8").hide();
  var checkset = JSON.parse(window.localStorage.getItem("checkset"));
  if (checkset == null) {
    document.getElementById("checkdoc1").checked = true;
    document.getElementById("checkdoc2").checked = false;
    document.getElementById("checkdoc3").checked = false;
    document.getElementById("checkdoc4").checked = false;
    document.getElementById("checkdoc5").checked = false;
    document.getElementById("checkdoc6").checked = false;
    document.getElementById("checkdoc7").checked = false;
    document.getElementById("checkdoc8").checked = false;
    $("#service-btn1").show();
    $("#service-btn1").text("业务总览");
    // $("#servive-cont-t").text("业务总览");
    $("#textdoc1").val("业务总览");
    var checkdata = [{
      "checkdoc": true,
      "name": "业务总览"
    }, {
      "checkdoc": false,
      "name": ""
    }, {
      "checkdoc": false,
      "name": ""
    }, {
      "checkdoc": false,
      "name": ""
    }, {
      "checkdoc": false,
      "name": ""
    }, {
      "checkdoc": false,
      "name": ""
    }, {
      "checkdoc": false,
      "name": ""
    }, {
      "checkdoc": false,
      "name": ""
    }];
    window.localStorage.setItem("checkset", JSON.stringify(checkdata));
  } else {
    for (var i = 0; i < 8; i++) {
      var j = i + 1;
      if (checkset[i].checkdoc) {
        document.getElementById("checkdoc" + j).checked = true;
        $("#service-btn" + j).show();
      } else {
        document.getElementById("checkdoc" + j).checked = false;
      }
      $("#textdoc" + j).val(checkset[i].name);
      $("#service-btn" + j).text(checkset[i].name);
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

  function goChangeCheck(id) {
    var isToggle = document.getElementById("checkdoc" + id).checked;
    var checkset = JSON.parse(window.localStorage.getItem("checkset"));
    if (isToggle) {
      $("#service-btn" + id).show();
      checkset[id - 1].checkdoc = true;
      window.localStorage.setItem("checkset", JSON.stringify(checkset));
      Materialize.toast('启用成功!', 500);
    } else {
      $("#service-btn" + id).hide();
      checkset[id - 1].checkdoc = false;
      window.localStorage.setItem("checkset", JSON.stringify(checkset));
      Materialize.toast('取消成功!', 500);
    }
  }

  //保存栏目名
  $("#savedoc1").click(function() {
    goSaveDoc(1);
  });
  $("#savedoc2").click(function() {
    goSaveDoc(2);
  });
  $("#savedoc3").click(function() {
    goSaveDoc(3);
  });
  $("#savedoc4").click(function() {
    goSaveDoc(4);
  });
  $("#savedoc5").click(function() {
    goSaveDoc(5);
  });
  $("#savedoc6").click(function() {
    goSaveDoc(6);
  });
  $("#savedoc7").click(function() {
    goSaveDoc(7);
  });
  $("#savedoc8").click(function() {
    goSaveDoc(8);
  });

  function goSaveDoc(id) {
    var item = id - 1;
    var checkset = JSON.parse(window.localStorage.getItem("checkset"));
    modifyName = $("#textdoc" + id).val();
    checkset[item].name = modifyName;
    $("#service-btn" + id).text(modifyName);
    // $("#servive-cont-t").text(modifyName);
    window.localStorage.setItem("checkset", JSON.stringify(checkset));
    Materialize.toast('保存成功!', 500);
  }



  //底部广告配置
  $("#ad-video").click(function() {
    $("#ad-title-name").text("视频广告");
    $("#adVideo").css("visibility", "visible");
    $("#adSlide").css("visibility", "hidden");
    $("#adIframe").css("visibility", "hidden");
    $("#mgaddress,#mgpic").hide();
    $("#videoTip").show();
    Materialize.toast('设置成功!', 500);
    window.localStorage.setItem("adType", "video");
    document.getElementById("adVideo").play();
    document.getElementById("adVideo").volume = 0.1;
  });


  //选择视频
  var homeVideo = window.localStorage.getItem("adVideo");
  if (homeVideo != null) {
    document.getElementById("adVideo").src = homeVideo;
  } else {
    document.getElementById("adVideo").src = "video/video.mp4";
  }
  var selectVideoName = "";
  $("#selectvideo").change(function(event) {
    selectVideoName = this.files[0].name;
  });
  $("#save_selectvideo").click(function() {
    if (selectVideoName != "") {
      document.getElementById("adVideo").src = "video/" + selectVideoName;
      window.localStorage.setItem("adVideo", "video/" + selectVideoName);
      Materialize.toast('设置成功!', 500);
    }
  });

  $("#ad-pic").click(function() {
    // document.getElementById("serviceVideo").play();
    $("#ad-title-name").text("循环图片");
    $("#adVideo").css("visibility", "hidden");
    $("#adSlide").css("visibility", "visible");
    $("#adIframe").css("visibility", "hidden");
    $("#mgpic").show();
    $("#mgaddress,#videoTip").hide();
    Materialize.toast('设置成功!', 500);
    window.localStorage.setItem("adType", "pic");
    var addpicstr1 = window.localStorage.getItem("addpicstr");
    if (addpicstr1 != null) {
      $(".slides").html(addpicstr1);
      $('.slider').slider({
        full_width: true
      });
    } else {
      intLoadPic();
    }
    $('.slider').slider({
      full_width: true
    });
    document.getElementById("adVideo").pause();
    document.getElementById("adVideo").currentTime = 0;
  });
  $("#ad-link").click(function() {
    $("#ad-title-name").text("外部网址");
    $("#adVideo").css("visibility", "hidden");
    $("#adSlide").css("visibility", "hidden");
    $("#adIframe").css("visibility", "visible");
    $("#mgaddress").show();
    $("#mgpic,#videoTip").hide();
    Materialize.toast('设置成功!', 500);
    window.localStorage.setItem("adType", "link");
    document.getElementById("adVideo").pause();
    document.getElementById("adVideo").currentTime = 0;
  });

  //上传图片
  var fstarId;
  var fendId;
  var fileWholeData;
  var slideDataList = [];
  var addpicstr2 = "";

  function addPicData(file) {

    reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      var baseData = this.result.substring(this.result.indexOf(",") + 1);
      var timestamp = Date.parse(new Date());
      slideDataList.push(timestamp + ".jpg");
      $(".img-cont").append("<div class='img-list'><div><img  src='" + this.result + "'></div><div>删除</div></div>");
      $.ajax({
        url: 'http://127.0.0.1/Access.asmx/SaveImge',
        type: 'post',
        data: {
          "sourPath": baseData,
          "destPath": "D:/HRG/HitRobotApp/APP/slides/" + timestamp + ".jpg"
        },
        success: function(data) {
          if (fstarId < fendId-1) {
            addPicData(fileWholeData[fstarId]);
            fstarId++;

          } else

          //  alert("图片上传完成！");

            $("#saveAdPicSum").show();
            $("#picUpload").hide();
            
          if (slideDataList.length > 0) {
            addpicstr2="";
            for (var i = 0; i <slideDataList.length; i++) {
              addpicstr2 += "<li><img src='slides/" + slideDataList[i] + "'></li>";
            }
          }
          
        }
      });
    }
  }


  $("#AdPicVal").change(function(event) {
    $("#saveAdPicSum").hide();
    $("#picUpload").show();
    slideDataList.length=0;
    fstarId = 0;
    fendId = this.files.length;
    console.log(fendId);
    fileWholeData = this.files;
    addPicData(fileWholeData[fstarId]);

  });



  $("#saveAdPicSum").click(function() {
    $(".slides").html(addpicstr2);
                 console.log(addpicstr2);
    window.localStorage.setItem("addpicstr", addpicstr2);
    $('.slider').slider({
      full_width: true
    });
    addpicstr2 = "";
    Materialize.toast('设置成功！', 4000);
  });
  //设置外部网址链接
  var saveAdLink = window.localStorage.getItem("saveAdLink");
  if (saveAdLink != null) {
    $("#AdLinkVal").val(saveAdLink);
    document.getElementById("adIframe").src = saveAdLink;
  } else {
    document.getElementById("adIframe").src = "http://www.hitrobotgroup.com/";
  }
  $("#saveAdLink").click(function() {
    document.getElementById("adIframe").src = $("#AdLinkVal").val();
    window.localStorage.setItem("saveAdLink", $("#AdLinkVal").val());
    Materialize.toast('保存成功!', 500);
  });
  $('.slider').slider({
    full_width: true
  });

  var voiceObj = document.getElementsByName('voiceCheck');

  for (var i = 0; i < voiceObj.length; i++) {
    for (var j = 0; j < voiceList.length; j++) {
      if (voiceObj[i].value == voiceList[j]) {
        voiceObj[i].checked = true;
      }
    }

  }
  //设置语种
  $("#cancel-voiceType").click(function() {


    var vstr = '';
    for (var i = 0; i < voiceObj.length; i++) {
      voiceObj[i].checked = false;
    }
  });

  $("#save-voiceType").click(function() {
    var voiceObj = document.getElementsByName('voiceCheck');
    var vstr = '';
    var voiceSize = 0;



    for (var i = 0; i < voiceObj.length; i++) {
      if (voiceObj[i].checked) {
        ++voiceSize;
      }
    }


    if (voiceSize > 6) {
      Materialize.toast('最多可设置6中语种，请重新选择！', 4000);
    } else if (voiceSize == 0) {
      Materialize.toast('请选择设置语种！', 4000);
    } else {
      var vitem = 0;
      voiceList = [];
      for (var i = 0; i < voiceObj.length; i++) {
        if (voiceObj[i].checked) {
          voiceList[vitem] = voiceObj[i].value;
          ++vitem;
        }
      }

      window.localStorage.setItem("voiceSet", JSON.stringify(voiceList));
      Materialize.toast('设置成功！', 4000);
      $(".voice-mandarin,.voice-henan,.voice-sichuan,.voice-guangdong,.voice-liang,.voice-lily").show();
      if (voiceSize == 1) {
        $(".voice-henan,.voice-sichuan,.voice-guangdong,.voice-liang,.voice-lily").hide();
        $(".voice-mandarin").text(voiceData[voiceList[0]]);
      } else if (voiceSize == 2) {
        $(".voice-sichuan,.voice-guangdong,.voice-liang,.voice-lily").hide();
        $(".voice-mandarin").text(voiceData[voiceList[0]]);
        $(".voice-henan").text(voiceData[voiceList[1]]);
      } else if (voiceSize == 3) {
        $(".voice-guangdong,.voice-liang,.voice-lily").hide();
        $(".voice-mandarin").text(voiceData[voiceList[0]]);
        $(".voice-henan").text(voiceData[voiceList[1]]);
        $(".voice-sichuan").text(voiceData[voiceList[2]]);
      } else if (voiceSize == 4) {
        $(".voice-liang,.voice-lily").hide();
        $(".voice-mandarin").text(voiceData[voiceList[0]]);
        $(".voice-henan").text(voiceData[voiceList[1]]);
        $(".voice-sichuan").text(voiceData[voiceList[2]]);
        $(".voice-guangdong").text(voiceData[voiceList[3]]);
      } else if (voiceSize == 5) {
        $(".voice-lily").hide();
        $(".voice-mandarin").text(voiceData[voiceList[0]]);
        $(".voice-henan").text(voiceData[voiceList[1]]);
        $(".voice-sichuan").text(voiceData[voiceList[2]]);
        $(".voice-guangdong").text(voiceData[voiceList[3]]);
        $(".voice-liang").text(voiceData[voiceList[4]]);
      } else if (voiceSize == 6) {
        $(".voice-mandarin").text(voiceData[voiceList[0]]);
        $(".voice-henan").text(voiceData[voiceList[1]]);
        $(".voice-sichuan").text(voiceData[voiceList[2]]);
        $(".voice-guangdong").text(voiceData[voiceList[3]]);
        $(".voice-liang").text(voiceData[voiceList[4]]);
        $(".voice-lily").text(voiceData[voiceList[5]]);
      }
    }

  });

  //初始加载

  var addpicstr = window.localStorage.getItem("addpicstr");
  if (addpicstr != null) {
    $(".slides").html(addpicstr);
    $('.slider').slider({
      full_width: true
    });
  } else {
    intLoadPic();
  }

  function intLoadPic() {
    $.ajax({
      url: "http://127.0.0.1/Access.asmx/GetAllFilesName?filePath=D:/HRG/HitRobotApp/APP/slides&suffix=.jpg",
      dataType: "json",
      async: true,
      success: function(data) {
        var data = data.FilesName;
        var slidecont = "";
        if (data.length > 0) {
          for (var i = 0; i < 3; i++) {
            slidecont += "<li><img src='slides/" + data[i].substring(30) + "'></li>";
          }
          $(".slides").html(slidecont);
          $('.slider').slider({
            full_width: true
          });
        }
      },
      error: function(request, error) {}
    });
  }



  //底部广告初次加载
  var adType = window.localStorage.getItem("adType");
  if (adType == null) {
    $("#adVideo").css("visibility", "visible");
    $("#videoTip").show();
    $("#mgpic,#mgaddress").hide();
  } else {
    if (adType == "video") {
      $("#adVideo").css("visibility", "visible");
      $("#ad-title-name").text("视频广告");
      $("#videoTip").show();
      $("#mgpic,#mgaddress").hide();
    } else if (adType == "pic") {
      $("#adSlide").css("visibility", "visible");
      $("#ad-title-name").text("循环图片");
      $("#mgpic").show();
      $("#mgaddress,#mgaddress").hide();
      window.localStorage.setItem("adType", "pic");
      var picdata1 = window.localStorage.getItem("addpicstr");
      $(".slides").html(picdata1);
      $('.slider').slider({
        full_width: true
      });
      document.getElementById("adVideo").pause();
      document.getElementById("adVideo").currentTime = 0;
    } else if (adType == "link") {
      $("#ad-title-name").text("外部网址");
      $("#mgaddress").show();
      $("#mgpic,#videoTip").hide();
      $("#adIframe").css("visibility", "visible");
      document.getElementById("adVideo").pause();
      document.getElementById("adVideo").currentTime = 0;
    }
  }



});
var goToItem = "";

function goToDetail(name, id) {
  name = "doc/item" + id + "/" + name + ".html"
    // $("#zonglan-cont-detail").css("src",name);
  document.getElementById("zonglan-cont-detail").src = name;
}

//禁用右键
function stop() {
  return false;
}
document.oncontextmenu = stop;
var province = {
  "44": "广东",
  "11": "北京",
  "33": "浙江",
  "35": "福建",
  "42": "湖北",
  "31": "上海",
  "32": "江苏",
  "12": "天津",
  "13": "河北",
  "14": "山西",
  "15": "内蒙古",
  "21": "辽宁",
  "22": "吉林",
  "23": "黑龙江",
  "34": "安徽",
  "36": "江西",
  "37": "山东",
  "41": "河南",
  "43": "湖南",
  "45": "广西",
  "46": "海南",
  "50": "重庆",
  "51": "四川",
  "52": "贵州",
  "53": "云南",
  "54": "西藏",
  "61": "陕西",
  "62": "甘肃",
  "63": "青海",
  "64": "宁夏",
  "65": "新疆",
  "71": "台湾",
  "81": "香港",
  "82": "澳门"
};
var city = {
  "11": {
    "1": "北京",
  },
  "12": {
    "1": "天津",
  },
  "13": {
    "1": "石家庄",
    "2": "唐山",
    "3": "秦皇岛",
    "4": "邯郸",
    "5": "邢台",
    "6": "保定",
    "7": "张家口",
    "8": "承德",
    "9": "沧州",
    "10": "廊坊",
    "11": "衡水"
  },
  "14": {
    "1": "太原",
    "2": "大同",
    "3": "阳泉",
    "4": "长治",
    "5": "晋城",
    "6": "朔州",
    "7": "晋中",
    "8": "运城",
    "9": "忻州",
    "10": "临汾",
    "23": "吕梁"
  },
  "15": {
    "1": "呼和浩特",
    "2": "包头",
    "3": "乌海",
    "4": "赤峰",
    "5": "通辽",
    "6": "鄂尔多斯",
    "7": "呼伦贝尔",
    "22": "兴安盟",
    "25": "锡林郭勒盟",
    "26": "乌兰察布盟",
    "28": "巴彦淖尔盟",
    "29": "阿拉善盟"
  },
  "21": {
    "1": "沈阳",
    "2": "大连",
    "3": "鞍山",
    "4": "抚顺",
    "5": "本溪",
    "6": "丹东",
    "7": "锦州",
    "8": "营口",
    "9": "阜新",
    "10": "辽阳",
    "11": "盘锦",
    "12": "铁岭",
    "13": "朝阳",
    "14": "葫芦岛"
  },
  "22": {
    "1": "长春",
    "2": "吉林",
    "3": "四平",
    "4": "辽源",
    "5": "通化",
    "6": "白山",
    "7": "松原",
    "8": "白城",
    "24": "延边朝鲜族自治州"
  },
  "23": {
    "1": "哈尔滨",
    "2": "齐齐哈尔",
    "3": "鸡西",
    "4": "鹤岗",
    "5": "双鸭山",
    "6": "大庆",
    "7": "伊春",
    "8": "佳木斯",
    "9": "七台河",
    "10": "牡丹江",
    "11": "黑河",
    "12": "绥化",
    "27": "大兴安岭"
  },
  "31": {
    "1": "上海"
  },
  "32": {
    "1": "南京",
    "2": "无锡",
    "3": "徐州",
    "4": "常州",
    "5": "苏州",
    "6": "南通",
    "7": "连云港",
    "8": "淮安",
    "9": "盐城",
    "10": "扬州",
    "11": "镇江",
    "12": "泰州",
    "13": "宿迁"
  },
  "33": {
    "1": "杭州",
    "2": "宁波",
    "3": "温州",
    "4": "嘉兴",
    "5": "湖州",
    "6": "绍兴",
    "7": "金华",
    "8": "衢州",
    "9": "舟山",
    "10": "台州",
    "11": "丽水"
  },
  "34": {
    "1": "合肥",
    "2": "芜湖",
    "3": "蚌埠",
    "4": "淮南",
    "5": "马鞍山",
    "6": "淮北",
    "7": "铜陵",
    "8": "安庆",
    "10": "黄山",
    "11": "滁州",
    "12": "阜阳",
    "13": "宿州",
    "14": "巢湖",
    "15": "六安",
    "16": "亳州",
    "17": "池州",
    "18": "宣城"
  },
  "35": {
    "1": "福州",
    "2": "厦门",
    "3": "莆田",
    "4": "三明",
    "5": "泉州",
    "6": "漳州",
    "7": "南平",
    "8": "龙岩",
    "9": "宁德"
  },
  "36": {
    "1": "南昌",
    "2": "景德镇",
    "3": "萍乡",
    "4": "九江",
    "5": "新余",
    "6": "鹰潭",
    "7": "赣州",
    "8": "吉安",
    "9": "宜春",
    "10": "抚州",
    "11": "上饶"
  },
  "37": {
    "1": "济南",
    "2": "青岛",
    "3": "淄博",
    "4": "枣庄",
    "5": "东营",
    "6": "烟台",
    "7": "潍坊",
    "8": "济宁",
    "9": "泰安",
    "10": "威海",
    "11": "日照",
    "12": "莱芜",
    "13": "临沂",
    "14": "德州",
    "15": "聊城",
    "16": "滨州",
    "17": "菏泽"
  },
  "41": {
    "1": "郑州",
    "2": "开封",
    "3": "洛阳",
    "4": "平顶山",
    "5": "安阳",
    "6": "鹤壁",
    "7": "新乡",
    "8": "焦作",
    "9": "濮阳",
    "10": "许昌",
    "11": "漯河",
    "12": "三门峡",
    "13": "南阳",
    "14": "商丘",
    "15": "信阳",
    "16": "周口",
    "17": "驻马店",
    "18": "济源"
  },
  "42": {
    "1": "武汉",
    "2": "黄石",
    "3": "十堰",
    "5": "宜昌",
    "6": "襄阳",
    "7": "鄂州",
    "8": "荆门",
    "9": "孝感",
    "10": "荆州",
    "11": "黄冈",
    "12": "咸宁",
    "13": "随州",
    "28": "恩施土家族苗族自治州",
    "29": "仙桃",
    "30": "潜江",
    "31": "天门",
    "32": "神农架"
  },
  "43": {
    "1": "长沙",
    "2": "株洲",
    "3": "湘潭",
    "4": "衡阳",
    "5": "邵阳",
    "6": "岳阳",
    "7": "常德",
    "8": "张家界",
    "9": "益阳",
    "10": "郴州",
    "11": "永州",
    "12": "怀化",
    "13": "娄底",
    "31": "湘西土家族苗族自治州"
  },
  "44": {
    "1": "广州",
    "2": "韶关",
    "3": "深圳",
    "4": "珠海",
    "5": "汕头",
    "6": "佛山",
    "7": "江门",
    "8": "湛江",
    "9": "茂名",
    "12": "肇庆",
    "13": "惠州",
    "14": "梅州",
    "15": "汕尾",
    "16": "河源",
    "17": "阳江",
    "18": "清远",
    "19": "东莞",
    "20": "中山",
    "51": "潮州",
    "52": "揭阳",
    "53": "云浮"
  },
  "45": {
    "1": "南宁",
    "3": "桂林",
    "4": "梧州",
    "5": "北海",
    "6": "防城港",
    "7": "钦州",
    "8": "贵港",
    "9": "玉林",
    "10": "百色",
    "11": "贺州",
    "12": "河池",
    "13": "来宾",
    "14": "崇左",
    "22": "柳州"
  },
  "46": {
    "1": "海口",
    "2": "三亚"
  },
  "50": {
    "1": "重庆"
  },
  "51": {
    "1": "成都",
    "3": "自贡",
    "4": "攀枝花",
    "5": "泸州",
    "6": "德阳",
    "7": "绵阳",
    "8": "广元",
    "9": "遂宁",
    "10": "内江",
    "11": "乐山",
    "13": "南充",
    "14": "眉山",
    "15": "宜宾",
    "16": "广安",
    "17": "达州",
    "18": "雅安",
    "19": "巴中",
    "20": "资阳",
    "32": "阿坝",
    "33": "甘孜",
    "34": "凉山"
  },
  "52": {
    "1": "贵阳",
    "2": "六盘水",
    "3": "遵义",
    "4": "安顺",
    "22": "铜仁",
    "23": "黔西南",
    "24": "毕节",
    "26": "黔东南",
    "27": "黔南"
  },
  "53": {
    "1": "昆明",
    "3": "曲靖",
    "4": "玉溪",
    "5": "保山",
    "6": "昭通",
    "23": "楚雄",
    "25": "红河",
    "26": "文山",
    "27": "思茅",
    "28": "西双版纳",
    "29": "大理",
    "31": "德宏",
    "32": "丽江",
    "33": "怒江",
    "34": "迪庆",
    "35": "临沧"
  },
  "54": {
    "1": "拉萨",
    "21": "昌都",
    "22": "山南",
    "23": "日喀则",
    "24": "那曲",
    "25": "阿里",
    "26": "林芝"
  },
  "61": {
    "1": "西安",
    "2": "铜川",
    "3": "宝鸡",
    "4": "咸阳",
    "5": "渭南",
    "6": "延安",
    "7": "汉中",
    "8": "榆林",
    "9": "安康",
    "10": "商洛"
  },
  "62": {
    "1": "兰州市",
    "2": "嘉峪关",
    "3": "金昌",
    "4": "白银",
    "5": "天水",
    "6": "武威",
    "7": "张掖",
    "8": "平凉",
    "9": "酒泉",
    "10": "庆阳",
    "24": "定西",
    "26": "陇南",
    "29": "临夏",
    "30": "甘南"
  },
  "63": {
    "1": "西宁",
    "21": "海东",
    "22": "海北",
    "23": "黄南",
    "25": "海南",
    "26": "果洛",
    "27": "玉树",
    "28": "海西"
  },
  "64": {
    "1": "银川",
    "2": "石嘴山",
    "3": "吴忠",
    "4": "固原",
    "5": "中卫"
  },
  "65": {
    "1": "乌鲁木齐",
    "2": "克拉玛依",
    "21": "吐鲁番",
    "22": "哈密",
    "23": "昌吉",
    "27": "博尔塔拉",
    "28": "巴音郭楞",
    "29": "阿克苏",
    "30": "克孜勒苏",
    "31": "喀什",
    "32": "和田",
    "40": "伊犁",
    "42": "塔城",
    "43": "阿勒泰",
    "44": "石河子"
  },
  "71": {
    "1": "台北市",
    "2": "高雄市",
    "3": "基隆市",
    "4": "台中市",
    "5": "台南市",
    "6": "新竹市",
    "7": "嘉义市",
    "8": "台北县",
    "9": "宜兰县",
    "10": "桃园县",
    "11": "新竹县",
    "12": "苗栗县",
    "13": "台中县",
    "14": "彰化县",
    "15": "南投县",
    "16": "云林县",
    "17": "嘉义县",
    "18": "台南县",
    "19": "高雄县",
    "20": "屏东县",
    "21": "澎湖县",
    "22": "台东县",
    "23": "花莲县"
  },
  "81": {
    "1": "香港"
  },
  "82": {
    "1": "澳门"
  }
};

for (var i in province) {
  $("#provinceList").append("<a class='provinceName' onclick='enterCity(" + i + ")'>" + province[i] + "</a>");
}



function enterCity(id) {
  $("#citynamelist").html("");
  for (var i in city[id]) {
    $("#citynamelist").append("<a class='provinceName' onclick=\"changeCityName('" + city[id][i] + "')\">" + city[id][i] + "</a>");
  }
}

function changeCityName(str) {
  window.localStorage.setItem("city", str);
  $("#nowCity").text(str);
  Materialize.toast('设置成功!', 600);
}