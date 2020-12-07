const express = require('express')
const router = express.Router()
const upload = require('./../middleware/Multer')
const roomsController = require('../controllers/RoomsController')

const VerifyJwtToken = require('./../middleware/VerifyToken')
const IsAdmin = require('./../middleware/IsAdmin')

router.get('/all', [VerifyJwtToken, IsAdmin], roomsController.all)
router.get('/history', [VerifyJwtToken, IsAdmin], roomsController.history)
router.get('/edit/:id', [VerifyJwtToken, IsAdmin], roomsController.edit)
router.post('/create', [VerifyJwtToken, IsAdmin, upload.single('roomImage')], roomsController.create)
router.post('/update/:id', [VerifyJwtToken, IsAdmin, upload.single('roomImage')], roomsController.update)

module.exports = router