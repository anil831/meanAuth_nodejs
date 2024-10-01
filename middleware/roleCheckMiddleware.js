/**
 * Middleware to check if the user has one of the required roles.
 * @param {Array<string>} roles - Array of roles required to access the route.
 * @returns {Function} Middleware function.
 */
const checkRole = (roles) => (req, res, next) => {
    if (req.user && req.user.roles && roles.some(role => req.user.roles.includes(role))) {
      return next();
    }
    res.status(403).json({ error: 'Forbidden' });
  };
  
module.exports = { checkRole };