const mongoose = require('mongoose')

const Schema = mongoose.Schema;




const PostSchema = new Schema({
    content: {
        type: String
    },
    date: { type: Date, default: Date.now },

})

const BoardSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    date: { type: Date, default: Date.now },
    posts: [PostSchema]
})

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true,
        unique: true,
    }
})



const BoardModel = mongoose.model('Board', BoardSchema)
const PostModel = mongoose.model('Post', PostSchema)


module.exports = {
    BoardModel: BoardModel,
    PostModel: PostModel 
}