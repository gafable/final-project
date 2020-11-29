const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({

    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "pending",
        required: false
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }

})


module.exports = mongoose.model('Booking', BookingSchema)