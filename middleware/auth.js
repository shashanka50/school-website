const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Make sure this matches the secret used in login
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};