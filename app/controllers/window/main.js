var args = arguments[0] || {};
exports.baseController = "./window/abstract";

function test(){
	var controller = Alloy.createController('window/main/child');
	Alloy.Globals.openWindow(controller);
}