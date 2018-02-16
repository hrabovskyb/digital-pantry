const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let pantryItemModel = {};

// mongoose.Types.ObjectId is a function that converts
// string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;


const pantryItemSchema = new mongoose.Schema({
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
	isLow:{
		type: Boolean,
		default: false,
	}

});

pantryItemSchema.statics.toAPI = (doc) => ({
	itemName: doc.itemName,
	UOM: doc.UOM,
	quantity: doc.quantity,
	category: doc.category,
});

pantryItemModel = mongoose.model('Pantry Item', pantryItemSchema,'Pantry Items');

module.exports.pantryItemModel = pantryItemModel;
module.exports.pantryItemSchema = pantryItemSchema;