const express = require('express')
const router = express.Router()
const VerifyJwtToken = require('./../../../middleware/VerifyToken')
const accountController = require('./../controllers/AccountController')

router.get('/clients', accountController.clients) // get all clients user
router.get('/employees', accountController.employees) // get all employee user
router.get('/profile/show', VerifyJwtToken, accountController.profile)


router.get('/', accountController.index) // get all accounts
router.get('/:id', accountController.show) // get account by id
router.post('/', accountController.store) // create account
router.post('/:id', accountController.update) // update account by id
router.post('/:id', accountController.destroy) // delete account by id
router.post('/update/:id', VerifyJwtToken, accountController.update)
router.post('/profile/info', VerifyJwtToken, accountController.createProfile)
module.exports = router