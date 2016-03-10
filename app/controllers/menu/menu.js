/**
 * #Menu Controller
 * 
 * The menu is a TableView that automatically changes the contentView. The selection
 * can be don by user (click-event) or through the api (select method).
 * Selection causes the menu (drawer leftView) to close automatically.
 */

/**
 * @property {Object} args
 */
var args = arguments[0] || {};
var currentCtrl, selected;


/**
 * TableView Click-listener Callback
 * Triggered when a menu item in the slideout menu is clicked
 * @param {Object} event
 */
function onSelect(e) {
    if (e.row !== selected) {
        selectRow(e.row);
        Alloy.Globals.drawer.toggleLeftWindow();
    }
}

/**
 * Select menu by row
 * @param {controllers.menuRow} Row
 */
function selectRow(_row) {
  if (selected) {
    selected.setActive(false);
  }

  selected = _row;
  selected.setActive(true);
  
  // _.defer(function() {
    var controller = Alloy.createController('./window/' + _row.controller, {
      parent : args.parent
    });

    // Alloy.Globals.menuController.openWindow(controller);
  // });
  openWindow(controller);

}

function openWindow(controller) {
    Ti.API.info("Menu controller OPEN METHOD");
    
    // clean up navigatoin windows;
    Alloy.Globals.navigationWindow = null;
    _.each(Alloy.Globals.navigationWindows, function(win){

        _.isFunction(win.cleanup) && win.cleanup();
    });
    Alloy.Globals.navigationWindows = [];

    // check if there's a controller active
    if (currentCtrl) {

      // remove the view from the centerview
      Alloy.Globals.centerWindow.remove(currentCtrl.getView()); 

      // clean up controller (custom events etc)
      _.isFunction(currentCtrl.cleanup) && currentCtrl.cleanup();

    }

    currentCtrl = controller;

    // add view of controller to centerwindow
    Alloy.Globals.centerWindow.add(currentCtrl.getView());      

    // execute init method of controller (create custom events, do restcalls etc)
    if ( _.isFunction(currentCtrl.init) ) currentCtrl.init(); 

};

function closeWindow() {
    Ti.API.info("Global Controller CLOSE METHOD");

  // check if there's a controller active
    if (currentCtrl) {

        // remove the view from the centerview
        Alloy.Globals.centerWindow.remove(currentCtrl.getView()); 

        // clean up controller (custom events etc)
        _.isFunction(currentCtrl.cleanup) && currentCtrl.cleanup();
        
        currentCtrl = null;
    }

};

/**
 * Select menu by index
 * @param {Number} Index
 */
function select(_index) {
  selectRow(_.first($.menu.getData()).getRows()[_index]);
};

exports.select = select;
exports.openWindow = openWindow;
exports.closeWindow = closeWindow;