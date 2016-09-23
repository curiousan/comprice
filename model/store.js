var mongoose = require( 'mongoose' );
var food  = required('./food');
var cloth = required('./clothing');
var electronicsItem = required('./electronics');
var productSchema = new mongoose.Schema({
	uniqueKey : {type: String,required: true},
	name: {type: String, required:true},
	price: {type: Number, required: true},
	brand: String,
	reviews: [reviewSchema],
	foodItems: [food],
	clothingItems: [cloth],
	electronicsItem: [electronicsItem],
	



});
var reviewSchema = new mongoose.Schema({
	user:{type: String, required:true},
	rating: {type:Number, default: 0, min: 0, max: 5},
	comment: String,
	Time : {type: Date, default: Date.now}


});

var openingTimeSchema = new mongoose.Schema({
	days: {type: String, required:true},
	opening: String,
	closing: String,
	closed: Boolean,

});








var storeSchema = new mongoose.Schema({ 
	name: { type: String, required: true},
	address:{type:String, required: true},
	coords: {type: [Number], index: '2dsphere'} ,
	openingTime: [openingTimeSchema],
	reviews: [reviewSchema],
	products: [productSchema],



});

mongoose.model('store','storeSchema');
