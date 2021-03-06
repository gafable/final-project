// ---- Require all module dependencies. ---- //

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const env = require('dotenv')
const cookieParser = require('cookie-parser')

// ---- Assign instance of express to variable app ---- //

const app = express()
const port = process.env.PORT || 3000


env.config()

app.use(cookieParser())

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

// ---- Define all application middlewares ---- //

const VerifyJwtToken = require('./middleware/VerifyToken')
const IsAdmin = require('./middleware/IsAdmin')

// ---- Define all application routes ---- //
app.use('/', require('./middleware/GetAuthenticatedUser'), require('./routes/ClientPagesRoutes'))
app.use('/auth', require('./modules/auth/routes/AuthRoutes'))
app.use('/admin', [VerifyJwtToken, IsAdmin], require('./routes/AdminPagesRoutes'))
app.use('/accounts', require('./modules/account/routes/AccountRoutes'))
app.use('/rooms', require('./routes/RoomsRoute'))
app.use('/bookings', require('./routes/BookingsRoute'))
app.use('/classtypes', require('./routes/ClassTypesRoute'))

app.listen(port, console.log(`Application is running at http://localhost:${port}`))