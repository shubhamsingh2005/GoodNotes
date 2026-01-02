// Middleware to check for specific roles
const authorize = (roles = []) => {
  // roles param can be a single string (e.g. 'admin') or an array of strings (['admin', 'user'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user || (roles.length && !roles.includes(req.user.role))) {
      return res.status(403).json({ message: 'Forbidden: Access is denied' });
    }
    next();
  };
};

module.exports = authorize;
