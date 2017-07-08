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

passport.use(new FacebookStrategy({
    clientID: '744770849038667',
    clientSecret: '497d7c991ba3c0797627c1714032da56',
    callbackURL: 'wonjun.kr/facebookAuth/callback',
    passReqToCallback: true,
  }, (req, accessToken, refreshToken, profile, done) => {
      User.findOne({ id: profile.id }, (err, user) => {
            if (user) {
                    return done(err, user);
                  } // 회원 정보가 있으면 로그인
            const newUser = new User({ // 없으면 회원 생성
                    id: profile.id
                  });
            newUser.save((user) => {
                    return done(null, user); // 새로운 회원 생성 후 로그인
                  });
          });
    }))

var user = mongoose.Schema({
    email:String,
    password:String,
    token:String,
    name:String,
    age:String,
    sex:String,
    friend:Array
}); 

var userGraph = mongoose.Schema({
    graph:Array,
    token:String
});

var allGraph = mongoose.Schema({
    graph:Array
});

var time = mongoose.Schema({
    token:String,
    time:String
});

var smoke = mongoose.Schema({
    smoke:String,
    token:String
});

var userModel = mongoose.model('userModel',user);
var graphModel = mongoose.model('graphModel',userGraph);
var allModel = mongoose.model('allModel',allGraph);
var timeModel = mongoose.model('timeModel',time);
var smokeModel = mongoose.model('smokeModel',smoke);

require('./routes/auth')(app,userModel,randomstring);
require('./routes/friend')(app,userModel);
require('./routes/graph')(app,userModel,graphModel,allModel);
require('./routes/facebookAuth')(app,userModel,passport);
require('./routes/time')(app,userModel,timeModel);
require('./routes/smoke')(app,smokeModel);

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
