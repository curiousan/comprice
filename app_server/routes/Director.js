/**
 * Created by The BigBang on 18.9.2016.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var localMongooosePass=require('passport-local-mongoose');

var Director=new Schema({
    username:String,
    password:String
});

Director.plugin(localMongooosePass);
module.exports=mongoose.model('Director',Director);

