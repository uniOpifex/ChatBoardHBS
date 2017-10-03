const express = require('express')
const router = express.Router({ mergeParams: true })


const Schema = require("../db/schema.js");
const BoardModel = Schema.BoardModel;
const UserModel = Schema.UserModel;

// INDEX route
router.get('/', (request, response) => {

    // GRAB the board ID from the parameters
    const boardId = request.params.boardId
    // Use the BoardModel to find the board by ID
    BoardModel.findById(boardId)
        .then((board) => {
            // THEN once you have found the board in the database
            // RENDER the board and its EMBEDDED snowboard info 
            // using Handlebars
            response.render('posts/index', {
                board: board
            })
            request.send('posts/new', {
                boardId: boardId
            })
        })
        .catch((error) => {
            console.log(error)
        })

})

// NEW route
router.get('/new', (request, response) => {

    // GRAB the board ID from the parameters
    const boardId = request.params.boardId

    // RENDER a new form for a fresh Snowboard,
    // also passing the boardId to use in the
    // form's ACTION
    response.render('posts/new', {
        boardId: boardId
    })
})

// CREATE route
router.post('/', (request, response) => {

    // GRAB the board ID from the parameters
    const boardId = request.params.boardId
    // const userId = request.params.userId
    // GRAB the new snowboard info from the request body
    const body = request.body
    // console.log('test 1' + request.body)
    var newPost = {}
    newPost.content = body.content
    // console.log('test 2' + newPost)
    UserModel.find({hash: body.hash})
        .then((user) => {
                    // THEN once the user comes back from the database,
                    // render the single company's info using Handlebars
            // console.log("newPost")
            // console.log(newPost)
            // console.log(user)
            console.log(user)
            console.log(user[0].name)
            newPost.user = user[0].name
            console.log(newPost)
            // console.log(newPost)
            // console.log("user");
            // console.log(user)
        })
        .then((user) => {
            return BoardModel.findById(boardId)
        })
        .then((board) => {
            
            // THEN once you have found the board from the database
            // PUSH the new snowboard object into the board's 
            // snowboard array 
            // console.log("newPost")  
            // console.log(newPost)         
            board.posts.push(newPost)

            // SAVE the board and return the PROMISE
            return board.save()
        })
        .then((board) => {
            // THEN once the board has been saved, 
            // REDIRECT to the Snowboards index for that board
            response.redirect(`/boards/${boardId}/posts`)
        })
        .catch((error) => {
            console.log(error)
        })
        // Use the CompanyModel to find the company by ID in the database
    
    // USE the BoardModel to find the board by ID
        

        
        // .catch((error) => {
        //     console.log(error)
        // })
    


})

// // EDIT route
// router.get('/:snowboardId/edit', (request, response) => {

//     // GRAB the board ID from the parameters
//     const boardId = request.params.boardId

//     // GRAB the snowboard ID from the parameters
//     const snowboardId = request.params.snowboardId

//     // USE the BoardModel to find the board by ID
//     BoardModel.findById(boardId)
//         .then((board) => {
//             // THEN once the board has been returned,
//             // FIND the snowboard by ID that you want to edit
//             const snowboard = board.snowboards.id(snowboardId)

//             // RENDER a form pre-populated with that snowboard info,
//             // ALSO passing the boardId to use for the form's ACTION
//             response.render('snowboards/edit', {
//                 snowboard: snowboard,
//                 boardId: boardId
//             })
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })

// UPDATE route
// router.put('/postId', (request, response) => {

//     // GRAB the board ID from the parameters
//     const boardId = request.params.boardId

//     // GRAB the snowboard ID from the parameters
//     const postId = request.params.postId

//     // GRAB the updated snowboard object from the request body
//     const updatedPost = request.body

//     // USE the BoardModel to find the board by ID
//     BoardModel.findById(boardId)
//         .then((board) => {
//             // THEN once the board has been returned,
//             // FIND the snowboard by ID from the board's snowboards
//             const boardId = board.post.id(postId)

//             // MAP each attribute from the updated snowboard object to
//             // the same attribute on the original snowboard
//             post.content = updatedPost.content
//             snowboard.price = updatedSnowboard.price

//             // SAVE the updated board and return the PROMISE
//             return board.save()
//         })
//         .then(() => {
//             // THEN once the board has saved, REDIRECT to the 
//             // snowboard's SHOW page
//             response.redirect(`/boards/${boardId}/posts/`)
//         })

// })

// // SHOW route
// router.get('/:snowboardId', (request, response) => {

//     // GRAB the board ID from the parameters
//     const boardId = request.params.boardId
    
//     // GRAB the snowboard ID from the parameters
//     const snowboardId = request.params.snowboardId

//     // USE the BoardModel to find the board by ID
//     BoardModel.findById(boardId)
//         .then((board) => {
//             // THEN once the board has been returned,
//             // FIND the snowboard by ID from the board's snowboards
//             const snowboard = board.snowboards.id(snowboardId)

//             // THEN render the snowboard info using Handlebars
//             // and pass the boardId to use in link URLs
//             response.render('snowboards/show', {
//                 snowboard: snowboard,
//                 boardId: boardId
//             })
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })

// // DELETE route
// router.get('/:snowboardId/delete', (request, response) => {

//     // GRAB the board ID from the parameters
//     const boardId = request.params.boardId
    
//     // GRAB the snowboard ID from the parameters
//     const snowboardId = request.params.snowboardId

//     // USE the BoardModel to find the board by ID
//     BoardModel.findById(boardId)
//         .then((board) => {
//             // THEN once the board has been returned,
//             // REMOVE the snowboard from the board's snowboard array
//             const snowboard = board.snowboards.id(snowboardId).remove()

//             // THEN save the board and return the PROMISE
//             return board.save()
//         })
//         .then(() => {
//             // THEN once the board has saved, redirect to the 
//             // board's Snowboards INDEX page
//             response.redirect(`/companies/${boardId}/snowboards`)
//         })
// })

module.exports = router;