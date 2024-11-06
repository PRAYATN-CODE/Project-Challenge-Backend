const jwt = require("jsonwebtoken");
const JWT_SECRET = 'prayatnsoni@2005';

const fetchuser = (req, res, next) => {
    // Check if the token is present in the header
    const token = req.header('auth-token');

    // If no token is found, return an error response
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token." });
    }

    try {
        // Verify the token using the secret key
        const data = jwt.verify(token, JWT_SECRET);

        // Attach the user data to the request object
        req.user = data.user;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // Log the error and send a response if the token verification fails
        console.error("Token verification failed:", error.message);
        return res.status(401).send({ error: "Please authenticate using a valid token." });
    }
};

module.exports = fetchuser;
