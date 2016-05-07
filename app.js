var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var fs = require('fs')

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// change name on database!!!
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    mongoose.connect('mongodb://55.55.55.5/mongo')
  });
}

fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if(~filename.indexOf('.js')) require(__dirname + `/models/${filename}`)
})

app.get('/users', function(req, res) {
  mongoose.model('users').find(function(err, users) {
    res.send(users)
  })
})

app.post('/posts', function(req, res) {
  mongoose.model('posts').find(function(err, posts) {
    res.send(posts)
  })
})

app.post('/posts/:id', function(req, res) {
  mongoose.model('posts').find({user: req.params.id}, function(err, posts) {
    mongoose.model('posts').populate(posts, {path: 'user'}, function(err, posts) {
      res.send(posts);
    })
  })
})


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
