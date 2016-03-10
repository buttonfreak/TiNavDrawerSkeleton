var args = arguments[0] || {};
var parentWindow = args.parentWindow;

function closeWindow(){
	Alloy.Globals.navigationWindow = null;
	parentWindow.close();
}