var _ = require('alloy/underscore')._;

var getTypeKeyFromCall = function(getParams){
    if (getParams){
        var reqVars = getParams.toString().split('?');
        if (reqVars.length > 1){
            return {
                'key' : reqVars.pop(),
                'type' : reqVars.join("/")
            };
        }else{
            var apiCall = getParams.toString().split('/');
            Ti.API.info('apiCall', apiCall.length);
            if (apiCall.length < 2){
                var keyValue = '0000-0000';
            }else{
                var keyValue = apiCall.pop();    
                if (keyValue.toString().length < 30){
                    // assume it's not a real ID, this token should be appended to type
                    var addType = keyValue;
                    var keyValue = apiCall.pop();
                    apiCall.push(addType);
                }                                
            }
            
        }
        if (apiCall.length >= 2){
            // assume several type values, ID is last item on array;
            return {
                'key' : keyValue,
                'type' : apiCall.join("/")
            };
        }
        return {
            'key' : keyValue,
            'type' : apiCall[0]
        };
    }else{
        return {};
    }
    
}

var getCall = function(getParams, callBack, errorCallBack, waiterMethod, unWaiterMethod){
        if (!errorCallBack) errorCallBack = function(){};
        if (!callBack) callBack = function(){};

        var typeKey = getTypeKeyFromCall(getParams);
        if (require('globals').debug) Ti.API.info('typeKey', JSON.stringify(typeKey));

        // check for connection;
        var doOnline = Ti.Network.online;
        if (require('globals').forceOffline()) doOnline = false;
        if (doOnline){
            // fetch from backend, store locally and call callback with fresh database
            
            var storeCallBack = function(responseJSON){
                saveToModel(responseJSON, typeKey);
                callBack(responseJSON);
            }
            _getCall(getParams, storeCallBack, errorCallBack, waiterMethod, unWaiterMethod);

        }else{
            // fetch from local database and call callback wit data from database
            var collection = Alloy.createCollection('objectvalue');
            var values = collection.filterTypeKey(typeKey);
            Ti.API.info(typeKey, JSON.stringify(values));
            if (!values){
                callBack(false);
                //alert(L('no_data_offline'));
            }else{
                callBack(values);    
            }
            
        }     
 
}

var saveToModel = function(values, typeKey){
    var collection = Alloy.createCollection('objectvalue');
    var model = collection.model;
    var existingModel = collection.filterTypeKey(typeKey);
    
    if (!existingModel){

        // create model with values
Ti.API.info(JSON.stringify({ keyValue:typeKey.key, objectType:typeKey['type'], objectValue : JSON.stringify(values) }));
        var objectValueModel = Alloy.createModel('objectvalue', { keyValue:typeKey.key, objectType:typeKey['type'], objectValue : JSON.stringify(values) } );
        objectValueModel.save();
    }else{
        // update values!
        collection.updateValue(typeKey, values );

    }

    //Ti.API.info("SAVE VALUES", JSON.stringify(values));
    //Ti.API.info("For TypeKey", JSON.stringify(typeKey));
}

var _getCall = function(getParams, callBack, errorCallBack, waiterMethod, unWaiterMethod){
    var credentials = require('credentials');
    var username = credentials.getUsername();
    var password = credentials.getPass();
    var csharpClubID = credentials.getClubID();


    var rpcURI = require('globals').RPCUri +  require('globals').apiPath  + getParams;
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            try{
                var responseJSON = this.responseText;
                responseJSON = JSON.parse(responseJSON);
                callBack(responseJSON);
            }catch(e){
                errorCallBack(e);
                Ti.API.info("ERROR!!");
                Ti.API.info(e);
                Ti.API.debug(e);
            }
        },
        onerror: function(e) {
            //var responseJSON = this.responseText;
            //this.status
            Ti.API.info("ERROR!!");
            Ti.API.info(e.error + '||' + this.status + '||' + this.responseText);
            // Ti.API.debug(e.error + '||' + this.status + '||' + this.responseText);
            try{
                responseJSON = JSON.parse(responseJSON); 
            }catch(err){
                errorCallBack('responseJSON', this.status);    
            }
            
        },
        onreadystatechange  : function(){

            if (this.readyState == 4){
                if (unWaiterMethod) unWaiterMethod();
            }else{
                if (waiterMethod) waiterMethod();
            }  
       
            //console.log(this.readyState);
        },
        timeout : 10000
    });
    

    if (require('globals').debug) {
        //Ti.API.info("C#S " + csharpClubID + ":" + username + ":" +password);
        Ti.API.info( rpcURI )
    }
  
    xhr.open("GET", rpcURI );
    xhr.setRequestHeader("Authorization", "C#S " + csharpClubID + ":" + username + ":" +password);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send();    
}



var postCall = function(getParams, data, callBack, errorCallBack){
        if (!errorCallBack) errorCallBack = function(){};
        if (!callBack) callBack = function(){};
        var credentials = require('credentials');

        var username = credentials.getUsername();
        var password = credentials.getPass();
        var csharpClubID = credentials.getClubID();
        //Titanium.App.Properties.getString('csharpClubID');

        var rpcURI = require('globals').RPCUri +  require('globals').apiPath  + getParams;
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                try{
                    var responseJSON = this.responseText;
                    responseJSON = JSON.parse(responseJSON);
                    callBack(responseJSON);
                }catch(e){
                    errorCallBack(e);
                    Ti.API.info("ERROR!!");
                    Ti.API.info(e);
                    Ti.API.debug(e);
                }
            },
            onerror: function(e) {
                var responseJSON = this.responseText;
                Ti.API.info("ERROR!!");
                Ti.API.info(e.error + '||' + this.status + '||' + this.responseText);
                Ti.API.debug(e.error + '||' + this.status + '||' + this.responseText);
                responseJSON = JSON.parse(responseJSON);
                errorCallBack(responseJSON);
            },
            timeout:10000
        });
        Ti.API.info("C#S " + csharpClubID + ":" + username + ":" +password);
        
        if (require('globals').debug) {
            Ti.API.info( rpcURI )
        }
        xhr.open("POST", rpcURI );

        xhr.setRequestHeader("Authorization", "C#S " + csharpClubID + ":" + username + ":" +password);
        //xhr.setRequestHeader("Content-Type", "application/json");
        //xhr.setRequestHeader("enctype", "multipart/form-data");
        //xhr.setRequestHeader("Content-Type", "text/json");

        xhr.send(data);
}

var getBinary = function(getParams, callBack, errorCallBack){
        if (!errorCallBack) errorCallBack = function(){};
        if (!callBack) callBack = function(){};
        var credentials = require('credentials');

        var username = credentials.getUsername();
        var password = credentials.getPass();
        var csharpClubID = credentials.getClubID();
        //Titanium.App.Properties.getString('csharpClubID');

        var rpcURI = require('globals').RPCUri +  require('globals').apiPath  + getParams;
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                try{
                    callBack(this.responseData);
                }catch(e){
                    //errorCallBack(e);
                    Ti.API.debug(e)
                }
            },
            onerror: function(e) {
                var responseJSON = this.responseText;
                try{
                    responseJSON = JSON.parse(responseJSON);
                    errorCallBack(responseJSON);
                }catch(e){
                    Ti.API.info(e.error + '||' + this.status + '||' + this.responseText);
                }
            },
            timeout:5000
        });
        Ti.API.info("C#S " + csharpClubID + ":" + username + ":" +password);
        xhr.setRequestHeader("Authorization", "C#S " + csharpClubID + ":" + username + ":" +password);
        //xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("accept-encoding", "identity");

        // if (require('globals').debug) {
            Ti.API.info( rpcURI )
        // }
        xhr.open("GET", rpcURI );
        xhr.send();
}

function serialize(data){
    var str = '';
    for (token in data){
        str = token+'='+data[token] + '&';
    }
    return str;
}
exports._getCall = _getCall;
exports.GET = getCall;
exports.POST = postCall;
exports.getBinary = getBinary;
exports.getTypeKey = getTypeKeyFromCall;