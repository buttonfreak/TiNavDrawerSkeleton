// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.loginRequired = false; // enable to use login screen (you still need to implement a login procedure at lib/credentials

// All needed for navigation and windows
Alloy.Globals.leftWindow = {};
Alloy.Globals.centerWindow = {};
Alloy.Globals.rightWindow = {};
Alloy.Globals.navigationWindows = [];


Alloy.Globals.openWindow = function(controller){
	var win = controller.getView();

	if (!Alloy.Globals.navigationWindow){
		// there's no navigationWindow (hence; it's a main window), just open it and try to get an instance of the navigationWindow
		Ti.API.info("No navigation window active, previous window: ", Alloy.Globals.navigationWindows[0]);
		
		// get navigation window from controller and keep it in memory
		Alloy.Globals.navigationWindow = controller.getNavigationWindow();
		// if iOS make sure the window has a close button;
		if (OS_IOS){
			var navBarButton = Alloy.createController('menu/iosNavBar', {parentWindow:Alloy.Globals.navigationWindow}).getView();
			win.window.setLeftNavButton(navBarButton);
		}
		if (OS_ANDROID){
			win.window.addEventListener('open', function(e){

				var activity = win.window.activity;

				if (activity.actionBar){
					activity.actionBar.displayHomeAsUp = true;
					activity.actionBar.onHomeIconItemSelected = function() {
						_.isFunction(controller.cleanup) && controller.cleanup();
						Alloy.Globals.navigationWindow = null;
						e.source.close();
					};		
				}
			})
		}
		Alloy.Globals.navigationWindows.push(win);
		win.open();
	}else{
		Alloy.Globals.navigationWindows.push(win);
		Alloy.Globals.navigationWindow.openWindow(win, {swipeBack:false});	
	}
}
