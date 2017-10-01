const mongoose = require('mongoose')

const Schema = mongoose.Schema;




const PostSchema = new Schema({
    content: {
        type: String
    }

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
    posts: [PostSchema]
})



const BoardModel = mongoose.model('Board', BoardSchema)
const PostModel = mongoose.model('Post', PostSchema)


module.exports = {
    BoardModel: BoardModel,
    PostModel: PostModel 
}