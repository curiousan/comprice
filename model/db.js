var mongoose = require( 'mongoose' );
var dbURI = 'mongodb://localhost/comprice';
var logDB =mongoose.createConnection(dbURI);
logDB.on('connected', function(){
	console.log('mongoose connected to '+dbURI);
});
logDB.on('error', function(){
	console.log('mongoose connection error: '+err);
});

logDB.on('disconnected',function(){
	console.log('mongoose disconnected');
});
// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    logDB.close(function() {
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
