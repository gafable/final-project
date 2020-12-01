const express = require('express')
const router = express.Router()
const clientPagesController = require('./../controllers/ClientPagesController')

// --- Directing Home Page --- //
router.get('/', clientPagesController.index)


// --- Directing Room List Page --- //
router.get('/rooms', clientPagesController.rooms)

// --- Directing Blog Page --- //
router.get('/blog', clientPagesController.blogs)

// --- Directing Contact Page --- //
router.get('/contact', clientPagesController.contact)

// -- Directing Services Page ---//
router.get('/services', clientPagesController.services)

// -- Directing Suite Page -- //
router.get('/suite', clientPagesController.suite)

router.get('/reservation', clientPagesController.reservation)

router.get('/rooms/availability', clientPagesController.availableRooms)

module.exports = router