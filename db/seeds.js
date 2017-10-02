
require('dotenv').config();

// Database setup
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;
// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});
// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("Connected to MongoDB!");
});

// Pull in Models from the `schema.js`
var Schema = require("./schema.js");

var BoardModel = Schema.BoardModel;
var PostModel = Schema.PostModel;
var UserModel = Schema.UserModel;

// Delete all boards from the database BoardModel.remove({}, function (err) {
    BoardModel.remove({}, function (err) {
        console.log(err);
    });
    UserModel.remove({}, function(err){
        console.log(err);
    })

// Create some boards and Posts
const channel = new BoardModel({ name: 'Channel', description: "This is the main board channel" })
const admin = new BoardModel({ name: 'Admin', description: "This is the Admin board" })

const post1 = new PostModel({ content: 'short Post' })
const post2 = new PostModel({ content: 'regular Post' })
const post3 = new PostModel({ content: 'angry Post' })

// Here we assign some Posts to each board.
const boards = [channel,admin]
const posts = [post1, post2, post3]

boards.forEach((board) => {

    board.posts = posts

    board.save()
        .then((board) => {
            console.log(`${board.name} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })
});
//---------------------------------------
const admin1 = new UserModel({name: 'admin',hash: 'AAAA'})
const users = [admin1];

users.forEach((user) => {
        user.save()
            .then((user) => {
                console.log(`${user.name} saved!`)
            })
            .catch((error) => {
                console.log(error)
            })
    });
// Disconnect from database
db.close();



// const UserSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     hash: {
//         type: String,
//         required: true,
//         unique: true,
//     }
// })