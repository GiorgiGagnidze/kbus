const HttpStatus = require('http-status-codes');

const config = require('config');

module.exports = function(req, res, next) {
  try {
    if (req.user.email == config.get('admin')) {
      next();
      return;
    }
  
    return res.status(HttpStatus.FORBIDDEN).json({ msg: 'You are not logged in as admin'});
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server Error');
  }
};