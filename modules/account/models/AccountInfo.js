const mongoose = require('mongoose')

const AccountInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    birthday: {
        type: Date,
        required: true,
    },
    age: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('AccountInfo', AccountInfoSchema)