const jwt = require("jsonwebtoken");

// Middleware to control access
const accessControl = (roles) => {
  return (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");


      // console.log("token : ", token);
      if (!token) {
        return res
          .status(401)
          .json({ message: "Access denied. No token provided." });
      }

      // Verify token
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
      req.user = decoded;

      // console.log("decode : ", decoded);

      if (!roles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Invalid or expired token." });
    }
  };
};

module.exports = accessControl;
