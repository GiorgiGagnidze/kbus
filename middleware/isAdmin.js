const HttpStatus = require('http-status-codes');

module.exports = function(req, res, next) {
  try {
    if (req.user.email == process.env.ADMIN) {
      next();
      return;
    }
  
    return res.status(HttpStatus.FORBIDDEN).json({ msg: 'You are not logged in as admin'});
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server Error');
  }
};