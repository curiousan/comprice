// export all the modules required

var express = require('express');
var router = express.Router();
var ctrlAbout = require('../controller/About');
var ctrlProduct = require('../controller/product');
var localShops = require('../controller/localShops');

/*
********** Local Shops **********

*/

//get About our web application
router.get('/about',ctrlAbout);
//get request for alll shops

router.get('/localShops',localShops.getAllShops);

//adding a new shop
router.post('/localShops',localShops.addShop);

//getting a specific shops
router.get('/localShops/:shopId',localShops.getShop);

//update a specific shops
router.put('/localShops/:shopId',localShops.updateShop);

//delete a specific shops
router.delete(',/localShops/:shopId',localShops.deleteShop);



/*
******** products ****************


*/
//get request for all products in a specific shops
router.get('/localShops/:shopId/products',ctrlProduct.getAllProducts);

//add a products
router.post('/localShops/:shopId/products',ctrlProduct.addItems);

// get specific items of a specific shops
router.get('/localShops/:shopId/products/:productId',ctrlProduct.getProduct);

//update a product
router.put('/localShops/:shopId/products/:productId',ctrlProduct.updateProduct);

//Delete a specific product 
router.delete('/localShops/:shopId/products/:productId',ctrlProduct.deleteProduct);

//search an items
router.get ('/products/searchItem?=:itemsKeywords',ctrlProduct.searchItem);


module.exports = router;