var mongoose = require( 'mongoose' );
var food  = require('./Food');
var cloth = require('./clothing');
var promise = require('bluebird');

var electronicsItem = require('./electronics');
var reviewSchema = new mongoose.Schema({
    author: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: String,
    createdOn: {
        type: Date,
        "default": Date.now
    }
});
var productSchema = new mongoose.Schema({
	uniqueKey : {type: String},
	name: {type: String, required:true},
	price: {type: Number, required: true},
	brand: String,
	img: {data: Buffer, type: String},
	reviews: [reviewSchema],
	foodItems: [food],
	clothingItems: [cloth],
	electronicsItem: [electronicsItem]
 

	



});
module.export = productSchema;
