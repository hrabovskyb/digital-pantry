const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let shoppingListItemModel = {};

const convertId = mongoose.Types.ObjectId;


const shoppingListItemSchema = new mongoose.Schema({
	itemName:{
		type: String,
		required: true,
		trim: true,
	},
	UOM:{
		type: String,
		required: true,
		trim: true,

	},
	quantity:{
		type: Number,
		required: true,
		min: 1,
	},
	category:{
		type: String,
		required: true,
		trim: true,
	},
	
});

shoppingListItemSchema.statics.toAPI = (doc) => ({
	itemName: doc.itemName,
	UOM: doc.UOM,
	quantity: doc.quantity,
	category: doc.category,
	location: doc.location,
});

shoppingListItemModel = mongoose.model('Shopping List', shoppingListItemSchema,'Grocery List');

module.exports.shoppingListItemModel = shoppingListItemModel;
module.exports.shoppingListItemSchema = shoppingListItemSchema;