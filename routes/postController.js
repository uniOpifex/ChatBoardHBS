const express = require('express')
const router = express.Router({ mergeParams: true })

const Schema = require("../db/schema.js");
const BoardModel = Schema.BoardModel;

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

    // GRAB the new snowboard info from the request body
    const newPost = request.body

    // USE the BoardModel to find the board by ID
    BoardModel.findById(boardId)
        .then((board) => {
            // THEN once you have found the board from the database
            // PUSH the new snowboard object into the board's 
            // snowboard array            
            board.posts.push(newPost)

            // SAVE the board and return the PROMISE
            return board.save()
        })
        .then((board) => {
            // THEN once the board has been saved, 
            // REDIRECT to the Snowboards index for that board
            response.redirect(`/boards/${boardId}/posts`)
        })

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

// // UPDATE route
// router.put('/:snowboardId', (request, response) => {

//     // GRAB the board ID from the parameters
//     const boardId = request.params.boardId

//     // GRAB the snowboard ID from the parameters
//     const snowboardId = request.params.snowboardId

//     // GRAB the updated snowboard object from the request body
//     const updatedSnowboard = request.body

//     // USE the BoardModel to find the board by ID
//     BoardModel.findById(boardId)
//         .then((board) => {
//             // THEN once the board has been returned,
//             // FIND the snowboard by ID from the board's snowboards
//             const snowboard = board.snowboards.id(snowboardId)

//             // MAP each attribute from the updated snowboard object to
//             // the same attribute on the original snowboard
//             snowboard.name = updatedSnowboard.name
//             snowboard.price = updatedSnowboard.price

//             // SAVE the updated board and return the PROMISE
//             return board.save()
//         })
//         .then(() => {
//             // THEN once the board has saved, REDIRECT to the 
//             // snowboard's SHOW page
//             response.redirect(`/companies/${boardId}/snowboards/${snowboardId}`)
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