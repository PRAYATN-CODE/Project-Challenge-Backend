const jwt = require("jsonwebtoken");
const JWT_SECRET = 'prayatnsoni@2005';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token." });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);

        req.user = data;

        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).send({ error: "Please authenticate using a valid token." });
    }
};

module.exports = fetchuser;
