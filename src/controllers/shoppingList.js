const models = require('../models');
const mongoose = require('mongoose');

const pantryItem = models.pantryItems;
const shoppingListItem = models.shoppingListItem;

const shoppingListPage = (req, res) => {
	// res.render('shoppingList', {title: "myPage"});
	shoppingListItem.shoppingListItemModel.find({}).exec((err,docs)=>{
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured during shopping list page load'});
		}
		return res.render('shoppingList',{items: docs});
	});
}

const deleteShoppingItem = (req, res) => {
	shoppingListItem.shoppingListItemModel.deleteOne({_id: req.params._id}).exec((err,docs)=>{
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured during delete page load'});
		}
		return res.json({redirect: '/shoppingList'});
	});
}

const editShoppingItem = (req, res) => {
	let query = {_id: req.body.itemId};

	const itemData = {
		_id: req.body.itemId,
		itemName: req.body.itemName,
		UOM: req.body.UOM,
		quantity: req.body.quantity,
		category: req.body.category,
	};
	if(req.body.quantity > 0){
		return shoppingListItem.shoppingListItemModel.updateOne(query,itemData).exec((err)=>{
			if(err){
				console.log(err);
				return res.status(400).json({error: 'An error occured while editing item info'});
			}
			return res.json({redirect: '/shoppingList'});
		});
	} else {
		shoppingListItem.shoppingListItemModel.deleteOne({_id: req.body.itemId}).exec((err,docs)=>{
			if(err){
				console.log(err);
				return res.status(400).json({error: 'An error occured'});
			}
			return res.json({redirect: '/shoppingList'});
		});
	}
}

const addToShoppingList = (req, res) => {
	// const convertId = mongoose.Types.ObjectId;
	pantryItem.pantryItemModel.find({_id: req.params._id}).exec((err,docs) => {
		

		shoppingListItem.shoppingListItemModel.find({itemName: docs[0].itemName}).exec((err,results)=>{
			if(results.length > 0){
				const data = {
					itemName: docs[0].itemName,
					UOM: docs[0].UOM,
					quantity: results[0].quantity + 1,
					category: docs[0].category,	
				}
				let query = {itemName: docs[0].itemName};
				return shoppingListItem.shoppingListItemModel.updateOne(query,data).exec((err)=>{
					if(err){
						console.log(err);
						return res.status(400).json({error: 'An error occured during delete page load'});
					}
					return res.json({redirect: '/'});
				});
				// const newShoppingListItem = new shoppingListItem.shoppingListItemModel(shoppingListItemData);
			} else {
				const shoppingListItemData = {
					itemName: docs[0].itemName,
					UOM: docs[0].UOM,
					quantity: 1,
					category: docs[0].category,	
				}
				const newShoppingListItem = new shoppingListItem.shoppingListItemModel(shoppingListItemData);
				return newShoppingListItem.save((err) => {
					if(err){
						console.log(err);
						return res.status(400).json({error: 'An error occured'});
					}
					return res.json({ redirect: '/'});
				});
			}
		});

		


	});
	
}


module.exports.deleteShoppingItem = deleteShoppingItem;
module.exports.shoppingListPage = shoppingListPage;
module.exports.addToShoppingList = addToShoppingList;
module.exports.editShoppingItem = editShoppingItem;