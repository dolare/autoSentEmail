var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
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

var stransporter = nodemailer.createTransport({
    service: 'Gmail',
    secureConnection: true, // use SSL
    port: 465, // port
    auth: {
        user: 'dolarebrave@gmail.com',
        pass: 'Lr!129114'
    }
});

function ssl(){
    var mailOptions = {
        from: 'dolare ',
        to: '964038933@qq.com',
        subject: 'SSL Email',
        html: 'Hello world'
    }
    return mailOptions;
}

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 18;
rule.minute = 0;

var j = schedule.scheduleJob(rule, function(){
  stransporter.sendMail(ssl(), function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('Message sent: ' + info.response);
      }
  });
  console.log('Today is recognized by Rebecca Black!');
});


module.exports = app;




