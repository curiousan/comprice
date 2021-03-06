var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport=require('passport');
var passportLocal=require('passport-local').Strategy;
var session =require('express-session');
var Director=require('./app_server/routes/Director');
var routes = require('./app_server/routes/index');
//var users = require('./app_server/routes/users');
var login=require('./app_server/routes/login');
var register=require('./app_server/routes/register');
var mongoose=require('mongoose');
var fs = require('fs');
var aws = require('aws-sdk');
aws.config.update({
     accessKeyId: "AKIAIDXDVATPKNJMPUUQ",
    secretAccessKey: "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"
      
});
var s3 = new aws.S3({"signatureVersion": 'v4'
                    });

require('./app_api/models/db');

require('./app_api/models/store');
var serverRoute = require('./app_server/routes/index');

var apiRoutes = require('./app_api/routes/index');



var app = express();




// view engine setup

app.set('views', path.join(__dirname, 'app_server','views'));
app.use(express.static(path.join(__dirname, 'comprice_client')));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'jade');
app.use('/register',register);
app.use('/login',login);
passport.use(new passportLocal(Director.authenticate()));
passport.serializeUser(Director.serializeUser());
passport.deserializeUser(Director.deserializeUser());
app.get('/login/home',
    passport.authenticate('basic', { session: false }),
    function(req, res) {
      res.json(req.user);
    });
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', apiRoutes);
//app.use('/users', users);
app.use('/', serverRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports.S3 = s3;
module.exports = app;
