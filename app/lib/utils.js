exports.osname = Ti.Platform.osname;
exports.version = Ti.Platform.version;
exports.height = Ti.Platform.displayCaps.platformHeight;
exports.width = Ti.Platform.displayCaps.platformWidth;
exports.isTablet = Ti.Platform.osname === 'ipad' || (Ti.Platform.osname === 'android' && (exports.width > 899 || exports.height > 899));

function debugMsg(variable){
	if (variable instanceof Array){
		for(var i=0;i<variable.length;i++){
			debugMsg(variable[i]);
		}
	}else if (variable instanceof Object){
		for(i in variable){
			Ti.API.info("ladida2");
			debugMsg(i + ":" + debugMsg(variable[i]));
		}
	}else{
		Ti.API.info(variable);
	}
}



exports.debugMsg = debugMsg;
exports.debug = debugMsg;
