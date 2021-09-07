// ALl route method goes here
const express = require('express')
const router = express.Router()

const contacts = []


//route for fetch contact data
router.get('/', (req, res, next) => {
    res.status(200).json({
        //message: 'Hello! I am contacts get route'
        contacts
    })
})

router.post('/', (req, res, next) => {
    contacts.push({
        name: req.body.name,
        email: req.body.email
    })
    res.status(201).json({
        message: 'Chersss! Contact saved!!',
    })
})

// Get the id from URL(route) parameter
router.get('/:id', (req, res, next) => {
    //console.log(req.ulr)
    const id = req.params.id
    res.json({
        id
    })
})

// create put route by id
router.put('/:id', (req, res, next) => {
    res.json({
        message: 'I am a put route'
    })
})

// create delete route by id
router.delete('/:id', (req, res, next) => {
    res.json({
        message: 'I am a delete route'
    })
})

module.exports = router
