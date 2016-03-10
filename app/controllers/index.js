// determine if any kind of login is required;
if (Alloy.Globals.loginRequired){

}else{
	var drawer = Alloy.createController('drawer');

	drawer.setMenu(Alloy.createController('menu/menu'), function (){
		drawer.setInitView(Alloy.createController('window/main'));		
	});

	var view = drawer.getView();
	view.open();
}
