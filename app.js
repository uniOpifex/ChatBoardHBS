require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var expressHbs = require('express-handlebars');


const methodOverride = require('method-override')
var helpers = require('handlebars-helpers')();
var hbs = require('handlebars');

var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(hbs);

var index = require('./routes/index');

var app = express();

// Database Set-up
//mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection
db.on('error', (error) => {
  console.log(error)
})
db.once('open', () => {
  console.log('Connected to MongoDB!')
})


// view engine setup
const hbsHelpers = require('./HandlebarsHelpers');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// app.engine('hbs', hbs({
//   helpers: hbsHelpers
// }));
var hbs = require('hbs');
require('./HandlebarsHelpers');



hbs.registerHelper('dateLocal', function (fecha) {
  return "this is a string"
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
app.use('/', index);


// Register Controllers
var boardController = require('./routes/boardController');
app.use('/boards', boardController);

const postController = require('./routes/postController')
app.use('/boards/:boardId/posts', postController)

const userController = require('./routes/userController')
app.use('/users', userController)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;