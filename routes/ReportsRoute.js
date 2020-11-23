const express = require('express')
const router = express.Router()

const reportsController = require('../controllers/ReportsController')

router.get('/daily', reportsController.daily)
router.get('/monthly', reportsController.monthly)
router.get('/annual', reportsController.annual)
router.get('/electric', reportsController.electric)
router.get('/water', reportsController.water)


module.exports = router