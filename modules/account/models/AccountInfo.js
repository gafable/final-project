const mongoose = require('mongoose')

const AccountInfoSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    middlename: {
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
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }
})

module.exports = mongoose.model('AccountInfo', AccountInfoSchema)