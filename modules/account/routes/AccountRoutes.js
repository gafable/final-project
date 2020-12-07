const express = require('express')
const router = express.Router()
const VerifyJwtToken = require('./../../../middleware/VerifyToken')
const IsAdmin = require('./../../../middleware/IsAdmin')

const accountController = require('./../controllers/AccountController')


router.get('/clients',[VerifyJwtToken,IsAdmin], accountController.clients) // get all clients user
router.get('/employees',[VerifyJwtToken,IsAdmin], accountController.employees) // get all employee user
router.get('/profile/show', VerifyJwtToken, accountController.profile)


router.post('/', accountController.store) // create account
router.post('/update/:id',VerifyJwtToken, accountController.update) // update account by id
router.get('/delete/:id', VerifyJwtToken, accountController.destroy) // delete account by id
router.post('/profile/update/:id', VerifyJwtToken, accountController.updateProfile)
router.post('/profile/create', VerifyJwtToken, accountController.createProfile)
module.exports = router