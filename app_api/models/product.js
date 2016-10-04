var mongoose = require( 'mongoose' );
var promise = require('bluebird');
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
var ObjectIdSchema = mongoose.Schema.ObjectId;
var productSchema = new mongoose.Schema({
	uniqueKey : String,
	name: {type: String, required:true},
	price: {type: Number, required: true},
	brand: String,
	image: String,
	reviews: [reviewSchema],
    shopID: {type:ObjectIdSchema, required:true},
    shopName:String,
    keywords: [String],
    category: String,
    expiryDate:String,
    manufactureDate: String,
    validGuarantee: Number,
    stocks: Number,
    discounts: Number,
    size: Number,
    color: String
   
});
module.exports.review = reviewSchema;
mongoose.model('product',productSchema);