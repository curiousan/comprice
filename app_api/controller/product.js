 var shop =require('./localShops');
 var mongoose = require('mongoose');
  //require('../models/store');
 var store = mongoose.model('store');
 sendJsonResponse = shop.jsonResponse;





var  addProduct = function(req,res,store){
  if(!store){
    sendJsonResponse(res,404,{
      "message": "Store not found"
    });
  }else{


  store.products.push({
    uniqueKey : req.body.uniqueKey,
    name : req.body.name,
    price : req.body.price,
    brand : req.body.brand,
    reviews : req.body.review,
    img : req.body.img,
    _id : new mongoose.Types.ObjectId



  });
  store.save(function(err,store){
    var thisProduct;
    if(err){
      sendJsonResposne(res,400,err);
    }else{
      thisProduct = store.products[store.products.length - 1];
      sendJsonResponse(res,201,thisProduct);
    }
  });
}
}

/*
************** Controller Methods for the Products ******************

*/

//get all the products
 module.exports.getAllProducts = function (req, res) {
  res.status(200);
  res.json({"status" : "getAllProducts"});
};


// getting a product
module.exports.getProduct = function (req, res) {
  if(req.params.shopId && req.params.productId){
      store
      .findById(req.param.shopId)
      .select('products')
      .exec(
      function(err,store){
          var product;
          if(!store){
              sendJSONresponse(res,404,{
                  "message": "store not found"
              });
              return;
          }else if(err){
              sendJSONresponse(res,404,err);
              return;
          }
          if(store.products && store.products.length >0){
              product = store.reviews.id(req.param.productId);
              if(!product){
                  sendJSONresponse(res,404, {
                      "message": " product not found"
                  });
              }else{
                sendJSONresponse(res, 200, product);
                     
                 }  
              } else{
                  sendJSONresponse(res, 404, {
                      "message": "No product with the given id is found"
                  });
              }
          }
      );
  } else {
      sendJsonResponse(res,404,{
          "message": "not found storeId and productId is required"
      });
  }
};



//adding a product

module.exports.addItems = function (req, res) {
	
  var storeId = req.params.shopId;
  if(storeId){
  	store.
  	findById(storeId)
  	.select('products')
  	.exec( function(err,store){
  		if(err){
  			sendJsonResposne(res,404,err);
  		}else{
  			addProduct(req,res,store);
  		}
  	});

  }else{
  	sendJsonResposne(res,404,{
  		"message": "Store not found"
  	});
  }


};

//updating a product
module.exports.updateProduct = function (req, res) {
  res.status(200);
  res.json({"status" : "getProduct"});
};


//deleting a product
module.exports.deleteProduct = function (req, res) {
  res.status(200);
  res.json({"status" : "getProduct"});
};


//Search a products
module.exports.searchItem = function (req, res) {
  res.status(200);
  res.json({"status" : "getProduct"});
};