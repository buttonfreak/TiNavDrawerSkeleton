/**
 * Ti.App.Properties Abstraction for keeping session values. Needs to be refactored to web.localStorage to be used across websites and Titanium projects.
 * @param {[type]} key   [description]
 * @param {[type]} value [description]
 */
var setString = function(key, value){
	Titanium.App.Properties.setString(key, value);
}

var getString = function(key){
	return Titanium.App.Properties.getString(key);	
}

var setInt = function(key, value){
	Titanium.App.Properties.setInt(key, parseInt(value));
}

var getInt = function(key){
	return Titanium.App.Properties.getInt(key);	
}

var setBool = function(key, value){
	Titanium.App.Properties.setBool(key, value);
}

var getBool = function(key){
	return Titanium.App.Properties.getBool(key);	
}

var setList = function(key, value){
	Titanium.App.Properties.setList(key, value);
}

var getList = function(key){
	return Titanium.App.Properties.getList(key);	
}

var setObject = function(key, value){
	Titanium.App.Properties.setObject(key, value);
}

var getObject = function(key){
	return Titanium.App.Properties.getObject(key);	
}




exports.setString = setString;
exports.getString = getString;
exports.setInt = setInt;
exports.getInt = getInt;
exports.setBool = setBool;
exports.getBool = getBool;
exports.setList = setList;
exports.getList = getList;
exports.setObject = setObject;
exports.getObject = getObject;