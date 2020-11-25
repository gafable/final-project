const multer = require('multer')
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './public/images/uploads')
    },
    filename: (request, file, callback) => {

        callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})

const fileFilter = (request, file, callback) => {
    // Accept File
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true)
    } else {
        callback(null, false)
    }
}


module.exports = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})