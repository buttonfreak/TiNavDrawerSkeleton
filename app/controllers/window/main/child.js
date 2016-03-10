var args = arguments[0] || {};
exports.baseController = "./window/abstract";

function openAnotherWindow(){
	var controller = Alloy.createController('window/main/child/child');
	Alloy.Globals.openWindow(controller);
}

