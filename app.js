// ---- Require all module dependencies. ---- //

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

// ---- Assign instance of express to variable app ---- //

const app = express()
const port = 3000

// ---- App data  translation ---- //

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ---- Set template engine ---- //

app.use(expressLayouts);
app.set('view engine', 'ejs')
app.set('layout', './layouts/app')

// ---- App static directories front-end assets ---- //

app.use('/public', express.static('public'))

// ---- Stablish Database connection ---- //

const database = require('./services/dbConnection')
database.connect()

// ---- Define all application routes ---- //


// --- Directing Home Page --- //
app.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Home page'
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
app.get('/rooms', (req, res) => {
    res.render('pages/rooms/roomlist', {
        title: 'Room Lists'
    })
});

// --- Directing Blog Page --- //
app.get('/blog', (req, res) => {
    res.render('pages/blog', {
        title: 'Blog'
    })
});

// --- Directing Contact Page --- //
app.get('/contact', (req, res) => {
    res.render('pages/contact', {
        title: 'Contact'
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
    res.render('auth/login', {
        title: 'Login'
    })
});



app.use('/auth', authRoutes)
app.use('/admin', adminPagesRoutes)
app.use('/accounts', accountRoutes)

app.listen(port, console.log(`Application is running at port ${port}`))