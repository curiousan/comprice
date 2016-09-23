var mongoose = require( 'mongoose' );
var express = require('express');

var clothingSchema = new mongoose.Schema({
	stocks: {type: Number, required: true},
	size: Number,

});
module.export = mongoose.model('Cloth',clothingSchema);
