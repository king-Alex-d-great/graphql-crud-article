const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Connect to DB
const connectDB = () => {
    mongoose
        .connect(
        "MONGO_DB_URL"
        )
        .then(() => {
            console.log("Connected to database...");
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};

//Set up Schema
const landSchema = new Schema({
    _id: String,
    location: String,
    sizeInFeet: Number,
    ownerId: String,
});

const ownerSchema = new Schema({
    _id: String,
    name: String
});

const Land = mongoose.model("Land", landSchema);
const Owner = mongoose.model("Owner", ownerSchema);

module.exports = {
    Land,
    Owner,
    connectDB,
};