var args = arguments[0] || {};

/**
 * Cleans up the controller
 *
 * http://www.tidev.io/2014/09/18/cleaning-up-alloy-controllers/
 */
function cleanup() {
	Ti.API.info("CLEANUP CALLED");
	$.off();
}

/**
 * Initializes the controller
 */
function init() {
	Ti.API.info("INIT CALLED");
}

function getWindow(){
	return $.window;
}

function getNavigationWindow(){
	return $.navigation;
}

// PUBLIC
exports.cleanup = cleanup;
exports.init = init;
exports.getWindow = getWindow;
exports.getNavigationWindow = getNavigationWindow;