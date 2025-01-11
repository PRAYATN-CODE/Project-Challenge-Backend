
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const fetchuser = require('./middleware/fetchuser');

// Connect to MongoDB
connectToMongo();

const app = express();
const port = 5000;

// Enable CORS for localhost:3000 (development) and your Render URL (production)

app.use(cors());  // Use CORS middleware globally

// Middleware to parse JSON request bodies
app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', fetchuser, require('./routes/itemRoutes'));

// Start server with error handling
app.listen(port, (error) => {
    if (error) {
        console.error("Error starting server:", error);
        process.exit(1); // Exit with status code 1 if there's an error
    } else {
        console.log(`Server listening on port: ${port}`);
    }
});

// Catch any unhandled errors or promise rejections
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    process.exit(1);
});
