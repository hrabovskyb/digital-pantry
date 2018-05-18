const models = require('../models');
const mongoose = require('mongoose');

const pantryItem = models.pantryItems;
const barcode = models.barcode;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}
async function stall(){
	await sleep(5000);
}

const indexPage = (req, res) =>{
	res.render('index', {title: "myPage"});
};


const pantryPage = (req, res) => {
	pantryItem.pantryItemModel.find({}).exec((err,docs)=>{
		
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured during pantry page load'});
		}
		return res.render('pantry',{items: docs});
	});
}

const shoppingListPage = (req, res) => {
	pantryItem.pantryItemModel.find({}).exec((err,docs)=>{
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured during shopping list page load'});
		}
		return res.render('shoppingList',{items: docs});
	});
}

const deletePantryItem = (req, res) => {
	pantryItem.pantryItemModel.deleteOne({_id: req.params._id}).exec((err,docs)=>{
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured during delete page load'});
		}
		return res.json({redirect: '/'});
	});
}

const toggleLowStatus = (req, res) => {
	// let query = {
	// 	_id: convertId(req.params._id),
	// };
	const convertId = mongoose.Types.ObjectId;
	// console.log(req.params._id);
	pantryItem.pantryItemModel.find({_id: req.params._id}).exec((err,docs)=>{
		// console.log(docs._id);
		let query = {_id: convertId(docs[0].id)};
		let lowStatus = true;
		if(docs[0].isLow == true){
			lowStatus = false;
		}

		let data = {
			itemName: docs[0].itemName,
			UOM: docs[0].UOM,
			quantity: docs[0].quantity,
			category: docs[0].category,
			isLow: lowStatus,
		}
		pantryItem.pantryItemModel.updateOne(query,data).exec((err)=>{
			if(err){
				console.log(err);
				return res.status(400).json({error: 'An error occured during delete page load'});
			}
			// console.log(lowStatus);
			return res.send(lowStatus);
		});

		
	});

}

function checkSuperbag(sup, sub) {
    sup.sort();
    sub.sort();
    var i, j;
    // for(i = 0; i<sup.length; i++){
    // 	for(j = 0; j<sub.length; j++){
    // 		if(sub[j]==sup[i]){

    // 		}
    // 	}
    // }
    for (i=0,j=0; i<sup.length && j<sub.length;) {
        if (sup[i] < sub[j]) {
            ++i;
        } else if (sup[i] == sub[j]) {
            ++i; ++j;
        } else {
            // sub[j] not in sup, so sub not subbag
            return false;
        }
    }
    // make sure there are no elements left in sub
    return j == sub.length;
}

const addToPantry = (req,res) => {
	barcode.tempItemModel.find({}).exec((err,docs)=>{
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured during shopping list page load'});
		}
		
		
		for(let i = 0; i < docs.length; i++){
			
			pantryItem.pantryItemModel.find({itemName: docs[i].itemName}).exec((err,results)=>{
				
				if(results.length>0){

					
					// var barcodeData = results[0].barcode;
					// var uniqueBarcodes = [];
					// console.log(results[0].barcode); //pantry
					// console.log(docs[i].barcode); //temp
					// console.log(checkSuperbag(results[0].barcode,docs[i].barcode)); //temp in pantry
					// console.log(checkSuperbag(docs[i].barcode,results[0].barcode)); //pantry in temp
					// if(checkSuperbag(results[0].barcode,docs[i].barcode) == false && checkSuperbag(docs[i].barcode,results[0].barcode) == false){ //pantry not in temp, temp not in pantry
					// 	console.log('pantry not in temp, temp not in pantry');
					// 	barcodeData = barcodeData.concat(docs[i].barcode);

					// } else if(checkSuperbag(docs[i].barcode,results[0].barcode) == true && checkSuperbag(results[0].barcode,docs[i].barcode) == false){ //pantry contained in temp, temp not in pantry 
					// 	console.log('pantry contained in temp, temp not in pantry');
					// 	barcodeData = docs[i].barcode;
					// } else if(checkSuperbag(results[0].barcode,docs[i].barcode) == true && checkSuperbag(docs[i].barcode,results[0].barcode) == false){ //temp in pantry, pantry not in temp [works]
					// 	console.log('temp in pantry, pantry not in temp');
					// 	barcodeData;
					// }

					// barcodeData.forEach(function(element){
					// 	if(uniqueBarcodes.includes(element) == false){
					// 		uniqueBarcodes.push(element);
					// 	}
					// });

					const data = {
						barcode: docs[i].barcode,
						itemName: docs[i].itemName,
						UOM: docs[i].UOM,
						quantity: docs[i].quantity + results[0].quantity,
						category: docs[i].category,
						isLow: false,
					}
					let query = {itemName: docs[i].itemName};
					pantryItem.pantryItemModel.updateOne(query,data).exec((err)=>{
						if(err){
							console.log(err);
							return res.status(400).json({error: 'An error occured during update'});
						}

					});

				} else {
					
					const data = {
						barcode: docs[i].barcode,
						itemName: docs[i].itemName,
						UOM: docs[i].UOM,
						quantity: docs[i].quantity,
						category: docs[i].category,
						isLow: false,
					}
					const newPantryItem = new pantryItem.pantryItemModel(data);

					
					newPantryItem.save((err) => {
						if(err){
							console.log(err);
							return res.status(400).json({error: 'An error occured'});
						}

					});
							
				}
				
			});
		}

		
	});
	setTimeout(function(){
		barcode.tempItemModel.remove({}).exec((err,docs)=>{
			if(err){
				console.log(err);
				return res.status(400).json({error: 'An error occured'});
			}
			return setTimeout(function() {res.json({redirect: '/'})},250);
		});	
	},500);
	
	
	
}

const editPantryItem = (req,res) =>{
	let query = {_id: req.body.itemId};

	const itemData = {
		_id: req.body.itemId,
		itemName: req.body.itemName,
		UOM: req.body.UOM,
		quantity: req.body.quantity,
		category: req.body.category,
	};
	if(req.body.quantity > 0){
		return pantryItem.pantryItemModel.updateOne(query,itemData).exec((err)=>{
			if(err){
				console.log(err);
				return res.status(400).json({error: 'An error occured while editing item info'});
			}
			return res.json({redirect: '/'});
		});
	} else {
		pantryItem.pantryItemModel.deleteOne({_id: req.body.itemId}).exec((err,docs)=>{
			if(err){
				console.log(err);
				return res.status(400).json({error: 'An error occured'});
			}
			return res.json({redirect: '/'});
		});
	}
	
	console.log(itemData);
}

const pantryBarcodeScan = (req,res) =>{
	const convertId = mongoose.Types.ObjectId;
	pantryItem.pantryItemModel.find({barcode: req.params.barcode}).exec((err,docs)=>{
		if(docs.length == 0){
			return res.status(400).json({error: 'This item is not in your pantry'});
		}
		const searchResults = {
			_id: convertId(docs[0].id),
			itemName: docs[0].itemName,
			UOM: docs[0].UOM,
			quantity: docs[0].quantity,
			category: docs[0].category,
			isLow: docs[0].isLow,
		};
		// console.log(searchResults);
		
		return res.send(searchResults);
		// json({redirect: '/'});
		// return searchResults;
		
	})
}



module.exports.pantryPage = pantryPage;
module.exports.indexPage = indexPage;
module.exports.shoppingListPage = shoppingListPage;
module.exports.deletePantryItem = deletePantryItem;
module.exports.toggleLowStatus = toggleLowStatus;
module.exports.addToPantry = addToPantry;
module.exports.editPantryItem = editPantryItem;
module.exports.pantryBarcodeScan = pantryBarcodeScan;