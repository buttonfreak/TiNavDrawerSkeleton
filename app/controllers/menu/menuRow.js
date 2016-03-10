/**
 * MenuRow Controller
 *
 * represents a menu item
 *
 * @class controllers.menuRow
 */

var args = arguments[0] || {};

/**
 * Initializes the row controller
 */
function init() {

    // set title
    $.menuRow.title = args.title;

    // bind info about associated controller
    $.menuRow.controller = args.controller;
}

/**
 * Sets the row (in-)active
 * Called by menu
 * @param {Boolean} active
 */
$.menuRow.setActive = function(_active) {
    $.menuRow.setBackgroundColor( _active ? "#aa333333" : "transparent" );
};

init();
