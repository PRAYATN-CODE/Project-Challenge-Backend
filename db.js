const mongoose = require('mongoose');
const mongoURl = "mongodb+srv://PrayatnSoni:7SSwBwCGv6ltTkAo@prayatn.ulop1.mongodb.net/?retryWrites=true&w=majority&appName=Prayatn";

const connectToMongo = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURl);
        console.log("Connected to MongoDB successfully");

        // Drop the unique index on description
        const db = mongoose.connection;
        await db.collection('notes').dropIndex('description_1');
        console.log("Index 'description_1' dropped successfully");
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;
