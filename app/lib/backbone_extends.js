exports.getFields = function(){
	return _.collect(this.config.columns, function(column, key){
		return key;
	});
}
