var userData = {};
var session = require('session');

var isValidated = function(){
	return ( session.getString('validated') == "TRUE");
}

var setUsername = function(value){
    session.setString('username', value);
}

var setPass = function(value){
    session.setString('password', value);
}

var getUsername = function(){
    return session.getString('username');
}

var getPass = function(value){
    return session.getString('password');
}

var doLogout = function(callBack){
    session.setString('credentials', {});
    session.setString('username', '');
    session.setString('password', '');
    session.setString('validated', "");
    session.setObject('currentUser',  {});
    //session.setString('clubID', "");
    callBack();
}

var setCredentials = function (data) {
    session.setObject('credentials', data);
}

var getCredentials = function () {
    return session.getObject('credentials');  
}


var doLogin = function(username, password, callBack, errorCallBack){
	//doLogin stuff  with callback:
	// loginArrowUser
	callBack(true);

}


var loginArrowUser = function(callback){
	var Cloud = require('ti.cloud'), 
		env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development';
		
	Cloud.Users.login({ 
	    login: session.getString('username'),
	    password: Titanium.Utils.md5HexDigest(session.getString('password')),
	    email : 'no@mailsupplied.com'
	}, function(e) {
	    if (e.success) {
	    	Ti.API.info(e);
	       callback(e);
	    } else {
	        Ti.API.info("Login failed. Create user");
	        createArrowUser(callback);
	    }
	});	
}

var createArrowUser = function(callback){
	Cloud.Users.create({
	    username: session.getString('username'),
	    password: Titanium.Utils.md5HexDigest(session.getString('password')),
	    password_confirmation: Titanium.Utils.md5HexDigest(session.getString('password'))
	}, function (e) {
    	if (e.success) {
    		loginArrowUser(callback);
    	} else {
        	Ti.API.info('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
    	}
	});
}

exports.loginArrowUser = loginArrowUser;
exports.getCredentials = getCredentials;
exports.setCredentials = setCredentials;
exports.doLogin = doLogin;
exports.doLogout = doLogout;
exports.setUsername = setUsername;
exports.setPass = setPass;
exports.getUsername = getUsername;
exports.getPass = getPass;
exports.isValidated = isValidated;