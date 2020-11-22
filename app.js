// ---- Require all application dependencies. ---- //

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

// ---- Assign instance of express to variable app ---- //

const app = express()
const port = 3000

// ---- App data  translation ---- //

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ---- App template engine ---- //

app.use(expressLayouts);
app.set('view engine', 'ejs')
app.set('layout', './layouts/app')

// ---- App static directories front-end assets ---- //

app.use(express.static('public'))

// ---- Stablish Database connection ---- //

const database = require('./services/dbConnection')
database.connect()

// ---- Define all application routes ---- //


// --- Directing Home Page --- //
app.get('/',(req,res)=>{
    res.render('pages/index',{
        title : 'Home page'
    })
});

// --- Directing Room List Page --- //
app.get('/rooms',(req,res)=>{
    res.render('pages/rooms/roomlist',{
        title : 'Room Lists'
    })
});

// --- Directing Blog Page --- //
app.get('/blog',(req,res)=>{
    res.render('pages/blog',{
        title : 'Blog'
    })
});

// --- Directing Contact Page --- //
app.get('/contact',(req,res)=>{
    res.render('pages/contact',{
        title : 'Contact'
    })
});

app.get('/services', (req, res) => {
    res.render('pages/services', {
        title: 'Services'
    })
});

// --- Directing Login Page --- //
app.get('/login', (req, res) => {
    res.render ('auth/login',{
        title: 'Login'
    })
});




app.listen(port, console.log(`Application is running at port ${port}`))