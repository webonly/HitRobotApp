
var audioCmdEnum =
    {
        OpenAudio: 0,
        CloseAudio: 1,
        SetISRParam: 2,
        GetISRParam: 3,
        SetTTSParam: 4,
        GetTTSParam: 5,
        StartISR: 6,
        StopISR: 7,
        Audio: 8,
        ISR: 9,
        TTS: 10,
        ServiceState: 11,
        SetWackupParam: 12,
        GetWackupParam: 13,
        AudioCtrl: 14,
        StopTTS: 15,
        GetAllLocalVoice: 16,
    }
var AudioState =
{
    Idle: 0,
    ISR: 1,
    TTS: 2,
    Process: 3,
}
var RequestData = {
    cmd: null,
    isrParams: null,
    ttsParams: null,
    wakeupParams: null,
}

var isrParams_val = {
    automode: null,
    accent: null,
    language: null,
}
var EngineType_val =
{
    cloud: 0,//在线引擎
    local: 1,//离线引擎
}
var ttsParams_val = {
    voice_name: "xiaoyan",
    engine_type:0,
    pitch: 50,
    speed: 50,
    volume: 60,
    text: null,
}

var wakeupParams_val = {
    isWakeup: false,
}
var localTTS;

var language = {
    zh_cn: "zh_cn",
    en_us: "en_us",
}

var area = {
    mandarin: "mandarin",//普通话
    cantonese: "cantonese",//粤语
    lmz: "lmz",//四川话
    henanese: "henanese",//河南话
    dongbeiese: "dongbeiese",
}

var speaker = {
    xiaoyan: "xiaoyan",//小燕_青年女声_播报，音色纯正_普通话
    aisxyan: "aisxyan",//艳萍_青年女声_播报，音色纯正_普通话
    xiaoyu: "xiaoyu",//小宇_青年男声_播报，音色纯正_普通话
    xiaofeng: "xiaofeng",//宇峰_青年男声_播报，音色纯正_普通话
    xiaoqi: "xiaoqi",//小琪_青年女声_播报，音色甜美_普通话
    catherine: "catherine",//凯瑟琳_青年女声_播报，音色纯正_美式英语
    aisnn: "aisnn",//楠楠_童声_播报_普通话
    mary: "mary",//玛丽_青年女声_播报_美式英语
    dalong: "dalong",//大龙_青年男声_播报_粤语
    xiaomei: "xiaomei",//小梅_青年女声_播报_粤语
    aisxlin: "aisxlin",//晓琳_青年女声_播报_台湾普通话
    xiaoqian: "xiaoqian",//晓倩_青年女声_播报_东北话
    aisxrong: "aisxrong",//小蓉_青年女声_播报_四川话
    xiaokun: "xiaokun",//小坤_青年男声_播报_河南话
    aisxqiang: "aisxqiang",//小强_青年男声_播报_湖南话
    aisxying: "aisxying",//小英_青年女声_播报_陕西话
    henry: "henry",//亨利_青年男声_播报_美式英语
    aisjiuxu: "aisjiuxu",//许久_青年男声_播报_普通话
    aisxping: "aisxping",//小萍_青年女声_播报_普通话
    aisxiaobin: "aisxiaobin",//小兵_青年男声_播报_普通话
    laoma: "laoma",//老马_中年男声_播报_普通话
    aisxrong: "aisxrong",//晓蓉_青年女声_播报_普通话
    wangru: "wangru",//王茹_青年女声_播报_普通话
    aisbabyxu: "aisbabyxu",//许小宝_童声_播报_普通话
    aisjinger: "aisjinger",//小婧_青年女声_播报_普通话
    yefang: "yefang",//叶芳_青年女声_故事_普通话
    aisduck: "aisduck",//唐老鸭_卡通人物_播报_普通话
    aisxmeng: "aisxmeng",//小梦 _青年女声_播报_普通话
    aismengchun: "aismengchun",//孟春_青年女声_故事_普通话
    ziqi: "ziqi",//紫琪_青年女声_播报_普通话
    aisduoxu: "aisduoxu",//许多_青年男声_播报_普通话
    aistom: "aistom",//Tom_青年男声_播报_美式英语
    aisjohn: "aisjohn",//John_青年男声_播报_美式英语
    aisxxin: "aisxxin",//蜡笔小新_童声_播报_普通话
}
var ISR_URL = "ws://127.0.0.1:9001";
var Socket_ISR = new WebSocket(ISR_URL);


Socket_ISR.onopen = function () {
    cmdSetISR(language.zh_cn, area.mandarin, true);


    GetLocalTTs();

}
var voiceCity1=false;
var voiceCity2=false;
Socket_ISR.onmessage = function (e) {
    var audioMsg = JSON.parse(e.data);

    switch (audioMsg.cmd) {
        case audioCmdEnum.ISR:
            var question = audioMsg.isrData.question;
            var anser = audioMsg.isrData.answer;
            if (voiceCity1) {
                $("#startCity").val(question.substring(0,question.indexOf("。")));
                    StopTTSspeak();
                    voiceCity1=false;
            }
            if (voiceCity2) {
                $("#endCity").val(question.substring(0,question.indexOf("。")));
                 console.log("endcity");
                  StopTTSspeak();
                 voiceCity2=false;

            }
            break;
        case audioCmdEnum.GetTTSParam:
            break;
        case audioCmdEnum.GetISRParam:
            break;
        case audioCmdEnum.ServiceState:
            switch (audioMsg.serviceState.state) {
                case AudioState.Idle:
                   
                  
                    break;
                case AudioState.ISR:
                  
                 
                    break;
                case AudioState.TTS:
               
                 

                    break;
                case AudioState.Process:
              
                   
                    break;
                default:
                    break;
            }
            break;

        case audioCmdEnum.GetAllLocalVoice:
        localTTS=audioMsg;
            console.log(audioMsg.localvoices[audioMsg.localvoices.length - 1].Name);
            console.log(audioMsg.localvoices[audioMsg.localvoices.length - 2].Name);
            cmdSetTTS(1,audioMsg.localvoices[audioMsg.localvoices.length - 1].Name);
            break;

        case audioCmdEnum.GetWackupParam:
            if (audioMsg.wackupParams.isWackup) {
                //唤醒打开
            }
            else {
                //唤醒关闭
            }
            break;
        case audioCmdEnum.AudioCtrl:
            //msg.audioCtrl.cmd  命令
            //msg.audioCtrl.action  动作
            //msg.audioCtrl.value  值
            break;
        default:
            break;
    }
}



function cmdSetISR(language, area, continues) {
    RequestData.cmd = audioCmdEnum.SetISRParam;
    isrParams_val.language = language;
    isrParams_val.accent = area;
    isrParams_val.automode = continues;
    RequestData.isrParams = isrParams_val;
    Socket_ISR.send(JSON.stringify(RequestData));
}
function cmdSetTTS(type, speaker) {

    console.log(type,speaker);
    RequestData.cmd = audioCmdEnum.SetTTSParam;
    ttsParams_val.voice_name = speaker;
    ttsParams_val.engine_type = type;
    if (type == EngineType_val.cloud) {
        ttsParams_val.pitch = 50;
        ttsParams_val.speed = 50;
        ttsParams_val.volume = 60;
  
    }
    else if (type == EngineType_val.local) {
       ttsParams_val.pitch = 50;
      ttsParams_val.speed = 0;
       ttsParams_val.volume = 100;


    }
      RequestData.ttsParams = ttsParams_val;
    Socket_ISR.send(JSON.stringify(RequestData));
 

}
function cmdTTSspeak(text) {
    RequestData.cmd = audioCmdEnum.TTS;
    ttsParams_val.text = text;
    RequestData.ttsParams = ttsParams_val;
    Socket_ISR.send(JSON.stringify(RequestData));
}



function cmdISRstart() {
    RequestData.cmd = audioCmdEnum.StartISR;
    isrParams_val.automode = false;
    RequestData.isrParams = isrParams_val;
    Socket_ISR.send(JSON.stringify(RequestData));
}

function cmdISRend() {
    RequestData.cmd = audioCmdEnum.StopISR;
    isrParams_val.automode = false;

    RequestData.isrParams = isrParams_val;
    Socket_ISR.send(JSON.stringify(RequestData));
}

function ISR_WakeUp() {
    RequestData.cmd = audioCmdEnum.SetWackupParam;
    wakeupParams_val.isWakeup = true;

    RequestData.wakeupParams = wakeupParams_val;
    RequestData.isrParams = null;
    RequestData.ttsParams = null;
    Socket_ISR.send(JSON.stringify(RequestData));

    console.log(JSON.stringify(RequestData));
}
function ISR_unWakeUp() {
    RequestData.cmd = audioCmdEnum.SetWackupParam;
    wakeupParams_val.isWakeup = false;

    RequestData.wakeupParams = wakeupParams_val;
    RequestData.isrParams = null;
    RequestData.ttsParams = null;
    Socket_ISR.send(JSON.stringify(RequestData));
    console.log(RequestData);

}

function GetLocalTTs() {
    RequestData.cmd = audioCmdEnum.GetAllLocalVoice;
    Socket_ISR.send(JSON.stringify(RequestData));
}

function StopTTSspeak() {
    RequestData.cmd = audioCmdEnum.StopTTS;
    Socket_ISR.send(JSON.stringify(RequestData));
}