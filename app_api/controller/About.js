var mongoose = require('mongoose');
var Store = mongoose.model('store');
var router = require('express').Router();
var fs = require('fs');
var s3 = require('./../../app').S3;
var multer = require('multer');
var upload = multer({dest: 'uploads'});
var type = upload.single('uploadedFile');

router.post('/', type,function(req, res, next) {
     console.log('FIRST TEST: ' + JSON.stringify(req.file));
      console.log('Second TEST: ' + JSON.stringify(req.file.originalname));

   var request = {
       Body: fs.readFileSync(req.file.path),
       Bucket: "compricebucket123",
       Key: req.file.originalname
       
   };
    s3.putObject(request, function(err,data){
        if (err){
           res.send(err);
        }else{
            res.render('index',{done:true});
        }
        
    });
});
router.get('/list', function(req, res, next){
     s3.listObjects({Bucket:"compricebucket123" }, function(err,data){
         if(err){
             console.log(err);
         }else{
            res.render('list',data);  
         }
        
     });
});
router.get('/list.json', function(req, res, next){
     s3.listObjects({Bucket:"compricebucket123" },
                    function(err,data){
         if(err){
             console.log(err);
         }else{
            res.json(data);  
         }
        
     });
});
router.get('/file', function(req, res, next){
 var options = {
       Bucket: "compricebucket123",
       Key: req.query.name
   };
     s3.getObject(options,function(err,data){
         if(err){
             console.log(err);
         }else{
            res.contentType('image/png');
            res.end(data.Body);
         }
        
     });
});


module.exports = function (req, res) {
  var text= req.query('test');
  res.status(200);
  res.json({"status" : "success"});
};