const mongoose = require('mongoose')

const Schema = mongoose.Schema;




const PostSchema = new Schema({
    content: {
        type: String
    },
    user: {
        type: String,
        required: true,
        default: "Xx_anonymous_xX"
    },
    date: { type: Date, default: Date.now },

})

const BoardSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: String,
        required: true,
        default: "Xx_anonymous_xX"
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
const UserModel = mongoose.model('User', UserSchema)

module.exports = {
    BoardModel: BoardModel,
    PostModel: PostModel, 
    UserModel: UserModel
}