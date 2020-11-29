const router = require('express').Router()

const bookingController = require('./../controllers/BookingsController')
const VerifyJwtToken = require('./../middleware/VerifyToken')
const CheckRoomAvailability = require('./../middleware/CheckRoomAvailabilty')

router.get('/', bookingController.index)
router.get('/rooms/:id', bookingController.create)
router.get('/show/:id', bookingController.show)
router.post('/', [VerifyJwtToken, CheckRoomAvailability], bookingController.store)
router.post('/update/:id', bookingController.update)
router.post('/delete/:id', bookingController.destroy)

module.exports = router