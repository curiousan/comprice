var mongoose = require('mongoose');
var Store = mongoose.model('store');



module.exports = function (req, res) {
  res.status(200);
  res.json({"status" : "success"});
};