const router = require('express').Router()

const bookingController = require('./../controllers/BookingsController')
const VerifyJwtToken = require('./../middleware/VerifyToken')
const IsAdmin = require('./../middleware/IsAdmin')

router.get('/',[VerifyJwtToken,IsAdmin], bookingController.index)
router.get('/classtypes/:id', bookingController.create)
router.get('/check/:id', bookingController.check)
router.get('/edit/:id', [VerifyJwtToken,IsAdmin], bookingController.edit)
router.get('/accounts', VerifyJwtToken, bookingController.account)
router.post('/', VerifyJwtToken, bookingController.store)
router.post('/update/:id',[VerifyJwtToken,IsAdmin], bookingController.update)

module.exports = router