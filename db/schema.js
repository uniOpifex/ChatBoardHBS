const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }
})


const PostSchema = new Schema({
    content: {
        type: String,
    },
    date: {
        type: String
    }

})



const BoardModel = mongoose.model('Company', BoardSchema)
const PostModel = mongoose.model('Post', PostSchema)


module.exports = {
    BoardModel: BoardModel,
    PostModel: PostModel 
}