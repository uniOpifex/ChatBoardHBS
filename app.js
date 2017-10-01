require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
const methodOverride = require('method-override')
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(){ /* … */ });

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
      console.log('user disconnected');
  });
  socket.on('chat', function (msg) {
    socket.broadcast.emit('chat', msg);
  });
  mongo.connect(process.env.process.env.MONGODB_URI, function (err, db) {
    var collection = db.collection('chat messages')
    var stream = collection.find().sort({ _id : -1 }).limit(10).stream();
    stream.on('data', function (chat) { socket.emit('chat', chat); });
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');
});

socket.on('chat', function (msg) {
    mongo.connect(process.env.process.env.MONGODB_URI, function (err, db) {
        var collection = db.collection('chat messages');
        collection.insert({ content: msg }, function (err, o) {
            if (err) { console.warn(err.message); }
            else { console.log("chat message inserted into db: " + msg); }
        });
    });

    socket.broadcast.emit('chat', msg);
});
})

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
