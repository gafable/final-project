const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({

    no: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    floorNo: { type: Number, required: true },
    type: { type: String, required: true },
    classType: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String], required: true },

})


module.exports = mongoose.model('Room', RoomSchema)