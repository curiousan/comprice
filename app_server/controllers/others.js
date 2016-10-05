/**
 * Created by The BigBang on 25.9.2016.
 */
var express=require('express');
var router=express.Router();

module.exports.angularApp = function(req, res){
    res.render('layout', { title: 'Comprice' });
};