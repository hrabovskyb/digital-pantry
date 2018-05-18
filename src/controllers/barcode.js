const models = require('../models');
const mongoose = require('mongoose');

const barcode = models.barcode;

const addBarcode = (req,res) => {
	if(!req.body.barcode || !req.body.itemName){
		return res.status(400).json({error: 'Both barcode and item name are required!'});
	}

	barcode.barcodeModel.find({name:req.body.barcode}).exec((err,results) =>{
		var count = results.length;
		if(err){
			console.log(err);
		}
		if(count >= 1){
			return res.status(400).json({error: 'This barcode has already been added!'});
		}
	});

	const barcodeData = {
		barcode: req.body.barcode,
		itemName: req.body.itemName,
		UOM: req.body.UOM,
		defaultQuantity: req.body.defaultQuantity,
		category: req.body.category,
	};

	const newBarcode = new barcode.barcodeModel(barcodeData);

	return newBarcode.save((err) => {
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured'});
		}
		return res.json({ redirect: '/barcodes'});
	});
};

const barcodePage = (req, res) => {
	barcode.barcodeModel.find({}).exec((err,docs)=>{
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured during barcode page load'});
		}
		return res.render('barcodes',{items: docs});
	});
}

const addItemsPage = (req, res) => {
	barcode.tempItemModel.find({}).exec((err,docs)=>{
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured during temp item page load'});
		}
		return res.render('addItems',{items: docs});
	});
}

const deleteTempItem = (req, res) => {
	barcode.tempItemModel.deleteOne({_id: req.params._id}).exec((err,docs)=>{
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured during delete page load'});
		}
		return res.json({redirect: '/addItems'});
	});
}
const deleteBarcode = (req, res) => {
	console.log(req.params._id);
	barcode.barcodeModel.deleteOne({_id: req.params._id}).exec((err,docs)=>{
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured during delete barcode'});
		}
		return res.json({redirect: '/barcodes'});
	});
}

const barcodeQuery = (req, res) => {
	
	barcode.barcodeModel.find({barcode: req.params.barcode}).exec((err,docs)=>{
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured during barcode query'});
		}
		if(docs.length > 0){ //if barcode is found in barcode database
			var scannedItem = docs[0].itemName;
			barcode.tempItemModel.find({itemName: docs[0].itemName}).exec((err, results)=>{
				
				if(results.length > 0){ //an item already exists with the same item name that was just scanned
					let query = {itemName: docs[0].itemName};

					var barcodeData = results[0].barcode; //barcodes that are currently in the temporary item list

					// if(results[0].barcode.includes(docs[0].barcode) == false){
					// 	barcodeData.push(docs[0].barcode);
					// }
					
					const data = {
						barcode: results[0].barcode,
						itemName: docs[0].itemName,
						UOM: docs[0].UOM,
						quantity: docs[0].defaultQuantity + results[0].quantity,
						category: docs[0].category,
					}
					return barcode.tempItemModel.updateOne(query,data).exec((err)=>{
						if(err){
							console.log(err);
							return res.status(400).json({error: 'An error occured during delete page load'});
						}
						return res.json({redirect: '/addItems'});
					});
				} else { //Item is not currently in the temp item list

					
					barcode.barcodeModel.find({itemName: scannedItem}).exec((err,results)=>{
						var barcodeData = [];
						if(err){
							console.log(err);
							return res.status(400).json({error: 'An error occured during barcode query'});
						}
						
						for (i = 0; i < results.length; i++){
							barcodeData.push(results[i].barcode);
						}

						const tempItemData = {
							barcode: barcodeData,
							itemName: docs[0].itemName,
							UOM: docs[0].UOM,
							quantity: docs[0].defaultQuantity,
							category: docs[0].category,
						};

						const newTempItem = new barcode.tempItemModel(tempItemData);

						return newTempItem.save((err) => {
							if(err){
								console.log(err);
								return res.status(400).json({error: 'An error occured'});
							}
							return res.json({ redirect: '/addItems'});
						});
					
					});					
				}
			});
			

		} else { //if barcode not found in database

			return res.status(400).json({error: 'Barcode not in database'});
		}
	});
}




module.exports.addBarcode = addBarcode;
module.exports.barcodePage = barcodePage;
module.exports.addItemsPage = addItemsPage;
module.exports.barcodeQuery = barcodeQuery;
module.exports.deleteTempItem = deleteTempItem;
module.exports.deleteBarcode = deleteBarcode;