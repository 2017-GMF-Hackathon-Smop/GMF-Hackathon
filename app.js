var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var randomstring = require('randomstring');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy

var session = require("express-session");

var app = express();

mongoose.connect('mongodb://localhost:27017/ImgServer') ;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
        console.log("MongoDB On");
});

app.set('view engine', 'html');
app.set('views', 'views');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'@#@$SHANGUS#@$#$',
  resave: false,
  saveUninitialized:true
}));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var user = mongoose.Schema({
    email:String,
    password:String,
    token:String,
    name:String,
    age:String,
    sex:String,
    friend:Array
}); 

var userModel = mongoose.model('userModel',user);

require('/auth')(app,userModel,randomstring);
require('/friends')(app,userModel);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
