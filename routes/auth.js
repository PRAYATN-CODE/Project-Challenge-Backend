const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'prayatnsoni@2005'


// POST route to create a new user
router.post('/createuser', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')  // Updated to min: 6
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry, a user with this email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        if (!user) {
            return res.status(400).json({ success: false, error: "Please try to login with correct credentials!" });
        }

        const authtoken = jwt.sign({ id: user._id }, JWT_SECRET);
        success = true
        res.json({ success, token: authtoken });  // Respond with the created user
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

//Authentication a user using : post "/api/auth/login" no login required
router.post('/loginuser', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')  // Updated to min: 6
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct Credential!" });
        }

        const passwordCompair = await bcrypt.compare(password, user.password)
        if (!passwordCompair) {
            return res.status(400).json({ error: "Please try to login with correct Credential!" });
        }

        const authtoken = jwt.sign({ id: user._id }, JWT_SECRET);
        success = true
        res.send({ success, Authtoken: authtoken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;
