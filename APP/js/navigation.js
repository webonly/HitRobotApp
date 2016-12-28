/*!
 * HRG-Voice v1.1.1 
 * Copyright 2015-2016 HIT ROBOT GROUP
 * Date: 2016-10-26 10:33:30 
 *
 * 调用说明：
 * Manual_motion(poseId)     发送位置坐标
 * cancel()      取消运动命令
 * reboot()      重启
 * shutdown()    关机
 * open_createMapMode()      打开建图模式
 * close_createMapMode()     关闭建图模式
 * save_map()                保存地图
 * Stop_motion       停止运动        
 * Open_handle()     打开手柄
 * Close_handle(     关闭手柄
 */
function btnAudio() {
  document.getElementById("audio-btn2").play()
}

function init() {
  var a = new ROS2D.Viewer({
    divID: "nav",
    width: 800,
    height: 800
  });
  NAV2D.OccupancyGridClientNav({
    ros: ros,
    rootObject: a.scene,
    continuous: !0,
    withOrientation: !0,
    viewer: a,
    serverName: "/move_base"
  });
  system_mode.subscribe(function(a) {
    "busy" == a.data ? console.log("system busy") : (isMapState = a.data, "navigation" == isMapState ? $(".settingMapBox-create-state").text("\u5f53\u524d\u72b6\u6001\uff1a\u5bfc\u822a\u6a21\u5f0f") : $(".settingMapBox-create-state").text("\u5f53\u524d\u72b6\u6001\uff1a\u5efa\u56fe\u6a21\u5f0f"))
  });

}

function cancel() {
  string.data = "cancel", cmd_string.publish(string)
}

function shutdown() {
  string.data = "shutdown", cmd_string.publish(string)
}

function reboot() {
  string.data = "reboot", cmd_string.publish(string)
}

function open_createMapMode() {
  string.data = "gmapping", cmd_string.publish(string)
}

function close_createMapMode() {
  string.data = "gmapping_pose", cmd_string.publish(string), string.data = "navigation", cmd_string.publish(string)
}

function change_action() {
  "goal" == action ? (action = "pose", document.getElementById("action_text").innerHTML = "\u4f4d\u7f6e\u4f30\u8ba1") : "pose" == action && (action = "goal", document.getElementById("action_text").innerHTML = "\u76ee\u6807\u5730\u70b9")
}

function save_map() {
  getMapeditStatus(), string.data = "save_map_edit", cmd_string.publish(string), getMapeditStatus()
}

function Stop_motion() {
  navigator_cmd.data = "cancel", cmd_string.publish(navigator_cmd)
}

function Open_handle() {
  navigator_cmd.data = "roslaunch bringup teleop_joystick.launch", shell_string.publish(navigator_cmd)
}

function Close_handle() {
  navigator_cmd.data = "rosnode kill /teleop_joystick", shell_string.publish(navigator_cmd)
}
var isMapState = "navigation";
var poseDataSet = [];
var autoList = [];
document.getElementById("audio-btn2").volume = .2;

var URL = "ws://192.168.0.7:9090";
var ros = new ROSLIB.Ros();
ros.connect(URL);
string_Map = new ROSLIB.Message({
    data: "navigation"
  }),
  set_map = new ROSLIB.Topic({
    ros: ros,
    name: "/map_edit2",
    messageType: "nav_msgs/OccupancyGrid"
  }),
  uint8data_new = new Array,
  data_map = new ROSLIB.Message({
    header: {
      frame_id: "/map",
      seq: 0
    },
    info: {
      resolution: .05,
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
    },
    data: uint8data_new
  }),
  system_mode = new ROSLIB.Topic({
    ros: ros,
    name: "/system_shell/system_mode",
    messageType: "std_msgs/String"
  }),
  cmd_string = new ROSLIB.Topic({
    ros: ros,
    name: "/system_shell/cmd_string",
    messageType: "std_msgs/String"
  }),
  shell_string = new ROSLIB.Topic({
    ros: ros,
    name: "/system_shell/shell_string",
    messageType: "std_msgs/String"
  }),
  string = new ROSLIB.Message({
    data: "navigation"
  }),
  action = "goal",
  actionClient = new ROSLIB.ActionClient({
    ros: ros,
    actionName: "move_base_msgs/MoveBaseAction",
    serverName: "/move_base"
  }),
  poseListener = new ROSLIB.Topic({
    ros: ros,
    name: "/robot_pose",
    messageType: "geometry_msgs/Pose",
    throttle_rate: 100
  }),
  resultListener = new ROSLIB.Topic({
    ros: ros,
    name: this.serverName + "/result",
    messageType: this.actionName + "Result"
  }),
  navigator_cmd = new ROSLIB.Message({
    data: "cancel"
  });
//连接状态
$(".navigator-main-l").css("backgroundImage", "url()");
ros.on("close", function() {
  $(".navigator-main-l").css("backgroundImage", "url()");
  // ros.connect(URL);
});
ros.on("connection", function() {
  $(".navigator-main-l").css("backgroundImage", "url(map/map.png)");
  getJoystickStatus();
});
var moveResult = 1;
var currentPoseId;
var moveIntert = 0;
var isSpeak = 0;
var goalResut = 0;
var currentVid;
var autoMoveState = false;

function Manual_motion(poseData) {
  close_cameraFaceRecog();
  var pose = new ROSLIB.Pose(poseData.pose);
  var poseId = poseData.poseId;
  currentPoseId = poseId;
  var SpeakText = poseData.SpeakText;
  var moveTryTimes = 2;
  var isMoveGoal = 0;

  if (isSpeak == 0) {
    isOnSpeak = true;
    if (autoSpeak) {
          cmdTTSspeak("自动巡航开始,您好，请跟我来");
          autoSpeak=false;
        }else{
        cmdTTSspeak("您好，请跟我来");
        }

  }
  var goal = new ROSLIB.Goal({
    actionClient: actionClient,
    goalMessage: {
      target_pose: {
        header: {
          frame_id: '/map'
        },
        pose: pose
      }
    }
  });
  goal.send();
  goal.on('result', function(result) {
    //TODO 到目标点或不能到达后执行
    goalResut = 1;
    isMoveGoal = 1;
  });
  goal.on('status', function(status) {
    if (goalResut == 1) {
      if (status.status == 4 && isMoveGoal == 1) {
        moveResult = 0;
        isMoveGoal = 0;
        isOnSpeak = true;
        cmdTTSspeak("您好，请您让一让！");
        isSpeak = 1;
      }
      if (status.status == 3 && isMoveGoal == 1) {
        isMoveGoal = 0;
        IsSpeakEnd = false;
        isOnSpeak = true;
        moveResult = 1;
        cmdTTSspeak(SpeakText);
        //播放视频
        if (poseData.MovieOrText == "1") {
          startNavVideo(poseData.MoviePath);
        }
        if (poseId == 0&&!autoMoveState) {
          open_cameraFaceRecog();
        }
        isCanLoop = true;
        isSpeak = 0;
        if (poseData.AutoBack && poseId != 0) {
          isSpeak = 1;
          isCanBack = true;
        }
      }
    }
  });
}
//navigation
$(".map-stop").click(function() {
  $(".locationName-list").css("backgroundColor", "#1dbac7");
  ISR_WakeUp();
  autoMoveState = false;
  btnAudio();
  moveResult = 1;
  Stop_motion();
  open_cameraFaceRecog();
});
$(".map-move").click(function() {
  $(".locationName-list").css("backgroundColor", "#1dbac7");
  ISR_WakeUp();
  autoMoveState = false;
  btnAudio();
  var pose = new ROSLIB.Pose({
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
  });
  Manual_motion(pose, "我到家啦");
});



$("#start_createMap").click(function() {
  open_createMapMode();
});

$("#save_createMap").click(function() {
  //  console.log("保存新建地图");
  $("#createMapMode").show();

});
$("#noSavaMap").click(function() {
  $("#createMapMode").hide();
});
$("#isSavaMap").click(function() {
  console.log("是");
  $("#createMapMode").hide();
  $("#mymap-save").show();
  save_map();
});



function mapController(poseId) {
  if (!autoMoveState) {
    btnAudio();
    goalResut = 0;
    isSpeak == 0;
    Manual_motion(poseDataSet[poseId]);
  }


}

setInterval(function() {
  if (moveResult == 0 && goalResut == 1) {
    goalResut = 0;
    Manual_motion(poseDataSet[currentPoseId]);
  }


  var endDate = new Date();
  var endMoveHour = parseInt(endDate.getHours());
  var endMoveMinute = parseInt(endDate.getMinutes());
  var endMoveSecond = parseInt(endDate.getSeconds());
  //   if (endMoveHour==12 && endMoveMinute==0 && endMoveSecond==0  && moveResult==1) {   
  //       Manual_motion(poseDataSet[0]);
  //   }  

  //   if (endMoveHour==20 && endMoveMinute==0 && endMoveSecond==0 && moveResult==1) {   
  //       Manual_motion(poseDataSet[0]);
  // }  

}, 8000);

document.getElementById("shoubing").checked = true;
$("#shoubing").change(function(event) {
  var isToggle = document.getElementById("shoubing").checked;
  if (isToggle) {
    Close_handle();
    Stop_motion();
  } else {
    Open_handle();
    console.log(document.getElementById("shoubing").checked);
  }
  setTimeout(function() {
    getJoystickStatus();
  }, 2000);
});
window.onunload = function() {
    ISR_unWakeUp();
    Stop_motion();
  }
  //到达目标点播放视频
var navVideoObj = document.getElementById("navVideo");
$("#navVideoBox").click(function(e) {
  if (e.target.id == "navVideoBox") {
    $("#navVideoBox").hide();
    navVideoObj.pause();
    navVideoObj.currenttime = 0;
    document.getElementById("adVideo").volume = 0.1;
    isVideoOpen=false;
    if (autoMoveState) {
      if (isCanLoop) {
        if (autoPostId == (autoList.length - 1)) {
          direction = false;
        }
        if (autoPostId == 0) {
          direction = true;
        }
        if (direction) {
          autoPostId++;
        } else {
          autoPostId--;
        }
        mapAutoController(autoPostId);
        isCanLoop = false;
      }
    } else {
      if (isCanBack) {
        setTimeout(function() {
          Manual_motion(poseDataSet[0]);
        }, 3000);
        isCanBack = false;
      }
    }
    isVideoEnd = false;
  }
});
var isVideoOpen = false;



function startNavVideo(videoAddress) {
  document.getElementById("adVideo").volume = 0;
  $("#navVideoBox").show();
  isVideoOpen = true;
  navVideoObj.src = "video/" + videoAddress;
  navVideoObj.play();
  navVideoObj.onended = function() {
            isVideoOpen=false;
    navVideoObj.src="";
    $("#navVideoBox").fadeOut('slow');
    if (autoMoveState) {
      if (isCanLoop) {
        if (autoPostId == (autoList.length - 1)) {
          direction = false;
        }
        if (autoPostId == 0) {
          direction = true;
        }
        if (direction) {
          autoPostId++;
        } else {
          autoPostId--;
        }
        mapAutoController(autoPostId);
        isCanLoop = false;
      }
    } else {
      if (isCanBack) {
        setTimeout(function() {
          Manual_motion(poseDataSet[0]);
        }, 3000);
        isCanBack = false;
      }
    }
    isVideoEnd = false;
  }
}
$("#setting-video").click(function() {
  $(".mapvideo").show();
});
$("#close-mapvideo").click(function() {
  $(".mapvideo").hide();
});

//获取状态
var ShellFeedback = new ROSLIB.Topic({
  ros: ros,
  name: '/system_shell/shell_feedback',
  messageType: 'std_msgs/String'
});

var shellTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/system_shell/shell_string",
  messageType: "std_msgs/String"
});
//获取手柄状态
function getJoystickStatus() {
  navigator_cmd.data = '_JOYSTICK=`rosnode list | grep teleop_joystic`; if [[ -n $_JOYSTICK ]]; then _FB="joy_on"; else _FB="joy_off"; fi; rostopic pub -1 /system_shell/shell_feedback std_msgs/String $_FB';
  shellTopic.publish(navigator_cmd);
}
//获取修改地图保存完成状态
function getMapeditStatus() {
  navigator_cmd.data = 'roslaunch bringup map_saver.launch; rostopic pub -1 /system_shell/shell_feedback std_msgs/String "map_ok"';
  shellTopic.publish(navigator_cmd);
}
//状态回调函数
ShellFeedback.subscribe(function(data) {
  switch (data.data) {
    case "map_ok":

      $("#mymap-save").hide();
      $("#mymap-save2").show();
      break;
    case "joy_on":
      document.getElementById("shoubing").checked = false;
      break;
    case "joy_off":
      document.getElementById("shoubing").checked = true;
      break;
    default:
      break;

  }
});
$("#saveQuit").click(function() {
  $("#mymap-save2").hide();
});
//自动巡航
var autoPostId;
var direction = true;
var autoSpeak=false;
$(".map-auto").click(function() {
autoSpeak=true;
StopTTSspeak();
ISR_unWakeUp();
  $(".locationName-list").css("backgroundColor", "#b8babc");
 
  btnAudio();
  Stop_motion();
  autoPostId = 0;
  autoMoveState = true;
  if (autoList.length > 1) {
    setTimeout(function() {
      mapAutoController(autoPostId);
    }, 4000);

  } else {
    Materialize.toast('自动巡航，需要设置两个以上位置!', 1000);
  }
});

function mapAutoController(poseId) {
 
  goalResut = 0;
  Manual_motion(poseDataSet[autoList[poseId]]);
}