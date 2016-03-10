// setup global stuff;

Alloy.Globals.leftWindow = $.leftWindow;
Alloy.Globals.centerWindow = $.centerWindow;
Alloy.Globals.drawer = $.drawer;

	// fullscreen:false, 
	// statusBarStyle : Titanium.UI.iPhone.StatusBar.GREY,
    
function toggle(e) {
    var fn = 'toggleLeftWindow';
    $.drawer[fn]();
}

function setInitView(controller){
	if (Alloy.Globals.menuController){
		Alloy.Globals.menuController.openWindow(controller);	
	}
	
}

function setMenu(controller, callBack){
	$.leftWindow.add(controller.getView());
	Alloy.Globals.menuController = controller;
	callBack();
}

exports.setInitView = setInitView;
exports.setMenu = setMenu;

