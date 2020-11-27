const mongoose = require('mongoose')


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
        ref: 'AccountInfo'
    },
    reserves: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReserveRoom"
    }]
})

module.exports = mongoose.model('Account', AccountSchema)