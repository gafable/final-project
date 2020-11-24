const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({

    no: { type: Number, required },
    floorNo: { type: Number, required },
    type: { type: String, required },
    classType: { type: String, required },
    price: { type: Number, required },
    status: { type: String, required },
    features: { type: [String], required },
    description: { type: String, required }

})


module.exports = mongoose.model('Room', RoomSchema)