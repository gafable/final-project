const mongoose = require("mongoose");
<<<<<<< HEAD
const dbUrl = "mongodb://localhost:27017/dbname"
=======
const dbUrl = "mongodb://localhost:27017/roomreservation"
>>>>>>> 0d6d13048ef61c83b8bb0e60a20f5fbe955c8c07

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