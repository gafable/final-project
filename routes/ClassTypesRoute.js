const router = require('express').Router()

const classTypeController = require('./../controllers/ClassTypeController')

const upload = require('./../middleware/Multer')
const VerifyJwtToken = require('./../middleware/VerifyToken')
const IsAdmin = require('./../middleware/IsAdmin') 

router.get('/',[VerifyJwtToken,IsAdmin], classTypeController.index)
router.get('/all', classTypeController.all)
router.get('/show/:id', classTypeController.show)
router.get('/edit/:id',[VerifyJwtToken,IsAdmin], classTypeController.edit)
router.post('/create', [VerifyJwtToken,IsAdmin,upload.single('imageUrl')] , classTypeController.store)
router.post('/update', [VerifyJwtToken,IsAdmin,upload.single('imageUrl')], classTypeController.update)
router.get('/delete/:id',[VerifyJwtToken,IsAdmin],classTypeController.destroy)


module.exports = router