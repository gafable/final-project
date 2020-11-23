const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/roomreservation"

const connectToDatabase = () => {
    mongoose.
    connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => console.log("Connected to database"))
        .catch((error) => console.error(error));
};

module.exports = {
    connect: connectToDatabase,
};