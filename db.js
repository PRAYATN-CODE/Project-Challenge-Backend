

const mongoose = require('mongoose');
// const mongoURL = "mongodb+srv://PrayatnSoni:7SSwBwCGv6ltTkAo@prayatn.ulop1.mongodb.net/?retryWrites=true&w=majority&appName=Prayatn";
const mongoURL = "mongodb+srv://prayatnsoni-aichatconnect:BIw8Sf6zAFrScpHN@prayatn-ai-chatconnect.rusvl.mongodb.net/project-challenge";
// const mongoURL = "mongodb+srv://PrayatnSoni:7SSwBwCGv6ltTkAo@prayatn.ulop1.mongodb.net/?retryWrites=true&w=majority&appName=Prayatn";

const connectToMongo = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURL, {
            serverSelectionTimeoutMS: 60000,
            socketTimeoutMS: 45000,
            autoIndex: false,
        });
        console.log("Connected to MongoDB successfully");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;

