const express = require('express')
const router = express.Router()

const Schema = require("../db/schema.js");
const UserModel = Schema.UserModel;

// INDEX route
router.get('/', (request, response) => {
    
    // FIND all of the companies in the database
    UserModel.find({})
        .then((users => {

            // THEN once they come back from the database
            // RENDER them in Handlebars
            response.render('users/index', {
                users: users
            })
        }))
    
         .catch((error) => {
        //     console.log(error)
        })
      })  

// NEW route
router.get('/new', (request, response) => {
    // RENDER an empty form for the new company
    response.render('users/new')
})

// CREATE route
router.post('/', (request, response) => {

    // GRAB the new user info as a JS object from the request body
    const newuser = request.body

    // CREATE and SAVE a new Company using the CompanyModel
    UserModel.create(newuser)
        .then(() => {
            // THEN once the model has saved, redirect to the users INDEX
            response.redirect('/users')
        })
        .catch((error) => {
            console.log(error)
        })
})

// EDIT route
router.get('/:userId/edit', (request, response) => {

    // GRAB the user ID from the parameters
    const userId = request.params.companyId

    // FIND the user by ID using the UserModel
    UserModel.findById(userId)
        .then((user) => {
            // THEN once the user has been returned from
            // the database, RENDER a form containing the current
            // user information
            response.render('users/edit', {
                user: user
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// UPDATE route
router.put('/:userId', (request, response) => {

    // GRAB the company ID from the parameters
    const userId = request.params.companyId

    // GRAB the updated Company info from the request body
    const updatedUser = request.body

    // Use Mongoose to find the company by ID and update it with the 
    // new company info. Be sure to include the {new: true} option as your
    // third parameter
    UserModel.findByIdAndUpdate(userId, updateduser, { new: true })
        .then(() => {
            // THEN once the new company info has been saved,
            // redirect to that company's SHOW page
            response.redirect(`/users/${userId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

// SHOW route
router.get('/:userId', (request, response) => {

    // GRAB the company ID from the parameters
    const userId = request.params.userId

    // Use the CompanyModel to find the company by ID in the database
    UserModel.findById(userId)
        .then((user) => {
            // THEN once the company comes back from the database,
            // render the single company's info using Handlebars
            response.render('users/show', {
                user: user
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

//DELETE route
router.get('/:userId/delete', (request, response) => {

    // GRAB the company ID that you want to delete from the parameters
    const userId = request.params.userId

    // Use the CompanyModel to find and delete the company in the database
    UserModel.findByIdAndRemove(userId)
        .then(() => {

            // THEN once the company has been deleted from the database
            // redirect back to the companies INDEX
            response.redirect('/users')
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router;
