const models = require('../models');
const mongoose = require('mongoose');

const pantryItem = models.pantryItems;
const barcode = models.barcode;


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
		return pantryItem.pantryItemModel.updateOne(query,data).exec((err)=>{
			if(err){
				console.log(err);
				return res.status(400).json({error: 'An error occured during delete page load'});
			}
			return res.json({redirect: '/'});
		});

		
	});

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
					
					const data = {
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
							return res.status(400).json({error: 'An error occured during delete page load'});
						}
					});
				} else {
					
					const data = {
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



module.exports.pantryPage = pantryPage;
module.exports.indexPage = indexPage;
module.exports.shoppingListPage = shoppingListPage;
module.exports.deletePantryItem = deletePantryItem;
module.exports.toggleLowStatus = toggleLowStatus;
module.exports.addToPantry = addToPantry;