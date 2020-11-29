const express = require('express')
const router = express.Router()
const upload = require('./../middleware/Multer')
const roomsController = require('../controllers/RoomsController')

const VerifyJwtToken = require('./../middleware/VerifyToken')
const IsAdmin = require('./../middleware/IsAdmin')

router.get('/all', [VerifyJwtToken, IsAdmin], roomsController.all)
router.get('/pendings', [VerifyJwtToken, IsAdmin], roomsController.pendings)
router.get('/available', [VerifyJwtToken, IsAdmin], roomsController.available)
router.get('/reserved', [VerifyJwtToken, IsAdmin], roomsController.reserved)
router.get('/history', [VerifyJwtToken, IsAdmin], roomsController.history)
router.get('/show/:id', [VerifyJwtToken, IsAdmin], roomsController.show)
router.get('/edit/:id', [VerifyJwtToken, IsAdmin], roomsController.edit)
router.get('/check-availabilty', roomsController.checkAvailability)
router.post('/create', [VerifyJwtToken, IsAdmin, upload.single('roomImage')], roomsController.create)
router.post('/update/:id', [VerifyJwtToken, IsAdmin, upload.single('roomImage')], roomsController.update)

module.exports = router