<<<<<<< HEAD
// ---- Require all application dependencies. ---- //
=======
// ---- Require all module dependencies. ---- //
>>>>>>> 0d6d13048ef61c83b8bb0e60a20f5fbe955c8c07

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

// ---- Assign instance of express to variable app ---- //

const app = express()
const port = 3000

// ---- App data  translation ---- //

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

<<<<<<< HEAD
// ---- App template engine ---- //
=======
// ---- Set template engine ---- //
>>>>>>> 0d6d13048ef61c83b8bb0e60a20f5fbe955c8c07

app.use(expressLayouts);
app.set('view engine', 'ejs')
app.set('layout', './layouts/app')

// ---- App static directories front-end assets ---- //

<<<<<<< HEAD
app.use(express.static('public'))
=======
app.use('/public', express.static('public'))
>>>>>>> 0d6d13048ef61c83b8bb0e60a20f5fbe955c8c07

// ---- Stablish Database connection ---- //

const database = require('./services/dbConnection')
database.connect()

// ---- Define all application routes ---- //


<<<<<<< HEAD
=======
// --- Directing Home Page --- //
app.get('/',(req,res)=>{
    res.render('pages/index',{
        title : 'Home page'
    })
})

const authRoutes = require('./modules/auth/routes/AuthRoutes')
const adminPagesRoutes = require('./routes/AdminPagesRoutes')
const accountRoutes = require('./modules/account/routes/AccountRoutes')

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.get('/rooms', (req, res) => {
    res.render('pages/rooms/roomlist', {
        title: 'Home page'
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
app.get('/test', (req, res) => {
    res.render('pages/test', {
        layout: ''
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



app.use('/auth', authRoutes)
app.use('/admin', adminPagesRoutes)
app.use('/accounts', accountRoutes)
>>>>>>> 0d6d13048ef61c83b8bb0e60a20f5fbe955c8c07

app.listen(port, console.log(`Application is running at port ${port}`))