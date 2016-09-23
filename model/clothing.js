var mongoose = require( 'mongoose' );
var express = require('express');

var clothingSchema = new mongoose.Schema({
	stocks: [type:number, required: true],
	size: Number,

});
module.export = clothingSchema;
