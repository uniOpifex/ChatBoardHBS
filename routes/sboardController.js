require('dotenv').config();
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
const router = express.Router({ mergeParams: true })
var app = express();
var port = process.env.port
var serve = http.createServer(app);
var mongo = require('mongodb').MongoClient;


// Database setup
var mongoose = require('mongoose');

mongo.connect(process.env.MONGODB_URI)

//const Schema = require("../db/schema.js");

router.get('/', (req, res) => {
    serve.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        socket.on('chat', function (msg) {
            socket.broadcast.emit('chat', msg);
        });
    });
    mongo.connect(process.env.MONGODB_URI, function (err, db) {
        var collection = db.collection('chat messages');
        collection.insert({ content: msg }, function(err, o) {
            if (err) { console.warn(err.message); }
            else { console.log("chat message inserted into db: " + msg); }
        });
    });
    mongo.connect(process.env.MONGODB_URI, function (err, db) {
        var collection = db.collection('chat messages')
        var stream = collection.find().sort().limit(10).stream();
        stream.on('data', function (chat) { socket.emit('chat', chat.content); });
        
    });

 
























    //   io.on('connection', function(){ /* … */ });
  
  
  
//   io.on('connection', function (socket) {
//     console.log('a user connected');
//     socket.on('disconnect', function () {
//         console.log('user disconnected');
//     });
//     socket.on('chat', function (msg) {
//       socket.broadcast.emit('chat', msg);
//     });
//     mongo.connect(process.env.MONGODB_URI, function (err, db) {
//       var collection = db.collection('chat messages')
//       var stream = collection.find().sort({ _id : -1 }).limit(10).stream();
//       stream.on('data', function (chat) { socket.emit('chat', chat); });
//     });
//     socket.on('disconnect', function () {
//       console.log('user disconnected');
//   });
  
//   socket.on('chat', function (msg) {
//       mongo.connect(process.env.MONGODB_URI, function (err, db) {
//           var collection = db.collection('chat messages');
//           collection.insert({ content: msg }, function (err, o) {
//               if (err) { console.warn(err.message); }
//               else { console.log("chat message inserted into db: " + msg); }
//           });
//       });
  
//       socket.broadcast.emit('chat', msg);
//   });
//   })
})

// // INDEX route
// router.get('/', (request, response) => {

//     // GRAB the board ID from the parameters
//     const boardId = request.params.boardId

//     // Use the BoardModel to find the board by ID
//     BoardModel.findById(boardId)
//         .then((board) => {
//             // THEN once you have found the board in the database
//             // RENDER the board and its EMBEDDED snowboard info 
//             // using Handlebars
//             response.render('posts/index', {
//                 board: board
//             })
//         })
//         .catch((error) => {
//             console.log(error)
//         })

// })

module.exports = router;