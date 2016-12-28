$(document).ready(function () {
    document.oncontextmenu = function (e) {
        e.preventDefault();
    }


    window.addEventListener('orientationchange', function (event) {
        getScreen();
    });

    function getScreen() {
        if (window.orientation == 180 || window.orientation == 0) {
            alert("竖屏");
        } if (window.orientation == 90 || window.orientation == -90) {
            alert("横屏");
        }
    }

    var CurrenControlModel = "none";
    function selectfrom(lowValue, highValue) {
        var choice = highValue - lowValue + 1;
        return Math.floor(Math.random() * choice + lowValue);
    }
    var type = 0;
    $(".main-btn-ctrol").click(function () {
        $(".main-btn-ctrol").css("background", "blue");
        $(".main-btn-navigation").css("background", "#f00");
        $(".main-btn-set").css("background", "#f00");
        $(".main-btn-other1").css("background", "#f00");
        $(".main-btn-other2").css("background", "#f00");
        type = selectfrom(0, 1);
        show("#main-content-ctrol", type);

    });
    $(".main-btn-navigation").click(function () {
        $(".main-btn-ctrol").css("background", "#f00");
        $(".main-btn-navigation").css("background", "blue");
        $(".main-btn-set").css("background", "#f00");
        $(".main-btn-other1").css("background", "#f00");
        $(".main-btn-other2").css("background", "#f00");
        hide("#main-content-ctrol", type);
    });
    $(".main-btn-set").click(function () {
        $(".main-btn-ctrol").css("background", "#f00");
        $(".main-btn-navigation").css("background", "#f00");
        $(".main-btn-set").css("background", "blue");
        $(".main-btn-other1").css("background", "#f00");
        $(".main-btn-other2").css("background", "#f00");
        hide("#main-content-ctrol", type);

    });
    $(".main-btn-other1").click(function () {
        $(".main-btn-ctrol").css("background", "#f00");
        $(".main-btn-navigation").css("background", "#f00");
        $(".main-btn-set").css("background", "#f00");
        $(".main-btn-other1").css("background", "blue");
        $(".main-btn-other2").css("background", "#f00");
        hide("#main-content-ctrol", type);
    });
    $(".main-btn-other2").click(function () {
        $(".main-btn-ctrol").css("background", "#f00");
        $(".main-btn-navigation").css("background", "#f00");
        $(".main-btn-set").css("background", "#f00");
        $(".main-btn-other1").css("background", "#f00");
        $(".main-btn-other2").css("background", "blue");
        hide("#main-content-ctrol", type);
    });

    $(".main-ctrol-handle").click(function () {
        if (CurrenControlModel == "handle") {
            return;
        }
        $(".main-ctrol-handle").css("background", "blue");
        $(".main-ctrol-voice").css("background", "#f00");
        $(".main-ctrol-IMU").css("background", "#f00");
        type = selectfrom(0, 1);
        $(".main-ctrol-content-handle").show(1000, function () {
            $("#main-iframe-handle").attr("src", "html/handle_control.html");
            $("#main-iframe-handle").show();
            window.localStorage.handle_ctrol_width = $(".main-ctrol-content-handle").width();
            window.localStorage.handle_ctrol_height = $(".main-ctrol-content-handle").height();
            document.getElementById("main-iframe-handle").style.width = window.localStorage.handle_ctrol_width;
            document.getElementById("main-iframe-handle").style.height = window.localStorage.handle_ctrol_height;
        });
        hide(".main-ctrol-content-voice", type);
        hide(".main-ctrol-content-IMU", type);


        CurrenControlModel = "handle";

    });
    $(".main-ctrol-voice").click(function () {
        if (CurrenControlModel == "voice") {
            return;
        }
        $(".main-ctrol-handle").css("background", "#f00");
        $(".main-ctrol-voice").css("background", "blue");
        $(".main-ctrol-IMU").css("background", "#f00");
        type = selectfrom(0, 1);
        hide(".main-ctrol-content-handle", type);
        show(".main-ctrol-content-voice", type);
        hide(".main-ctrol-content-IMU", type);
        CurrenControlModel = "voice";
    });
    $(".main-ctrol-IMU").click(function () {
        if (CurrenControlModel == "IMU") {
            return;
        }
        $(".main-ctrol-handle").css("background", "#f00");
        $(".main-ctrol-voice").css("background", "#f00");
        $(".main-ctrol-IMU").css("background", "blue");
        type = selectfrom(0, 1);
        hide(".main-ctrol-content-handle", type);
        hide(".main-ctrol-content-voice", type);
        $(".main-ctrol-content-IMU").show(1000, function () {
            $("#main-iframe-IMU").attr("src", "html/imu_control.html");
            $("#main-iframe-IMU").show();
            window.localStorage.IMU_ctrol_width = $(".main-ctrol-content-IMU").width();
            window.localStorage.IMU_ctrol_height = $(".main-ctrol-content-IMU").height();
            document.getElementById("main-iframe-IMU").style.width = window.localStorage.handle_ctrol_width;
            document.getElementById("main-iframe-IMU").style.height = window.localStorage.handle_ctrol_height;
        });


        CurrenControlModel = "IMU";

    });

    document.getElementById("talk1").addEventListener("touchstart", touch, false);
    document.getElementById("talk1").addEventListener("touchend", touch, false);


    function touch(event) {
        switch (event.type) {
            case "touchstart":
                console.log("touchstart");
                $("#talk1").attr("src", "image/talk2.png");
                $("#voicechat").css("display", "block");
                event.preventDefault();
                ISR_start();
                break;
            case "touchend":
                console.log("touchend");
                $("#talk1").attr("src", "image/talk1.png");
                $("#voicechat").css("display", "none");
                ISR_stop();
                break;
            default:
                break;
        }
    }

    function show(id, type) {
        if (type == 0) {
            $(id).show("slow");
        }
        else {
            $(id).fadeIn(3000);
        }

    }
    function hide(id, type) {
        if (type == 0) {
            $(id).hide("slow");
        }
        else {
            $(id).fadeOut("slow");
        }
    }


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
                if (result == '' || result == null) {
                    console.log("no asr result available");
                    $(".text-info").html("no asr result available");
                }
                else {
                    console.log(result);
                    $(".text-info").html(result);

                }
            }

            else {
                console.log('error code : ' + err + ", error description : " + result);
                $(".text-info").html('error code : ' + err + ", error description : " + result);
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
    }, 3000);



});


