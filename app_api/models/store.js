var mongoose = require( 'mongoose' );
var express = require('express');

var productSchema = require('./product');





var openingTimeSchema = new mongoose.Schema({
	days: {type: String, required:true},
	opening: String,
	closing: String,
	closed: Boolean

},{_id : false});








var storeSchema = new mongoose.Schema({ 
	name: { type: String, required: true},
	address:{type:String, required: true},
	coords: {type: [Number], index: '2dsphere', 2dsphereIndexVersion:2},
	openingTime: [openingTimeSchema],
	products: [productSchema]



});

mongoose.model('store',storeSchema);
