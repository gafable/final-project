const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({

    no: {
        type: String,
        required: true
    },
    floorNo: {
        type: String,
        required: true
    },
    classType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassType",
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "available"
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    }]
})



module.exports = mongoose.model('Room', RoomSchema)