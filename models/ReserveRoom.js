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
    room: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }]

})


module.exports = mongoose.model('ReserveRoom', ReserveRoomSchema)