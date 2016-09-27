var express = require('express');
var router = express.Router();
var ctrlOther=require('../controllers/others');

/* GET home page. */
router.get('/',ctrlOther.angularApp ) ;

router.get('/TEST', function(req, res, next) {
  res.status(200);
  res.json({"status" :"success"});
});
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
