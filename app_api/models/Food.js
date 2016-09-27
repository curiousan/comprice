var mongoose = require( 'mongoose' );
var express = require('express');
var promise = require('bluebird');

var foodSchema = new mongoose.Schema({
	expiryDate: Date,
	manufactureDate: Date,




});
module.export = mongoose.model('food',foodSchema);
