const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors'); // Import cors

// Connect to MongoDB
connectToMongo();

const app = express();
const port = 5000;

// Enable CORS for requests from localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware to parse JSON request bodies
app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start server and log the port
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
