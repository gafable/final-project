const mongoose = require("mongoose");
const dbUrl = "mongodb://aga:agapassword@cluster0-shard-00-00.tzugo.mongodb.net:27017,cluster0-shard-00-01.tzugo.mongodb.net:27017,cluster0-shard-00-02.tzugo.mongodb.net:27017/room_reservation?ssl=true&replicaSet=atlas-fqfxrn-shard-0&authSource=admin&retryWrites=true&w=majority"

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