const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
//here contact-db is the database name
mongoose.connect('mongodb://localhost/contact-db')

const db = mongoose.connection

db.on('error', (err)=> {
    console.log(err)
})

db.once('open', () => {
    console.log('Database connected')
})
const contactRoute = require('./api/routes/contact')

const Schema = mongoose.Schema
const demoSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    phone: {
        type: String,
        require: true
    }
})

const Demo = mongoose.model('Demo', demoSchema)


//Creating an Express app
const app = express()
//use morgan moddileware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

//Define port
//Check the environment port first else use 3000
const PORT = process.env.PORT || 3000

//set middleware
app.use((req, res, next) => {
    console.log('I am middleware function')
    next()
})
//set url to use the route
app.use('/api/contacts', contactRoute)

//Run this app on that particular port
app.listen(PORT, () => {
    console.log(`The Server is running on  Port ${PORT}`)
});

//Create route
app.get('/', (req, res) => {
    res.send("Server Created Perfectly")
});


//route for creating schema on mongodb
app.get('/demo', (req, res) => {
    const demo = new Demo({
        name: 'Tarin',
        phone: '012328323'
    })
    demo.save()
        .then(data => {
            res.json({data})
        })
        .catch(err => console.log(err))
})

//show data from mongodb by using get-data route
app.get('/get-data', (req, res) => {
    Demo.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => console.log(err))
})