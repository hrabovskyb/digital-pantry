const controllers = require('./controllers');
// const utility = require('../client');

const router = (app) => {
	app.get("/", controllers.pantry.pantryPage);
	app.get("/barcodes",controllers.barcode.barcodePage);
	app.get("/addItems",controllers.barcode.addItemsPage);
	// app.get("/shoppingList",controllers.pantry.shoppingListPage);
	app.get("/shoppingList",controllers.shoppingList.shoppingListPage);
	// app.get("/showFormBottom",utility.utility.showFormBottom);
	app.post("/barcodeQuery/:barcode",controllers.barcode.barcodeQuery);
	app.post("/deletePantryItem/:_id",controllers.pantry.deletePantryItem);
	app.post("/deleteTempItem/:_id",controllers.barcode.deleteTempItem);
	app.post("/deleteBarcode/:_id",controllers.barcode.deleteBarcode);
	app.post("/deleteShoppingItem/:_id",controllers.shoppingList.deleteShoppingItem);
	app.post("/addToShoppingList/:_id",controllers.shoppingList.addToShoppingList);
	app.post("/toggleLowStatus/:_id",controllers.pantry.toggleLowStatus);
	app.post('/addBarcode',controllers.barcode.addBarcode);
	app.post("/addToPantry",controllers.pantry.addToPantry);
	app.post("/editPantryItem",controllers.pantry.editPantryItem);
	app.post("/pantryBarcodeScan/:barcode",controllers.pantry.pantryBarcodeScan);

};

module.exports = router;