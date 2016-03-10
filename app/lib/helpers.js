
exports.alert= function(message, title, callback) {
    dialog = Ti.UI.createAlertDialog({
        title: title  || 'Alert',
        message: message,
        ok: 'Okay'
    });
    
    if (callback) {
        dialog.addEventListener('click', callback);
    }
    
    dialog.show();
    
    return;
}

exports.popToast = function(toastMsg, parentElement){
    if (!parentElement) parentElement = false;
    Ti.API.info("Toast!")
    //parse toast message
    if (OS_ANDROID){
        var toast = Ti.UI.createNotification({
            message:toastMsg,
            duration: 59
        });
        toast.show();
        //setTimeout(function(){toast.hide()}, 1500);
    }else if(OS_IOS){
        if (!parentElement) return;
        // Notification Lable
        var notify = Ti.UI.createLabel({
            top : '45%',
            left : '20%',
            right : '20%',
            height : 40,
            borderRadius : 15,
            borderWidth : 1,
            zIndex : 6000,
            opacity : 0,
            textAlign : 'center'
        });
        parentElement.add(notify);
         
        NotifyMe(notify, '#333333', toastMsg, '#ffffff');
    }
};


function NotifyMe(notify, bgcolor, title, titlecolor) {
    if(notify){
        notify.text = title;
        notify.color = titlecolor;
        notify.backgroundColor = bgcolor;
        //notify.borderColor = titlecolor;
        notify.animate({
            opacity : 1,
            duration : 1000
        });
        setTimeout(function(e) {
            notify.animate({
                opacity : 0,
                duration : 1000
            });
        }, 3000);
    }
}

exports.NotifyMe = NotifyMe;


function rs2Array(rows){
    var arr = [];
    while (rows.isValidRow()) {
        var obj = {};
        for (var i=0;i<rows.getFieldCount();i++){
            var fieldName = rows.fieldName(i);
            obj[fieldName] = rows.fieldByName(fieldName);
        }
        // tilesmeta[rows.field(0)] = rows.field(1);
        arr.push(obj);
        rows.next();
    }

    return arr;
}

exports.rs2Array = rs2Array;



//converter for checkDistance()
var deg2rad = function(deg) {
  return deg * (Math.PI/180);
};


exports.deg2rad = deg2rad;

//check distance between two points.
var checkDistance = function(start,dest) {
    if (!start.latitude){
        var lat1 = parseFloat(start.lat);
    }else{
        var lat1 = parseFloat(start.latitude);
    }
    if (!start.longitude){
        var lon1 = parseFloat(start.lng);    
    }else{
        var lon1 = parseFloat(start.longitude);
    }

    if (!dest.latitude){
        var lat2 = parseFloat(dest.lat);    
    }else{
        var lat2 = parseFloat(dest.latitude);    
    }
    
    if (!dest.longitude){
        var lon2 = parseFloat(dest.lng);    
    }else{
        var lon2 = parseFloat(dest.longitude);    
    }
    
    
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d * 1000; //Distance in meters...
};
exports.checkDistance = checkDistance;