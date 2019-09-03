const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const HttpStatus = require('http-status-codes');

const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');


// @route    POST api/locations
// @desc     Add location
// @access   Private
router.post(
  '/',
  [
    auth,
    isAdmin,
    check('place', 'Place is required')
      .not()
      .isEmpty(),
    check('title', 'Title is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }

    let response = await locationMap.put(req.body);

    if (response.status == HttpStatus.CREATED) {
      return res.status(HttpStatus.CREATED).json(response.body);
    }
    
    res.status(response.status).send(response.body);
  }
);

// @route    GET api/locations
// @desc     Get all locations
// @access   Private
router.get('/', auth, isAdmin, async (req, res) => {
  res.json(locationMap.getValues());
});

module.exports = router;