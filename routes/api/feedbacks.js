const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const HttpStatus = require('http-status-codes');

const Feedback = require('../../models/Feedback');

// @route    POST api/feedback
// @desc     Send feedback to administration
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('message', 'Message is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { name, email, message} = req.body;

    try {
      let feedback = new Feedback({
        name,
        email,
        message
      });

      await feedback.save();

      res.status(HttpStatus.CREATED).json(feedback);
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server error');
    }
  }
);

module.exports = router;