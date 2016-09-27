var Promise=require('bluebird');

var mongoose = Promise.promisifyAll(require('mongoose'));
require('body-parser');
var store = mongoose.model('store');

//method to send json response
  var sendJSONresponse = function(res,status,content){
  	res.status(status);
  	res.json(content);
  };
/*
************ controller for Shops ******************
*/


//get all shops
module.exports.getAllShops = function (req, res) {
    res.status(200);
    res.json({"status" : "getAllShops"});
  };

//get a specific shop   
  module.exports.getShop = function (req, res) {
      new Promise(function(resolve, reject){
    console.log('finding store details', req.params);
   if(req.params && req.params.shopId){
   	store
   	.findById(req.params.shopId)
   	.exec(function(err,store){
   		if(!store){
   			reject(sendJSONresponse(res,404,{
   				"message": "shop not found"
   			}));
                   
   			return;
   		}else if(err) {
         console.log(err);
         reject(sendJSONresponse(res,404,err));
         return;
       }
       console.log(store);
        
       resolve(sendJSONresponse(res,200,store));

     });
   } else {
   	console.log('Store id do ');
   	sendJSONresponse(res, 404,{
      "message": "No Store id specified"
    });
   }
            });
 };

//create a  new shop 
module.exports.addShop = function (req,res) {

store.create({
name: req.body.name,
address: req.body.address,
coords: [parseFloat(req.body.lng),parseFloat(req.body.lat)],
openingTime:[{
days: req.body.days1,
opening: req.body.opening1,
closing: req.body.closing1,
closed: req.body.closed1
},
{days: req.body.days2,
opening: req.body.opening2,
closing: req.body.closing2,
closed: req.body.closed2
}]

  
},function(err,store){
  if(err){
    sendJSONresponse(res,400,err);
  }else{
    sendJSONresponse(res,201,store);
  }
});


 };

 //update an existing  shop
module.exports.updateShop = function (req, res) {
    res.status(200);
    res.json({"status" : "getAllShops"});
  };

 //delete a shop
 module.exports.deleteShop = function (req, res) {
    res.status(200);
    res.json({"status" : "getAllShops"});
  }; 

 module.exports.jsonResponse = sendJSONresponse;
