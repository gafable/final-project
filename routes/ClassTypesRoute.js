const router = require('express').Router()

const classTypeController = require('./../controllers/ClassTypeController')
const upload = require('./../middleware/Multer')

router.get('/', classTypeController.index)
router.get('/all', classTypeController.classTypes)
router.get('/edit/:id', classTypeController.edit)
router.post('/create', upload.single('imageUrl'), classTypeController.store)
router.post('/update', upload.single('imageUrl'), classTypeController.update)


module.exports = router