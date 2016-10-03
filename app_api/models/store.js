var mongoose = require( 'mongoose' );
var express = require('express');
var promise = require('bluebird');

var reviewSchema = require('./product').review;

var openingTimeSchema = new mongoose.Schema({
	days: {type: String, required:true},
	opening: String,
	closing: String,
	closed: Boolean

},{_id : false});



var storeSchema = new mongoose.Schema({ 
	name: { type: String, required: true},
	address:{type:String, required: true},
	coords: {type: [Number], index: '2dsphere'} ,
    openingTime: [openingTimeSchema],
    reviews: [reviewSchema]
});

mongoose.model('store',storeSchema);
