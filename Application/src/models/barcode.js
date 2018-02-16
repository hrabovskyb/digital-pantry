const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let barcodeModel = {};
let tempItemModel = {};

// mongoose.Types.ObjectId is a function that converts
// string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;


const barcodeSchema = new mongoose.Schema({
	barcode:{
		type: String,
		required: true,
		trim: true,	
	},
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
	defaultQuantity:{
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

const tempItemSchema = new mongoose.Schema({
	barcode:{
		type: String,
		required: true,
		trim: true,	
	},
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

barcodeSchema.statics.toAPI = (doc) => ({
	barcode: doc.barcode,
	itemName: doc.itemName,
	UOM: doc.UOM,
	defaultQuantity: doc.defaultQuantity,
	category: doc.category,
});

tempItemSchema.statics.toAPI = (doc) => ({
	barcode: doc.barcode,
	itemName: doc.itemName,
	UOM: doc.UOM,
	defaultQuantity: doc.quantity,
	category: doc.category,
});

barcodeModel = mongoose.model('barcode', barcodeSchema,'Barcodes');
tempItemModel = mongoose.model('Temp Item',tempItemSchema,'Temp Items');

module.exports.barcodeModel = barcodeModel;
module.exports.barcodeSchema = barcodeSchema;
module.exports.tempItemModel = tempItemModel;