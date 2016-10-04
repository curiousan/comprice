var Promise=require('bluebird');

var mongoose = Promise.promisifyAll(require('mongoose'));
require('body-parser');
var store = mongoose.model('store');
var fs = require('fs');
var s3 = require('./../../app').S3;
var multer = require('multer');
var upload = multer({dest: 'uploads'});
var type = upload.single('uploadedFile');
var formidable = require("formidable");
var form = new formidable.IncomingForm();
//method to send json response
  var sendJSONresponse = function(res,status,content){
  	res.status(status);
  	res.json(content);
  };

// ready to use function to calculate radians to km and vise -versa
var theEarth = (function() {
  var earthRadius = 6371; // km, miles is 3959

  var getDistanceFromRads = function(rads) {
    return parseFloat(rads * earthRadius);
  };

  var getRadsFromDistance = function(distance) {
    return parseFloat(distance / earthRadius);
  };

  return {
    getDistanceFromRads: getDistanceFromRads,
    getRadsFromDistance: getRadsFromDistance
  };
})();
/*
************ controller for Shops ******************
*/

//test function for file upload 
var uploadFileToS3 = function(req,res){
     console.log('FIRST TEST: ' + JSON.stringify(req.file));
     console.log('Second TEST: ' + JSON.stringify(req.file.originalname));

   var request = {
       Body: fs.readFileSync(req.file.path),
       Bucket: "compricebucket123",
       Key: req.file.originalname
       
   };
    s3.putObject(request, function(err,data){
        if (err){
          sendJSONresponse(res,500,{
              "message": "server error 500"
          });
        }
    });
};

//test function for file download
var downloadFileFromS3 = function(req,res,key){
    var options = {
       Bucket: "compricebucket123",
       Key: key
   };
     s3.getObject(options,function(err,data){
         if(err){
             console.log(err);
         }else{
            res.contentType('image/png');
            res.end(data.Body);
         }
        
     });
}
//get all shops
module.exports.getAllShops = function (req, res) {
    new Promise(function(resolve,reject){
     store.
    find().
    sort('name').
    select('name address coordinates openingTime').
    exec(function(err,result){
        if(err){
            sendJSONresponse(res,404,{
                "message":"no shops found"
            });
            reject(err);
        } else{
            sendJSONresponse(res,200,result)
            resolve(result);
           
        }
    });
   });
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
form.parse(req,function(err,fields,files){
    

store.create({
name: req.body.name,
address: req.body.address,
coords: [parseFloat(req.body.lng),parseFloat(req.body.lat)],
openingTime:[{
days: req.body.day1,
opening: req.body.opening1,
closing: req.body.closing1,
closed: req.body.closed1
},
{days: req.body.day2,
opening: req.body.opening2,
closing: req.body.closing2,
closed: req.body.closed2
}],
image: req.file.originalname

                   

  
},function(err,store){
  if(err){
    sendJSONresponse(res,400,err);
  }else{
    sendJSONresponse(res,201,store);
  }
});
});

 };

 //update an existing  shop
module.exports.updateShop = function (req, res) {
    if(!req.params.shopId){
        sendJSONresponse(res,404,{
            "message":"Not found shop id is required"
        });
        return;
    }
    new Promise(function(resolve,reject){
        
    
    store
    .findById(req.params.shopId)
    .select('-products')
    .exec(
    function(err,store){
        if(err){
            sendJSONresponse(res,404,{
                "message": "Shop Not found"});
        
        return;
        }
        resolve(store);
        
    });
    }).then(function(store){
      new Promise(function(resolve,reject){
       store.name= req.body.name,
       store.address= req.body.address,
       store.coordinates = [parseFloat(req.body.lng),parseFloat(req.body.lat)],
       store.openingTime = [{
           days:req.body.day1,
           opening: req.body.opening1,
           closing: req.body.closing1,
           closed: req.body.closed1
       },{
           days:req.body.day2,
           opening: req.body.opening2,
           closing: req.body.closing2,
           closed: req.body.closed2 
       }];
          store.save(function(err,store){
              if (err){
                  reject(sendJSONresponse(res,404,err));
              }else{
                  resolve(sendJSONresponse(res,200,store));
              }
          }
       
   );   
    });
  
  });
};
 //delete a shop
 module.exports.deleteShop = function (req, res) {
   var shopId = req.params.shopId;
    if (!shopId){
         sendJSONresponse(res,404,{
             "message":"please specify the shopn  with the shop id"
         });
        return;
     }
     new Promise(function(resolve,reject){
         store.findByIdAndRemove(req.params.shopId)
         .exec(function(err,done){
            if(err){
               reject(sendJSONresponse(res,404,err)
                     );
                return;
            }else{
                resolve(sendJSONresponse(res,204,{
                    "message": "shop deleted"
                }));
            } 
         });
     });
  }; 

//find the nearby shops
module.exports.findShops = function(req,res){
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var maxDistance = parseFloat(req.query.maxDistance);
    var point =  {
        type: "Point",
        coordinates: [lng,lat]
    };
   
    var geoOptions = {
        spherical: true,
        maxDistance: (maxDistance*6371),
        num:10
    };
        
       
        
    
    // console.log('searching within the range of ' +geoOptions.maxDistance);
    if(!lng || !lat || !maxDistance){
        console.log(' all query param are required');
        sendJSONresponse(res,404,{
            "message": "longitude , laltitude and  maximum distance are not provided"
        });
        return;
    }
    store.geoNear(point,geoOptions,function(err,results,stats) {
        var Stores;
        console.log('Geo Results', results);
        console.log('Geo stats', stats);
        if(err){
            console.log('GeoNear error' , err);
            sendJSONresponse(res,404,err);
        }else{
            Stores = collectStores(req,res, results, stats);
            sendJSONresponse(res,200, Stores)
        }
    });
    
};
  var collectStores = function(req, res, results,stats) {
      var stores = [];
      results.forEach(function(doc){
          console.log(doc);
         stores.push({
             distance: (doc.dis/6371),
             name: doc.obj.name,
             address: doc.obj.address,
             openingTime: doc.obj.openingTime,
             coords: doc.obj.coords,
             _id:  doc.obj._id
             
         }); 
      });
      return stores;
  };

 module.exports.jsonResponse = sendJSONresponse;
