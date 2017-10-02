require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
const methodOverride = require('method-override');
var server = require('http').createServer(app);
var io = require('socket.io')(server);





var index = require('./routes/index');
var users = require('./routes/users');

// Database Set-up
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});

const db = mongoose.connection
db.on('error', (error) => {
  console.log(error)
})
db.once('open', () => {
  console.log('Connected to MongoDB!')
})

var app = express();
app.use(methodOverride('_method'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// var serve = app;
// app.listen(app.get('port'), function() {
//     console.log('Express server listening on port ' + app.get('port'));
// });

// io.on('connection', function (socket) {
//   console.log('a user connected');
//   socket.on('disconnect', function () {
//       console.log('user disconnected');
//   });
// });


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


// Register Controllers
const boardController = require('./routes/boardController');
app.use('/boards', boardController);

const postController = require('./routes/postController')
app.use('/boards/:boardId/posts', postController)

const sboardController = require('./routes/sboardController')
app.use('/sboard/',sboardController)

const AuthenticationController = require('./controllers/authentication'),  
UserController = require('./controllers/user'),
ChatController = require('./controllers/chat'),
passportService = require('./node_modulea/passport'),
passport = require('passport');


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

const apiRoutes = express.Router(),
authRoutes = express.Router(),
chatRoutes = express.Router();
router = require('./router'),
router(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
