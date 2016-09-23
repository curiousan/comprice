var mongoose = require( 'mongoose' );
var express = require('express');

var electronicsSchema = new mongoose.Schema({
	stocks: [type:String, required: true],
	validGuarantee:Number,


});
module.export = electronicsSchema;
