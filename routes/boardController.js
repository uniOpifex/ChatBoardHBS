const express = require('express')
const router = express.Router()

const Schema = require("../db/schema.js");
const BoardModel = Schema.BoardModel;
const UserModel = Schema.UserModel;

// INDEX route
router.get('/', (request, response) => {
    // FIND all of the Boards in the database
    BoardModel.find({})
        .then((boards => {
            // THEN once they come back from the database
            // RENDER them in Handlebars
            response.render('boards/index', {
                boards: boards
            })
        }))
    })
        // .catch((error) => {
        //     console.log(error)
        // }))
      

// NEW route
router.get('/new', (request, response) => {
    // RENDER an empty form for the new company
    response.render('boards/new')
})

// CREATE route
router.post('/', (request, response) => {

    // GRAB the new board info as a JS object from the request body
    const body= request.body;
    console.log(body);
    var newBoard = {};
    newBoard.name = body.name;
    newBoard.description = body.description

    // CREATE and SAVE a new Company using the CompanyModel
    UserModel.find({hash: body.hash})
        .then((user) => {
            newBoard.user = user[0].name
            
        })
        .then((board) => {      
            BoardModel.create(newBoard)
        })
        .then((board) => {
            response.redirect(`/boards/`)
        })
        .catch((error) => {
            console.log(error)
        })
})

// EDIT route
router.get('/:boardId/edit', (request, response) => {

    // GRAB the board ID from the parameters
    const boardId = request.params.boardId

    // FIND the board by ID using the BoardModel
    BoardModel.findById(boardId)
        .then((board) => {
            // THEN once the board has been returned from
            // the database, RENDER a form containing the current
            // board information
            response.render('boards/edit', {
                board: board
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// UPDATE route
router.put('/:boardId/', (request, response) => {
    console.log(request.body)
    const boardId = request.params.boardId
    const updatedBoard = request.body
    // Use Mongoose to find the company by ID and update it with the 
    // new company info. Be sure to include the {new: true} option as your
    // third parameter
    BoardModel.findByIdAndUpdate(boardId, updatedBoard, { new: true })
        .then((boardId) => {
            console.log("WE ARE HERE")
            // THEN once the new company info has been saved,
            // redirect to that company's SHOW page
            response.redirect(`/boards/${boardId}/`)
        })
        .catch((error) => {
            console.log("update Route")
            console.log(error)
        })
})

// SHOW route
router.get('/:boardId', (request, response) => {

    // GRAB the company ID from the parameters
    const boardId = request.params.boardId

    // Use the CompanyModel to find the company by ID in the database
    BoardModel.findById(boardId)
        .then((board) => {
            // THEN once the company comes back from the database,
            // render the single company's info using Handlebars
            response.render('boards/show', {
                board: board
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

//DELETE route
router.get('/:boardId/delete', (request, response) => {

    const boardId = request.params.boardId

    BoardModel.findByIdAndRemove(boardId)
        .then(() => {
            response.redirect('/boards')
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router;