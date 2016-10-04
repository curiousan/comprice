// export all the modules required

var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');
var ctrlAbout = require('../controller/About');
var ctrlProduct = require('../controller/product');
var localShops = require('../controller/localShops');
var fs = require('fs');

aws.config.update({
     accessKeyId: "AKIAJ4I6F5YLFZ3JNW2A",
    secretAccessKey: "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"
      
});
var s3 = new aws.S3();
/*
********** Local Shops **********

*/

//get About our web application
router.get('/files/',ctrlAbout);
//get request for alll shops

router.get('/localShops',localShops.getAllShops);

//adding a new shop
router.post('/localShops',localShops.addShop);

//getting a specific shops
router.get('/localShops/:shopId',localShops.getShop);

//update a specific shops
router.put('/localShops/:shopId',localShops.updateShop);

//delete a specific shops
router.delete('/localShops/:shopId',localShops.deleteShop);

// find the shops nearby
router.get('/localShops/findtheshops/nearbyShops',localShops.findShops);

/*
******** products ****************


*/
//get request for all products in a specific shops
router.get('/products',ctrlProduct.getAllProducts);

//add a products
router.post('/localShops/:shopId/products',ctrlProduct.addItems);

// get specific items of a specific shops
router.get('/products/getProduct/:productId',ctrlProduct.getProduct);

//update a product
router.put('/products/:productId',ctrlProduct.updateProduct);

//Delete a specific product 
router.delete('/products/:productId',ctrlProduct.deleteProduct);

//search the items
router.get ('/products/searchItem',ctrlProduct.searchItem);

//filter the items
router.get ('/products/filterItems',ctrlProduct.filterItem);

//test amazon web services 
router.get('/getBuckets', function(res,res){
   s3.listBuckets(function(err, buckets){
       if (err){
           console.log(err);
       }else{
       res.json(buckets);
       }
   }) ;
    
});
router.post('/addFiles', function(req,res){
   var request = {
       Body: fs.readFileSync(req.files.path),
       Bucket: "compricebucket123",
       key: req.files.name
       
   };
    s3.putObject(request, function(err,data){
        if (err){
            console.log(err);
        }else{
            res.send("done");
        }
        
    });
});
module.exports = router;