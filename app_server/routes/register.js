/**
 * Created by The BigBang on 18.9.2016.
 */
var express = require('express');
var router = express.Router();
var Director=require('../routes/Director');
var passport=require('passport');


router.get('/', function(req, res, next) {
    console.log("here");
    res.render('CustomerSignUp', { title: 'Express' });
});

router.post('/',function(req,res,next){
    Director.register(new Director({username:req.body.username}),req.body.password,function(err,director){
        if(err){
            console.log("in error");
            return res.redirect({director:director},'index');
        }
        passport.authenticate('local')(req,res,function(){
            res.render("CustomerLogin");
        });
    });


});
module.exports = router;