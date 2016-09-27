var mongoose = require( 'mongoose' );
var express = require('express');
var promise = require('bluebird');

var electronicsSchema = new mongoose.Schema({
	stocks: {type: String, required: true},
	validGuarantee:Number,


});
module.export = mongoose.model('electronic',electronicsSchema);
