const mongoose = require("mongoose");

require("dotenv").config();

//database url
const mongoURL = process.env.MONGO_URI;

//connecting to mongodb database
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("connected to mongo")
    } catch (err) {
        console.log(err);
    }
};
module.exports = connectToMongo;
