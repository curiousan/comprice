var mongoose = require( 'mongoose' );
var express = require('express');

var foodSchema = new mongoose.Schema({
	expiryDate: Date,
	manufactureDate: Date,




});
module.export = foodSchema;
