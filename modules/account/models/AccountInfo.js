const mongoose = require('mongoose')

const AccountInfoSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: false,
        default : null
    },
    lastname: {
        type: String,
        required: false,
        default : null
    },
    middlename: {
        type: String,
        required: false,
        default : null
    },
    birthday: {
        type: Date,
        required: false,
        default : null
    },
    age: {
        type: Number,
        required: false,
        default : null
    },
    address: {
        type: String,
        required: false,
        default :null
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }
})

module.exports = mongoose.model('AccountInfo', AccountInfoSchema)