const jwt = require('jsonwebtoken');

// Middleware to control access
const accessControl = (roles) => {
  return (req, res, next) => {
    try {
      // Extract token from headers
       const token = req.header('Authorization').replace('Bearer ','');
      if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }

      // Verify token
      const decoded = jwt.verify(token,`${process.env.JWT_SECRET}`);
      req.user = decoded; // Attach decoded user information to the request

      console.log("decode : ",decoded);
      // Check if user role is authorized
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Invalid or expired token.' });
    }
  };
};

module.exports = accessControl;