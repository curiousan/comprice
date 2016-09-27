 var shop =require('./localShops');
 var mongoose = require('mongoose');
  var Promise = require('bluebird');
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
       if(!req.params.shopId){
      sendJSONresponse(res,404,{
          "message": "shop id is required"
      });
    return;  
  }
     new Promise(function(resolve,reject){
 
      console.log("finding all the products of the store "+ req.params.shopId);
          store.findById(req.params.shopId)
          .select('products')
          .exec(
          function(err,result){
            if(err){
               reject( sendJSONresponse(res,404,{
                    "message":"products not found on the given shop"
                }));
                
            } else{
                       resolve(result);
                 }  
          });
         
      
  }).then(function(result){
          sendJSONresponse(res,200,result);
          });
};


// getting a product
module.exports.getProduct = function (req, res) {
  if(req.params.shopId && req.params.productId){
      store
      .findById(req.params.shopId)
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
 if(!req.params.shopId && req.params.productId){
     sendJSONresponse(res,404,{
         "message":" Shop id and product Id is required"
     });
     return;
 }
    new Promise(function(resolve,reject){
       store.findById(req.params.shopId)
       .select(products)
       .exec(function(err,store){
           if(err){
              reject(sendJSONresponse(res,404,{
                   
               "message": "shop not found"
               }));
           return;
           }
           resolve(store)
       });
    }).then(function(store){
        new Promise(function(resolve,reject){
            store.findById(req.params.productId)
            .exec(function(err,product){
                if(err){
                    reject(sendJSONresponse(res,404,err)
                          );
                    return;
                }else{
                    resolve(product);
                }
            });
        }).then(function(product){
             product.uniqueKey = req.body.uniqueKey;
             product.name = req.body.name;
             product.brand = req.body.brand;
             product.img = req.body.img;
             product.price = req.body.price;
             store.save(function(err,store){
                 if(err){
                     reject(sendJSONresponse(res,404,err));
                     
                 }else{
                     resolve(sendJSONresponse(res,200,product));
                 }
             });
        });
    });
   
};


//deleting a product
module.exports.deleteProduct = function (req, res) {
 if(!req.params.shopId && req.params.productId){
     sendJSONresponse(res,404,{
         "message":" Shop id and product Id is required"
     });
     return;
 }
    new Promise(function(resolve,reject){
       store.findById(req.params.shopId)
       .select(products)
       .exec(function(err,store){
           if(err){
              reject(sendJSONresponse(res,404,{
                   
               "message": "shop not found"
               }));
           return;
           }
           resolve(store)
       });
    }).then(function(store){
        new Promise(function(resolve,reject){
            store.products.id(req.params.productId).remove();
            store.save(function(err,store){
                 if(err){
                     reject(sendJSONresponse(res,404,err));
                     
                 }else{
                    resolve(sendJSONresponse(res,404,{
                   
               "message": "shop not found"
               }));
                 }
             });
        });
    });
};


//Search a products
module.exports.searchItem = function (req, res) {
  res.status(200);
  res.json({"status" : "getProduct"});
};