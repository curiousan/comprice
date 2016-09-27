var mongoose = require( 'mongoose' );
mongoose.set('debug', true);
var dbURI = 'mongodb://localhost/comprice';
if (process.env.NODE_ENV === 'production') {
  dbURI =  'mongodb://root:root@ds033056.mlab.com:33056/comprice';
}
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } },
                  }; 
var promise = require('bluebird');

var logDB =mongoose.connect(dbURI,options);
logDB.connection.on('connected', function(){
	console.log('mongoose connected to '+dbURI);
});
logDB.connection.on('error', function(){
	console.log('mongoose connection error: '+err);
});

logDB.connection.on('disconnected',function(){
	console.log('mongoose disconnected');
});
// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
 gracefulShutdown = function(msg, callback) {
    logDB.disconnect(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
// For nodemon restarts
};
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
// For app termination
});
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
// For Heroku app termination
});
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});
