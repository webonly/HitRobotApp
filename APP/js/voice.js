/*!
 * HRG-Voice v1.1.1 
 * Copyright 2015-2016 HIT ROBOT GROUP
 * Date: 2016-6-23 17:33:30 
 *
 * 调用说明：
 * ISR_WakeUp()       开启语音唤醒
 * ISR_unWakeUp()     关闭语音唤醒
 * cmdSetISR(language, area, continues)     设置语音识别语种和地区，language参数zh_cn 中文，en_us 英文; area参数 mandarin 普通话，cantonese 粤语，lmz 四川话，henanese 河南话，dongbeiese 东北话
 * GetLocalTTs()                            获取本机所有离线发音人
 * cmdSetTTS(type, speaker)                 设置语音合成发音人 
 * cmdTTSspeak(text)                        语音合成  text参数 语音合成内容
 * cmdISRstart()      开启语音识别功能
 * cmdISRend()        结束语音识别，进行语音合成             
 * StopTTSspeak()     停止语音播报
 */
var isOnSpeaking

function cmdSetISR(a, b, c) {
	RequestData.cmd = audioCmdEnum.SetISRParam, isrParams_val.language = a, isrParams_val.accent = b, isrParams_val.automode = c, RequestData.isrParams = isrParams_val, Socket_ISR.send(JSON.stringify(RequestData))
}

function cmdSetTTS(a, b) {
	RequestData.cmd = audioCmdEnum.SetTTSParam, ttsParams_val.voice_name = b, ttsParams_val.engine_type = a, a == EngineType_val.cloud ? (ttsParams_val.pitch = 50, ttsParams_val.speed = 50, ttsParams_val.volume = 60) : a == EngineType_val.local && (ttsParams_val.pitch = 50, ttsParams_val.speed = 0, ttsParams_val.volume = 100), RequestData.ttsParams = ttsParams_val, Socket_ISR.send(JSON.stringify(RequestData))
}
var isOnSpeak = true;

function cmdTTSspeak(a) {
	if (isOnSpeak) {
		try {
			RequestData.cmd = audioCmdEnum.TTS, ttsParams_val.text = a, RequestData.ttsParams = ttsParams_val, Socket_ISR.send(JSON.stringify(RequestData))
		} catch (e) {}
	}
}

function cmdISRstart() {
	ISR_unWakeUp(), RequestData.cmd = audioCmdEnum.StartISR, isrParams_val.automode = !1, RequestData.isrParams = isrParams_val, Socket_ISR.send(JSON.stringify(RequestData))
}

function cmdISRend() {
	ISR_WakeUp(), RequestData.cmd = audioCmdEnum.StopISR, isrParams_val.automode = !1, RequestData.isrParams = isrParams_val, Socket_ISR.send(JSON.stringify(RequestData))
}

function ISR_WakeUp() {
	$("#voice-state1").show(), $("#voice-state2").hide(), $("#voice-state3").hide(), $("#voice-state4").hide(), RequestData.cmd = audioCmdEnum.SetWackupParam, wakeupParams_val.isWakeup = !0, RequestData.wakeupParams = wakeupParams_val, RequestData.isrParams = null, RequestData.ttsParams = null, Socket_ISR.send(JSON.stringify(RequestData))
}

function ISR_unWakeUp() {
	RequestData.cmd = audioCmdEnum.SetWackupParam, wakeupParams_val.isWakeup = !1, RequestData.wakeupParams = wakeupParams_val, RequestData.isrParams = null, RequestData.ttsParams = null, Socket_ISR.send(JSON.stringify(RequestData))
}

function GetLocalTTs() {
	RequestData.cmd = audioCmdEnum.GetAllLocalVoice, Socket_ISR.send(JSON.stringify(RequestData))
}

function StopTTSspeak() {
	try {
		RequestData.cmd = audioCmdEnum.StopTTS, Socket_ISR.send(JSON.stringify(RequestData))
	} catch (e) {}
}
var Socket_ISR = new WebSocket("ws://127.0.0.1:9001"),
	audioCmdEnum = {
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
		getIsEnd: 17
	},
	AudioState = {
		Idle: 0,
		ISR: 1,
		TTS: 2,
		Process: 3
	},
	RequestData = {
		cmd: null,
		isrParams: null,
		ttsParams: null,
		wakeupParams: null
	},
	isrParams_val = {
		automode: null,
		accent: null,
		language: null
	},
	EngineType_val = {
		cloud: 0,
		local: 1
	},
	ttsParams_val = {
		voice_name: "xiaoyan",
		engine_type: 0,
		pitch: 50,
		speed: 50,
		volume: 60,
		text: null
	},
	wakeupParams_val = {
		isWakeup: !1
	},
	localTTS, language = {
		zh_cn: "zh_cn",
		en_us: "en_us"
	},
	area = {
		mandarin: "mandarin",
		cantonese: "cantonese",
		lmz: "lmz",
		henanese: "henanese",
		dongbeiese: "dongbeiese"
	},
	speaker = {
		xiaoyan: "xiaoyan", //小燕_青年女声_播报，音色纯正_普通话
		aisxyan: "aisxyan", //艳萍_青年女声_播报，音色纯正_普通话
		xiaoyu: "xiaoyu", //小宇_青年男声_播报，音色纯正_普通话
		xiaofeng: "xiaofeng", //宇峰_青年男声_播报，音色纯正_普通话
		xiaoqi: "xiaoqi", //小琪_青年女声_播报，音色甜美_普通话
		aisnn: "aisnn", //楠楠_童声_播报_普通话
		dalong: "dalong", //大龙_青年男声_播报_粤语
		xiaomei: "xiaomei", //小梅_青年女声_播报_粤语
		aisxlin: "aisxlin", //晓琳_青年女声_播报_台湾普通话
		xiaoqian: "xiaoqian", //晓倩_青年女声_播报_东北话
		aisxrong: "aisxrong", //小蓉_青年女声_播报_四川话 

		xiaokun: "xiaokun", //小坤_青年男声_播报_河南话
		aisxqiang: "aisxqiang", //小强_青年男声_播报_湖南话
		aisxying: "aisxying", //小英_青年女声_播报_陕西话
		aisjiuxu: "aisjiuxu", //许久_青年男声_播报_普通话
		aisxping: "aisxping", //小萍_青年女声_播报_普通话
		aisxiaobin: "aisxiaobin", //小兵_青年男声_播报_普通话
		laoma: "laoma", //老马_中年男声_播报_普通话
		aisxrong: "aisxrong", //晓蓉_青年女声_播报_普通话
		wangru: "wangru", //王茹_青年女声_播报_普通话
		aisbabyxu: "aisbabyxu", //许小宝_童声_播报_普通话

		aisjinger: "aisjinger", //小婧_青年女声_播报_普通话
		yefang: "yefang", //叶芳_青年女声_故事_普通话
		aisduck: "aisduck", //唐老鸭_卡通人物_播报_普通话
		aisxmeng: "aisxmeng", //小梦 _青年女声_播报_普通话
		aismengchun: "aismengchun", //孟春_青年女声_故事_普通话
		ziqi: "ziqi", //紫琪_青年女声_播报_普通话
		aisduoxu: "aisduoxu", //许多_青年男声_播报_普通话
		aisxxin: "aisxxin", //蜡笔小新_童声_播报_普通话
		jiajia: "jiajia", //liang
		xiaoxue: "xiaoxue" //xiaoxue
	};

var isCanBack = false;
var isCanLoop = false;
Socket_ISR.onerror = function(e) {
	console.log('websocked error');
}
Socket_ISR.onopen = function() {
	ISR_WakeUp(), cmdSetISR(language.zh_cn, area.mandarin, !0), GetLocalTTs()
}, Socket_ISR.onmessage = function(a) {
	var b = JSON.parse(a.data);
	switch (b.cmd) {
		case audioCmdEnum.ISR:
			var c = b.isrData.question,
				d = b.isrData.answer;
			$(".voice-cont").append("<p class='voice-robot'>" + c + "</p><p class='voice-human'>" + d + "</p>"), $(".voice-cont").scrollTop($(".voice-cont")[0].scrollHeight);
			break;
		case audioCmdEnum.GetTTSParam:
			break;
		case audioCmdEnum.GetISRParam:
			break;
		case audioCmdEnum.ServiceState:
			switch (b.serviceState.state) {
				case AudioState.Idle:
					$("#voice-state1").show(), $("#voice-state2").hide(), $("#voice-state3").hide(), $("#voice-state4").hide(), $("#homevoice-icon").html("&#xe62c;"), $("#homevoice-name").html("\u7b49\u5f85\u5524\u9192"), isOnSpeak = true;
					break;
				case AudioState.ISR:
					$("#voice-state1").hide(), $("#voice-state2").show(), $("#voice-state3").hide(), $("#voice-state4").hide(), $("#homevoice-icon").html("&#xe62b;"), $("#homevoice-name").html("\u8bed\u97f3\u8bc6\u522b\u4e2d"), isOnSpeak = false;
					break;
				case AudioState.TTS:
					$("#voice-state3").hide(), $("#voice-state1").hide(), $("#voice-state2").hide(), $("#voice-state4").show(), $("#homevoice-icon").html("&#xe62a;"), $("#homevoice-name").html("\u8bed\u97f3\u5408\u6210\u4e2d");
					break;
				case AudioState.Process:
					$("#voice-state3").show(), $("#voice-state1").hide(), $("#voice-state2").hide(), $("#voice-state4").hide(), $("#homevoice-icon").html("&#xe629;"), $("#homevoice-name").html("\u8bed\u4e49\u89e3\u6790\u4e2d"), $("#voice-mode1").css("backgroundImage", "url(image/mode3.png)")
			}
			break;
		case audioCmdEnum.GetAllLocalVoice:
			localTTS = b, cmdSetTTS(1, b.localvoices[b.localvoices.length - 1].Name);
			break;
		case b.GetWackupParam:
			b.wackupParams.isWackup;
			break;
		case audioCmdEnum.getIsEnd: //说话结束回调
			$("#voice-mode1").css("backgroundImage", "url(image/mode1.png)");
			isOnSpeak = true;
			//自动巡航
			if (!isVideoOpen) {
				if (autoMoveState && moveResult==1) {
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
			}
			break;
		case audioCmdEnum.AudioCtrl:
			switch (b.audioCtrl.action) {
				case "move":
					mapController(parseInt(b.audioCtrl.value));
					break;
				case "gohome":
					goBack()
			}
	}
}, $("#homevoice-icon").html("&#xe62c;"), $("#homevoice-name").html("\u7b49\u5f85\u5524\u9192"), $("#voice-state1").show(), $("#voice-state2").hide(), $("#voice-state3").hide(), $("#voice-state4").hide();
$("#searchTrain-btn").click(function() {
	cmdSetISR(language.zh_cn, area.mandarin, false);
});
$("#searchTrain-btn-close").click(function() {
	cmdSetISR(language.zh_cn, area.mandarin, true);
});