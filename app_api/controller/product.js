var shop =require('./localShops');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var products = mongoose.model('product');
var store = mongoose.model('store');
var aws = require('aws-sdk');
sendJSONresponse = shop.jsonResponse;





var  addProduct = function(req,res,store){
  if(!store){
    sendJSONresponse(res,404,{
      "message": "Store not found"
    });
  }else{


  products.create({
    uniqueKey : req.body.uniqueKey,
    name : req.body.name,
    price : req.body.price,
    brand : req.body.brand,
    reviews : req.body.review,
    img : req.body.img,
    _id : new mongoose.Types.ObjectId,
    shopID: req.params.shopId,
    shopName: store.name,
    category: req.body.cateory,
    keywords: req.body.keyword,
    expiryDate: req.body.expiryDate,
    manufactureDate: req.body.manufactureDate,
    validGuarantee: req.body.validGuarantee,
    stocks: req.body.stocks,
    discounts: req.body.discounts,
    size: req.body.size,
    color: req.body.color,
    
  },function(err,product){
    var thisProduct;
    if(err){
      sendJSONresponse(res,400,err);
    }else{
      thisProduct = products[products.length - 1];
      sendJSONresponse(res,201,product);
    }
  });

}
}

/*
************** Controller Methods for the Products ******************

*/

//get all the products
 module.exports.getAllProducts = function (req, res) {
     
     new Promise(function(resolve,reject){
 
      console.log("finding all the products of the store "+ req.params.shopId);
          products.find({})
          .exec(
          function(err,result){
            if(err){
               reject( sendJSONresponse(res,404,{
                    "message":"products not found on this shop"
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
    new Promise(function(resolve, reject){
  console.log('finding product details', req.params.productId);
   if(req.params.productId){
   	 products
   	.findById(req.params.productId)
   	.exec(function(err,product){
   		if(err){
   			reject(sendJSONresponse(res,404,{
   				"message": "product not found"
   			}));
                   
   			return;
   		}else{
      
        
       resolve(sendJSONresponse(res,200,product));
}
     });
   } else {
 
   	sendJSONresponse(res, 404,{
      "message": "No Store id specified"
    });
   }
            });
 }; 



//adding a product

module.exports.addItems = function (req, res) {
	
  var storeId = req.params.shopId;
  if(storeId){
  	store.
  	findById(storeId)
  	.exec( function(err,store){
  		if(err){
  			sendJSONresponse(res,404,err);
  		}else{
  			addProduct(req,res,store);
  		}
  	});

  }else{
  	sendJSONresponse(res,404,{
  		"message": "Store not found"
  	});
  }


};

//updating a product
module.exports.updateProduct = function (req, res) {
 if(!req.params.productId){
     sendJSONresponse(res,404,{
         "message":" Shop id and product Id is required"
     });
     return;
 }
      new Promise(function(resolve,reject){
            products.findById(req.params.productId)
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
      console.log(req.body.uniqueKey) ;    
    product.uniqueKey = req.body.uniqueKey,
    product.name = req.body.name,
    product.price = req.body.price,
    product.brand = req.body.brand,
    product.reviews = req.body.review,
    product.img = req.body.img,
    product._id = new mongoose.Types.ObjectId,
    product.category= req.body.cateory,
    product.expiryDate= req.body.expiryDate,
    product.manufactureDate= req.body.manufactureDate,
    product.validGuarantee= req.body.validGuarantee,
    product.stocks= req.body.stocks,
    product.discounts= req.body.discounts,
    product.size= req.body.size,
    product.color= req.body.color;
          
             product.save(function(err,product){
                 if(err){
                     sendJSONresponse(res,404,err);
                     
                 }else{
                   sendJSONresponse(res,200,product);
                 }
             });
        });
    };


//deleting a product
module.exports.deleteProduct = function (req, res) {
 if(!req.params.productId){
     sendJSONresponse(res,404,{
         "message":"Shop id and product Id is required"
     });
     return;
 }
   new Promise(function(resolve,reject){
       products.findById(req.params.productId).remove()
       .exec
       (function(err){
           if(err){
              reject(sendJSONresponse(res,404,{
                   
               "message": "shop not found"
               }));
           return;
           } else{
               sendJSONresponse(res,200,{
                   "message": "deleted"
               });
           }
       });
    });
};


//Search a products
module.exports.searchItem = function (req, res) {
    var searchText = req.query.search;
    if(!searchText){
        sendJSONresponse(res,404,{
            "message": "please provide  a valid query"
        });
        return;
    }else{
   
        new Promise(function(resolve,reject){
        products.find({"keywords": new RegExp(searchText)})
        .exec(function(err,result){
            if(err){
                console.log(err);
               reject(sendJSONresponse(res,404,{
                   
               "message": "product not found"
               }));
                
            }else{
                resolve(result);
            }
        });
         }).then(function(result){
            console.log(result);
            sendJSONresponse(res,200,result);
        }); 
    }
  
};

//filter the product based on price and category
module.exports.filterItem = function (req, res) {
   if(req.query.category)var category =req.query.category ;
   if(req.query.minPrice)var minPrice =req.query.minPrice ;
   if(req.query.maxPrice)var maxPrice =req.query.maxPrice ;
  
  
   
        new Promise(function(resolve,reject){
        products.find({
            $and :[
           { category: new RegExp(category)},
                {price: {$gt: minPrice, $lt: maxPrice}}
                ]
        })
        .exec(function(err,result){
            if(err){
                console.log(err);
               reject(sendJSONresponse(res,404,{
                   
               "message": "product not found"
               }));
                
            }else{
                resolve(result);
            }
        });
         }).then(function(result){
            console.log(result);
            sendJSONresponse(res,200,result);
        }); 
    
  
};