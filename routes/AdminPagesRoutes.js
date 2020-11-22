const express = require('express')
const router = express.Router()

const adminPagesController = require('../controllers/AdminPagesController')

router.get('/dashboard', adminPagesController.dashboard)


module.exports = router