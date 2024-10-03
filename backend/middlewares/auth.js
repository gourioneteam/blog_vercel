const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded; // Add user info to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
