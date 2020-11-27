const express = require('express')
const router = express.Router()
const upload = require('./../middleware/Multer')
const roomsController = require('../controllers/RoomsController')

router.get('/all', roomsController.all)
router.get('/pendings', roomsController.pendings)
router.get('/available', roomsController.available)
router.get('/reserved', roomsController.reserved)
router.get('/history', roomsController.history)
router.get('/show/:id', roomsController.show)
router.get('/edit/:id', roomsController.edit)
router.post('/create', upload.single('roomImage'), roomsController.create)
router.post('/update/:id', upload.single('roomImage'), roomsController.update)

module.exports = router