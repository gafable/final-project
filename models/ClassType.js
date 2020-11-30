const mongoose = require("mongoose");

const ClassTypeSchema = new mongoose.Schema({

    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    features: { type: [String], required: true },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }]
})



module.exports = mongoose.model('ClassType', ClassTypeSchema)