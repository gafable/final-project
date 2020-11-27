const mongoose = require("mongoose");

const ReserveRoomSchema = new mongoose.Schema({

    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    reserves: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReserveRoom"
    }]

})


module.exports = mongoose.model('ReserveRoom', ReserveRoomSchema)