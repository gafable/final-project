const mongoose = require('mongoose')

const AccountInfo = require('./AccountInfo')

const AccountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    accountInfo: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AccountInfo',
        default : new AccountInfo()
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    }]
})

module.exports = mongoose.model('Account', AccountSchema)