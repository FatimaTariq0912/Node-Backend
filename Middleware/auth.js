const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: "Access Denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token is valid, decoded:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};


module.exports = authenticateToken;
