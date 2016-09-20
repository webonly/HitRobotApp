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
  })
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
  string.data = "save_map", cmd_string.publish(string), string.data = "save_map_edit", cmd_string.publish(string)
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
var   poseDataSet = [];
document.getElementById("audio-btn2").volume = .2;

var URL="ws://192.168.0.7:9090";
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
$(".navigator-main-l").css("backgroundImage","url()");
ros.on("close",function(){
    $(".navigator-main-l").css("backgroundImage","url()");
    ros.connect(URL);
});
ros.on("connection",function(){
       Close_handle();
    $(".navigator-main-l").css("backgroundImage","url(map/map.png)");
  });
var moveResult=1;
var currentPoseId;
var moveIntert=0;
var isSpeak=0;
var goalResut=0;
function Manual_motion(poseData) {
      close_cameraFaceRecog();
      var pose=new ROSLIB.Pose(poseData.pose);
      var poseId=poseData.poseId;
      currentPoseId=poseId;
      var SpeakText=poseData.SpeakText;
      var moveTryTimes=2;
      var isMoveGoal=0;

    if (isSpeak==0) {
      isOnSpeak=true;
       cmdTTSspeak("您好，请跟我来");  
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
          goal.on('result', function (result) {
              //TODO 到目标点或不能到达后执行
              goalResut=1;
              isMoveGoal=1;
          });
          goal.on('status', function (status) {
             if (goalResut==1) {
                if (status.status==4 && isMoveGoal==1) {
                   moveResult=0;
                   isMoveGoal=0;
                   isOnSpeak=true;
                   cmdTTSspeak("您好，请您让一让！");
                   isSpeak=1;
                }
                if (status.status==3 && isMoveGoal==1) {
                   isMoveGoal=0;
                   IsSpeakEnd=false;
                   isOnSpeak=true;
                   cmdTTSspeak(SpeakText);
                  if(poseId==0){
                  open_cameraFaceRecog();
                  }
                  moveResult=1;
                  isSpeak=0;
                  if (poseData.AutoBack && poseId!=0) {
                  isSpeak=1;
                  isCanBack=true;
                  }
                }  
             }    
            });
}
    //navigation
    $(".map-stop").click(function () {
            btnAudio();
        moveResult=1;
            Stop_motion();
    });
    $(".map-move").click(function () {
            btnAudio();
     var pose = new ROSLIB.Pose({
      position: { x: 0.0, y: 0.0, z: 0.0 },
     orientation: { x: 0.0, y: 0.0, z: 0.0, w: 1 }
   });
        Manual_motion(pose,"我到家啦");
    });



$("#start_createMap").click(function(){
      open_createMapMode();
});

 $("#save_createMap").click(function(){
    console.log("保存新建地图");
    $("#createMapMode").show();

});
$("#noSavaMap").click(function(){
  $("#createMapMode").hide();
});
$("#isSavaMap").click(function(){
   console.log("是");
     $("#createMapMode").hide();
          $("#mymap-save").show();
      var progress = $("#container").Progress({
        percent: 0,
        width: 360,
        height: 60,
        fontSize: 30,
        increaseSpeed: 0.2,
        animate: true
      });
        progress.percent(100);
     save_map();
     setTimeout(function(){
     $("#mymap-save").hide();
   }, 33000);
});



function mapController(poseId){
   btnAudio();
   goalResut=0;6
   Manual_motion(poseDataSet[poseId]);
}

setInterval(function(){
   if (moveResult==0 && goalResut==1) {
   goalResut=0;
   Manual_motion(poseDataSet[currentPoseId]);
    }


    var endDate=new Date();
    var endMoveHour=parseInt(endDate.getHours());
    var endMoveMinute=parseInt(endDate.getMinutes());
    var endMoveSecond=parseInt(endDate.getSeconds());
  //   if (endMoveHour==12 && endMoveMinute==0 && endMoveSecond==0  && moveResult==1) {   
  //       Manual_motion(poseDataSet[0]);
  //   }  

  //   if (endMoveHour==20 && endMoveMinute==0 && endMoveSecond==0 && moveResult==1) {   
  //       Manual_motion(poseDataSet[0]);
  // }  

}, 8000);

// var sbstatus=window.localStorage.getItem("sbstatus"); 

// if (sbstatus==null) {
// document.getElementById("shoubing").checked=true;
//      Close_handle();
//      Stop_motion();
// }else{
//   if (sbstatus=="1") {
//    document.getElementById("shoubing").checked=false;
//   }else{
//     document.getElementById("shoubing").checked=true;
//   }
// }
document.getElementById("shoubing").checked=true;
$("#shoubing").change(function(event) {
  var isToggle=document.getElementById("shoubing").checked;
   if (isToggle) {
     Close_handle();
     Stop_motion();
   }else{
     Open_handle();
   }
});
window.onunload=function(){
      Close_handle();
      Stop_motion();
}