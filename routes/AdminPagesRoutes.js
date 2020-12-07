const express = require('express')
const router = express.Router()

const adminPagesController = require('../controllers/AdminPagesController')

router.get('/dashboard', adminPagesController.dashboard)
router.get('/monthly-income',adminPagesController.getMonthlyIncome)


module.exports = router