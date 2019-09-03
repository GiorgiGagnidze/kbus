const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const HttpStatus = require('http-status-codes');

const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server Error');
    }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
        let user = await User.findOne({ email });

        if (!user) {
            return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const payload = {
            user: {
            id: user.id,
            email: email
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
            if (err) throw err;
            res.json({ token });
            }
        );
        } catch (err) {
        console.error(err.message);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server error');
        }
    }
);

module.exports = router;
