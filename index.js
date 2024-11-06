// const connectToMongo = require('./db');
// const express = require('express');
// const cors = require('cors'); // Import cors

// // Connect to MongoDB
// connectToMongo();

// const app = express();
// const port = 5000;

// // Enable CORS for requests from localhost:3000
// app.use(cors({ origin: 'http://localhost:3000' }));

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Define routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/notes'));

// // Start server and log the port
// app.listen(port, () => {
//     console.log(`Server listening on http://localhost:${port}`);
// });

const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

// Connect to MongoDB
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for localhost:3000 (development) and your Render URL (production)
const corsOptions = {
    origin: ['http://localhost:3000', 'https://notes-app-backend-zq23.onrender.com'],  // Add both development and production URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Allow cookies if needed
};

app.use(cors(corsOptions));  // Use CORS middleware globally

// Middleware to parse JSON request bodies
app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

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
