const router = require('express').Router()

const bookingController = require('./../controllers/BookingsController')
const VerifyJwtToken = require('./../middleware/VerifyToken')
const CheckRoomAvailability = require('./../middleware/CheckRoomAvailabilty')

router.get('/', bookingController.index)
router.get('/classtypes/:id', bookingController.create)
router.get('/check/:id', bookingController.check)
router.get('/edit/:id', bookingController.edit)
router.post('/', VerifyJwtToken, bookingController.store)
router.post('/update/:id', bookingController.update)
router.post('/delete/:id', bookingController.destroy)

module.exports = router