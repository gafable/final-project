// ---- Require all module dependencies. ---- //

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const env = require('dotenv')


// ---- Assign instance of express to variable app ---- //

const app = express()
const port = 3000


env.config()

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

const VerifyJwtToken = require('./middleware/VerifyToken')

// ---- Define all application routes ---- //




app.use('/', require('./routes/ClientPagesRoutes'))
app.use('/auth', require('./modules/auth/routes/AuthRoutes'))
app.use('/admin', require('./routes/AdminPagesRoutes'))
app.use('/accounts', require('./modules/account/routes/AccountRoutes'))
app.use('/reports', require('./routes/ReportsRoute'))
app.use('/rooms', require('./routes/RoomsRoute'))


app.listen(port, console.log(`Application is running at port ${port}`))