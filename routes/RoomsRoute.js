const express = require('express')
const router = express.Router()

const roomsController = require('../controllers/RoomsController')

router.get('/all', roomsController.all)
router.get('/pendings', roomsController.pendings)
router.get('/available', roomsController.available)
router.get('/reserved', roomsController.reserved)
router.get('/history', roomsController.history)

module.exports = router