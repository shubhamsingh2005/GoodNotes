const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Handle "Bearer <token>" format
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7, authHeader.length) 
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user info (id and role) to the request object
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
