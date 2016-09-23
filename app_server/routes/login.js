/**
 * Created by The BigBang on 18.9.2016.
 */
var express=require('express');
var router=express.Router();
var passport=require('passport');
var Director=require('../routes/Director');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

router.post('/',passport.authenticate('local'),function(req,res){
    res.redirect('login/home');

});
router.get('/', function(req, res, next) {
    // console.log(req.session.passport.user.username);
    res.render('CustomerLogin');
});
router.get('/home',isAuthenticated,function(req, res, next) {

    res.render('CustomerHomepage', { username: req.user.username });
    console.log(req.user);
});

module.exports = router;
