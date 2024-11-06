// const mongoose = require('mongoose');
// const mongoURl = "mongodb+srv://PrayatnSoni:7SSwBwCGv6ltTkAo@prayatn.ulop1.mongodb.net/?retryWrites=true&w=majority&appName=Prayatn";

// const connectToMongo = async () => {
//     try {
//         // Connect to MongoDB
//         await mongoose.connect(mongoURl, {
//             serverSelectionTimeoutMS: 30000,
//         });
//         console.log("Connected to MongoDB successfully");

//         // Drop the unique index on description
//         const db = mongoose.connection;
//         await db.collection('notes').dropIndex('description_1');
//         console.log("Index 'description_1' dropped successfully");

//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// };

// module.exports = connectToMongo;

const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://PrayatnSoni:7SSwBwCGv6ltTkAo@prayatn.ulop1.mongodb.net/?retryWrites=true&w=majority&appName=Prayatn";

const connectToMongo = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURL, {
            serverSelectionTimeoutMS: 60000,
            socketTimeoutMS: 45000,
            autoIndex: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;

