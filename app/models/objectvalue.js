exports.definition = {
	config: {
		columns: {
		    "offline_id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "keyValue" : "TEXT",
		    "objectType": "TEXT",
		    "objectValue": "TEXT",
		    "uploaded" : "INTEGER"
		},
		defaults: {},
		adapter: {
			type: "sql",
			idAttribute : "offline_id",
			collection_name: "objectvalues"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			modelType: "objectvalue" ,
			getFields : require('backbone_extends').getFields,
			referenceObjects : [
			]
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
			*/
		   deleteAll : function() {

		        var collection = this;

		        var sql = "DELETE FROM " + collection.config.adapter.collection_name;
		        var db = Ti.Database.open(collection.config.adapter.db_name);
		        db.execute(sql);
		        db.close();

		        collection.trigger('sync');
			},
			getModelByTypeKey:function(typeKey){
				var key = typeKey.key;
				var type = typeKey['type'];

				var collection = this;
				collection.fetch();
				var values = collection.where({keyValue:key});

				if (values.length > 1){
					// possibly more records with same remote ID, search by type:
					var value = _.filter(values, function(row){
						if (row.get('objectType')==type) return row;
					})
					value = value[0];
				}else{

					var value = values[0];
				}
//Ti.API.info('values', JSON.stringify(values));
				return value;
			}, 
			filterTypeKey  : function(typeKey){
				var model = this.getModelByTypeKey(typeKey);
				if (!model) return false;
				return JSON.parse(model.get('objectValue'));

			},
			updateValue : function(typeKey, value){
				var model = this.getModelByTypeKey(typeKey);
				if (!model) return false;
				model.set('objectValue', JSON.stringify(value));
				model.save();
			}

		});

		return Collection;
	}
};