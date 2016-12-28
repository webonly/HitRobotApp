$(document).ready(function () {

    document.oncontextmenu = function (e) {
        e.preventDefault();
    }
  
 

    $("#main-middle-img").css("margin-left", ($(".col-md-8").width() - $("#main-middle-img").width()) / 2);
    $("#main-left-img").css("margin-left", ($(".col-md-1").width() - $("#main-left-img").width()) / 2);
    $("#main-right-img").css("margin-left", ($(".col-md-1").width() - $("#main-right-img").width()) / 2);

    document.getElementById("main-left-img").addEventListener("touchstart", touch_left_btn, false);
    document.getElementById("main-left-img").addEventListener("touchend", touch_left_btn, false);
    document.getElementById("main-right-img").addEventListener("touchstart", touch_right_btn, false);
    document.getElementById("main-right-img").addEventListener("touchend", touch_right_btn, false);

    function touch_left_btn(event)
    {
        console.log(event.type);
        switch (event.type) {
            case "touchstart":
                event.preventDefault();
                break;

            case "touchend":
                break;
            default:
                break;
        }
    }
    function touch_right_btn(event) {
        console.log(event.type);
        switch (event.type) {
            case "touchstart":
                event.preventDefault();

                $("#main-voice-img").css("display","block");
                ISR_start();
                break;

            case "touchend":
                $("#main-voice-img").css("display", "none");
                ISR_stop();
                break;
            default:
                break;
        }
    }

    var ros = new ROSLIB.Ros({
        url: 'ws://192.168.0.7:9090'
    });

    ros.socket.onopen = function () {
        console.log("连接成功");
        $(".main-connect-status ").html("连接成功！");
    }
    ros.socket.onclose = function () {
        console.log("连接关闭");
        $(".main-connect-status ").html("连接关闭！");
    }
    ros.socket.onerror = function () {
        console.log("连接错误");
        $(".main-connect-status ").html("连接错误！");
    }


    var Audio_Topic = new ROSLIB.Topic({
        ros: ros,
        name: '/Audio',
        messageType: '/std_msgs/String'
    });

    var Audio_Message = new ROSLIB.Message({
        data: ""
    });

    var session = new IFlyIatSession({
        'url': 'http://webapi.openspeech.cn/',
        'reconnection': true,
        'reconnectionDelay': 30000,
        'compress': 'speex',
        'speex_path': 'iflytek/speex.js',
        'vad_path': 'iflytek/vad.js',
        'recorder_path': 'iflytek/recorderWorker.js'
    });

    function ISR_start() {

        var appid = "57738c5a";
        var timestamp = new Date().toLocaleTimeString();
        var expires = 60000;

        var signature = faultylabs.MD5(appid + '&' + timestamp + '&' + expires + '&' + "e62d7a1d31fdf3ed");


        var params = { "grammar_list": null, "params": "aue=speex-wb;-1, usr = mkchen, ssm = 1, sub = iat, net_type = wifi, ent =sms16k, rst = plain, auf  = audio/L16;rate=16000, vad_enable = 1, vad_timeout = 5000, vad_speech_tail = 500, caller.appid = " + appid + ",timestamp = " + timestamp + ",expires = " + expires, "signature": signature };

        session.start(params, function (volume) {
            if (volume < 6 && volume > 0)
                console.log("volume : " + volume);

            if (volume < 0)
                console.log("failed to open Mic");


        },
        function (err, result) {
            if (err == null || err == undefined || err == 0) {
                if (result == '' || result == null)
                    console.log("no asr result available");
                else {
                    console.log(result);
                    Audio_Message.data = result;
                    Audio_Topic.publish(Audio_Message);

                }
            }

            else {
                console.log('error code : ' + err + ", error description : " + result);
            }
        },
        function (message) {
            if (message == 'onStop') {
                console.log("stop recording");
            } else if (message == 'onEnd') {
                console.log("session completed");
            }
        }, function (data) {
            console.log(data);
        });

    };

    function ISR_stop() {
        session.stop(null);
    };

    ISR_start();
    setTimeout(function () {
        ISR_stop();
    }, 3000)


});



