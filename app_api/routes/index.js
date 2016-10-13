// export all the modules required

var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');
var multer = require('multer');

var ctrlAbout = require('../controller/About');
var ctrlProduct = require('../controller/product');
var localShops = require('../controller/localShops');
var fs = require('fs');
var upload = multer({dest: 'uploads'});
var type = upload.single('uploadedFile');

<<<<<<< HEAD
var s3 = require('./../../app').S3;
=======
aws.config.update({
     accessKeyId: "AKIAJNHEEGRQAT6PW7EA",
    secretAccessKey: "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"

});
var s3 = new aws.S3({"signatureVersion": 'v4'
});
>>>>>>> 9f48311e995ab1225a2094cbf7eb8b9c74afde6f
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

//download image
router.get ('/products/image', localShops.downloadFileFromS3);

/*
******** products ****************


*/
//get request for all products in a specific shops
router.get('/products',ctrlProduct.getAllProducts);


//add a products
router.post('/localShops/:shopId/products',ctrlProduct.addItems);

// get specific items of a specific shops
router.get('/products/getSpecificProduct/:productId',ctrlProduct.getProduct);


//update a product
router.put('/products/:productId',ctrlProduct.updateProduct);

//Delete a specific product 
router.delete('/products/:productId',ctrlProduct.deleteProduct);

//search the items
router.get ('/products/searchItem',ctrlProduct.searchItem);

//filter the items
router.get ('/products/filterItems',ctrlProduct.filterItem);



//test amazon web services 
router.get('/getBuckets', function(req,res){
   s3.listBuckets(function(err, buckets){
       if (err){
           console.log(err);
       }else{
       res.json(buckets);
       }
   }) ;
    
});
router.get('/getImage', function(req,res){
<<<<<<< HEAD
      console.log("the key "+ req.query.name);
    var options = {
       Bucket: "compricebucket123",
       Key: req.query.name
   };
     s3.getObject(options,function(err,data){
         if(err){
             console.log(err);
             console.log("something wrong happend");
         }else{
       console.log("downloading file");

         console.log(data.Body);
            res.end(data.Body);
         }
        
     });
});
router.post('/addFiles',type, function(req,res){
=======
    console.log("the key"+ req.query.name);
    var options = {
        Bucket: "compricebucket123",
        Key: req.query.name
    };
    s3.getObject(options,function(err,data){
        if(err){
            console.log(err);
        }else{
                console.log("The image query"+ req.query.name);
            res.end(data.Body);
        }

    });

});
router.post('/addFiles', function(req,res){
>>>>>>> 9f48311e995ab1225a2094cbf7eb8b9c74afde6f
   var request = {
       Body: fs.readFileSync(req.file.path),
       Bucket: "compricebucket123",
       key: req.file.originalname
       
   }
    s3.putObject(request, function(err,data){
        if (err){
            console.log(err);
        }else{
            res.send("done");
        }
        
    });
});
module.exports = router;