var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/TEST', function(req, res, next) {
  res.status(200);
  res.json({"status" :"success"});
});


module.exports = router;
